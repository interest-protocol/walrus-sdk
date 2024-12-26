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
      '0x9e7ba1c8563b2aa3a6a0d868d87cb5108669662938944de44d717ad9cc798a3c'
    ),
    ACL: normalizeSuiAddress(
      '0x11c2848af65397a7fe48e1526b47d50226a72ceb67e77cf77f9bab0bf759c4c0'
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
      '0x5de799b5adc55c96259dc72a7c50f39c2dab8a8383402fef7583ccdda81a0889'
    ),
    ACL_UPGRADE_CAP: normalizeSuiObjectId(
      '0xe65636aa5cc2820ac65aa4c0f85174e9f17c7768e51cc5991a4b98b46d5d4378'
    ),
    VESTING_UPGRADE_CAP: normalizeSuiObjectId(
      '0xedb18a7b96717cc2f18bc6ff88db55cdd7321aebe83b8572578ae6c5f795b80c'
    ),
    MEMEZ_FUN_UPGRADE_CAP: normalizeSuiObjectId(
      '0x35271f135e300c2a67da9a7f91c825b5c2c9cf088bdd3035bb5ca298292a6332'
    ),
    MEMEZ_MIGRATOR_UPGRADE_CAP: normalizeSuiObjectId(
      '0x0806f525f06e0fcf0f79baeabcf4c49de2be292b87f59c9fabf59fbf779fe2f4'
    ),
    ADMIN: normalizeSuiObjectId(
      '0xc6fd083dc011d0493600798ba92c789adae2e85e44889726b0c5b87ba3de146d'
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
          '0x463b3f541a85ea47f30ce9a81303572aa48c5db0104dd14a98f18a9f529a6c8c'
        ),
        initialSharedVersion: '129657919',
        mutable: false,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
      MUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0x463b3f541a85ea47f30ce9a81303572aa48c5db0104dd14a98f18a9f529a6c8c'
        ),
        initialSharedVersion: '129657919',
        mutable: true,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
    },
    MIGRATOR_LIST: {
      IMMUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0xc147bae64a118a2c493d647c8026d3758ba96fa7584c1decfb8fa1e8579fd053'
        ),
        initialSharedVersion: '129657938',
        mutable: false,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
      MUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0xc147bae64a118a2c493d647c8026d3758ba96fa7584c1decfb8fa1e8579fd053'
        ),
        initialSharedVersion: '129657938',
        mutable: true,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
    },
    VERSION: {
      IMMUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0x174fbafd6d505bdde541ed86a2b634b1a8958d3c2e3b22a33944f098ae6f2112'
        ),
        initialSharedVersion: '129657938',
        mutable: false,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
      MUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0x174fbafd6d505bdde541ed86a2b634b1a8958d3c2e3b22a33944f098ae6f2112'
        ),
        initialSharedVersion: '129657938',
        mutable: true,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
    },
    CONFIG: {
      IMMUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0x01e346b809fa77b56cc78519e9ce8d5f8fe1aae92e8ebb145f80b5e226ca908c'
        ),
        initialSharedVersion: '129657938',
        mutable: false,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
      MUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0x01e346b809fa77b56cc78519e9ce8d5f8fe1aae92e8ebb145f80b5e226ca908c'
        ),
        initialSharedVersion: '129657938',
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
