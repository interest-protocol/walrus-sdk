import { OWNED_OBJECTS, TYPES } from '../../tuskr';
import { aclTestnet, executeTx, keypair } from '../utils.script';

(async () => {
  aclTestnet.setSuperAdmin(OWNED_OBJECTS.testnet.TUSKR_SUPER_ADMIN);
  aclTestnet.setLstType(TYPES.testnet.TUSKR);

  const { tx } = await aclTestnet.newAdminAndTransfer({
    recipient: keypair.toSuiAddress(),
  });

  await executeTx(tx);
})();
