import { Inputs } from '@mysten/sui/transactions';
import { normalizeSuiAddress, normalizeSuiObjectId } from '@mysten/sui/utils';

import { Network, OwnedObjects, Package, SharedObjects } from './tuskr.types';

export enum Modules {
  AllowedVersions = 'tuskr_allowed_versions',
  Protocol = 'tuskr_protocol',
  StakeNFT = 'tuskr_stake_nft',
  UnstakeNFT = 'tuskr_unstake_nft',
  ACL = 'tuskr_acl',
  WithdrawIX = 'tuskr_withdraw_ix',
}

export const PACKAGES: Record<Network, Package> = {
  [Network.Mainnet]: {
    WW: normalizeSuiAddress('0x0'),
    TUSKR: normalizeSuiAddress('0x0'),
    TUSKR_HOOKS: normalizeSuiAddress('0x0'),
    WAL: normalizeSuiAddress('0x0'),
    WALRUS: normalizeSuiAddress('0x0'),
  },
  [Network.Testnet]: {
    WW: normalizeSuiAddress(
      '0x6aca47cb9da32d5cec340624a4ea4141e1d707b8e0688d5a6444ec65f2717edb'
    ),
    TUSKR: normalizeSuiAddress(
      '0x63e12914cb127f4be885e9eea5c58c98ea63cfa3fb4192d401a9d929627915d2'
    ),
    TUSKR_HOOKS: normalizeSuiAddress(
      '0x25b5435569eae2c432cfd8fd71d547718664c051da206f51cb258a6aacc1ffe9'
    ),
    WAL: normalizeSuiAddress(
      '0x8190b041122eb492bf63cb464476bd68c6b7e570a4079645a8b28732b6197a82'
    ),
    WALRUS: normalizeSuiAddress(
      '0x795ddbc26b8cfff2551f45e198b87fc19473f2df50f995376b924ac80e56f88b'
    ),
  },
} as const;

export const OWNED_OBJECTS: Record<Network, OwnedObjects> = {
  [Network.Mainnet]: {
    WW_UPGRADE_CAP: normalizeSuiObjectId('0x0'),
    TUSKR_UPGRADE_CAP: normalizeSuiObjectId('0x0'),
    TUSKR_STAKE_NFT_PUBLISHER: normalizeSuiAddress('0x0'),
    TUSKR_SUPER_ADMIN: normalizeSuiAddress('0x0'),
    TUSKR_UNSTAKE_NFT_PUBLISHER: normalizeSuiAddress('0x0'),
    TUSKR_UNSTAKE_NFT_DISPLAY: normalizeSuiAddress('0x0'),
    TUSKR_PUBLISHER: normalizeSuiAddress('0x0'),
    TUSKR_STAKE_NFT_DISPLAY: normalizeSuiAddress('0x0'),
  },
  [Network.Testnet]: {
    WW_UPGRADE_CAP: normalizeSuiObjectId(
      '0xc1416d322f8324567b471c4f4b7ca30ec6c4c2ad8375fedced2266891355ea7e'
    ),
    TUSKR_UPGRADE_CAP: normalizeSuiObjectId(
      '0x7b24cecc9a90f4bd0351dad88a1c3044cc166a16b9f1112a1ab917d4f0fb1c36'
    ),
    TUSKR_STAKE_NFT_PUBLISHER: normalizeSuiAddress(
      '0x84d1b14fbd77f6c78260c8b2940bb887be709e0369645a9a1a4af3f64ac218e9'
    ),
    TUSKR_SUPER_ADMIN: normalizeSuiAddress(
      '0x8e6dba45dcacbeb2cfcb3ec993d3a83d021558848273cd5fce9b9e933fdc1a31'
    ),
    TUSKR_UNSTAKE_NFT_PUBLISHER: normalizeSuiAddress(
      '0x93fb72d026a2cc25b3c483aca5ee97e11ffdd95b7c49baaac209af39d7291ae8'
    ),
    TUSKR_UNSTAKE_NFT_DISPLAY: normalizeSuiAddress(
      '0x99ea0da9098e747c021f61bc0365f8a2c5b936f82173193d044f3f71b2cfb9c4'
    ),
    TUSKR_PUBLISHER: normalizeSuiAddress(
      '0xe076c061b50e23b01080a60b1b73503912d906cbe735f6f9a29473c05035c43f'
    ),
    TUSKR_STAKE_NFT_DISPLAY: normalizeSuiAddress(
      '0xee7a87dba305681a6ad23a4b78408cb44f63694cb4520a8f748ae6d1542f6747'
    ),
  },
} as const;

export const SHARED_OBJECTS: Record<Network, SharedObjects> = {
  [Network.Mainnet]: {
    WALRUS_STAKING: {
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
    WW_COIN_METADATA: {
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
    TUSKR_AV: {
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
    TUSKR_ACL: {
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
    WALRUS_STAKING: {
      IMMUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0x20266a17b4f1a216727f3eef5772f8d486a9e3b5e319af80a5b75809c035561d'
        ),
        initialSharedVersion: '334023834',
        mutable: false,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
      MUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0x20266a17b4f1a216727f3eef5772f8d486a9e3b5e319af80a5b75809c035561d'
        ),
        initialSharedVersion: '334023834',
        mutable: true,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
    },
    WW_COIN_METADATA: {
      IMMUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0x316812095a96e06416c33e61b2d6f3575c0750bef54566e442a8ff00250fea8e'
        ),
        initialSharedVersion: '129657967',
        mutable: false,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
      MUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0x316812095a96e06416c33e61b2d6f3575c0750bef54566e442a8ff00250fea8e'
        ),
        initialSharedVersion: '129657967',
        mutable: true,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
    },
    TUSKR_AV: {
      IMMUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0x25f30670b642e499d46eee54338202e88508912a64f4bc8ebcafbaadfd2e87c6'
        ),
        initialSharedVersion: '129657969',
        mutable: false,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
      MUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0x25f30670b642e499d46eee54338202e88508912a64f4bc8ebcafbaadfd2e87c6'
        ),
        initialSharedVersion: '129657969',
        mutable: true,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
    },
    TUSKR_ACL: {
      IMMUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0x35dd068d6b175744035139403abc313d88af941e0c1f9ac6e5b2ced4106bb3ad'
        ),
        initialSharedVersion: '129657969',
        mutable: false,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
      MUT: Inputs.SharedObjectRef({
        objectId: normalizeSuiObjectId(
          '0x35dd068d6b175744035139403abc313d88af941e0c1f9ac6e5b2ced4106bb3ad'
        ),
        initialSharedVersion: '129657969',
        mutable: true,
      }) as ReturnType<typeof Inputs.SharedObjectRef>,
    },
  } as const,
};

export const TYPES = {
  [Network.Mainnet]: {
    WW: `${PACKAGES[Network.Mainnet].WW}::ww::WW`,
    TUSKR: `${PACKAGES[Network.Mainnet].TUSKR}::tuskr::TUSKR`,
    WAL: `${PACKAGES[Network.Mainnet].WAL}::wal::WAL`,
  },
  [Network.Testnet]: {
    WW: `${PACKAGES[Network.Testnet].WW}::ww::WW`,
    TUSKR: `${PACKAGES[Network.Testnet].TUSKR}::tuskr::TUSKR`,
    WAL: `${PACKAGES[Network.Testnet].WAL}::wal::WAL`,
  },
} as const;

export const MAX_BPS = 10_000n;
