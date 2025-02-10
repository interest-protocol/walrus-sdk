import { SHARED_OBJECTS, TYPES } from '../tuskr/constants';
import {
  executeTx,
  MYSTEN_LABS_K8S,
  tuskrTestnet,
  WW_ADMIN_CAP,
  wwAclTestnet,
} from './utils.script';

(async () => {
  const { tx, returnValues } = wwAclTestnet.signIn({
    admin: WW_ADMIN_CAP,
  });

  await tuskrTestnet
    .setLstType(TYPES.testnet.WW)
    .setTuskrStaking(
      SHARED_OBJECTS.testnet.WW_STAKING({ mutable: true }).objectId
    )
    .addNode({
      tx,
      nodeId: MYSTEN_LABS_K8S,
      adminWitness: returnValues,
    });

  await executeTx(tx);
})();
