import { blizzardAclTestnet } from '../utils.script';
import { BLIZZARD_ADMIN_CAP } from '../utils.script';

(async () => {
  const isAdmin = await blizzardAclTestnet.isAdmin({
    admin: BLIZZARD_ADMIN_CAP,
  });

  console.log(isAdmin);
})();
