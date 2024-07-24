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
    dca: '0x8cff310615dd198bb64af09efcf1bc54bd6a71bcc2fe2a1c8302b6f76f8ee427',
    adapters:
      '0x5fee448eda1dd26b9fe1c8d72ee5228631c4b337c995d1e62dc8e61ef4aa30b9',
    adminCap:
      '0x82e3c9a8d7170c43e883c16c4b11daca046e966d058ea87d46435c824375730e',
    tradePolicy:
      '0x68fec6e6f2528821bcaba9f6fd1750e8eac7de75fc09dc68e03174c04c828539',
    adapterWhitelist:
      '0xb977fc79289fd51c932ec8de1ca460b4d1bc8875adc5d363ae5eb0920ed8152d',
  },
  mainnet: {
    dca: '0x0',
    adapters: '0x0',
    adminCap: '0x0',
    tradePolicy: '0x0',
    hopWhitelist: '0x0',
  },
};

export const WHITELIST_TESTNET_WITNESS = `${OBJECT_IDS.testnet.adapters}::whitelist_adapter::Witness`;
