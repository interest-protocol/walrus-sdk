import {
  CallArg,
  Transaction,
  TransactionArgument,
} from '@mysten/sui/transactions';

import type { WITNESSES } from './constants';

export enum TimeScale {
  Seconds,
  Minutes,
  Hour,
  Day,
  Week,
  Month,
}

interface MaybeTx {
  tx?: Transaction;
}

export type Package = Record<
  'DCA' | 'ADAPTERS' | 'DCA_V2' | 'ADAPTERS_V2' | 'DCA_V3',
  string
>;

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

export interface DCAConstructorArgs {
  fullNodeUrl?: string;
  packages?: Package;
  sharedObjects?: SharedObjects;
}

interface DcaArgs {
  coinInType: string;
  coinOutType: string;
  dca: string;
}

type WitnessWithVersion = typeof WITNESSES;

export interface NewArgs extends MaybeTx {
  coinInType: string;
  coinOutType: string;
  coinIn: TransactionArgument;
  timeScale: TimeScale;
  every: number;
  numberOfOrders: number;
  max?: bigint;
  min?: bigint;
  fee?: number;
  delegatee: string;
  witnessType: WitnessWithVersion[keyof WitnessWithVersion];
}

export interface NestedResult {}

export interface IsActiveArgs extends DcaArgs {}

export interface StopArgs extends DcaArgs {}

export interface DestroyArgs extends DcaArgs {}

export interface SwapWhitelistStartArgs extends DcaArgs, MaybeTx {}

export interface SwapWhitelistEndArgs extends DcaArgs, MaybeTx {
  coinOut: TransactionArgument;
  request: NestedResult;
}

export interface DCA {
  objectId: string;
  type: string;
  owner: string;
  v1?: boolean;
  delegatee: string;
  start: bigint;
  lastTrade: bigint;
  every: number;
  remainingOrders: number;
  timeScale: TimeScale;
  cooldown: bigint;
  coinInBalance: bigint;
  amountPerTrade: bigint;
  min: bigint;
  max: bigint;
  active: boolean;
  fee: bigint;
  totalOwnerOutput: bigint;
  totalDelegateeOutput: bigint;
  witness: string;
}
