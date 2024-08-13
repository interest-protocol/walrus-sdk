import { Inputs } from '@mysten/sui/dist/cjs/transactions';

export const PACKAGES = {
  mainnet: {
    DCA: '',
    ADAPTERS: '',
  },
  testnet: {
    DCA: '0xdc0d29408c946eacd2e175639957fe8a9095f2cbbf222d15f9a77fc44413120c',
    ADAPTERS:
      '0x559031b01a343fb8950a4142e0fe9667231f5283dba6334c9fc6b7ebf32222cf',
  },
} as const;

export const OWNED_OBJECTS = {
  mainnet: {
    ADAPTER_UPGRADE_CAP: '',
    DCA_UPGRADE_CAP: '',
    DCA_ADMIN: '',
  },
  testnet: {
    ADAPTER_UPGRADE_CAP:
      '0xdd095fb1d1d69151bd0bc9109ad9b16baf796a70022bcab3b9e0d0a453c97e09',
    DCA_UPGRADE_CAP:
      '0xbeb2fa6fecaca163420c2c1d754a26f5c25ab9819181f7950b05db18f5c522d3',
    DCA_ADMIN:
      '0x7c528cf80424278dfcf5d907dca7c89bb525f21979c767d09082a6db3d74285f',
  },
} as const;

export const SHARED_OBJECTS = {
  mainnet: {
    TRADE_POLICY_MUT: Inputs.SharedObjectRef({
      objectId: '',
      initialSharedVersion: '',
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    TRADE_POLICY: Inputs.SharedObjectRef({
      objectId: '',
      initialSharedVersion: '',
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    WHITELIST_MUT: Inputs.SharedObjectRef({
      objectId: '',
      initialSharedVersion: '',
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    WHITELIST: Inputs.SharedObjectRef({
      objectId: '',
      initialSharedVersion: '',
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
  },
  testnet: {
    TRADE_POLICY_MUT: Inputs.SharedObjectRef({
      objectId:
        '0x7af707af5407a0c8d84b9fc2f5068292d224d6ab349d52f9121900ff5e229977',
      initialSharedVersion: '109319125',
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    TRADE_POLICY: Inputs.SharedObjectRef({
      objectId:
        '0x7af707af5407a0c8d84b9fc2f5068292d224d6ab349d52f9121900ff5e229977',
      initialSharedVersion: '109319125',
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    WHITELIST_MUT: Inputs.SharedObjectRef({
      objectId:
        '0x391be588882816e3f3bf755d14ad7fad12062ad1c19c71020a9605ac662f9ea5',
      initialSharedVersion: '109319126',
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    WHITELIST: Inputs.SharedObjectRef({
      objectId:
        '0x391be588882816e3f3bf755d14ad7fad12062ad1c19c71020a9605ac662f9ea5',
      initialSharedVersion: '109319126',
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
  },
} as const;

export const WITNESSES = {
  mainnet: {
    WHITELIST_ADAPTER: '',
  },
  testnet: {
    WHITELIST_ADAPTER: `${PACKAGES['testnet']}::whitelist_adapter::Witness`,
  },
} as const;
