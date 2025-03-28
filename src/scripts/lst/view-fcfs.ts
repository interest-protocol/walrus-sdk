import { SHARED_OBJECTS } from '../../blizzard/constants';
import { blizzardSDK, log, POW_9 } from '../utils.script';

(async () => {
  const fcfs = await blizzardSDK.viewFcfs({
    value: POW_9,
    blizzardStaking: SHARED_OBJECTS.WWAL_STAKING({
      mutable: true,
    }).objectId,
  });

  log(fcfs);
})();
