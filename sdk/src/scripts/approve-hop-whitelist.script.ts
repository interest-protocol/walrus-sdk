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
          '0x94fbcf49867fd909e6b2ecf2802c4b2bba7c9b2d50a13abbb75dbae0216db82a'
        ),
      ],
    });

    const result = await executeTx(tx);

    log(result);
  } catch (e) {
    console.log(e);
  }
})();
