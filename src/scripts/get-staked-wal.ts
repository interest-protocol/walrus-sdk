import { log, walrusSDK } from './utils.script';

(async () => {
  const stakedWal = await walrusSDK.getStakedWal(
    '0x0332b3805ab2a6feeb1307bcf346c99449aae2dbd8c2f7d2d9535c01fca7465b'
  );

  log(stakedWal);
})();
