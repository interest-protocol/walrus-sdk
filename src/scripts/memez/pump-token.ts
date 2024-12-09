import { Transaction } from '@mysten/sui/transactions';

import { executeTx, memezTestnet, POW_9, TEST_POOL_ID } from '../utils.script';

const MEME_COIN_TYPE =
  'fafb7a9d33dd31fc9d6f37d625aa877d7982fe25eb16ba06f4a5861e541030f8::aptos::APTOS';

(async () => {
  const tx = new Transaction();

  const suiCoin = tx.splitCoins(tx.gas, [tx.pure.u64(105n * POW_9)]);

  const { memeToken, tx: tx2 } = await memezTestnet.pumpToken({
    pool: TEST_POOL_ID,
    suiCoin,
    tx,
  });

  const { tx: tx3 } = await memezTestnet.keepToken({
    memeCoinType: MEME_COIN_TYPE,
    token: memeToken,
    tx: tx2,
  });

  await executeTx(tx3);
})();
