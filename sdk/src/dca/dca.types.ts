import {
  CallArg,
  Transaction,
  TransactionArgument,
} from "@mysten/sui/transactions";

import type { WITNESSES } from "./constants";

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

export type Network = "mainnet" | "testnet";

export type Package = Record<Network, Record<"DCA" | "ADAPTERS", string>>;

export type SharedObjects = Record<
  Network,
  Record<
    | "TRADE_POLICY_MUT"
    | "TRADE_POLICY"
    | "WHITELIST_MUT"
    | "WHITELIST"
    | "SETTINGS_MUT"
    | "SETTINGS",
    Extract<
      CallArg,
      {
        Object: unknown;
      }
    >
  >
>;

export interface DCAConstructorArgs {
  network: Network;
  fullNodeUrl?: string;
  packages?: Package[Network];
  sharedObjects?: SharedObjects[Network];
}

interface DcaArgs {
  coinInType: string;
  coinOutType: string;
  dca: string;
}

type WitnessWithNetwork = (typeof WITNESSES)[Network];

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
  witnessType: WitnessWithNetwork[keyof WitnessWithNetwork];
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
