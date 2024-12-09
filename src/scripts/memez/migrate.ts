import { MigratorSDK } from '../../memez/migrator';
import { executeTx, memezTestnet, TEST_POOL_ID } from '../utils.script';

const MEME_COIN_TYPE =
  '0xfafb7a9d33dd31fc9d6f37d625aa877d7982fe25eb16ba06f4a5861e541030f8::aptos::APTOS';

(async () => {
  const { tx, migrator } = await memezTestnet.migrate({
    pool: TEST_POOL_ID,
  });

  const migratorSDK = new MigratorSDK();

  const { tx: tx2 } = migratorSDK.migrate({
    tx,
    migrator,
    memeCoinType: MEME_COIN_TYPE,
  });

  await executeTx(tx2);
})();
