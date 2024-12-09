import {
  executeTx,
  keypair,
  memezTestnet,
  TEST_POOL_ID,
} from '../utils.script';

const TOKEN_ID =
  '0xbbfea79fff228a24dc9ce5b96c7522d9bdcb701d3d04bbac58a59babe53b362c';

(async () => {
  const { memeCoin, tx } = await memezTestnet.toCoin({
    pool: TEST_POOL_ID,
    memeToken: TOKEN_ID,
  });

  tx.transferObjects([memeCoin], tx.pure.address(keypair.toSuiAddress()));

  await executeTx(tx);
})();
