import { executeTx, keypair, wwAclTestnet } from '../utils.script';

(async () => {
  const { tx } = await wwAclTestnet.newAdminAndTransfer({
    recipient: keypair.toSuiAddress(),
  });

  await executeTx(tx);
})();
