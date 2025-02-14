import { SHARED_OBJECTS } from '../../blizzard/constants';
import { blizzardTestnet } from '../utils.script';

(async () => {
  const type = await blizzardTestnet.typeFromBlizzardStaking(
    SHARED_OBJECTS.testnet.SNOW_STAKING({
      mutable: true,
    }).objectId
  );

  console.log(type);
})();
