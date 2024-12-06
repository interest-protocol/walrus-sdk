import { SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import {
  isValidSuiAddress,
  normalizeStructTag,
  SUI_FRAMEWORK_ADDRESS,
  SUI_TYPE_ARG,
} from '@mysten/sui/utils';
import invariant from 'tiny-invariant';

import { Modules } from './constants';
import {
  MemezFunConstructorArgs,
  Network,
  NewPumpPoolArgs,
  Package,
  SharedObjects,
} from './memez.types';
import { getDefaultArgs } from './utils';

export class MemezFunSDK {
  #packages: Package;
  #sharedObjects: SharedObjects;
  #modules = Modules;

  #defaultSupply = 1_000_000_000_000_000_000n;

  #network: Network;
  #rpcUrl: string;
  #client: SuiClient;

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
    this.#rpcUrl = data.fullNodeUrl;
    this.#packages = data.packages;
    this.#sharedObjects = data.sharedObjects;
    this.#client = new SuiClient({ url: data.fullNodeUrl });
  }

  public newPumpPool({
    tx = new Transaction(),
    creationSuiFee = this.#zeroSuiCoin(tx),
    memeCoinTreasuryCap,
    totalSupply = this.#defaultSupply,
    useTokenStandard = false,
    firstPurchase = this.#zeroSuiCoin(tx),
    metadata = {},
    developer,
    configurationKey,
    migrationWitness,
    memeCoinType,
  }: NewPumpPoolArgs) {
    invariant(BigInt(totalSupply) > 0n, 'totalSupply must be greater than 0');
    invariant(
      isValidSuiAddress(developer),
      'developer must be a valid Sui address'
    );

    return tx.moveCall({
      package: this.#packages.MEMEZ_FUN,
      module: this.#modules.PUMP,
      function: 'new',
      arguments: [
        tx.object(this.#sharedObjects.CONFIG),
        tx.object(this.#sharedObjects.MIGRATOR_LIST),
        tx.object(memeCoinTreasuryCap),
        tx.object(creationSuiFee),
        tx.pure.u64(totalSupply),
        tx.pure.bool(useTokenStandard),
        tx.object(firstPurchase),
        tx.pure.vector('string', Object.keys(metadata)),
        tx.pure.vector('string', Object.values(metadata)),
        tx.pure.address(developer),
        this.#getVersion(tx),
      ],
      typeArguments: [
        memeCoinType,
        normalizeStructTag(configurationKey),
        normalizeStructTag(migrationWitness),
      ],
    });
  }

  public networkConfig() {
    return {
      rpcUrl: this.#rpcUrl,
      network: this.#network,
    };
  }

  #getVersion(tx: Transaction) {
    return tx.moveCall({
      package: this.#packages.MEMEZ_FUN,
      module: this.#modules.VERSION,
      function: 'get_version',
      arguments: [tx.object(this.#sharedObjects.VERSION)],
    });
  }

  #zeroSuiCoin(tx: Transaction) {
    return tx.moveCall({
      package: SUI_FRAMEWORK_ADDRESS,
      module: 'coin',
      function: 'zero',
      typeArguments: [SUI_TYPE_ARG],
    });
  }
}
