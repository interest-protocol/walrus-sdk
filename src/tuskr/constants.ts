import { normalizeSuiAddress, normalizeSuiObjectId } from '@mysten/sui/utils';

import { Network, OwnedObjects, Package } from './tuskr.types';

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
      '0x5dbabe2a32a0638e8ed8372a8f809040cc3899b53890e3624aeb8d5e07202837'
    ),
    TUSKR_HOOKS: normalizeSuiAddress(
      '0x80c5499d52e68287f6d504859a375a2d3265db0b70590a3790d668174f009cb6'
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
  },
  [Network.Testnet]: {
    WW_UPGRADE_CAP: normalizeSuiObjectId(
      '0xc1416d322f8324567b471c4f4b7ca30ec6c4c2ad8375fedced2266891355ea7e'
    ),
    TUSKR_UPGRADE_CAP: normalizeSuiObjectId(
      '0xa88cf8888546fce869773ca721e6da325aaebbaed6c7e935126306eb82cc5eb8'
    ),
    TUSKR_STAKE_NFT_PUBLISHER: normalizeSuiAddress(
      '0xcb671592105e325448796f358929f79a31e6d50110f58ee6c8383258deda75ee'
    ),
    TUSKR_SUPER_ADMIN: normalizeSuiAddress(
      '0x977b8c5f3160380d950586c6533fb70d8cf34ce9cca255a1623f393c1543804b'
    ),
    TUSKR_PUBLISHER: normalizeSuiAddress(
      '0x41439077d6d4b8379b0236716627cd2cb573fb2b43efda6aba11ce6c5479aa0e'
    ),
    TUSKR_STAKE_NFT_DISPLAY: normalizeSuiAddress(
      '0xf3a2657b96d5688020b20ab44d1278814b1794d44c44852467b091a07be6ebee'
    ),
    HOOKS_UPGRADE_CAP: normalizeSuiObjectId(
      '0x74d8c3149268e0e6f68b82ad20b792f87a5f8b497b5fb64efb67e1aa44408af0'
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
        '0x316812095a96e06416c33e61b2d6f3575c0750bef54566e442a8ff00250fea8e'
      ),
      initialSharedVersion: '129657967',
      mutable,
    }),
    TUSKR_AV: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId(
        '0xda9ce1a522af36f1677691852465f8ce0030f07f5422671509c6cefa8acfcdbc'
      ),
      initialSharedVersion: '129657971',
      mutable,
    }),
    TUSKR_ACL: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId(
        '0x4ebee81e929484e123f61f1f10bebd4f7c4f0642e1c17f57829700879b65bdaa'
      ),
      initialSharedVersion: '129657971',
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
