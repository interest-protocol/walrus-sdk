import { SHARED_OBJECTS } from '../../blizzard/constants';
import { blizzardAcl, log } from '../utils.script';

(async () => {
  const type = await blizzardAcl.typeFromBlizzardAcl(
    SHARED_OBJECTS.BLIZZARD_ACL({ mutable: false }).objectId
  );

  log(type);
})();
