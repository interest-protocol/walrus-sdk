import { CallArg, Transaction } from '@mysten/sui/transactions';

export enum Network {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export interface MaybeTx {
  tx?: Transaction;
}

export type Package = Record<'MEMEZ_FUN', string>;

export type SharedObjects = Record<
  | 'TRADE_POLICY_MUT'
  | 'TRADE_POLICY'
  | 'WHITELIST_MUT'
  | 'WHITELIST'
  | 'SETTINGS_MUT'
  | 'SETTINGS',
  Extract<
    CallArg,
    {
      Object: unknown;
    }
  >
>;

export type OwnedObjects = Record<string, string>;

export interface MemezFunConstructorArgs {
  fullNodeUrl?: string;
  packages?: Package;
  sharedObjects?: SharedObjects;
  network?: Network;
}
