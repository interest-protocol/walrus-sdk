import invariant from 'tiny-invariant';

import { OWNED_OBJECTS } from '../../blizzard';
import { executeTx, wwalAcl } from '../utils.script';

const recipient = '';

(async () => {
  invariant(recipient, 'recipient is required');
  const { tx } = await wwalAcl.newAdminAndTransfer({
    recipient,
    superAdmin: OWNED_OBJECTS.WWAL_SUPER_ADMIN,
  });

  await executeTx(tx);
})();
