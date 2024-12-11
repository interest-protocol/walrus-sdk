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
      [MAX_BPS, 10],
      [MAX_BPS, 0, 0],
      [MAX_BPS, 0, 1],
    ],
    recipients: [[recipient], [recipient], [recipient]],
  });

  await executeTx(tx2);
})();
