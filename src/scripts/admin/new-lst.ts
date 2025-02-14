import { OWNED_OBJECTS } from 'src/blizzard';

import {
  ADMIN_CAP,
  blizzardAclTestnet,
  blizzardTestnet,
  executeTx,
  keypair,
} from '../utils.script';

const SNOW_TREASURY_CAP =
  '0xdb3a2575c034b9137700a1397213c70fd51f2c441713be96856ca7b196583696';

(async () => {
  const superAdminRecipient = keypair.toSuiAddress();

  const { tx, returnValues } = await blizzardAclTestnet.signIn({
    admin: ADMIN_CAP,
  });

  await blizzardTestnet.newLST({
    tx,
    superAdminRecipient,
    treasuryCap: SNOW_TREASURY_CAP,
    adminWitness: returnValues,
    blizzardAdmin: OWNED_OBJECTS.testnet.BLIZZARD_SUPER_ADMIN,
  });

  await executeTx(tx);
})();
