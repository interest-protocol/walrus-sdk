import { SHARED_OBJECTS } from '../../tuskr/constants';
import { log, tuskrAclTestnet } from '../utils.script';

(async () => {
  const type = await tuskrAclTestnet.typeFromTuskrAcl(
    SHARED_OBJECTS.testnet.WW_ACL({ mutable: false }).objectId
  );

  log(type);
})();
