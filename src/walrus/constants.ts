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
