import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

import { MemezFunSDK } from './memez';
import { Network } from './memez.types';

export const testnetMemezFunSDK = new MemezFunSDK();

export const mainnetMemezFunSDK = new MemezFunSDK({
  network: Network.Mainnet,
  fullNodeUrl: getFullnodeUrl('mainnet'),
});

export const testnetSuiClient = new SuiClient({
  url: getFullnodeUrl('testnet'),
});

export const mainnetSuiClient = new SuiClient({
  url: getFullnodeUrl('mainnet'),
});
