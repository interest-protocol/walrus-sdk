import { getFullnodeUrl } from '@mysten/sui/client';

import { PACKAGES, SHARED_OBJECTS } from './constants';
import { MemezFunConstructorArgs } from './memez.types';
import { Network } from './memez.types';

export const getDefaultArgs = (): MemezFunConstructorArgs => ({
  packages: PACKAGES[Network.Testnet],
  fullNodeUrl: getFullnodeUrl('testnet'),
  sharedObjects: SHARED_OBJECTS[Network.Testnet],
  network: Network.Testnet,
});
