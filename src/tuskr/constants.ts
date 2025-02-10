import { normalizeSuiAddress, normalizeSuiObjectId } from '@mysten/sui/utils';

import { Network, OwnedObjects, Package } from './tuskr.types';

export enum Modules {
  AllowedVersions = 'tuskr_allowed_versions',
  Protocol = 'tuskr_protocol',
  StakeNFT = 'tuskr_stake_nft',
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
      '0x76651fc50af2e28ee39394d25bcd917a121a6db5fdc1eb61abeaed290f1e32b1'
    ),
    TUSKR: normalizeSuiAddress(
      '0x5bb6d4d0436496f8e3ce8d80a8e6e7512cbdbf8285a99f9c5684b47e7c3e791d'
    ),
    TUSKR_HOOKS: normalizeSuiAddress(
      '0x85c887c6ad7218b5f6aaceef57a431e123426b9c8395cb41081fd8f126382c6f'
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
    TUSKR_PUBLISHER: normalizeSuiAddress('0x0'),
    TUSKR_STAKE_NFT_DISPLAY: normalizeSuiAddress('0x0'),
    HOOKS_UPGRADE_CAP: normalizeSuiObjectId('0x0'),
    WW_SUPER_ADMIN: normalizeSuiAddress('0x0'),
  },
  [Network.Testnet]: {
    WW_UPGRADE_CAP: normalizeSuiObjectId(
      '0xbdd005e28564366734a9b3250d19f1619ead778cd7da769162c00312948cbdb4'
    ),
    WW_SUPER_ADMIN: normalizeSuiAddress(
      '0xad0b5733c7fc1fe1a185d11a872233620a320605182478094a6921b2f94cc3ff'
    ),
    TUSKR_UPGRADE_CAP: normalizeSuiObjectId(
      '0x5c665bbb36129fa1eed596c067772770d8ac18238e25805d007f6e2cbd540e73'
    ),
    TUSKR_STAKE_NFT_PUBLISHER: normalizeSuiAddress(
      '0xb7bc20e24c6b21128f25cf623938dd6a2cb71d7881bee6456f36d3fb16350152'
    ),
    TUSKR_SUPER_ADMIN: normalizeSuiAddress(
      '0x00dc2d0d5eef7eed3cca372983e0e6bd2c7a1646b21653f03604fa6230216392'
    ),
    TUSKR_PUBLISHER: normalizeSuiAddress(
      '0x4bc86f831e9b44f3a4e31e0dde6b86d0c7e3ee7930a1223d32b821f33fe87660'
    ),
    TUSKR_STAKE_NFT_DISPLAY: normalizeSuiAddress(
      '0x0ab08fa9de5dcf4b1f7cc4b9bdc869da15d9d1c3f4766df1d4a716b4a6c7cc02'
    ),
    HOOKS_UPGRADE_CAP: normalizeSuiObjectId(
      '0xb97499543378a64a1c9f40e2dd64e486403d70804f2231974fb53795458b456b'
    ),
  },
} as const;

export const SHARED_OBJECTS = {
  [Network.Mainnet]: {
    WALRUS_STAKING: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable,
    }),
    WW_COIN_METADATA: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable,
    }),
    TUSKR_AV: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable,
    }),
    TUSKR_ACL: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable,
    }),
    WW_ACL: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable,
    }),
    WW_STAKING: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable,
    }),
  },
  [Network.Testnet]: {
    WALRUS_STAKING: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId(
        '0x20266a17b4f1a216727f3eef5772f8d486a9e3b5e319af80a5b75809c035561d'
      ),
      initialSharedVersion: '334023834',
      mutable,
    }),
    WW_COIN_METADATA: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId(
        '0x3ea28372cb41f5376c22716a0dab893b96f0697980bf21622468af54cd9b1721'
      ),
      initialSharedVersion: '129657967',
      mutable,
    }),
    TUSKR_AV: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId(
        '0x3cf39d48669ff88b0734292b4e8e2f46cfda1456a2003c94d02759967a1f79bc'
      ),
      initialSharedVersion: '370268908',
      mutable,
    }),
    TUSKR_ACL: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId(
        '0xed9392214b39d0c8a9d9aeec9a2d4754fad67154ebca3b56bf35c2c57ecfbfb0'
      ),
      initialSharedVersion: '370268908',
      mutable,
    }),
    WW_ACL: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId(
        '0xdc5fa5c6d0f9cfef099a29d8ff6f6150a60649925a3e53758abc5286edad89d4'
      ),
      initialSharedVersion: '370553211',
      mutable,
    }),
    WW_STAKING: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId(
        '0x0c5b728b942d60936b301d7504ce7f4df0112ee5b0fcbac0c2b5660f0f8dad00'
      ),
      initialSharedVersion: '370553211',
      mutable,
    }),
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
