import { bcs } from '@mysten/sui/bcs';
import { Transaction } from '@mysten/sui/transactions';
import { isValidSuiAddress, normalizeStructTag } from '@mysten/sui/utils';
import { devInspectAndGetReturnValues } from '@polymedia/suitcase-core';
import { Decimal } from 'decimal.js';
import { pathOr } from 'ramda';
import invariant from 'tiny-invariant';

import {
  AddNodeArgs,
  BurnLstArgs,
  BurnStakeNftArgs,
  FcfsArgs,
  KeepStakeNftArgs,
  LastEpochAprArgs,
  MintAfterVotesFinishedArgs,
  MintArgs,
  NewLSTArgs,
  RemoveNodeArgs,
  SdkConstructorArgs,
  SharedObject,
  SyncExchangeRateArgs,
  ToLstAtEpochArgs,
  ToWalAtEpochArgs,
  VectorTransferArgs,
} from './blizzard.types';
import { INNER_LST_STATE_ID, INNER_WALRUS_STAKING_ID } from './constants';
import { SDK } from './sdk';
import { OptionU64 } from './structs';
import { getEpochData, getFees, msToDays } from './utils';

const lstTypeCache = new Map<string, string>();

export class BlizzardSDK extends SDK {
  constructor(args: SdkConstructorArgs | undefined | null = null) {
    super(args);
  }

  public async newLST({
    tx = new Transaction(),
    treasuryCap,
    superAdminRecipient,
    adminWitness,
  }: NewLSTArgs) {
    this.assertObjectId(treasuryCap);

    invariant(
      isValidSuiAddress(superAdminRecipient),
      'Invalid super admin recipient'
    );

    this.assertNotZeroAddress(superAdminRecipient);

    const treasuryCapId =
      typeof treasuryCap === 'string' ? treasuryCap : treasuryCap.objectId;

    const treasuryCapObject = await this.client.getObject({
      id: treasuryCapId,
      options: {
        showType: true,
        showContent: true,
      },
    });

    const treasuryCapTotalSupply = +pathOr(
      /// Force an error if we do not find the field
      '1',
      ['data', 'content', 'fields', 'total_supply', 'fields', 'value'],
      treasuryCapObject
    );

    invariant(
      treasuryCapTotalSupply === 0,
      'TreasuryCap Error: Total Supply is not 0 or not found'
    );

    const lstTypeArgument = treasuryCapObject.data?.type
      ?.split('<')[1]
      .slice(0, -1);

    invariant(lstTypeArgument, 'Invalid TreasuryCap: no memeCoinType found');

    const coinMetadata = await this.client.getCoinMetadata({
      coinType: normalizeStructTag(lstTypeArgument),
    });

    invariant(
      coinMetadata && coinMetadata.id,
      'Invalid Coin Metadata: no coin metadata ID found'
    );

    invariant(
      coinMetadata.decimals === 9,
      'Invalid Coin Metadata: decimals are not 9'
    );

    tx.moveCall({
      package: this.packages.BLIZZARD,
      module: this.modules.Protocol,
      function: 'new',
      arguments: [
        this.sharedObject(
          tx,
          this.sharedObjects.WALRUS_STAKING({ mutable: false })
        ),
        this.sharedObject(tx, coinMetadata.id),
        adminWitness,
        this.ownedObject(tx, treasuryCap),
        tx.pure.address(superAdminRecipient),
        this.getAllowedVersions(tx),
      ],
      typeArguments: [lstTypeArgument],
    });

    return {
      tx,
      returnValues: null,
    };
  }

  public async syncExchangeRate({
    tx = new Transaction(),
    blizzardStaking,
  }: SyncExchangeRateArgs) {
    this.assertObjectId(blizzardStaking);

    const lstType = await this.maybeFetchAndCacheLstType(blizzardStaking);

    tx.moveCall({
      package: this.packages.BLIZZARD,
      module: this.modules.Protocol,
      function: 'sync_exchange_rate',
      arguments: [
        this.sharedObject(tx, blizzardStaking),
        this.sharedObject(
          tx,
          this.sharedObjects.WALRUS_STAKING({ mutable: false })
        ),
      ],
      typeArguments: [lstType],
    });

    return {
      tx,
      returnValues: null,
    };
  }

