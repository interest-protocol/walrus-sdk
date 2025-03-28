import { OWNED_OBJECTS } from 'src/blizzard';
import invariant from 'tiny-invariant';

import { blizzardAcl, blizzardSDK, executeTx } from '../utils.script';

const LST_TREASURY_CAP = '';

(async () => {
  const superAdminRecipient = '';

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
