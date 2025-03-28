import { OWNED_OBJECTS } from '../../blizzard';
import { blizzardAcl } from '../utils.script';

(async () => {
  const isAdmin = await blizzardAcl.isAdmin({
    admin: OWNED_OBJECTS.BLIZZARD_ADMIN,
  });

  console.log(isAdmin);
})();
