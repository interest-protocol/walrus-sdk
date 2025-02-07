import {
  CallArg,
  ObjectRef,
  Transaction,
  TransactionObjectArgument,
  // TransactionResult,
} from '@mysten/sui/transactions';

export type ObjectInput = TransactionObjectArgument | string | ObjectRef;

// type U64 = string | bigint | number;

export enum Network {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export interface MaybeTx {
  tx?: Transaction;
}

export type Package = Record<
  'WW' | 'TUSKR' | 'TUSKR_HOOKS' | 'WAL' | 'WALRUS',
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

export type SharedObjects = Record<
  'WW_COIN_METADATA' | 'TUSKR_AV' | 'TUSKR_ACL' | 'WALRUS_STAKING',
  ShareObjectValueMap
>;

export type OwnedObjects = Record<
  | 'WW_UPGRADE_CAP'
  | 'TUSKR_UPGRADE_CAP'
  | 'TUSKR_SUPER_ADMIN'
  | 'TUSKR_PUBLISHER'
  | 'TUSKR_STAKE_NFT_PUBLISHER'
  | 'TUSKR_STAKE_NFT_DISPLAY'
  | 'TUSKR_UNSTAKE_NFT_PUBLISHER'
  | 'TUSKR_UNSTAKE_NFT_DISPLAY',
  string
>;

export interface SignInArgs extends MaybeTx {
  admin: ObjectInput;
}

export interface SdkConstructorArgs {
  fullNodeUrl?: string;
  packages?: Package;
  sharedObjects?: SharedObjects;
  network?: Network;
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

export interface NewLSTArgs extends MaybeTx {
  treasuryCap: ObjectInput;
  coinMetadata: ObjectInput;
  admin: ObjectInput;
  superAdminRecipient: string;
  lstTypeArgument: string;
}
