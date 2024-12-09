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

export enum Progress {
  BONDING = 'bonding',
  MIGRATING = 'migrating',
  MIGRATED = 'migrated',
}

export interface MaybeTx {
  tx?: Transaction;
}

export type Package = Record<
  'MEMEZ_FUN' | 'MEMEZ_MIGRATOR' | 'ACL' | 'VESTING',
  string
>;

export type SharedObject = Extract<
  CallArg,
  {
    Object: unknown;
  }
>;

export interface ShareObjectValueMap {
  IMMUT: SharedObject;
  MUT: SharedObject;
}

export type MemezFunSharedObjects = Record<
  'ACL' | 'MIGRATOR_LIST' | 'VERSION' | 'CONFIG',
  ShareObjectValueMap
>;

export type OwnedObjects = Record<
  | 'SUPER_ADMIN'
  | 'ACL_UPGRADE_CAP'
  | 'VESTING_UPGRADE_CAP'
  | 'MEMEZ_FUN_UPGRADE_CAP'
  | 'MEMEZ_MIGRATOR_UPGRADE_CAP'
  | 'ADMIN',
  string
>;

export interface Balance {
  type: string;
  amount: bigint;
}

export interface SignInArgs extends MaybeTx {
  admin: ObjectInput;
}

export interface AclConstructorArgs {
  fullNodeUrl?: string;
  package: string;
  aclSharedObjectMap: ShareObjectValueMap;
  network?: Network;
}

export interface MemezFunConstructorArgs {
  fullNodeUrl?: string;
  packages?: Package;
  sharedObjects?: MemezFunSharedObjects;
  network?: Network;
}

export interface NewPumpPoolArgs extends MaybeTx {
  memeCoinTreasuryCap: ObjectInput;
  creationSuiFee?: ObjectInput;
  totalSupply?: U64;
  useTokenStandard?: boolean;
  firstPurchase?: ObjectInput;
  metadata?: Record<string, string>;
  developer: string;
  configurationKey: string;
  migrationWitness: string;
  memeCoinType: string;
}

interface MemezPool {
  objectId: string;
  poolType: string;
  memeCoinType: string;
  useTokenStandard: boolean;
  ipxMemeCoinTreasury: string;
  metadata: Record<string, string>;
  migrationWitness: string;
  progress: Progress;
}

export interface MemezPumpPool extends MemezPool {
  devPurchase: Balance;
  liquidityProvision: Balance;
  migrationFee: Balance;
  virtualLiquidity: bigint;
  targetSuiLiquidity: bigint;
  suiBalance: Balance;
  memeBalance: Balance;
  burnTax: number;
  swapFee: number;
}

export interface NewAdminArgs extends MaybeTx {
  superAdmin: ObjectInput;
}

export interface NewAdminAndTransferArgs extends MaybeTx {
  superAdmin: ObjectInput;
  recipient: string;
}

export interface RevokeAdminArgs extends MaybeTx {
  superAdmin: ObjectInput;
  admin: string;
}

export interface DestroyAdminArgs extends MaybeTx {
  admin: ObjectInput;
}

export interface DestroySuperAdminArgs extends MaybeTx {
  superAdmin: ObjectInput;
}

export interface StartSuperAdminTransferArgs extends MaybeTx {
  superAdmin: ObjectInput;
  recipient: string;
}

export interface FinishSuperAdminTransferArgs extends MaybeTx {
  superAdmin: ObjectInput;
}

export interface IsAdminArgs {
  admin: string;
}
