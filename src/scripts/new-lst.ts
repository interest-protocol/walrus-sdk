import { Transaction } from '@mysten/sui/transactions';

import { executeTx, keypair, tuskrTestnet } from './utils.script';

const WW_TREASURY_CAP =
  '0xd95ac8e96a7348dc3877c1eb20c63e6a2933519f656ab6e3e00675c3b91a4d5a';

(async () => {
  const superAdminRecipient = keypair.toSuiAddress();
  const tx = new Transaction();

  await tuskrTestnet.newLST({
    tx,
    superAdminRecipient,
    treasuryCap: WW_TREASURY_CAP,
  });

  await executeTx(tx);
})();
