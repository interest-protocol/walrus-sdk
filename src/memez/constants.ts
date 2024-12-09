import { Inputs } from '@mysten/sui/transactions';
import { normalizeSuiAddress, normalizeSuiObjectId } from '@mysten/sui/utils';

import {
  MemezFunSharedObjects,
  Network,
  OwnedObjects,
  Package,
} from './memez.types';

export enum Modules {
  FUN = 'memez_fun',
  ACL = 'acl',
  MIGRATOR_LIST = 'memez_migrator_list',
  PUMP = 'memez_pump',
  CONFIG = 'memez_config',
  VERSION = 'memez_version',
}

export const PACKAGES: Record<Network, Package> = {
  [Network.Mainnet]: {
    MEMEZ_FUN: normalizeSuiAddress('0x0'),
    ACL: normalizeSuiAddress('0x0'),
    VESTING: normalizeSuiAddress('0x0'),
    MEMEZ_MIGRATOR: normalizeSuiAddress('0x0'),
  },
  [Network.Testnet]: {
    MEMEZ_FUN: normalizeSuiAddress(
      '0x3996f5555301c5431b04696aeb762d6e17ab067d1e81232c5eddc2cc3907d843'
    ),
    ACL: normalizeSuiAddress(
      '0xc201002dcf8e7b1e1850e2420980d5a7aae14bdfabc7b1e186c9a0ee749aa384'
    ),
    VESTING: normalizeSuiAddress(
      '0x8f5393f347cdc7afb58bedec29853904c8e625fd5a23109563f851f127bce450'
    ),
    MEMEZ_MIGRATOR: normalizeSuiAddress(
      '0xca0cd5448f4876f24d3e93c57637bd868ac6aec0d8bb69f658272d67a4ebf35f'
    ),
  },
} as const;

export const OWNED_OBJECTS: Record<Network, OwnedObjects> = {
  [Network.Mainnet]: {
    SUPER_ADMIN: normalizeSuiObjectId('0x0'),
    ACL_UPGRADE_CAP: normalizeSuiObjectId('0x0'),
    VESTING_UPGRADE_CAP: normalizeSuiObjectId('0x0'),
    MEMEZ_FUN_UPGRADE_CAP: normalizeSuiObjectId('0x0'),
    MEMEZ_MIGRATOR_UPGRADE_CAP: normalizeSuiObjectId('0x0'),
    ADMIN: normalizeSuiObjectId('0x0'),
  },
  [Network.Testnet]: {
    SUPER_ADMIN: normalizeSuiObjectId(
      '0xb5b21c0aaa1819cbcb6beeb4c26be8df6f30ea9f9e8a52dd9c177432169284f1'
    ),
    ACL_UPGRADE_CAP: normalizeSuiObjectId(
      '0xc84d51f0b31e0476e03f14e09d18f7a62d8792ce224452b78189cc2544a8cda9'
    ),
    VESTING_UPGRADE_CAP: normalizeSuiObjectId(
      '0xedb18a7b96717cc2f18bc6ff88db55cdd7321aebe83b8572578ae6c5f795b80c'
    ),
    MEMEZ_FUN_UPGRADE_CAP: normalizeSuiObjectId(
      '0xf4fbfa06eca18e45695cd02412d758c4990f38e22bcc9e6d23a6fa337cb5b603'
    ),
    MEMEZ_MIGRATOR_UPGRADE_CAP: normalizeSuiObjectId(
      '0x0806f525f06e0fcf0f79baeabcf4c49de2be292b87f59c9fabf59fbf779fe2f4'
    ),
    ADMIN: normalizeSuiObjectId(
      '0x0586b3daa2a43ee9194254554ca52db26b0fd6bb09591a7edc3960ffa6198164'
    ),
  },
} as const;

