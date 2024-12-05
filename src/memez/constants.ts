import { Inputs } from '@mysten/sui/transactions';
import { normalizeSuiAddress, normalizeSuiObjectId } from '@mysten/sui/utils';

import { Network, OwnedObjects, Package, SharedObjects } from './memez.types';

export const PACKAGES: Record<Network, Package> = {
  [Network.Mainnet]: {
    MEMEZ_FUN: normalizeSuiAddress('0x0'),
    ACL: normalizeSuiAddress('0x0'),
    VESTING: normalizeSuiAddress('0x0'),
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
  },
} as const;

export const OWNED_OBJECTS: Record<Network, OwnedObjects> = {
  [Network.Mainnet]: {
    SUPER_ADMIN: normalizeSuiObjectId('0x0'),
    ACL_UPGRADE_CAP: normalizeSuiObjectId('0x0'),
    VESTING_UPGRADE_CAP: normalizeSuiObjectId('0x0'),
    MEMEZ_FUN_UPGRADE_CAP: normalizeSuiObjectId('0x0'),
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
    MEMEZ_FUN_UPGRADE_CAP: normalizeSuiObjectId('0x0'),
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
    VESTING: Inputs.SharedObjectRef({
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
        '0x01730395772b0beb1867b1623831f3c36aaa913786a05f2aa19a4232624c32b4'
      ),
      initialSharedVersion: '129657860',
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    MIGRATOR_LIST: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId(
        '0x01730395772b0beb1867b1623831f3c36aaa913786a05f2aa19a4232624c32b4'
      ),
      initialSharedVersion: '129657860',
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    VESTING: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    VERSION: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId(
        '0x7c34c1412cedee10c4009ccf7a80e0059731822c4014400da4393a9f03612637'
      ),
      initialSharedVersion: '129657860',
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    VERSION_MUT: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId(
        '0x7c34c1412cedee10c4009ccf7a80e0059731822c4014400da4393a9f03612637'
      ),
      initialSharedVersion: '129657860',
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    CONFIG: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId(
        '0x7eda6593acab48c15be95ac60b31ea5eae70c34808a899f92fa920a42baa50f0'
      ),
      initialSharedVersion: '129657860',
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    CONFIG_MUT: Inputs.SharedObjectRef({
      objectId: normalizeSuiObjectId(
        '0x7eda6593acab48c15be95ac60b31ea5eae70c34808a899f92fa920a42baa50f0'
      ),
      initialSharedVersion: '129657860',
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
  },
};
