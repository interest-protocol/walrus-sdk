import { OWNED_OBJECTS } from '../../memez';
import { aclTestnet } from '../utils.script';

const ownedObjects = OWNED_OBJECTS.testnet;

(async () => {
  const result = await aclTestnet.isAdmin({
    admin: ownedObjects.ADMIN,
  });

  console.log(result);
})();
