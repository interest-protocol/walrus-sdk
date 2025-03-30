import { OWNED_OBJECTS } from 'src/blizzard';
import invariant from 'tiny-invariant';

import { blizzardAcl, blizzardSDK, executeTx } from '../utils.script';

const LST_TREASURY_CAP =
  '0xa8315b6458e455121e0d8c7a656e31e1c9ccb9433c166289a3c93904d2046cdc';

(async () => {
  const superAdminRecipient =
    '0x3d75ce484b26ee86e6c49f56775b8e5a10f51eada2cac1346997c9c3afc99fcd';

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
