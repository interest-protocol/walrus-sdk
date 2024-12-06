import { Inputs } from '@mysten/sui/transactions';
import { normalizeSuiAddress, normalizeSuiObjectId } from '@mysten/sui/utils';

import { Network, OwnedObjects, Package, SharedObjects } from './memez.types';

export enum Modules {
  FUN = 'memez_fun',
  ACL = 'acl',
  MIGRATOR = 'memez_migrator',
  PUMP = 'memez_pump',
  CONFIG = 'memez_config',
  VERSION = 'memez_version',
}

export enum ConfigurationKeys {
  RECRD = '',
}

export enum MigrationWitnesses {
  CETUS = '',
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
      '0x4d87aa4ad32bfc16a91c23b0417c79e35cf7ee3a6edebdf76b2acc6a3d857ed4'
    ),
    ACL: normalizeSuiAddress(
      '0xc201002dcf8e7b1e1850e2420980d5a7aae14bdfabc7b1e186c9a0ee749aa384'
    ),
    VESTING: normalizeSuiAddress(
      '0x8f5393f347cdc7afb58bedec29853904c8e625fd5a23109563f851f127bce450'
    ),
    MEMEZ_MIGRATOR: normalizeSuiAddress(
      '0xe402aaa807f8ef7468488a57128e5d612bce8d62c405b572c0b47f5567550c06'
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
      '0x9eada63e557b32d6cc86095ddd217e3059d3fc43e52577cc92c204a7c6a85ac5'
    ),
    MEMEZ_MIGRATOR_UPGRADE_CAP: normalizeSuiObjectId(
      '0x5a6d9c5aab751a9ae5e426776e26e1e597fe236a006e34211d0d77e5220a5823'
    ),
  },
} as const;

export const SHARED_OBJECTS: Record<Network, SharedObjects> = {
  [Network.Mainnet]: {
    ACL_MUT: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    ACL: Inputs.SharedObjectRef({
      objectId: '',
      initialSharedVersion: '',
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    MIGRATOR_LIST_MUT: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    MIGRATOR_LIST: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    VERSION: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    VERSION_MUT: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    CONFIG: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    CONFIG_MUT: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
  },
  [Network.Testnet]: {
    ACL_MUT: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId(
        '0x27c31f7aa73c46084fd2aa6cbef85f959e9e1027b69cbdd9a0ed6fdd0bf37b38'
      ),
      initialSharedVersion: '129657854',
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    ACL: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId(
        '0x27c31f7aa73c46084fd2aa6cbef85f959e9e1027b69cbdd9a0ed6fdd0bf37b38'
      ),
      initialSharedVersion: '129657854',
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    MIGRATOR_LIST_MUT: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId(
        '0x4c2db629d7047500f2afa87a7cfc7a84da136ac34d1cf2b96c90d66ac56a9fe2'
      ),
      initialSharedVersion: '129657862',
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    MIGRATOR_LIST: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId(
        '0x4c2db629d7047500f2afa87a7cfc7a84da136ac34d1cf2b96c90d66ac56a9fe2'
      ),
      initialSharedVersion: '129657862',
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    VERSION: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId(
        '0x3f54810369b5573d4d43ed5a1a84b5ff30a73a4316c661b752a60d4d000a4125'
      ),
      initialSharedVersion: '129657862',
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    VERSION_MUT: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId(
        '0x3f54810369b5573d4d43ed5a1a84b5ff30a73a4316c661b752a60d4d000a4125'
      ),
      initialSharedVersion: '129657862',
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    CONFIG: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId(
        '0x8cfdec79357ebe59638644e3503c8346f70fc396dc45b4b09407281b93cf003f'
      ),
      initialSharedVersion: '129657862',
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    CONFIG_MUT: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId(
        '0x8cfdec79357ebe59638644e3503c8346f70fc396dc45b4b09407281b93cf003f'
      ),
      initialSharedVersion: '129657862',
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
  },
} as const;
