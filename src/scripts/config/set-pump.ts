import { CONFIG_KEYS, OWNED_OBJECTS } from '../../memez';
import { configTestnet, executeTx } from '../utils.script';

const ownedObjects = OWNED_OBJECTS.testnet;
const configurationKey = CONFIG_KEYS.testnet.DEFAULT;

(async () => {
  const { tx, authWitness } = configTestnet.signIn({
    admin: ownedObjects.ADMIN,
  });

  const tx2 = configTestnet.setPump({
    authWitness,
    tx,
    configurationKey,
    values: [0, 100_000_000_000, 102_000_000_000, 500],
  });

  await executeTx(tx2);
})();
