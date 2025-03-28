import { OWNED_OBJECTS } from '../../blizzard';
import { executeTx, keypair, wwalAcl } from '../utils.script';

(async () => {
  const { tx } = await wwalAcl.newAdminAndTransfer({
    recipient: keypair.toSuiAddress(),
    superAdmin: OWNED_OBJECTS.WWAL_SUPER_ADMIN,
  });

  await executeTx(tx);
})();
