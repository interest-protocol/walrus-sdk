import {
  ObjectRef,
  Transaction,
  TransactionObjectArgument,
  TransactionResult,
} from '@mysten/sui/transactions';

import type { TYPES } from './constants';

interface SharedObjectRef {
  objectId: string;
  mutable: boolean;
  initialSharedVersion: number | string;
}

export type OwnedObject = TransactionObjectArgument | string | ObjectRef;

export type SharedObject = string | SharedObjectRef;

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

export type SharedObjects = Record<
  | 'WW_COIN_METADATA'
  | 'TUSKR_AV'
  | 'TUSKR_ACL'
  | 'WALRUS_STAKING'
  | 'WW_ACL'
  | 'WW_STAKING',
  ({ mutable }: { mutable: boolean }) => SharedObjectRef
>;

export type OwnedObjects = Record<
  | 'WW_UPGRADE_CAP'
  | 'WW_SUPER_ADMIN'
  | 'TUSKR_UPGRADE_CAP'
  | 'TUSKR_SUPER_ADMIN'
  | 'TUSKR_PUBLISHER'
  | 'TUSKR_STAKE_NFT_PUBLISHER'
  | 'TUSKR_STAKE_NFT_DISPLAY'
  | 'HOOKS_UPGRADE_CAP',
  string
>;

export interface SignInArgs extends MaybeTx {
  admin: OwnedObject;
}

export interface SdkConstructorArgs {
  fullNodeUrl?: string;
  packages?: Package;
  sharedObjects?: SharedObjects;
  network?: Network;
  types?: (typeof TYPES)[keyof typeof TYPES];
}

// === TUSKR LST START ===

export interface NewLSTArgs extends MaybeTx {
  treasuryCap: string | ObjectRef;
  tuskrAdmin?: OwnedObject;
  superAdminRecipient: string;
  adminWitness: TransactionResult;
}

export interface MintAfterVotesFinishedArgs extends MaybeTx {
  walCoin: OwnedObject;
  nodeId: string;
  tuskrStaking?: string;
  lstType?: string;
}

export interface AddNodeArgs extends MaybeTx {
  nodeId: string;
  tuskrStaking?: string;
  adminWitness: TransactionResult;
  lstType?: string;
}

export interface RemoveNodeArgs extends MaybeTx {
  nodeId: string;
  tuskrStaking?: string;
  adminWitness: TransactionResult;
  lstType?: string;
}

export interface KeepStakeNftArgs extends MaybeTx {
  nft: TransactionResult;
}

export interface SyncExchangeRateArgs extends MaybeTx {
  lstType: string;
  tuskrStaking: string;
}

// === TUSKR LST END ===

// === ACL Types Start ===

export type TuskrAclArgs = (SdkConstructorArgs | null | undefined) & {
  acl: SharedObject;
};

export interface NewAdminArgs extends MaybeTx {
  superAdmin?: OwnedObject;
  lstType?: string;
}

export interface NewAdminAndTransferArgs extends MaybeTx {
  superAdmin?: OwnedObject;
  recipient: string;
  lstType?: string;
}

export interface RevokeAdminArgs extends MaybeTx {
  superAdmin?: OwnedObject;
  admin: string;
  lstType?: string;
}

export interface SignInArgs extends MaybeTx {
  admin: OwnedObject;
  lstType?: string;
}

export interface DestroyAdminArgs extends MaybeTx {
  admin: OwnedObject;
  lstType?: string;
}

export interface DestroySuperAdminArgs extends MaybeTx {
  superAdmin?: OwnedObject;
  lstType?: string;
}

export interface StartSuperAdminTransferArgs extends MaybeTx {
  superAdmin?: OwnedObject;
  recipient: string;
  lstType?: string;
}

export interface FinishSuperAdminTransferArgs extends MaybeTx {
  superAdmin?: OwnedObject;
  lstType?: string;
}

export interface IsAdminArgs {
  admin: string;
  lstType?: string;
}

// === ACL Types End ===
