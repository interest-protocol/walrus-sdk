import { SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import invariant from 'tiny-invariant';

import { Modules } from './constants';
import {
  MemezFunSharedObjects,
  Network,
  ObjectInput,
  Package,
  SdkConstructorArgs,
  SignInArgs,
} from './memez.types';
import { getsSdkDefaultArgs, parseMemezPool } from './utils';

export class SDK {
  packages: Package;
  sharedObjects: MemezFunSharedObjects;
  modules = Modules;

  #network: Network;
  #rpcUrl: string;

  client: SuiClient;

  constructor(args: SdkConstructorArgs | undefined | null = null) {
    const data = {
      ...getsSdkDefaultArgs(),
      ...args,
    };

    invariant(
      data.fullNodeUrl,
      'You must provide fullNodeUrl for this specific network'
    );

    invariant(
      data.packages,
      'You must provide packages for this specific network'
    );

    invariant(
      data.sharedObjects,
      'You must provide sharedObjects for this specific network'
    );

    invariant(
      data.network,
      'You must provide network for this specific network'
    );

    this.#network = data.network;
    this.#rpcUrl = data.fullNodeUrl;
    this.packages = data.packages;
    this.sharedObjects = data.sharedObjects;
    this.client = new SuiClient({ url: data.fullNodeUrl });
  }

  public networkConfig() {
    return {
      rpcUrl: this.#rpcUrl,
      network: this.#network,
    };
  }

  signIn({ tx = new Transaction(), admin }: SignInArgs) {
    const authWitness = tx.moveCall({
      package: this.packages.ACL,
      module: this.modules.ACL,
      function: 'sign_in',
      arguments: [tx.object(this.sharedObjects.ACL.IMMUT), tx.object(admin)],
    });

    return {
      tx,
      authWitness,
    };
  }

  getVersion(tx: Transaction) {
    return tx.moveCall({
      package: this.packages.MEMEZ_FUN,
      module: this.modules.VERSION,
      function: 'get_version',
      arguments: [tx.object(this.sharedObjects.VERSION.IMMUT)],
    });
  }

  public async getPumpPool(pumpId: string) {
    const suiObject = await this.client.getObject({
      id: pumpId,
      options: { showContent: true },
    });

    return parseMemezPool(this.client, suiObject);
  }

  object(tx: Transaction, obj: ObjectInput) {
    return typeof obj === 'string' ? tx.object(obj) : obj;
  }
}
