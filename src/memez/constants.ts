import { Inputs } from '@mysten/sui/transactions';

import { Network, OwnedObjects, Package, SharedObjects } from './memez.types';

export const PACKAGES: Record<Network, Package> = {
  [Network.Mainnet]: {
    MEMEZ_FUN: '0x0',
  },
  [Network.Testnet]: {
    MEMEZ_FUN: '0x0',
  },
} as const;

export const OWNED_OBJECTS: Record<Network, OwnedObjects> = {
  [Network.Mainnet]: {},
  [Network.Testnet]: {},
} as const;

export const SHARED_OBJECTS: SharedObjects = {
  TRADE_POLICY_MUT: Inputs.SharedObjectRef({
    objectId:
      '0x3bf87821085b4bf6a0574dcee1de533c4296bf1b624dab1984f3a92df4ea28fd',
    initialSharedVersion: '330857975',
    mutable: true,
  }) as ReturnType<typeof Inputs.SharedObjectRef>,
  TRADE_POLICY: Inputs.SharedObjectRef({
    objectId:
      '0x3bf87821085b4bf6a0574dcee1de533c4296bf1b624dab1984f3a92df4ea28fd',
    initialSharedVersion: '330857975',
    mutable: false,
  }) as ReturnType<typeof Inputs.SharedObjectRef>,
  WHITELIST_MUT: Inputs.SharedObjectRef({
    objectId:
      '0xe8c8d4c8fd91962b77c8240bccaa2e69ab513ccce77611adaf872464abf453a4',
    initialSharedVersion: '330857976',
    mutable: true,
  }) as ReturnType<typeof Inputs.SharedObjectRef>,
  WHITELIST: Inputs.SharedObjectRef({
    objectId:
      '0xe8c8d4c8fd91962b77c8240bccaa2e69ab513ccce77611adaf872464abf453a4',
    initialSharedVersion: '330857976',
    mutable: false,
  }) as ReturnType<typeof Inputs.SharedObjectRef>,
  SETTINGS: Inputs.SharedObjectRef({
    objectId:
      '0x01fac821aeece5c5203560fb6ba7c4f01401b774e54994afc5b11c4172190111',
    initialSharedVersion: '330857975',
    mutable: false,
  }) as ReturnType<typeof Inputs.SharedObjectRef>,
  SETTINGS_MUT: Inputs.SharedObjectRef({
    objectId:
      '0x01fac821aeece5c5203560fb6ba7c4f01401b774e54994afc5b11c4172190111',
    initialSharedVersion: '330857975',
    mutable: true,
  }) as ReturnType<typeof Inputs.SharedObjectRef>,
} as const;
