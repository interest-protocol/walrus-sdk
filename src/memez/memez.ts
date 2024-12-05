import { SuiClient } from '@mysten/sui/client';
import invariant from 'tiny-invariant';

import {
  MemezFunConstructorArgs,
  Network,
  Package,
  SharedObjects,
} from './memez.types';
import { getDefaultArgs } from './utils';

export class MemezFunSDK {
  #client: SuiClient;
  #packages: Package;
  #sharedObjects: SharedObjects;
  #network: Network;

  constructor(args: MemezFunConstructorArgs | undefined | null = null) {
    const data = {
      ...getDefaultArgs(),
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
    this.#packages = data.packages;
    this.#sharedObjects = data.sharedObjects;
    this.#client = new SuiClient({ url: data.fullNodeUrl });
  }
}
