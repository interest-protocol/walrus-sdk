import { Transaction } from '@mysten/sui/transactions';

import { OBJECT_IDS, WHITELIST_TESTNET_WITNESS } from './constants.script';
import { executeTx, log } from './utils.script';

(async () => {
  try {
    const tx = new Transaction();

    tx.moveCall({
      target: `${OBJECT_IDS.testnet.dca}::dca::approve`,
      typeArguments: [WHITELIST_TESTNET_WITNESS],
      arguments: [
        tx.object(OBJECT_IDS.testnet.tradePolicy),
        tx.object(OBJECT_IDS.testnet.adminCap),
      ],
    });

    const result = await executeTx(tx);

    log(result);
  } catch (e) {
    console.log(e);
  }
})();
