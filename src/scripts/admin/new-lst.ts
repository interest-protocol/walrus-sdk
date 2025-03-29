import { OWNED_OBJECTS } from 'src/blizzard';
import invariant from 'tiny-invariant';

import { blizzardAcl, blizzardSDK, executeTx } from '../utils.script';

const LST_TREASURY_CAP =
  '0xbd3194d22731232d22f484bb44a9d02880bef12f2ab1fd5abe802ea9a08e69a5';

(async () => {
  const superAdminRecipient =
    '0xe024e215dcb70a3d670d3af2ca70aa6b3ea82d40dc39cc01d8fe2c6ab2d4fce9';

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