  public async mint({
    tx = new Transaction(),
    walCoin,
    nodeId,
    blizzardStaking,
  }: MintArgs) {
    this.assertObjectId(walCoin);

    this.assertObjectId(nodeId);
    this.assertObjectId(blizzardStaking);

    this.assertNotZeroAddress(nodeId);

    const lstType = await this.maybeFetchAndCacheLstType(blizzardStaking);

    return {
      tx,
      returnValues: tx.moveCall({
        package: this.packages.BLIZZARD,
        module: this.modules.Protocol,
        function: 'mint',
        arguments: [
          this.sharedObject(tx, blizzardStaking),
          this.sharedObject(
            tx,
            this.sharedObjects.WALRUS_STAKING({ mutable: true })
          ),
          this.ownedObject(tx, walCoin),
          tx.pure.id(nodeId),
          this.getAllowedVersions(tx),
        ],
        typeArguments: [lstType],
      }),
    };
  }

  public async mintAfterVotesFinished({
    tx = new Transaction(),
    walCoin,
    nodeId,
    blizzardStaking,
  }: MintAfterVotesFinishedArgs) {
    this.assertObjectId(walCoin);

    this.assertObjectId(nodeId);
    this.assertObjectId(blizzardStaking);

    this.assertNotZeroAddress(nodeId);

    const lstType = await this.maybeFetchAndCacheLstType(blizzardStaking);

    return {
      tx,
      returnValues: tx.moveCall({
        package: this.packages.BLIZZARD,
        module: this.modules.Protocol,
        function: 'mint_after_votes_finished',
        arguments: [
          this.sharedObject(tx, blizzardStaking),
          this.sharedObject(
            tx,
            this.sharedObjects.WALRUS_STAKING({ mutable: true })
          ),
          this.ownedObject(tx, walCoin),
          tx.pure.id(nodeId),
          this.getAllowedVersions(tx),
        ],
        typeArguments: [lstType],
      }),
    };
  }

  public keepStakeNft({ tx = new Transaction(), nft }: KeepStakeNftArgs) {
    tx.moveCall({
      package: this.packages.BLIZZARD,
      module: this.modules.StakeNFT,
      function: 'keep',
      arguments: [nft],
    });

    return {
      tx,
      returnValues: null,
    };
  }

  public async burnStakeNft({
    tx = new Transaction(),
    nft,
    blizzardStaking,
  }: BurnStakeNftArgs) {
    this.assertObjectId(nft);

    this.assertObjectId(blizzardStaking);

    const lstType = await this.maybeFetchAndCacheLstType(blizzardStaking);

    return {
      tx,
      returnValues: tx.moveCall({
        package: this.packages.BLIZZARD,
        module: this.modules.Protocol,
        function: 'burn_stake_nft',
        arguments: [
          this.sharedObject(tx, blizzardStaking),
          this.sharedObject(
            tx,
            this.sharedObjects.WALRUS_STAKING({ mutable: false })
          ),
          this.ownedObject(tx, nft),
          this.getAllowedVersions(tx),
        ],
        typeArguments: [lstType],
      }),
    };
  }

  public async fcfs({
    tx = new Transaction(),
    blizzardStaking,
    value,
  }: FcfsArgs) {
    this.assertObjectId(blizzardStaking);

    invariant(BigInt(value.toString()) > 0n, 'Value must be greater than 0');

    const lstType = await this.maybeFetchAndCacheLstType(blizzardStaking);

    return {
      tx,
      returnValues: tx.moveCall({
        package: this.packages.BLIZZARD_HOOKS,
        module: this.modules.Hooks,
        function: 'fcfs',
        arguments: [
          this.sharedObject(tx, blizzardStaking),
          this.sharedObject(
            tx,
            this.sharedObjects.WALRUS_STAKING({ mutable: true })
          ),
          tx.pure.u64(value),
        ],
        typeArguments: [lstType],
      }),
    };
  }

