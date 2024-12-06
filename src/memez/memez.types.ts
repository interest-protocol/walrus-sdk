import { CallArg, Transaction } from '@mysten/sui/transactions';

export enum Network {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export interface MaybeTx {
  tx?: Transaction;
}

export type Package = Record<
  'MEMEZ_FUN' | 'MEMEZ_MIGRATOR' | 'ACL' | 'VESTING',
  string
>;

export type SharedObjects = Record<
  | 'ACL_MUT'
  | 'ACL'
  | 'MIGRATOR_LIST_MUT'
  | 'MIGRATOR_LIST'
  | 'VERSION'
  | 'VERSION_MUT'
  | 'CONFIG'
  | 'CONFIG_MUT',
  Extract<
    CallArg,
    {
      Object: unknown;
    }
  >
>;

export type OwnedObjects = Record<
  | 'SUPER_ADMIN'
  | 'ACL_UPGRADE_CAP'
  | 'VESTING_UPGRADE_CAP'
  | 'MEMEZ_FUN_UPGRADE_CAP'
  | 'MEMEZ_MIGRATOR_UPGRADE_CAP',
  string
>;

export interface MemezFunConstructorArgs {
  fullNodeUrl?: string;
  packages?: Package;
  sharedObjects?: SharedObjects;
  network?: Network;
}
