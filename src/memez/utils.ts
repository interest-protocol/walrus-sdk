import { getFullnodeUrl } from '@mysten/sui/client';

import { PACKAGES, SHARED_OBJECTS } from './constants';
import { SdkConstructorArgs } from './memez.types';
import { Network } from './memez.types';

export const getsSdkDefaultArgs = (
  network = Network.Testnet
): SdkConstructorArgs => ({
  packages: PACKAGES[network],
  fullNodeUrl: getFullnodeUrl(
    network === Network.Mainnet ? 'mainnet' : 'testnet'
  ),
  sharedObjects: SHARED_OBJECTS[network],
  network,
});
