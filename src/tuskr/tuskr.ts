import { Transaction } from '@mysten/sui/transactions';
import { isValidSuiAddress, normalizeStructTag } from '@mysten/sui/utils';
import { pathOr } from 'ramda';
import invariant from 'tiny-invariant';

import { SDK } from './sdk';
import { NewLSTArgs, SdkConstructorArgs } from './tuskr.types';

export class TuskrSDK extends SDK {
  tuskrStaking: string;
  tuskrAdmin: string;

  constructor(args: SdkConstructorArgs | undefined | null = null) {
    super(args);
  }

  public setTuskrStaking(tuskrStaking: string) {
    this.tuskrStaking = tuskrStaking;
  }

  public setTuskrAdmin(tuskrAdmin: string) {
    this.tuskrAdmin = tuskrAdmin;
  }

  public async newLST({
    tx = new Transaction(),
    treasuryCap,
    coinMetadata,
    tuskrAdmin = this.tuskrAdmin,
    superAdminRecipient,
  }: NewLSTArgs) {
    this.assertObjectId(treasuryCap);
    this.assertObjectId(coinMetadata);
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
      treasuryCap
    );

    invariant(
      treasuryCapTotalSupply === 0,
      'TreasuryCap Error: Total Supply is not 0 or not found'
    );

    const lstTypeArgument = treasuryCapObject.data?.type
      ?.split('<')[1]
      .slice(0, -1);

    invariant(lstTypeArgument, 'Invalid TreasuryCap: no memeCoinType found');

    tx.moveCall({
      package: this.packages.TUSKR,
      module: this.modules.Protocol,
      function: 'new',
      arguments: [
        this.sharedObject(tx, this.sharedObjects.WALRUS_STAKING.IMMUT),
        this.ownedObject(tx, treasuryCap),
        this.sharedObject(tx, coinMetadata),
        this.ownedObject(tx, tuskrAdmin),
        tx.pure.address(superAdminRecipient),
        this.getAllowedVersions(tx),
      ],
      typeArguments: [normalizeStructTag(lstTypeArgument)],
    });
  }
}
