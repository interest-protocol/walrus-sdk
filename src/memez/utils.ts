import { getFullnodeUrl } from '@mysten/sui/client';

import { PACKAGES, SHARED_OBJECTS } from './constants';
import { AclConstructorArgs, MemezFunConstructorArgs } from './memez.types';
import { Network } from './memez.types';

export const getMemezFunDefaultArgs = (
  network = Network.Testnet
): MemezFunConstructorArgs => ({
  packages: PACKAGES[network],
  fullNodeUrl: getFullnodeUrl(
    network === Network.Mainnet ? 'mainnet' : 'testnet'
  ),
  sharedObjects: SHARED_OBJECTS[network],
  network,
});

export const getACLDefaultArgs = (
  network = Network.Testnet
): AclConstructorArgs => ({
  package: PACKAGES[network].ACL,
  aclSharedObjectMap: SHARED_OBJECTS[network].ACL,
  fullNodeUrl: getFullnodeUrl(
    network === Network.Mainnet ? 'mainnet' : 'testnet'
  ),
  network,
});
