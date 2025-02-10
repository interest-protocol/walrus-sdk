import { SHARED_OBJECTS, TYPES } from '../../tuskr/constants';
import {
  executeTx,
  tuskrTestnet,
  WW_ADMIN_CAP,
  wwAclTestnet,
} from '../utils.script';

(async () => {
  const { tx, returnValues } = wwAclTestnet.signIn({
    admin: WW_ADMIN_CAP,
  });

  await tuskrTestnet
    .setLstType(TYPES.testnet.WW)
    .setTuskrStaking(SHARED_OBJECTS.testnet.WW_STAKING({ mutable: true }))
    .removeNode({
      tx,
      nodeId: '0x1',
      adminWitness: returnValues,
    });

  await executeTx(tx);
})();
