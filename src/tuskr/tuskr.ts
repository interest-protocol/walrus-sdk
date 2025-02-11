import { Transaction } from '@mysten/sui/transactions';
import { isValidSuiAddress, normalizeStructTag } from '@mysten/sui/utils';
import { pathOr } from 'ramda';
import invariant from 'tiny-invariant';

import { INNER_WALRUS_STAKING_ID } from './constants';
import { SDK } from './sdk';
import {
  AddNodeArgs,
  BurnLstArgs,
  BurnStakeNftArgs,
  FcfsArgs,
  KeepStakeNftArgs,
  MintAfterVotesFinishedArgs,
  MintArgs,
  NewLSTArgs,
  RemoveNodeArgs,
  SdkConstructorArgs,
  SharedObject,
  SyncExchangeRateArgs,
  VectorTransferArgs,
} from './tuskr.types';
import { getEpochData } from './utils';

export class TuskrSDK extends SDK {
  tuskrStaking: SharedObject;
  tuskrAdmin: string;

  constructor(args: SdkConstructorArgs | undefined | null = null) {
    super(args);
  }

  public setTuskrStaking(tuskrStaking: SharedObject) {
    this.tuskrStaking = tuskrStaking;
    return this;
  }

  public setTuskrAdmin(tuskrAdmin: string) {
    this.tuskrAdmin = tuskrAdmin;
    return this;
  }

  public async newLST({
    tx = new Transaction(),
    treasuryCap,
    tuskrAdmin = this.tuskrAdmin,
    superAdminRecipient,
    adminWitness,
  }: NewLSTArgs) {
    this.assertObjectId(treasuryCap);
    this.assertObjectId(tuskrAdmin);

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
      package: this.packages.TUSKR,
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
    lstType = this.lstType,
    tuskrStaking = this.tuskrStaking,
  }: SyncExchangeRateArgs) {
    this.assertObjectId(tuskrStaking);

    lstType = await this.maybeFetchAndSaveLstType(lstType);

    tx.moveCall({
      package: this.packages.TUSKR,
      module: this.modules.Protocol,
      function: 'sync_exchange_rate',
      arguments: [
        this.sharedObject(tx, tuskrStaking),
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
    tuskrStaking = this.tuskrStaking,
    lstType = this.lstType,
  }: MintArgs) {
    this.assertObjectId(walCoin);

    this.assertObjectId(nodeId);
    this.assertObjectId(tuskrStaking);

    this.assertNotZeroAddress(nodeId);

    lstType = await this.maybeFetchAndSaveLstType(lstType);

    return {
      tx,
      returnValues: tx.moveCall({
        package: this.packages.TUSKR,
        module: this.modules.Protocol,
        function: 'mint',
        arguments: [
          this.sharedObject(tx, tuskrStaking),
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
    tuskrStaking = this.tuskrStaking,
    lstType = this.lstType,
  }: MintAfterVotesFinishedArgs) {
    this.assertObjectId(walCoin);

    this.assertObjectId(nodeId);
    this.assertObjectId(tuskrStaking);

    this.assertNotZeroAddress(nodeId);

    lstType = await this.maybeFetchAndSaveLstType(lstType);

    return {
      tx,
      returnValues: tx.moveCall({
        package: this.packages.TUSKR,
        module: this.modules.Protocol,
        function: 'mint_after_votes_finished',
        arguments: [
          this.sharedObject(tx, tuskrStaking),
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
      package: this.packages.TUSKR,
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
    tuskrStaking = this.tuskrStaking,
    lstType = this.lstType,
  }: BurnStakeNftArgs) {
    this.assertObjectId(nft);

    this.assertObjectId(tuskrStaking);

    lstType = await this.maybeFetchAndSaveLstType(lstType);

    return {
      tx,
      returnValues: tx.moveCall({
        package: this.packages.TUSKR,
        module: this.modules.Protocol,
        function: 'burn_stake_nft',
        arguments: [
          this.sharedObject(tx, tuskrStaking),
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
    tuskrStaking = this.tuskrStaking,
    value = 0n,
    lstType = this.lstType,
  }: FcfsArgs) {
    this.assertObjectId(tuskrStaking);

    invariant(BigInt(value.toString()) > 0n, 'Value must be greater than 0');

    lstType = await this.maybeFetchAndSaveLstType(lstType);

    return {
      tx,
      returnValues: tx.moveCall({
        package: this.packages.TUSKR_HOOKS,
        module: 'tuskr_hooks',
        function: 'fcfs',
        arguments: [
          this.sharedObject(tx, tuskrStaking),
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
      package: this.packages.TUSKR_UTILS,
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
    lstType = this.lstType,
    tuskrStaking = this.tuskrStaking,
    minWalValue = 0n,
  }: BurnLstArgs) {
    this.assertObjectId(lstCoin);

    this.assertObjectId(withdrawIXs);

    lstType = await this.maybeFetchAndSaveLstType(lstType);

    return {
      tx,
      returnValues: tx.moveCall({
        package: this.packages.TUSKR,
        module: this.modules.Protocol,
        function: 'burn_lst',
        arguments: [
          this.sharedObject(tx, tuskrStaking),
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
    tuskrStaking = this.tuskrStaking,
    adminWitness,
    lstType = this.lstType,
  }: AddNodeArgs) {
    this.assertObjectId(tuskrStaking);

    this.assertNotZeroAddress(nodeId);

    lstType = await this.maybeFetchAndSaveLstType(lstType);

    tx.moveCall({
      package: this.packages.TUSKR,
      module: this.modules.Protocol,
      function: 'add_node',
      arguments: [
        this.sharedObject(tx, tuskrStaking),
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
    tuskrStaking = this.tuskrStaking,
    adminWitness,
    lstType = this.lstType,
  }: RemoveNodeArgs) {
    this.assertObjectId(tuskrStaking);

    this.assertNotZeroAddress(nodeId);

    lstType = await this.maybeFetchAndSaveLstType(lstType);

    tx.moveCall({
      package: this.packages.TUSKR,
      module: this.modules.Protocol,
      function: 'remove_node',
      arguments: [
        this.sharedObject(tx, tuskrStaking),
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

  public async typeFromTuskrStaking(tuskrStaking: SharedObject) {
    const tuskrStakingObject = await this.client.getObject({
      id:
        typeof tuskrStaking === 'string' ? tuskrStaking : tuskrStaking.objectId,
      options: {
        showType: true,
      },
    });

    const type = tuskrStakingObject.data?.type?.split('<')[1].slice(0, -1);

    invariant(type, 'Invalid Tuskr Staking: no type found');

    return type;
  }

  async maybeFetchAndSaveLstType(lstType?: string) {
    if (lstType) {
      return Promise.resolve(normalizeStructTag(lstType));
    }

    this.lstType = normalizeStructTag(
      await this.typeFromTuskrStaking(this.tuskrStaking)
    );
    return this.lstType;
  }
}
