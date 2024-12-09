import { MigratorSDK } from '../../memez/migrator';
import { executeTx, memezTestnet, TEST_POOL_ID } from '../utils.script';

const MEME_COIN_TYPE =
  '0x97bb63c347b46a4f96f52bdb99a72b1311dee2bd9535c27164c7d62113e40e21::aptos::APTOS';

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