export const SHARED_OBJECTS: Record<Network, MemezFunSharedObjects> = {
  [Network.Mainnet]: {
    ACL: {
      IMMUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId('0x0'),
        initialSharedVersion: '1',
        mutable: false,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
      MUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId('0x0'),
        initialSharedVersion: '1',
        mutable: true,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
    },
    VERSION: {
      IMMUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId('0x0'),
        initialSharedVersion: '1',
        mutable: false,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
      MUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId('0x0'),
        initialSharedVersion: '1',
        mutable: true,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
    },
    CONFIG: {
      IMMUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId('0x0'),
        initialSharedVersion: '1',
        mutable: false,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
      MUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId('0x0'),
        initialSharedVersion: '1',
        mutable: true,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
    },
    MIGRATOR_LIST: {
      IMMUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId('0x0'),
        initialSharedVersion: '1',
        mutable: false,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
      MUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId('0x0'),
        initialSharedVersion: '1',
        mutable: true,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
    },
  } as const,
  [Network.Testnet]: {
    ACL: {
      IMMUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0x27c31f7aa73c46084fd2aa6cbef85f959e9e1027b69cbdd9a0ed6fdd0bf37b38'
        ),
        initialSharedVersion: '129657854',
        mutable: false,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
      MUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0x27c31f7aa73c46084fd2aa6cbef85f959e9e1027b69cbdd9a0ed6fdd0bf37b38'
        ),
        initialSharedVersion: '129657854',
        mutable: true,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
    },
    MIGRATOR_LIST: {
      IMMUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0xff217d90604362cdd6db15d340222b5fd19751f77476a877a0e1c44a686cec03'
        ),
        initialSharedVersion: '129657868',
        mutable: false,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
      MUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0xff217d90604362cdd6db15d340222b5fd19751f77476a877a0e1c44a686cec03'
        ),
        initialSharedVersion: '129657868',
        mutable: true,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
    },
    VERSION: {
      IMMUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0x7b4207b87ed6dee6ee5dfc26dea4dcb4295618b7c2cb0258b3fdaf1b27406b6b'
        ),
        initialSharedVersion: '129657868',
        mutable: false,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
      MUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0x7b4207b87ed6dee6ee5dfc26dea4dcb4295618b7c2cb0258b3fdaf1b27406b6b'
        ),
        initialSharedVersion: '129657868',
        mutable: true,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
    },
    CONFIG: {
      IMMUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0xad9bffb261f1271a0430f74c3d4321d6db4e9f6a96df95e31398bb4fe5074567'
        ),
        initialSharedVersion: '129657868',
        mutable: false,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
      MUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0xad9bffb261f1271a0430f74c3d4321d6db4e9f6a96df95e31398bb4fe5074567'
        ),
        initialSharedVersion: '129657868',
        mutable: true,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
    },
  } as const,
};

export const MIGRATOR_WITNESSES = {
  [Network.Mainnet]: {
    TEST: '',
  },
  [Network.Testnet]: {
    TEST: `${PACKAGES[Network.Testnet].MEMEZ_MIGRATOR}::test_migrator::Witness`,
  },
} as const;

export const CONFIG_KEYS = {
  [Network.Mainnet]: {
    DEFAULT: '',
  },
  [Network.Testnet]: {
    DEFAULT: `${PACKAGES[Network.Testnet].MEMEZ_FUN}::memez_config::DefaultKey`,
  },
} as const;

export const CONFIG_MODELS = {
  [Network.Mainnet]: {
    FEE: '',
    PUMP: '',
    STABLE: '',
    AUCTION: '',
  },
  [Network.Testnet]: {
    FEE: `${PACKAGES[Network.Testnet].MEMEZ_FUN}::memez_fees::MemezFees`,
    PUMP: `${PACKAGES[Network.Testnet].MEMEZ_FUN}::memez_pump_model::PumpModel`,
    STABLE: `${PACKAGES[Network.Testnet].MEMEZ_FUN}::memez_stable_model::StableModel`,
    AUCTION: `${PACKAGES[Network.Testnet].MEMEZ_FUN}::memez_auction_model::AuctionModel`,
  },
} as const;

export const MAX_BPS = 10_000;
