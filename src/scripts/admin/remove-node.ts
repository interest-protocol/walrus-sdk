import { SHARED_OBJECTS } from '../../tuskr/constants';
import {
  executeTx,
  tuskrTestnet,
  WW_ADMIN_CAP,
  wwAclTestnet,
} from '../utils.script';

(async () => {
  const { tx, returnValues } = await wwAclTestnet.signIn({
    admin: WW_ADMIN_CAP,
  });

  await tuskrTestnet
    .setTuskrStaking(SHARED_OBJECTS.testnet.WW_STAKING({ mutable: true }))
    .removeNode({
      tx,
      nodeId: '0x1',
      adminWitness: returnValues,
    });

  await executeTx(tx);
})();
