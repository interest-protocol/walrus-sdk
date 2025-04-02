import {
  ObjectRef,
  Transaction,
  TransactionObjectArgument,
} from '@mysten/sui/transactions';
export type U64 = string | bigint | number;

export type OwnedObject = TransactionObjectArgument | string | ObjectRef;

export interface GetMsUntilNextEpochArgs {
  currentEpoch: number;
  epochDurationMs: number;
  firstEpochStartTimestamp: number;
}

export interface MaybeTx {
  tx?: Transaction;
}

export interface SdkConstructorArgs {
  fullNodeUrl?: string;
}

export enum StakedWalState {
  Staked = 'Staked',
  Withdrawing = 'Withdrawing',
}

export interface StakedWal {
  objectId: string;
  digest?: string;
  version?: string;
  nodeId: string;
  principal: bigint;
  activationEpoch: number;
  state: StakedWalState;
  withdrawingEpoch: number | null;
}

export interface JoinStakedWalArgs extends MaybeTx {
  from: OwnedObject;
  other: OwnedObject;
}

export interface SplitStakedWalArgs extends MaybeTx {
  from: OwnedObject;
  amount: U64;
}
