import { SHARED_OBJECTS } from '../../blizzard/constants';
import { blizzardTestnet, log, POW_9 } from '../utils.script';

(async () => {
  const fcfs = await blizzardTestnet.viewFcfs({
    value: POW_9 / 2n,
    blizzardStaking: SHARED_OBJECTS.testnet.SNOW_STAKING({
      mutable: true,
    }).objectId,
  });

  log(fcfs);
})();
