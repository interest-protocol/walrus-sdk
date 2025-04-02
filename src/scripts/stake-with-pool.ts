import { coinWithBalance, Transaction } from '@mysten/sui/transactions';

import { NODES, TYPES } from '../walrus/constants';
import { devInspectTransaction, keypair, walrusSDK } from './utils.script';

(async () => {
  const tx = new Transaction();

  const walCoin = coinWithBalance({
    balance: 1_000_000_000n,
    type: TYPES.WAL,
  })(tx);

  const { tx: tx2, returnValue } = walrusSDK.stakeWithPool({
    tx,
    walCoin,
    nodeId: NODES.MIRAI,
  });

  tx2.transferObjects([returnValue], keypair.toSuiAddress());

  await devInspectTransaction({
    tx: tx2,
  });
})();
