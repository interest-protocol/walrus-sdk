import { OWNED_OBJECTS } from 'src/blizzard';
import invariant from 'tiny-invariant';

import { blizzardAcl, blizzardSDK, executeTx } from '../utils.script';

const LST_TREASURY_CAP =
  '0xe1b3079eea6e85fba6b013d101351f9c6397e5a56b8fe48624de5aa71a796933';

(async () => {
  const superAdminRecipient =
    '0xde0053243f3226649701a7fe2c3988be11941bf3ff3535f3c8c5bf32fc600220';

  invariant(LST_TREASURY_CAP, 'LST_TREASURY_CAP is not set');
  invariant(superAdminRecipient, 'superAdminRecipient is not set');

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
