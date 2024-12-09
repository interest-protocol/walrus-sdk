import { log, memezTestnet } from '../utils.script';

const POOL_ID =
  '0x6b4aa00a0ad34709a6771291ea04d90b7729eb5aad610f3af99a7b9e1f32eed6';

(async () => {
  const r = await memezTestnet.getPumpPool(POOL_ID);

  log(r);
})();
