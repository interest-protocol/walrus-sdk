import { normalizeSuiAddress, normalizeSuiObjectId } from '@mysten/sui/utils';

import { Network, OwnedObjects, Package } from './blizzard.types';

export enum Modules {
  AllowedVersions = 'blizzard_allowed_versions',
  Protocol = 'blizzard_protocol',
  StakeNFT = 'blizzard_stake_nft',
  ACL = 'blizzard_acl',
  WithdrawIX = 'blizzard_withdraw_ix',
  Utils = 'blizzard_utils',
  Hooks = 'blizzard_hooks',
  WalrusStaking = 'staking',
}

export const INNER_WALRUS_STAKING_ID = {
  [Network.Mainnet]: normalizeSuiObjectId('0x0'),
  [Network.Testnet]: normalizeSuiObjectId(
    '0x73593d21f89d29ecdbad8b6cf58e2be280cc369cb3d9d90c4707f70385884bad'
  ),
};

export const PACKAGES: Record<Network, Package> = {
  [Network.Mainnet]: {
    SNOW: {
      original: normalizeSuiAddress('0x0'),
      latest: normalizeSuiAddress('0x0'),
    },
    BLIZZARD: {
      original: normalizeSuiAddress('0x0'),
      latest: normalizeSuiAddress('0x0'),
    },
    BLIZZARD_HOOKS: {
      original: normalizeSuiAddress('0x0'),
      latest: normalizeSuiAddress('0x0'),
    },
    WAL: {
      original: normalizeSuiAddress('0x0'),
      latest: normalizeSuiAddress('0x0'),
    },
    WALRUS: {
      original: normalizeSuiAddress('0x0'),
      latest: normalizeSuiAddress('0x0'),
    },
    BLIZZARD_UTILS: {
      original: normalizeSuiAddress('0x0'),
      latest: normalizeSuiAddress('0x0'),
    },
  },
  [Network.Testnet]: {
    SNOW: {
      original: normalizeSuiAddress(
        '0xb9671a4464279e45aa7a1264fabba1415a657ef24fa062c6a0d60d11bf04ee31'
      ),
      latest: normalizeSuiAddress(
        '0xb9671a4464279e45aa7a1264fabba1415a657ef24fa062c6a0d60d11bf04ee31'
      ),
    },
    BLIZZARD: {
      original: normalizeSuiAddress(
        '0x9bcea92f0fe583011e942d3fc50cfd3e54be9652e55fa7221fec77c0d45e7c17'
      ),
      latest: normalizeSuiAddress(
        '0xc8720c26e97746bebd299efa76463cf376622065177299dc41fd76df038cd19c'
      ),
    },
    WAL: {
      original: normalizeSuiAddress(
        '0x8190b041122eb492bf63cb464476bd68c6b7e570a4079645a8b28732b6197a82'
      ),
      latest: normalizeSuiAddress(
        '0x8190b041122eb492bf63cb464476bd68c6b7e570a4079645a8b28732b6197a82'
      ),
    },
    WALRUS: {
      original: normalizeSuiAddress(
        '0x795ddbc26b8cfff2551f45e198b87fc19473f2df50f995376b924ac80e56f88b'
      ),
      latest: normalizeSuiAddress(
        '0x883b27de942203191726d6722dc097b6d5499234be2aa22c3872849c45fdd712'
      ),
    },
    BLIZZARD_UTILS: {
      original: normalizeSuiAddress(
        '0x567785dda392e53a26c536c2e5e1b851e8e65ef474df6e06d01ece05f84b8e00'
      ),
      latest: normalizeSuiAddress(
        '0x567785dda392e53a26c536c2e5e1b851e8e65ef474df6e06d01ece05f84b8e00'
      ),
    },
    BLIZZARD_HOOKS: {
      original: normalizeSuiAddress(
        '0x1c8290270bd3d5a485ff4710594e21193bad35200a22d563dbda5f9381ed7819'
      ),
      latest: normalizeSuiAddress(
        '0x1c8290270bd3d5a485ff4710594e21193bad35200a22d563dbda5f9381ed7819'
      ),
    },
  },
} as const;