  public vectorTransfer({
    tx = new Transaction(),
    vector,
    to,
    type,
  }: VectorTransferArgs) {
    this.assertNotZeroAddress(to);

    tx.moveCall({
      package: this.packages.BLIZZARD_UTILS,
      module: this.modules.Utils,
      function: 'vector_transfer',
      arguments: [vector, tx.pure.address(to)],
      typeArguments: [type],
    });

    return {
      tx,
      returnValues: null,
    };
  }

  public async burnLst({
    tx = new Transaction(),
    lstCoin,
    withdrawIXs,
    blizzardStaking,
    minWalValue = 0n,
  }: BurnLstArgs) {
    this.assertObjectId(lstCoin);

    this.assertObjectId(withdrawIXs);

    const lstType = await this.maybeFetchAndCacheLstType(blizzardStaking);

    return {
      tx,
      returnValues: tx.moveCall({
        package: this.packages.BLIZZARD,
        module: this.modules.Protocol,
        function: 'burn_lst',
        arguments: [
          this.sharedObject(tx, blizzardStaking),
          this.sharedObject(
            tx,
            this.sharedObjects.WALRUS_STAKING({ mutable: true })
          ),
          this.ownedObject(tx, lstCoin),
          withdrawIXs,
          tx.pure.u64(minWalValue),
          this.getAllowedVersions(tx),
        ],
        typeArguments: [lstType],
      }),
    };
  }

  public async addNode({
    tx = new Transaction(),
    nodeId,
    blizzardStaking,
    adminWitness,
  }: AddNodeArgs) {
    this.assertObjectId(blizzardStaking);

    this.assertNotZeroAddress(nodeId);

    const lstType = await this.maybeFetchAndCacheLstType(blizzardStaking);

    tx.moveCall({
      package: this.packages.BLIZZARD,
      module: this.modules.Protocol,
      function: 'add_node',
      arguments: [
        this.sharedObject(tx, blizzardStaking),
        adminWitness,
        tx.pure.id(nodeId),
        this.getAllowedVersions(tx),
      ],
      typeArguments: [normalizeStructTag(lstType)],
    });

    return {
      tx,
      returnValues: null,
    };
  }

  public async removeNode({
    tx = new Transaction(),
    nodeId,
    blizzardStaking,
    adminWitness,
  }: RemoveNodeArgs) {
    this.assertObjectId(blizzardStaking);

    this.assertNotZeroAddress(nodeId);

    const lstType = await this.maybeFetchAndCacheLstType(blizzardStaking);

    tx.moveCall({
      package: this.packages.BLIZZARD,
      module: this.modules.Protocol,
      function: 'remove_node',
      arguments: [
        this.sharedObject(tx, blizzardStaking),
        adminWitness,
        tx.pure.id(nodeId),
        this.getAllowedVersions(tx),
      ],
      typeArguments: [normalizeStructTag(lstType)],
    });

    return {
      tx,
      returnValues: null,
    };
  }

  public async getEpochData() {
    const data = await this.client.getObject({
      id: INNER_WALRUS_STAKING_ID[this.network],
      options: {
        showType: true,
        showContent: true,
      },
    });

    return getEpochData(data);
  }

  public async getFees(blizzardStaking: SharedObject) {
    const data = await this.client.getObject({
      id: INNER_LST_STATE_ID[this.network][
        typeof blizzardStaking === 'string'
          ? blizzardStaking
          : blizzardStaking.objectId
      ],
      options: {
        showType: true,
        showContent: true,
      },
    });

    return getFees(data);
  }

