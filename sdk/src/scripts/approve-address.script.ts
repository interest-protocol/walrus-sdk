import { Transaction } from '@mysten/sui/transactions';

import { OWNED_OBJECTS, PACKAGES, SHARED_OBJECTS } from '../dca/constants';
import { executeTx, log } from './utils.script';

(async () => {
  try {
    const tx = new Transaction();

    tx.moveCall({
      target: `${PACKAGES['testnet'].ADAPTERS}::whitelist_adapter::add`,
      arguments: [
        tx.object(SHARED_OBJECTS.testnet.WHITELIST_MUT),
        tx.object(OWNED_OBJECTS.testnet.DCA_ADMIN),
        tx.pure.address(
          '0xc23ea8e493616b1510d9405ce05593f8bd1fb30f44f92303ab2c54f6c8680ecb'
        ),
      ],
    });

    const result = await executeTx(tx);

    log(result);
  } catch (e) {
    console.log(e);
  }
})();
