import { SHARED_OBJECTS } from '../../blizzard/constants';
import {
  blizzardTestnet,
  executeTx,
  MYSTEN_LABS_K8S,
  SNOW_ADMIN_CAP,
  snowAclTestnet,
} from '../utils.script';

(async () => {
  const { tx, returnValues } = await snowAclTestnet.signIn({
    admin: SNOW_ADMIN_CAP,
  });

  await blizzardTestnet.addNode({
    tx,
    nodeId: MYSTEN_LABS_K8S,
    adminWitness: returnValues,
    blizzardStaking: SHARED_OBJECTS.testnet.SNOW_STAKING({
      mutable: true,
    }).objectId,
  });

  await executeTx(tx);
})();
