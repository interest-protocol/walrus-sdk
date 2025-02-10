import { TUSKR_STAKING, TYPES } from '../tuskr/constants';
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
    .setTuskrStaking(TUSKR_STAKING.testnet.WW)
    .addNode({
      tx,
      nodeId: MYSTEN_LABS_K8S,
      adminWitness: returnValues,
    });

  await executeTx(tx);
})();
