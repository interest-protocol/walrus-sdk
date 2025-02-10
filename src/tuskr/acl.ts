import { bcs } from '@mysten/sui/bcs';
import { Transaction } from '@mysten/sui/transactions';
import { devInspectAndGetReturnValues } from '@polymedia/suitcase-core';
import invariant from 'tiny-invariant';

import { SDK } from './sdk';
import {
  DestroyAdminArgs,
  DestroySuperAdminArgs,
  FinishSuperAdminTransferArgs,
  IsAdminArgs,
  NewAdminAndTransferArgs,
  NewAdminArgs,
  RevokeAdminArgs,
  SharedObject,
  SignInArgs,
  StartSuperAdminTransferArgs,
  TuskrAclArgs,
} from './tuskr.types';

export class TuskrAclSDK extends SDK {
  superAdmin: string;
  acl: SharedObject;

  constructor(args: TuskrAclArgs) {
    invariant(args, 'You must provide an ACL object');

    const { acl, ...rest } = args;

    super(rest);

    invariant(acl, 'You must provide an ACL object');

    this.acl = acl;
  }

  public setSuperAdmin(superAdmin: string) {
    this.superAdmin = superAdmin;
    return this;
  }

  public setLstType(lstType: string) {
    this.lstType = lstType;
    return this;
  }

  public newAdmin({
    tx = new Transaction(),
    superAdmin = this.superAdmin,
    lstType = this.lstType,
  }: NewAdminArgs) {
    this.assertObjectId(superAdmin);
    invariant(lstType, 'LST type is required');

    return {
      returnValues: tx.moveCall({
        package: this.packages.TUSKR,
        module: this.modules.ACL,
        function: 'new_admin',
        typeArguments: [lstType],
        arguments: [
          this.sharedObject(tx, this.acl),
          this.ownedObject(tx, superAdmin),
        ],
      }),
      tx,
    };
  }

  public newAdminAndTransfer({
    tx = new Transaction(),
    superAdmin = this.superAdmin,
    recipient,
    lstType = this.lstType,
  }: NewAdminAndTransferArgs) {
    this.assertObjectId(superAdmin);
    this.assertNotZeroAddress(recipient);
    invariant(lstType, 'LST type is required');

    tx.moveCall({
      package: this.packages.TUSKR,
      module: this.modules.ACL,
      function: 'new_and_transfer',
      typeArguments: [lstType],
      arguments: [
        this.sharedObject(tx, this.acl),
        this.ownedObject(tx, superAdmin),
        tx.pure.address(recipient),
      ],
    });

    return {
      tx,
      returnValues: null,
    };
  }

  public signIn({
    tx = new Transaction(),
    admin,
    lstType = this.lstType,
  }: SignInArgs) {
    this.assertObjectId(admin);
    invariant(lstType, 'LST type is required');

    return {
      returnValues: tx.moveCall({
        package: this.packages.TUSKR,
        module: this.modules.ACL,
        function: 'sign_in',
        typeArguments: [lstType],
        arguments: [
          this.sharedObject(tx, this.acl),
          this.ownedObject(tx, admin),
        ],
      }),
      tx,
    };
  }

  public revokeAdmin({
    tx = new Transaction(),
    superAdmin = this.superAdmin,
    admin,
    lstType = this.lstType,
  }: RevokeAdminArgs) {
    this.assertObjectId(superAdmin);
    this.assertNotZeroAddress(admin);
    invariant(lstType, 'LST type is required');

    tx.moveCall({
      package: this.packages.TUSKR,
      module: this.modules.ACL,
      function: 'revoke',
      typeArguments: [lstType],
      arguments: [
        this.sharedObject(tx, this.acl),
        this.ownedObject(tx, superAdmin),
        tx.pure.address(admin),
      ],
    });

    return {
      tx,
      returnValues: null,
    };
  }

  public async isAdmin({ admin, lstType = this.lstType }: IsAdminArgs) {
    const tx = new Transaction();
    invariant(lstType, 'LST type is required');

    tx.moveCall({
      package: this.packages.TUSKR,
      module: this.modules.ACL,
      function: 'is_admin',
      typeArguments: [lstType],
      arguments: [this.sharedObject(tx, this.acl), tx.pure.address(admin)],
    });

    const result = await devInspectAndGetReturnValues(this.client, tx, [
      [bcs.Bool],
    ]);

    return result[0][0];
  }

  public destroyAdmin({
    tx = new Transaction(),
    admin,
    lstType = this.lstType,
  }: DestroyAdminArgs) {
    this.assertObjectId(admin);
    invariant(lstType, 'LST type is required');

    tx.moveCall({
      package: this.packages.TUSKR,
      module: this.modules.ACL,
      function: 'destroy_admin',
      typeArguments: [lstType],
      arguments: [this.sharedObject(tx, this.acl), this.ownedObject(tx, admin)],
    });

    return {
      tx,
      returnValues: null,
    };
  }

  public startSuperAdminTransfer({
    tx = new Transaction(),
    superAdmin = this.superAdmin,
    recipient,
    lstType = this.lstType,
  }: StartSuperAdminTransferArgs) {
    this.assertObjectId(superAdmin);
    this.assertNotZeroAddress(recipient);
    invariant(lstType, 'LST type is required');

    tx.moveCall({
      package: this.packages.TUSKR,
      module: this.modules.ACL,
      function: 'start_transfer',
      typeArguments: [lstType],
      arguments: [this.ownedObject(tx, superAdmin), tx.pure.address(recipient)],
    });

    return {
      tx,
      returnValues: null,
    };
  }

  public finishSuperAdminTransfer({
    tx = new Transaction(),
    superAdmin = this.superAdmin,
    lstType = this.lstType,
  }: FinishSuperAdminTransferArgs) {
    this.assertObjectId(superAdmin);
    invariant(lstType, 'LST type is required');
    tx.moveCall({
      package: this.packages.TUSKR,
      module: this.modules.ACL,
      function: 'finish_transfer',
      typeArguments: [lstType],
      arguments: [this.ownedObject(tx, superAdmin)],
    });

    return {
      tx,
      returnValues: null,
    };
  }

  public destroySuperAdmin({
    tx = new Transaction(),
    superAdmin = this.superAdmin,
    lstType = this.lstType,
  }: DestroySuperAdminArgs) {
    this.assertObjectId(superAdmin);
    invariant(lstType, 'LST type is required');

    tx.moveCall({
      package: this.packages.TUSKR,
      module: this.modules.ACL,
      function: 'destroy',
      typeArguments: [lstType],
      arguments: [this.ownedObject(tx, superAdmin)],
    });

    return {
      tx,
      returnValues: null,
    };
  }
}
