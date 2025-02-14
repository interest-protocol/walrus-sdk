import { SHARED_OBJECTS } from '../../blizzard/constants';
import { log, snowAclTestnet } from '../utils.script';

(async () => {
  const type = await snowAclTestnet.typeFromBlizzardAcl(
    SHARED_OBJECTS.testnet.SNOW_ACL({ mutable: false }).objectId
  );

  log(type);
})();
