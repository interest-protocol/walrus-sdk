import { SHARED_OBJECTS } from '../../tuskr/constants';
import { log, tuskrTestnet } from '../utils.script';

(async () => {
  const type = await tuskrTestnet.typeFromTuskrStaking(
    SHARED_OBJECTS.testnet.WW_STAKING({ mutable: false }).objectId
  );

  log(type);
})();
