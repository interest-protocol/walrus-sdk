import { SHARED_OBJECTS } from 'src/blizzard';

import { blizzardSDK, log } from '../utils.script';

(async () => {
  const blizzardStaking = await blizzardSDK.getBlizzardStaking(
    SHARED_OBJECTS.MWAL_STAKING({ mutable: false })
  );

  log(blizzardStaking);
})();
