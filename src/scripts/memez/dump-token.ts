import { Transaction } from '@mysten/sui/transactions';

import {
  executeTx,
  keypair,
  memezTestnet,
  TEST_POOL_ID,
} from '../utils.script';

(async () => {
  const tx = new Transaction();

  const { suiCoin, tx: tx2 } = await memezTestnet.dumpToken({
    pool: TEST_POOL_ID,
    memeToken:
      '0x0a256522091a350e3cc3ac86982608803bce754ede1199785227bfc822603b71',
    tx,
  });

  tx2.transferObjects([suiCoin], tx.pure.address(keypair.toSuiAddress()));

  await executeTx(tx2);
})();
