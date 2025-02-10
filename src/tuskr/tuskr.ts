import { Transaction } from '@mysten/sui/transactions';
import { isValidSuiAddress, normalizeStructTag } from '@mysten/sui/utils';
import { pathOr } from 'ramda';
import invariant from 'tiny-invariant';

import { SDK } from './sdk';
import {
  AddNodeArgs,
  KeepStakeNftArgs,
  MintAfterVotesFinishedArgs,
  NewLSTArgs,
  RemoveNodeArgs,
  SdkConstructorArgs,
  SharedObject,
  SyncExchangeRateArgs,
} from './tuskr.types';

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

  public setLstType(lstType: string) {
    this.lstType = lstType;
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
      typeArguments: [normalizeStructTag(lstTypeArgument)],
    });

    return {
      tx,
      returnValues: null,
    };
  }

  public syncExchangeRate({
    tx = new Transaction(),
    lstType = this.lstType,
    tuskrStaking = this.tuskrStaking,
  }: SyncExchangeRateArgs) {
    this.assertObjectId(tuskrStaking);

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
      typeArguments: [normalizeStructTag(lstType)],
    });

    return {
      tx,
      returnValues: null,
    };
  }

  public mintAfterVotesFinished({
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
        typeArguments: [normalizeStructTag(lstType)],
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

  public addNode({
    tx = new Transaction(),
    nodeId,
    tuskrStaking = this.tuskrStaking,
    adminWitness,
    lstType = this.lstType,
  }: AddNodeArgs) {
    this.assertObjectId(tuskrStaking);

    this.assertNotZeroAddress(nodeId);

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

  public removeNode({
    tx = new Transaction(),
    nodeId,
    tuskrStaking = this.tuskrStaking,
    adminWitness,
    lstType = this.lstType,
  }: RemoveNodeArgs) {
    this.assertObjectId(tuskrStaking);

    this.assertNotZeroAddress(nodeId);

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
}
