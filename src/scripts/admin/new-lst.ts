import { OWNED_OBJECTS } from 'src/blizzard';

import { blizzardAcl, blizzardSDK, executeTx, keypair } from '../utils.script';

const LST_TREASURY_CAP =
  '0x423ec7efb16a74e6885385a49df3436758fa9e79302a9f0de9485b8874cf2aaf';

(async () => {
  const superAdminRecipient = keypair.toSuiAddress();

  const { tx, returnValues } = await blizzardAcl.signIn({
    admin: OWNED_OBJECTS.BLIZZARD_ADMIN,
  });

  await blizzardSDK.newLST({
    tx,
    superAdminRecipient,
    treasuryCap: LST_TREASURY_CAP,
    adminWitness: returnValues,
  });

  await executeTx(tx);
})();
