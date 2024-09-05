import { Inputs } from "@mysten/sui/transactions";

import { Package, SharedObjects } from "./dca.types";

export const PACKAGES: Package = {
  mainnet: {
    DCA: "0x33d51e66410b5d98fdd013d16194ab35b43d5b8fc76523876cd5f971c52084dd",
    ADAPTERS:
      "0x8ff90cb0c620d9e62eefbf1da08d62d229d0282de8858424314e230ecda5e6bc",
  },
  testnet: {
    DCA: "0xdc0d29408c946eacd2e175639957fe8a9095f2cbbf222d15f9a77fc44413120c",
    ADAPTERS:
      "0x559031b01a343fb8950a4142e0fe9667231f5283dba6334c9fc6b7ebf32222cf",
  },
} as const;

export const OWNED_OBJECTS = {
  mainnet: {
    ADAPTER_UPGRADE_CAP:
      "0x6cba08aeacf0f6ed79dd42d0b979164e6d74f7a948efe86c649da5a74f58284f",
    DCA_UPGRADE_CAP:
      "0xae0a4a3d9376a037c7c17aa6cad9e8ef493c1346704319aab8610614aa229fff",
    DCA_ADMIN:
      "0xd46d636ff76434b4ab51a346ed7cf5572534de2faf572c41057c99d1b6e03302",
  },
  testnet: {
    ADAPTER_UPGRADE_CAP:
      "0xdd095fb1d1d69151bd0bc9109ad9b16baf796a70022bcab3b9e0d0a453c97e09",
    DCA_UPGRADE_CAP:
      "0xbeb2fa6fecaca163420c2c1d754a26f5c25ab9819181f7950b05db18f5c522d3",
    DCA_ADMIN:
      "0x7c528cf80424278dfcf5d907dca7c89bb525f21979c767d09082a6db3d74285f",
  },
} as const;

export const SHARED_OBJECTS: SharedObjects = {
  mainnet: {
    TRADE_POLICY_MUT: Inputs.SharedObjectRef({
      objectId:
        "0x3bf87821085b4bf6a0574dcee1de533c4296bf1b624dab1984f3a92df4ea28fd",
      initialSharedVersion: "330857975",
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    TRADE_POLICY: Inputs.SharedObjectRef({
      objectId:
        "0x3bf87821085b4bf6a0574dcee1de533c4296bf1b624dab1984f3a92df4ea28fd",
      initialSharedVersion: "330857975",
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    WHITELIST_MUT: Inputs.SharedObjectRef({
      objectId:
        "0xe8c8d4c8fd91962b77c8240bccaa2e69ab513ccce77611adaf872464abf453a4",
      initialSharedVersion: "330857976",
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    WHITELIST: Inputs.SharedObjectRef({
      objectId:
        "0xe8c8d4c8fd91962b77c8240bccaa2e69ab513ccce77611adaf872464abf453a4",
      initialSharedVersion: "330857976",
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    SETTINGS: Inputs.SharedObjectRef({
      objectId:
        "0x01fac821aeece5c5203560fb6ba7c4f01401b774e54994afc5b11c4172190111",
      initialSharedVersion: "330857975",
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    SETTINGS_MUT: Inputs.SharedObjectRef({
      objectId:
        "0x01fac821aeece5c5203560fb6ba7c4f01401b774e54994afc5b11c4172190111",
      initialSharedVersion: "330857975",
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
  },
  testnet: {
    TRADE_POLICY_MUT: Inputs.SharedObjectRef({
      objectId:
        "0x7af707af5407a0c8d84b9fc2f5068292d224d6ab349d52f9121900ff5e229977",
      initialSharedVersion: "109319125",
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    TRADE_POLICY: Inputs.SharedObjectRef({
      objectId:
        "0x7af707af5407a0c8d84b9fc2f5068292d224d6ab349d52f9121900ff5e229977",
      initialSharedVersion: "109319125",
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    WHITELIST_MUT: Inputs.SharedObjectRef({
      objectId:
        "0x391be588882816e3f3bf755d14ad7fad12062ad1c19c71020a9605ac662f9ea5",
      initialSharedVersion: "109319126",
      mutable: true,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    WHITELIST: Inputs.SharedObjectRef({
      objectId:
        "0x391be588882816e3f3bf755d14ad7fad12062ad1c19c71020a9605ac662f9ea5",
      initialSharedVersion: "109319126",
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    SETTINGS_MUT: Inputs.SharedObjectRef({
      objectId: "",
      initialSharedVersion: "",
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
    SETTINGS: Inputs.SharedObjectRef({
      objectId: "",
      initialSharedVersion: "",
      mutable: false,
    }) as ReturnType<typeof Inputs.SharedObjectRef>,
  },
} as const;

export const WITNESSES = {
  mainnet: {
    WHITELIST_ADAPTER: `${PACKAGES.mainnet.ADAPTERS}::whitelist_adapter::Witness`,
  },
  testnet: {
    WHITELIST_ADAPTER: `${PACKAGES.testnet.ADAPTERS}::whitelist_adapter::Witness`,
  },
} as const;
