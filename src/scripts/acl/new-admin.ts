import { OWNED_OBJECTS } from '../../memez';
import { aclTestnet, executeTx, keypair } from '../utils.script';

const ownedObjects = OWNED_OBJECTS.testnet;

(async () => {
  const recipient = keypair.toSuiAddress();

  const tx = aclTestnet.newAdminAndTransfer({
    superAdmin: ownedObjects.SUPER_ADMIN,
    recipient,
  });

  await executeTx(tx);
})();
