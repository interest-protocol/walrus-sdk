import { SHARED_OBJECTS } from '../../tuskr/constants';
import { tuskrTestnet } from '../utils.script';

(async () => {
  const fees = await tuskrTestnet.getFees(
    SHARED_OBJECTS.testnet.WW_STAKING({ mutable: false }).objectId
  );

  console.log(fees);
})();
