import { SHARED_OBJECTS } from '../../blizzard/constants';
import {
  blizzardTestnet,
  executeTx,
  SNOW_ADMIN_CAP,
  snowAclTestnet,
  STUDIO_MIRAI,
} from '../utils.script';

(async () => {
  const { tx, returnValues } = await snowAclTestnet.signIn({
    admin: SNOW_ADMIN_CAP,
  });

  await blizzardTestnet.addNode({
    tx,
    nodeId: STUDIO_MIRAI,
    adminWitness: returnValues,
    blizzardStaking: SHARED_OBJECTS.testnet.SNOW_STAKING({
      mutable: true,
    }).objectId,
  });

  await executeTx(tx);
})();
