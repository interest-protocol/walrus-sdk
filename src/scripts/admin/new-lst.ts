import {
  ADMIN_CAP,
  executeTx,
  keypair,
  tuskrAclTestnet,
  tuskrTestnet,
} from '../utils.script';

const WW_TREASURY_CAP =
  '0xdb3a2575c034b9137700a1397213c70fd51f2c441713be96856ca7b196583696';

(async () => {
  const superAdminRecipient = keypair.toSuiAddress();

  const { tx, returnValues } = await tuskrAclTestnet.signIn({
    admin: ADMIN_CAP,
  });

  await tuskrTestnet.newLST({
    tx,
    superAdminRecipient,
    treasuryCap: WW_TREASURY_CAP,
    adminWitness: returnValues,
  });

  await executeTx(tx);
})();
