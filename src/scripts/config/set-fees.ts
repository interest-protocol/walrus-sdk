import { CONFIG_KEYS, MAX_BPS, OWNED_OBJECTS } from '../../memez';
import { configTestnet, executeTx, keypair } from '../utils.script';

const ownedObjects = OWNED_OBJECTS.testnet;
const configurationKey = CONFIG_KEYS.testnet.DEFAULT;

(async () => {
  const recipient = keypair.toSuiAddress();

  const { tx, authWitness } = configTestnet.signIn({
    admin: ownedObjects.ADMIN,
  });

  const tx2 = configTestnet.setFees({
    authWitness,
    tx,
    configurationKey,
    values: [
      // last index is the creator fee nominal
      [MAX_BPS, 10],
      // last index is the swap fee in bps
      [MAX_BPS, 0],
      // last index is the migration fee nominal
      [MAX_BPS, 1],
      // last index is the allocation of meme coin in BPS
      // The [last_index - 1] is the vesting period in MS
      [MAX_BPS, 0, 0],
    ],
    recipients: [[recipient], [recipient], [recipient], [recipient]],
  });

  await executeTx(tx2);
})();
