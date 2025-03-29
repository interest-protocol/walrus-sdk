import { normalizeSuiAddress, normalizeSuiObjectId } from '@mysten/sui/utils';

import { OwnedObjects, Package } from './blizzard.types';

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

export const INNER_WALRUS_STAKING_ID =
  '0x5849e7cdbdaad46b6c68a5462ed1fc58c302862785769b450c882679bc452999';

export const PACKAGES: Package = {
  WWAL: {
    original: normalizeSuiAddress(
      '0xb1b0650a8862e30e3f604fd6c5838bc25464b8d3d827fbd58af7cb9685b832bf'
    ),
    latest: normalizeSuiAddress(
      '0xb1b0650a8862e30e3f604fd6c5838bc25464b8d3d827fbd58af7cb9685b832bf'
    ),
  },
  BLIZZARD: {
    original: normalizeSuiAddress(
      '0x29ba7f7bc53e776f27a6d1289555ded2f407b4b1a799224f06b26addbcd1c33d'
    ),
    latest: normalizeSuiAddress(
      '0x29ba7f7bc53e776f27a6d1289555ded2f407b4b1a799224f06b26addbcd1c33d'
    ),
  },
  BLIZZARD_HOOKS: {
    original: normalizeSuiAddress(
      '0x10a7c91b25090b81a4de1e3a3912c994feb446529a308b7aa549eea259b11842'
    ),
    latest: normalizeSuiAddress(
      '0x10a7c91b25090b81a4de1e3a3912c994feb446529a308b7aa549eea259b11842'
    ),
  },
  WAL: {
    original: normalizeSuiAddress(
      '0x356a26eb9e012a68958082340d4c4116e7f55615cf27affcff209cf0ae544f59'
    ),
    latest: normalizeSuiAddress(
      '0x356a26eb9e012a68958082340d4c4116e7f55615cf27affcff209cf0ae544f59'
    ),
  },
  WALRUS: {
    original: normalizeSuiAddress(
      '0xfdc88f7d7cf30afab2f82e8380d11ee8f70efb90e863d1de8616fae1bb09ea77'
    ),
    latest: normalizeSuiAddress(
      '0xfdc88f7d7cf30afab2f82e8380d11ee8f70efb90e863d1de8616fae1bb09ea77'
    ),
  },
  BLIZZARD_UTILS: {
    original: normalizeSuiAddress(
      '0x3e12a9b6dbe7997b441b5fd6cf5e953cf2f3521a8f353f33e7f297cf7dac0ecc'
    ),
    latest: normalizeSuiAddress(
      '0x3e12a9b6dbe7997b441b5fd6cf5e953cf2f3521a8f353f33e7f297cf7dac0ecc'
    ),
  },
} as const;

export const OWNED_OBJECTS: OwnedObjects = {
  WWAL_UPGRADE_CAP: normalizeSuiObjectId(
    '0xdb3ce9226913db734f514ef2f3463c04fdafe59f057c9a90aab994e276b155d1'
  ),
  BLIZZARD_UPGRADE_CAP: normalizeSuiObjectId(
    '0xf77b750e8546131b9fbb91434b70f9a642fd074c31a108cddd888549c8e1d9ac'
  ),
  BLIZZARD_STAKE_NFT_PUBLISHER: normalizeSuiAddress(
    '0x2a0d528f1b78f5c25c43f4f73736493c20ad4e5d1dc53935373ef3212cbffae6'
  ),
  BLIZZARD_SUPER_ADMIN: normalizeSuiAddress(
    '0x4c2321cfa370fdeadd3c2bf47730365b9abc0ec9f6161d191af8bf8fd76d70fd'
  ),
  BLIZZARD_PUBLISHER: normalizeSuiAddress(
    '0xaae6c78f20889a9f0af7c35b4744699abea5b11e0f3a106c02bc63fd8674c20d'
  ),
  BLIZZARD_STAKE_NFT_DISPLAY: normalizeSuiAddress(
    '0x229b40abcabeccb268c85aac9091101a635a21e602dcfd2d7ff1ef153f0ff9c3'
  ),
  HOOKS_UPGRADE_CAP: normalizeSuiObjectId(
    '0x5e566949b8da83f7392293be6bf2f57167722aaf62ac92d6f882ffa656e61e82'
  ),
  WWAL_SUPER_ADMIN: normalizeSuiAddress(
    '0xf4c2e773f52cfdeb54e4393f9a4f21ee13064bed902bfe948863406debf7d99c'
  ),
  BLIZZARD_UTILS_UPGRADE_CAP: normalizeSuiObjectId(
    '0x671b96e76cb85bdadc1bb27591e681b63a32396acd7933d70b05e02240099e0f'
  ),
  BLIZZARD_ADMIN: normalizeSuiAddress(
    '0xf628949db97fa4d7b1fb190c108264d85d471efab4146dca5bf3b4320532f966'
  ),
  WWAL_ADMIN: normalizeSuiAddress(
    '0x110c2c257c4fb6fb346a40441b2f478192f7219db9f54b044a93c6370a394ce6'
  ),
  BREAD_WAL_SUPER_ADMIN: normalizeSuiAddress(
    '0x0de83d626d1ed8ab2e337a8cb306c1136858cfed0b0ca41b4cbbdc91224f89da'
  ),
  PWAL_SUPER_ADMIN: normalizeSuiAddress(
    '0x4f0dbb94b3743c63da78bfb9f4edfeb37655306fd84138a4d3f678a9c27ff8cf'
  ),
} as const;

