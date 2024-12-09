import { MIGRATOR_WITNESSES, OWNED_OBJECTS } from '../../memez';
import { configTestnet, executeTx } from '../utils.script';

const ownedObjects = OWNED_OBJECTS.testnet;
const migratorWitness = MIGRATOR_WITNESSES.testnet.TEST;

(async () => {
  const { tx, authWitness } = configTestnet.signIn({
    admin: ownedObjects.ADMIN,
  });

  const tx2 = configTestnet.addMigrationWitness({
    authWitness,
    witness: migratorWitness,
    tx,
  });

  await executeTx(tx2);
})();
