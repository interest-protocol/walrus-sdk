import { SHARED_OBJECTS } from '../../blizzard/constants';
import { blizzardTestnet } from '../utils.script';

(async () => {
  const fees = await blizzardTestnet.getFees(
    SHARED_OBJECTS.testnet.SNOW_STAKING({ mutable: false }).objectId
  );

  console.log(fees);
})();
