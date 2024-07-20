export const COINS = {
  usdt: {
    treasuryCap:
      '0x99ee533652462c5f990c193bf502c16429af600d51b7bf774d1e3cf76623cab6',
    coinType:
      '0xcd79b4f3d61afacdd30632ccdfc05f923b9847d21ba19c7bae9c73e5d860f5b5::usdt::USDT',
  },
  usdc: {
    treasuryCap:
      '0x59ba3c06c55a80e64551a0f9289d5fee9522778f4d81d5871d15f6d0a7686a87',
    coinType:
      '0xcd79b4f3d61afacdd30632ccdfc05f923b9847d21ba19c7bae9c73e5d860f5b5::usdc::USDC',
  },
  eth: {
    treasuryCap:
      '0xc3cea680608424c2d4f618577d2991c7a99bd29a98f58e0be75555858e9c54af',
    coinType:
      '0xcd79b4f3d61afacdd30632ccdfc05f923b9847d21ba19c7bae9c73e5d860f5b5::eth::ETH',
  },
  btc: {
    treasuryCap:
      '0xea65017ca55ad4b46f51c2e0ce9df86a3bcccba33ccbfa51aade38c2c92fa963',
    coinType:
      '0xcd79b4f3d61afacdd30632ccdfc05f923b9847d21ba19c7bae9c73e5d860f5b5::btc::BTC',
  },
};

export const OBJECT_IDS = {
  testnet: {
    dca: '0xd94222253b6e3139c443077a6f783c2a3054479cfcc858bcd30fce352656474c',
    adapters:
      '0x721d95ec2f1b21b032bb54a85a4a79636a420c6131b633f4fbcebe054f6c8255',
    adminCap:
      '0xe0ec337608a170d6c4de73060d640dcc3ca74c76813876dd94c12b642781265d',
    tradePolicy:
      '0x1f35cd42b9534e39617d8e2f49783f97eaa7b78e5d624d3a119bc40c97206209',
    hopWhitelist:
      '0xaa7646745007ea8ee8abf10d26c330d02b15ff312a11c9bbe217a55094903d58',
  },
  mainnet: {
    dca: '0x0',
    adapters: '0x0',
    adminCap: '0x0',
    tradePolicy: '0x0',
    hopWhitelist: '0x0',
  },
};

export const HOP_TESTNET_WITNESS = `${OBJECT_IDS.testnet.adapters}::hop_adapter::Hop`;
