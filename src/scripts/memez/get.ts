import { log, memezTestnet, TEST_POOL_ID } from '../utils.script';

(async () => {
  const r = await memezTestnet.getPumpPool(TEST_POOL_ID);

  log(r);
})();
