import { SHARED_OBJECTS } from '../../blizzard/constants';
import { blizzardSDK } from '../utils.script';

(async () => {
  const type = await blizzardSDK.typeFromBlizzardStaking(
    SHARED_OBJECTS.NWAL_ACL({
      mutable: true,
    }).objectId
  );

  console.log(type);
})();