export const OWNED_OBJECTS: Record<Network, OwnedObjects> = {
  [Network.Mainnet]: {
    SNOW_UPGRADE_CAP: normalizeSuiObjectId('0x0'),
    BLIZZARD_UPGRADE_CAP: normalizeSuiObjectId('0x0'),
    BLIZZARD_STAKE_NFT_PUBLISHER: normalizeSuiAddress('0x0'),
    BLIZZARD_SUPER_ADMIN: normalizeSuiAddress('0x0'),
    BLIZZARD_PUBLISHER: normalizeSuiAddress('0x0'),
    BLIZZARD_STAKE_NFT_DISPLAY: normalizeSuiAddress('0x0'),
    HOOKS_UPGRADE_CAP: normalizeSuiObjectId('0x0'),
    SNOW_SUPER_ADMIN: normalizeSuiAddress('0x0'),
    BLIZZARD_UTILS_UPGRADE_CAP: normalizeSuiObjectId('0x0'),
  },
  [Network.Testnet]: {
    SNOW_UPGRADE_CAP: normalizeSuiObjectId(
      '0x11bbcafce2f1ac5059fac52ac0ad06b2f9e5012a02bb51e13c9f5a4136dcbe29'
    ),
    BLIZZARD_SUPER_ADMIN: normalizeSuiAddress(
      '0xfe0d30f60d424bb651b3141da1032fc8779710ab0baaed97f46fd613fb3e0122'
    ),
    BLIZZARD_UPGRADE_CAP: normalizeSuiObjectId(
      '0xce03202ae505a79b175252db48d406003d058ae083cc1c649bdb169863ada7bf'
    ),
    BLIZZARD_STAKE_NFT_PUBLISHER: normalizeSuiAddress(
      '0x6ac62637f465051f451e03d44a3c65cf98cf9d249599cd5125eb64b0e76e78cc'
    ),
    SNOW_SUPER_ADMIN: normalizeSuiAddress(
      '0x1f7ea08843ece04349d121649eca925a8dfe01b0f5b8f7f49eec6d7afb7a1a05'
    ),
    BLIZZARD_PUBLISHER: normalizeSuiAddress(
      '0xef03dd353d28a9ea42f3d5901d4240a225ac7009ed5e3ad3a148f3febd11c375'
    ),
    BLIZZARD_STAKE_NFT_DISPLAY: normalizeSuiAddress(
      '0xa84802d2a2f8020e7fcc63c96c960c30ec57c6980cd81794dfbe2529594a9639'
    ),
    HOOKS_UPGRADE_CAP: normalizeSuiObjectId(
      '0x4abcad6930b284abac5eb1f31cd4e73c5c326bf0861275110a545a297688ad91'
    ),
    BLIZZARD_UTILS_UPGRADE_CAP: normalizeSuiObjectId(
      '0x88f38b4543425a8cd4e67847cde8fd5855069e6010e08f82e66b55d34929ff31'
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
    SNOW_COIN_METADATA: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable,
    }),
    BLIZZARD_AV: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable,
    }),
    BLIZZARD_ACL: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable,
    }),
    SNOW_ACL: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId('0x0'),
      initialSharedVersion: '1',
      mutable,
    }),
    SNOW_STAKING: ({ mutable }: { mutable: boolean }) => ({
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
    SNOW_COIN_METADATA: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId(
        '0x00027caf92b6a305879bfee4e7eafa0971399b2b1fd1a36652beadf364afbae0'
      ),
      initialSharedVersion: '371949582',
      mutable,
    }),
    BLIZZARD_AV: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId(
        '0x872eff737c1a78dce463e58a490c65d81fa6411f46304a3cb849aac6fbcfdfa5'
      ),
      initialSharedVersion: '371949583',
      mutable,
    }),
    BLIZZARD_ACL: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId(
        '0xe36d344c5031045a900191b728364dc4d28fae10d1863854179d289a12bf3ef0'
      ),
      initialSharedVersion: '371949583',
      mutable,
    }),
    SNOW_ACL: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId(
        '0x7f10caa269e5fa60063180d8ccbd89d9ba594d3f35aac5d0ebd7623bc19f6eef'
      ),
      initialSharedVersion: '374324183',
      mutable,
    }),
    SNOW_STAKING: ({ mutable }: { mutable: boolean }) => ({
      objectId: normalizeSuiObjectId(
        '0x816143d7561b92f26e86cb55d143e7e8196d1cbb12163a96cbc8846c5ac0667f'
      ),
      initialSharedVersion: '374324183',
      mutable,
    }),
  } as const,
};

export const INNER_LST_STATE_ID = {
  [Network.Mainnet]: {
    [SHARED_OBJECTS.mainnet.SNOW_STAKING({ mutable: false }).objectId]:
      normalizeSuiObjectId('0x0'),
  },
  [Network.Testnet]: {
    [SHARED_OBJECTS.testnet.SNOW_STAKING({ mutable: false }).objectId]:
      normalizeSuiObjectId(
        '0x5c007b8707268f08eafefb64721e109216cc2281508d36eb47cac031b771327c'
      ),
  },
};

export const TYPES = {
  [Network.Mainnet]: {
    SNOW: `${PACKAGES[Network.Mainnet].SNOW.original}::snow::Snow`,
    BLIZZARD: `${PACKAGES[Network.Mainnet].BLIZZARD.original}::blizzard::Blizzard`,
    WAL: `${PACKAGES[Network.Mainnet].WAL.original}::wal::WAL`,
    STAKED_WAL: `${PACKAGES[Network.Mainnet].WALRUS.original}::staked_wal::StakedWal`,
  },
  [Network.Testnet]: {
    SNOW: `${PACKAGES[Network.Testnet].SNOW.original}::snow::SNOW`,
    BLIZZARD: `${PACKAGES[Network.Testnet].BLIZZARD.original}::blizzard::BLIZZARD`,
    WAL: `${PACKAGES[Network.Testnet].WAL.original}::wal::WAL`,
    STAKED_WAL: `${PACKAGES[Network.Testnet].WALRUS.original}::staked_wal::StakedWal`,
  },
} as const;

export const MAX_BPS = 10_000n;
