import { Transaction } from '@mysten/sui/transactions';

import { OBJECT_IDS } from './constants.script';
import { executeTx, log } from './utils.script';

(async () => {
  try {
    const tx = new Transaction();

    tx.moveCall({
      target: `${OBJECT_IDS.testnet.adapters}::hop_adapter::add`,
      arguments: [
        tx.object(OBJECT_IDS.testnet.hopWhitelist),
        tx.object(OBJECT_IDS.testnet.adminCap),
        tx.pure.address(
          '0xae67a84ffd814ac5005e2de892be9acb2372712b7ec9605360620e964deb09a4'
        ),
      ],
    });

    const result = await executeTx(tx);

    log(result);
  } catch (e) {
    console.log(e);
  }
})();
