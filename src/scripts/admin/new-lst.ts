import {
  BLIZZARD_ADMIN_CAP,
  blizzardAclTestnet,
  blizzardTestnet,
  executeTx,
  keypair,
} from '../utils.script';

const SNOW_TREASURY_CAP =
  '0x0e63f8925bab09d466cf31878dcbcf79b0dcae02049ff3ffaf24eaf03650eb63';

(async () => {
  const superAdminRecipient = keypair.toSuiAddress();

  const { tx, returnValues } = await blizzardAclTestnet.signIn({
    admin: BLIZZARD_ADMIN_CAP,
  });

  await blizzardTestnet.newLST({
    tx,
    superAdminRecipient,
    treasuryCap: SNOW_TREASURY_CAP,
    adminWitness: returnValues,
  });

  await executeTx(tx);
})();
