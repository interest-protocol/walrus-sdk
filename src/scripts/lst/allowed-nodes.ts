import { SHARED_OBJECTS } from 'src/blizzard';

import { blizzardTestnet } from '../utils.script';

(async () => {
  const allowedNodes = await blizzardTestnet.allowedNodes(
    SHARED_OBJECTS.testnet.SNOW_STAKING({ mutable: true })
  );

  console.log(allowedNodes);
})();
