import { normalizeSuiAddress } from '@mysten/sui/utils';

import { CONFIG_KEYS, MAX_BPS, OWNED_OBJECTS, Treasuries } from '../../memez';
import { configTestnet, executeTx } from '../utils.script';

const ownedObjects = OWNED_OBJECTS.testnet;
const configurationKey = CONFIG_KEYS.testnet.RECRD;

(async () => {
  const { tx, authWitness } = configTestnet.signIn({
    admin: ownedObjects.ADMIN,
  });

  const ipxTreasury = normalizeSuiAddress(Treasuries.IPX);
  const recrdTreasury = normalizeSuiAddress(Treasuries.RECRD);

  const tx2 = configTestnet.setFees({
    authWitness,
    tx,
    configurationKey,
    values: [
      // last index is the creator fee nominal
      [6_600n, MAX_BPS - 6_600n, 30_000_000n],
      // last index is the swap fee in bps
      [5_000n, 2_500n, 2_500n, 100n],
      // last index is the migration fee nominal
      [1_000n, 4_000n, 2_500n, 2_500n, 30_000_000n],
      // last index is the allocation of meme coin in BPS
      // The [last_index - 1] is the vesting period in MS
      [3_334n, 3_333n, 3_333n, 0n, 300n],
    ],
    recipients: [
      [ipxTreasury, recrdTreasury],
      [recrdTreasury],
      [ipxTreasury, recrdTreasury],
      [recrdTreasury],
    ],
  });

  await executeTx(tx2);
})();