  /**
   * Calculate the APR for the last epoch
   * @param nodeId - The node ID to calculate the APR for the last epoch.
   * @returns The APR for the last epoch in percentage format. E.g.: 1 === 1%
   */
  public async lastEpochApr({ nodeId }: LastEpochAprArgs) {
    const tx = new Transaction();

    const epochData = await this.getEpochData();

    const principal = 1_000_000_000n;

    tx.moveCall({
      package: this.packages.WALRUS,
      module: this.modules.WalrusStaking,
      function: 'calculate_rewards',
      arguments: [
        this.sharedObject(
          tx,
          this.sharedObjects.WALRUS_STAKING({ mutable: false })
        ),
        tx.pure.id(nodeId),
        tx.pure.u64(principal),
        tx.pure.u32(epochData.currentEpoch - 1),
        tx.pure.u32(epochData.currentEpoch),
      ],
    });

    const result = await devInspectAndGetReturnValues(this.client, tx, [
      [bcs.U64],
    ]);

    invariant(
      typeof result[0][0] === 'string',
      'Invalid result: no rewards found'
    );

    const rewards = new Decimal(result[0][0]);

    const epochDurationInDays = new Decimal(
      msToDays(epochData.epochDurationMs)
    );

    const apr = rewards
      .div(new Decimal(principal.toString()))
      .mul(new Decimal(365).div(epochDurationInDays))
      .mul(100);

    return apr.toNumber();
  }

  public async typeFromBlizzardStaking(blizzardStaking: SharedObject) {
    const blizzardStakingObject = await this.client.getObject({
      id:
        typeof blizzardStaking === 'string'
          ? blizzardStaking
          : blizzardStaking.objectId,
      options: {
        showType: true,
      },
    });

    const type = blizzardStakingObject.data?.type?.split('<')[1].slice(0, -1);

    invariant(type, 'Invalid Blizzard Staking: no type found');

    return type;
  }

  public async toWalAtEpoch({
    epoch,
    value,
    blizzardStaking,
  }: ToWalAtEpochArgs) {
    this.assertObjectId(blizzardStaking);

    const lstType = await this.maybeFetchAndCacheLstType(blizzardStaking);

    const tx = new Transaction();
    tx.moveCall({
      package: this.packages.BLIZZARD,
      module: this.modules.Protocol,
      function: 'to_wal_at_epoch',
      arguments: [
        this.sharedObject(tx, blizzardStaking),
        tx.pure.u32(epoch),
        tx.pure.u64(value),
        tx.pure.bool(false),
      ],
      typeArguments: [lstType],
    });

    const result = await devInspectAndGetReturnValues(this.client, tx, [
      [OptionU64],
    ]);

    return result[0][0] ? BigInt(result[0][0]) : null;
  }

  public async toLstAtEpoch({
    epoch,
    value,
    blizzardStaking,
  }: ToLstAtEpochArgs) {
    this.assertObjectId(blizzardStaking);

    const lstType = await this.maybeFetchAndCacheLstType(blizzardStaking);

    const tx = new Transaction();
    tx.moveCall({
      package: this.packages.BLIZZARD,
      module: this.modules.Protocol,
      function: 'to_lst_at_epoch',
      arguments: [
        this.sharedObject(tx, blizzardStaking),
        tx.pure.u32(epoch),
        tx.pure.u64(value),
        tx.pure.bool(false),
      ],
      typeArguments: [lstType],
    });

    const result = await devInspectAndGetReturnValues(this.client, tx, [
      [OptionU64],
    ]);

    return result[0][0] ? BigInt(result[0][0]) : null;
  }

  async maybeFetchAndCacheLstType(blizzardStaking: SharedObject) {
    const id =
      typeof blizzardStaking === 'string'
        ? blizzardStaking
        : blizzardStaking.objectId;

    if (lstTypeCache.has(id)) {
      return Promise.resolve(lstTypeCache.get(id)!);
    }

    const type = await this.typeFromBlizzardStaking(blizzardStaking);

    lstTypeCache.set(id, type);

    return type;
  }
}
