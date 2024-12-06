import {
  CallArg,
  Transaction,
  TransactionObjectArgument,
} from '@mysten/sui/transactions';

type ObjectInput = TransactionObjectArgument | string;

type U64 = string | bigint | number;

export enum Network {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export interface MaybeTx {
  tx?: Transaction;
}

export enum ConfigurationKeys {
  RECRD = '',
}

export enum MigrationWitnesses {
  CETUS = '',
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

export interface NewPumpPoolArgs extends MaybeTx {
  memeCoinTreasuryCap: ObjectInput;
  creationSuiFee: ObjectInput;
  totalSupply: U64;
  useTokenStandard: boolean;
  firstPurchase: ObjectInput;
  metadata: Record<string, string>;
  developer: string;
  configurationKey: ConfigurationKeys;
  migrationWitness: MigrationWitnesses;
  memeCoinType: string;
}
