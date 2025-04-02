import { bcs } from '@mysten/sui/bcs';
import { SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import {
  isValidSuiObjectId,
  normalizeSuiAddress,
  normalizeSuiObjectId,
} from '@mysten/sui/utils';
import { chunkArray, sleep } from '@polymedia/suitcase-core';
import { has, pathOr } from 'ramda';
import invariant from 'tiny-invariant';

import {
  INNER_WALRUS_STAKING_ID,
  Modules,
  WALRUS_PACKAGES,
  WALRUS_STAKING_OBJECT,
} from './constants';
import { getEpochData, getSdkDefaultArgs, getStakedWal } from './utils';
import {
  JoinStakedWalArgs,
  OwnedObject,
  RequestWithdrawingStake,
  SdkConstructorArgs,
  SharedObject,
  SplitStakedWalArgs,
  StakedWal,
  StakedWalState,
  StakeWithPoolArgs,
  U64,
  WithdrawStake,
} from './walrus.types';

export class WalrusSDK {
  walrusPackages = WALRUS_PACKAGES;
  modules = Modules;

  minimumStake = 1_000_000_000n;

  #client: SuiClient;

  constructor(args: SdkConstructorArgs | undefined | null = {}) {
    const data = {
      ...getSdkDefaultArgs(),
      ...args,
    };

    invariant(data.fullNodeUrl, 'Full node URL is required');

    this.#client = new SuiClient({
      url: data.fullNodeUrl,
    });
  }

  public async getEpochData() {
    const data = await this.#client.getObject({
      id: INNER_WALRUS_STAKING_ID,
      options: {
        showType: true,
        showContent: true,
      },
    });

    return getEpochData(data);
  }

  public async getLatestWalrusPackage() {
    const staking = await this.#client.getObject({
      id: WALRUS_STAKING_OBJECT({ mutable: false }).objectId,
      options: {
        showType: true,
        showContent: true,
      },
    });

    const packageId = pathOr(
      '',
      ['data', 'content', 'fields', 'package_id'],
      staking
    );

    invariant(packageId, 'Invalid package ID');

    return normalizeSuiObjectId(packageId);
  }

  public async getStakedWal(objectId: string) {
    const stakedWalObject = await this.#client.getObject({
      id: objectId,
      options: {
        showType: true,
        showContent: true,
      },
    });

    return getStakedWal(stakedWalObject);
  }

  public async getStakedWals(objectIds: string[], sleepMs = 300) {
    const chunks = chunkArray(objectIds, 50);

    const stakedWals = [];

    for (const chunk of chunks) {
      const stakedWalObjects = await this.#client.multiGetObjects({
        ids: chunk,
        options: {
          showType: true,
          showContent: true,
        },
      });

      await sleep(sleepMs);

      stakedWals.push(...stakedWalObjects.map(getStakedWal));
    }

    return stakedWals;
  }

  public joinStakedWal({
    tx = new Transaction(),
    from,
    other,
  }: JoinStakedWalArgs) {
    tx.moveCall({
      function: `join`,
      arguments: [this.ownedObject(tx, from), this.ownedObject(tx, other)],
      package: this.walrusPackages.latest,
      module: this.modules.StakedWal,
    });

    return {
      tx,
      returnValue: null,
    };
  }

  public splitStakedWal({
    tx = new Transaction(),
    from,
    amount,
  }: SplitStakedWalArgs) {
    const bingIntAmount = BigInt(amount);
    invariant(
      bingIntAmount >= this.minimumStake,
      'Amount must be greater than minimum stake'
    );

    return {
      tx,
      returnValue: tx.moveCall({
        function: `split`,
        arguments: [this.ownedObject(tx, from), tx.pure.u64(amount)],
        package: this.walrusPackages.latest,
        module: this.modules.StakedWal,
      }),
    };
  }

  public async canBeJoined(
    from: string | StakedWal,
    other: string | StakedWal
  ) {
    try {
      if (typeof from === 'string') {
        from = await this.getStakedWal(from);
      }

      if (typeof other === 'string') {
        other = await this.getStakedWal(other);
      }

      invariant(from.objectId !== other.objectId, 'Objects must be different');

      invariant(from.nodeId === other.nodeId, 'Nodes must be the same');
      invariant(
        from.activationEpoch === other.activationEpoch,
        'Activation epochs must be the same'
      );

      if (from.state === StakedWalState.Staked) {
        invariant(
          other.state === StakedWalState.Staked,
          'StakedWal must be staked'
        );

        return true;
      }

      invariant(
        from.state === StakedWalState.Withdrawing &&
          other.state === StakedWalState.Staked,
        'StakedWal must be withdrawing'
      );

      invariant(
        typeof from.withdrawingEpoch === 'number' &&
          typeof other.withdrawingEpoch === 'number',
        'Withdrawing epochs must be numbers'
      );

      invariant(
        from.withdrawingEpoch === other.withdrawingEpoch,
        'From and other must have the same withdrawing epoch'
      );

      return true;
    } catch {
      return false;
    }
  }

  public async canBeSplit(from: string | StakedWal, amount: U64) {
    try {
      if (typeof from === 'string') {
        from = await this.getStakedWal(from);
      }

      const bigIntAmount = BigInt(amount);

      invariant(
        bigIntAmount >= this.minimumStake,
        'Amount must be greater than minimum stake'
      );

      invariant(
        from.principal > bigIntAmount,
        'Principal must be greater than amount'
      );

      invariant(
        from.principal - bigIntAmount >= this.minimumStake,
        'Principal must be greater than amount'
      );

      return true;
    } catch {
      return false;
    }
  }

  public stakeWithPool({
    tx = new Transaction(),
    walCoin,
    nodeId,
  }: StakeWithPoolArgs) {
    invariant(isValidSuiObjectId(nodeId), 'Node ID must be a valid Sui ID');

    return {
      tx,
      returnValue: tx.moveCall({
        function: `stake_with_pool`,
        arguments: [
          this.sharedObject(tx, WALRUS_STAKING_OBJECT({ mutable: true })),
          this.ownedObject(tx, walCoin),
          tx.pure.id(nodeId),
        ],
        package: this.walrusPackages.latest,
        module: this.modules.Staking,
      }),
    };
  }

  public requestWithdrawing({
    tx = new Transaction(),
    stakedWal,
  }: RequestWithdrawingStake) {
    tx.moveCall({
      function: `request_withdraw_stake`,
      arguments: [
        this.sharedObject(tx, WALRUS_STAKING_OBJECT({ mutable: true })),
        this.ownedObject(tx, stakedWal),
      ],
      package: this.walrusPackages.latest,
      module: this.modules.Staking,
    });

    return {
      tx,
      returnValue: null,
    };
  }

  public withdrawStake({ tx = new Transaction(), stakedWal }: WithdrawStake) {
    return {
      tx,
      returnValue: tx.moveCall({
        function: `withdraw_stake`,
        arguments: [
          this.sharedObject(tx, WALRUS_STAKING_OBJECT({ mutable: true })),
          this.ownedObject(tx, stakedWal),
        ],
        package: this.walrusPackages.latest,
        module: this.modules.Staking,
      }),
    };
  }

  public async canWithdrawEarly(stakedWal: string | StakedWal) {
    const id = typeof stakedWal === 'string' ? stakedWal : stakedWal.objectId;

    const tx = new Transaction();

    tx.moveCall({
      function: `can_withdraw_staked_wal_early`,
      arguments: [
        this.sharedObject(tx, WALRUS_STAKING_OBJECT({ mutable: false })),
        tx.object(id),
      ],
      package: this.walrusPackages.latest,
      module: this.modules.Staking,
    });

    const response = await this.#client.devInspectTransactionBlock({
      transactionBlock: tx,
      sender: normalizeSuiAddress('0x0'),
    });

    const returnValues = response.results || [];

    invariant(returnValues.length === 1, 'Invalid return values');

    const returnValue = returnValues[0].returnValues || [];

    return bcs.bool().parse(Uint8Array.from(returnValue[0][0]));
  }

  public async calculatePendingRewards(stakedWal: string | StakedWal) {
    if (typeof stakedWal === 'string') {
      stakedWal = await this.getStakedWal(stakedWal);
    }

    const tx = new Transaction();

    const currentEpoch = await this.getEpochData();

    tx.moveCall({
      function: `calculate_rewards`,
      arguments: [
        this.sharedObject(tx, WALRUS_STAKING_OBJECT({ mutable: false })),
        tx.pure.id(stakedWal.nodeId),
        tx.pure.u64(stakedWal.principal),
        tx.pure.u32(stakedWal.activationEpoch),
        tx.pure.u32(currentEpoch.currentEpoch),
      ],
      package: this.walrusPackages.latest,
      module: this.modules.Staking,
    });

    const response = await this.#client.devInspectTransactionBlock({
      transactionBlock: tx,
      sender: normalizeSuiAddress('0x0'),
    });

    const returnValues = response.results || [];

    invariant(returnValues.length === 1, 'Invalid return values');

    const returnValue = returnValues[0].returnValues || [];

    return BigInt(bcs.u64().parse(Uint8Array.from(returnValue[0][0])));
  }

  sharedObject(tx: Transaction, obj: SharedObject) {
    if (typeof obj === 'string') {
      return tx.object(obj);
    }

    return tx.sharedObjectRef(obj);
  }

  ownedObject(tx: Transaction, obj: OwnedObject) {
    if (has('objectId', obj) && has('version', obj) && has('digest', obj)) {
      return tx.objectRef(obj);
    }

    return typeof obj === 'string' ? tx.object(obj) : obj;
  }
}
