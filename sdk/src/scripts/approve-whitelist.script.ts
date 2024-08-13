import { Transaction } from '@mysten/sui/transactions';

import {
  OWNED_OBJECTS,
  PACKAGES,
  SHARED_OBJECTS,
  WITNESSES,
} from '../dca/constants';
import { executeTx, log } from './utils.script';

(async () => {
  try {
    const tx = new Transaction();

    tx.moveCall({
      target: `${PACKAGES.testnet.DCA}::dca::approve`,
      typeArguments: [WITNESSES.testnet.WHITELIST_ADAPTER],
      arguments: [
        tx.object(SHARED_OBJECTS.testnet.TRADE_POLICY_MUT),
        tx.object(OWNED_OBJECTS.testnet.DCA_ADMIN),
      ],
    });

    const result = await executeTx(tx);

    log(result);
  } catch (e) {
    console.log(e);
  }
})();
