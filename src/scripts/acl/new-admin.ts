import { OWNED_OBJECTS } from 'src/blizzard';

import { executeTx, keypair, snowAclTestnet } from '../utils.script';

(async () => {
  const { tx } = await snowAclTestnet.newAdminAndTransfer({
    recipient: keypair.toSuiAddress(),
    superAdmin: OWNED_OBJECTS.testnet.SNOW_SUPER_ADMIN,
  });

  await executeTx(tx);
})();
