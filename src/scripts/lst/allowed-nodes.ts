import { SHARED_OBJECTS } from 'src/blizzard';

import { blizzardSDK } from '../utils.script';

(async () => {
  const allowedNodes = await blizzardSDK.allowedNodes(
    SHARED_OBJECTS.WWAL_STAKING({ mutable: true })
  );

  console.log(allowedNodes);
})();