export const SHARED_OBJECTS = {
  WALRUS_STAKING: ({ mutable }: { mutable: boolean }) => ({
    objectId: normalizeSuiObjectId(
      '0x10b9d30c28448939ce6c4d6c6e0ffce4a7f8a4ada8248bdad09ef8b70e4a3904'
    ),
    initialSharedVersion: '317862159',
    mutable,
  }),
  WWAL_COIN_METADATA: ({ mutable }: { mutable: boolean }) => ({
    objectId: normalizeSuiObjectId(
      '0xb99b3755f138d5a56b3bbc1b9cc19ed7da9be82c79844b39ff84d5c438ee5c40'
    ),
    initialSharedVersion: '511167558',
    mutable,
  }),
  BLIZZARD_AV: ({ mutable }: { mutable: boolean }) => ({
    objectId: normalizeSuiObjectId(
      '0x4199e3c5349075a98ec0b6100c7f1785242d97ba1f9311ce7a3a021a696f9e4a'
    ),
    initialSharedVersion: '511167559',
    mutable,
  }),
  BLIZZARD_ACL: ({ mutable }: { mutable: boolean }) => ({
    objectId: normalizeSuiObjectId(
      '0x4796e5ff6ea2002736a2491b096ae01fa1940de982c4a2dd3810e5936cdc648d'
    ),
    initialSharedVersion: '511167559',
    mutable,
  }),
  WWAL_ACL: ({ mutable }: { mutable: boolean }) => ({
    objectId: normalizeSuiObjectId(
      '0x274e6692465b9c5f2057d63b3f328c67286d96c15beffb0909aa00fc34bbd0c4'
    ),
    initialSharedVersion: '511181119',
    mutable,
  }),
  WWAL_STAKING: ({ mutable }: { mutable: boolean }) => ({
    objectId: normalizeSuiObjectId(
      '0xccf034524a2bdc65295e212128f77428bb6860d757250c43323aa38b3d04df6d'
    ),
    initialSharedVersion: '511181119',
    mutable,
  }),
  PWAL_STAKING: ({ mutable }: { mutable: boolean }) => ({
    objectId: normalizeSuiObjectId(
      '0xd355b8e62f16418a02879de9bc4ab15c4dad9dd2966d15645e1674689bfbc8b9'
    ),
    initialSharedVersion: '511946394',
    mutable,
  }),
  PWAL_ACL: ({ mutable }: { mutable: boolean }) => ({
    objectId: normalizeSuiObjectId(
      '0x8cb63927925e324164fba2dc555b7e27a00ed4ae80d27c58ce8cf5c4eb61f375'
    ),
    initialSharedVersion: '511946394',
    mutable,
  }),
  BREAD_WAL_STAKING: ({ mutable }: { mutable: boolean }) => ({
    objectId: normalizeSuiObjectId(
      '0xc75f916f5cdc94664f58f5e8284a70ef69f973d62cd9841584bc70200a98a8b7'
    ),
    initialSharedVersion: '512115338',
    mutable,
  }),
  BREAD_WAL_ACL: ({ mutable }: { mutable: boolean }) => ({
    objectId: normalizeSuiObjectId(
      '0xb5b5ab03541ed4709c6102d41c8cd34edf3ce8e8b493ed8ea531046281ba3f4c'
    ),
    initialSharedVersion: '512115338',
    mutable,
  }),
};

export const INNER_LST_STATE_ID = {
  [SHARED_OBJECTS.WWAL_STAKING({ mutable: false }).objectId]:
    normalizeSuiObjectId(
      '0xaf09dc03865554dc44d152f64be0233228b4421e05f97e1f7c227a3fcb7bb653'
    ),
  [SHARED_OBJECTS.PWAL_STAKING({ mutable: false }).objectId]:
    normalizeSuiObjectId(
      '0x857e3c653b517cf99820e7ee680de933799807eb780ca62344a60940311959a0'
    ),
  [SHARED_OBJECTS.BREAD_WAL_ACL({ mutable: false }).objectId]:
    normalizeSuiObjectId(
      '0x663c44caf0a40f148b9ba76e31d612dcaa138b3f2868990bcd48e89f183fdd44'
    ),
};

export const TYPES = {
  WWAL: `${PACKAGES.WWAL.original}::wwal::WWAL`,
  BLIZZARD: `${PACKAGES.BLIZZARD.original}::blizzard::Blizzard`,
  WAL: `${PACKAGES.WAL.original}::wal::WAL`,
  STAKED_WAL: `${PACKAGES.WALRUS.original}::staked_wal::StakedWal`,
  BLIZZARD_STAKE_NFT: `${PACKAGES.BLIZZARD.original}::blizzard_stake_nft::BlizzardStakeNFT`,
} as const;

export const MAX_BPS = 10_000n;
