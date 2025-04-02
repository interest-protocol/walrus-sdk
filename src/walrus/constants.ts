import { normalizeSuiAddress, normalizeSuiObjectId } from '@mysten/sui/utils';

export enum Modules {
  Staking = 'staking',
  StakedWal = 'staked_wal',
}

export const WALRUS_PACKAGES = {
  original: normalizeSuiAddress(
    '0xfdc88f7d7cf30afab2f82e8380d11ee8f70efb90e863d1de8616fae1bb09ea77'
  ),
  latest: normalizeSuiAddress(
    '0xfdc88f7d7cf30afab2f82e8380d11ee8f70efb90e863d1de8616fae1bb09ea77'
  ),
} as const;

export const WAL = {
  original: normalizeSuiAddress(
    '0x356a26eb9e012a68958082340d4c4116e7f55615cf27affcff209cf0ae544f59'
  ),
  latest: normalizeSuiAddress(
    '0x356a26eb9e012a68958082340d4c4116e7f55615cf27affcff209cf0ae544f59'
  ),
} as const;

export const WALRUS_STAKING_OBJECT = ({ mutable }: { mutable: boolean }) => ({
  objectId: normalizeSuiObjectId(
    '0x10b9d30c28448939ce6c4d6c6e0ffce4a7f8a4ada8248bdad09ef8b70e4a3904'
  ),
  initialSharedVersion: '317862159',
  mutable,
});

export const INNER_WALRUS_STAKING_ID =
  '0x5849e7cdbdaad46b6c68a5462ed1fc58c302862785769b450c882679bc452999';

export const TYPES = {
  WAL: `${WAL.original}::wal::WAL`,
  STAKED_WAL: `${WALRUS_PACKAGES.original}::staked_wal::StakedWal`,
} as const;

export const NODES = {
  MIRAI: '0xb07ab3db6b190fe6e32e499e7c79499786174689ae835485c178da0e9a977180',
  MYSTEN_LABS_1:
    '0x82ff00c685e4946c9c2fc45e031af8eb3188ea74e9dafa494ee2bf50032a5851',
  MYSTEN_LABS_0:
    '0xf11fef95c8c5a17c2cbc51c15483e38585cf996110b8d50b8e1957442dc736fd',
  FOUR_PILLARS:
    '0x61d5598a35e198e6cafac7eb808191da3742a2a1789716ab89a68a1f934ee5c6',
  TRADEPORT:
    '0xd9817019d85cb8b8206e22f7e47b783b4fd9148b500d3ee74e0a3ac3c124b08d',
  AFTERMATH:
    '0x1c0a00e9bb4b8087c7ae7f49de7e2810d62f86515d57b47c2652b9fa4f8bee99',
  CETUS: '0xa9351a41439ec5424935354fd511dc8b263ed225450edeb90811687ab82b9a04',
  PINATA: '0x662543d9147db99c2c6e5a338f49c0f2278bb98a83bebc587d9d3d45edea9a69',
  DOUBLE_UP:
    '0x691f7eea8dc45dc3a0767bc000cf8735504997ad60d19d57e7fcff6f80f6c6bc',
  SUILEND: '0xe5cc25058895aeb7024ff044c17f4939f34f5c4df36744af1aae34e28a0510b5',
  TYPUS: '0x28ba8193c22608c32aa21b1dcd732a6a926831e3c074a482e1c139005bec0c8a',
  SCALLOP: '0x95281ab49ebe717f7d2aeca9f595a587aa6adf9208ebc68b5b8c40195a941333',
  BUCKET: '0x69c4793731a971d5652e99cc34e9714e6ebb7a29576ac4469d13acdc722a0f15',
  ALPHAFI: '0xc9f0d4effbeb5920c22520451f7fe4abe485259093260e03d74e08ce189ea890',
  INTEREST_LABS:
    '0xe2b5df873dbcddfea64dcd16f0b581e3b9893becf991649dacc9541895c898cb',
  SUISEC: '0x624e57d3661837a71ee6ca01ceee1d5e9177511d70a623315536b339e47f106a',
  STAKE_ENGINE:
    '0x9a56292b1246e836a516dc1486c47f45a420e07ea3293f817acc899c65f26a99',
} as const;
