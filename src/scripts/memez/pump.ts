import { Transaction } from '@mysten/sui/transactions';

import {
  executeTx,
  keypair,
  memezTestnet,
  TEST_POOL_ID,
} from '../utils.script';
(async () => {
  const tx = new Transaction();

  const suiCoin = tx.splitCoins(tx.gas, [tx.pure.u64(10000)]);

  const { memeCoin, tx: tx2 } = await memezTestnet.pump({
    pool: TEST_POOL_ID,
    suiCoin,
    minAmountOut: 1000000000n,
    tx,
  });

  tx2.transferObjects([memeCoin], keypair.toSuiAddress());

  await executeTx(tx2);
})();
