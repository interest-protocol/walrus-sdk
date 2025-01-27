import { CONFIG_KEYS, OWNED_OBJECTS } from '../../memez';
import { configTestnet, executeTx } from '../utils.script';

const ownedObjects = OWNED_OBJECTS.testnet;
const configurationKey = CONFIG_KEYS.testnet.RECRD;

(async () => {
  const { tx, authWitness } = configTestnet.signIn({
    admin: ownedObjects.ADMIN,
  });

  const tx2 = configTestnet.setPump({
    authWitness,
    tx,
    configurationKey,
    // Burn Tax
    // Virtual liquidity
    // Target liquidity
    // liquidity provision
    values: [0, 5_000_000_000, 10_000_000_000, 0],
  });

  await executeTx(tx2);
})();
