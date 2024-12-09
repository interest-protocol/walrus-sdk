import { bcs } from '@mysten/sui/bcs';
import { SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { isValidSuiAddress } from '@mysten/sui/utils';
import { devInspectAndGetReturnValues } from '@polymedia/suitcase-core';
import invariant from 'tiny-invariant';

import { Modules } from './constants';
import {
  AclConstructorArgs,
  DestroyAdminArgs,
  DestroySuperAdminArgs,
  FinishSuperAdminTransferArgs,
  IsAdminArgs,
  Network,
  NewAdminAndTransferArgs,
  NewAdminArgs,
  RevokeAdminArgs,
  SharedObject,
  StartSuperAdminTransferArgs,
} from './memez.types';
import { getACLDefaultArgs } from './utils';

export class AclSDK {
  #package: string;
  #modules = Modules;

  #ACL_MUT: SharedObject;
  #ACL_IMMUT: SharedObject;

  #network: Network;
  #rpcUrl: string;
  #client: SuiClient;

  constructor(args: AclConstructorArgs | undefined | null = null) {
    const data = {
      ...getACLDefaultArgs(),
      ...args,
    };

    invariant(
      data.fullNodeUrl,
      'You must provide fullNodeUrl for this specific network'
    );

    invariant(
      data.package,
      'You must provide package for this specific network'
    );

    invariant(
      data.aclSharedObjectMap,
      'You must provide aclSharedObjectMap for this specific network'
    );

    invariant(
      data.network,
      'You must provide network for this specific network'
    );

    this.#network = data.network;
    this.#rpcUrl = data.fullNodeUrl;
    this.#package = data.package;
    this.#ACL_MUT = data.aclSharedObjectMap.MUT;
    this.#ACL_IMMUT = data.aclSharedObjectMap.IMMUT;
    this.#client = new SuiClient({ url: data.fullNodeUrl });
  }

  public newAdmin({ tx = new Transaction(), superAdmin }: NewAdminArgs) {
    const admin = tx.moveCall({
      package: this.#package,
      module: this.#modules.ACL,
      function: 'new',
      arguments: [tx.object(this.#ACL_MUT), tx.object(superAdmin)],
    });

    return {
      admin,
      tx,
    };
  }

  public newAdminAndTransfer({
    tx = new Transaction(),
    superAdmin,
    recipient,
  }: NewAdminAndTransferArgs) {
    invariant(
      isValidSuiAddress(recipient),
      'recipient must be a valid Sui address'
    );

    tx.moveCall({
      package: this.#package,
      module: this.#modules.ACL,
      function: 'new_and_transfer',
      arguments: [
        tx.object(this.#ACL_MUT),
        tx.object(superAdmin),
        tx.pure.address(recipient),
      ],
    });

    return tx;
  }

  public revokeAdmin({
    tx = new Transaction(),
    superAdmin,
    admin,
  }: RevokeAdminArgs) {
    tx.moveCall({
      package: this.#package,
      module: this.#modules.ACL,
      function: 'revoke',
      arguments: [
        tx.object(this.#ACL_MUT),
        tx.object(superAdmin),
        tx.pure.address(admin),
      ],
    });

    return tx;
  }

  public destroyAdmin({ tx = new Transaction(), admin }: DestroyAdminArgs) {
    tx.moveCall({
      package: this.#package,
      module: this.#modules.ACL,
      function: 'destroy_admin',
      arguments: [tx.object(this.#ACL_MUT), tx.object(admin)],
    });

    return tx;
  }

  public destroySuperAdmin({
    tx = new Transaction(),
    superAdmin,
  }: DestroySuperAdminArgs) {
    tx.moveCall({
      package: this.#package,
      module: this.#modules.ACL,
      function: 'destroy',
      arguments: [tx.object(this.#ACL_MUT), tx.object(superAdmin)],
    });

    return tx;
  }

  public startSuperAdminTransfer({
    tx = new Transaction(),
    superAdmin,
    recipient,
  }: StartSuperAdminTransferArgs) {
    tx.moveCall({
      package: this.#package,
      module: this.#modules.ACL,
      function: 'start_transfer',
      arguments: [tx.object(superAdmin), tx.pure.address(recipient)],
    });

    return tx;
  }

  public finishSuperAdminTransfer({
    tx = new Transaction(),
    superAdmin,
  }: FinishSuperAdminTransferArgs) {
    tx.moveCall({
      package: this.#package,
      module: this.#modules.ACL,
      function: 'finish_transfer',
      arguments: [tx.object(superAdmin)],
    });

    return tx;
  }

  public async isAdmin({ admin }: IsAdminArgs) {
    const tx = new Transaction();

    tx.moveCall({
      package: this.#package,
      module: this.#modules.ACL,
      function: 'is_admin',
      arguments: [tx.object(this.#ACL_MUT), tx.pure.address(admin)],
    });

    const result = await devInspectAndGetReturnValues(this.#client, tx, [
      [bcs.Bool],
    ]);

    return result[0][0];
  }
}
