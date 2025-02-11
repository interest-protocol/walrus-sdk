import { Transaction } from '@mysten/sui/transactions';

import { SHARED_OBJECTS, TYPES } from '../../tuskr/constants';
import {
  executeTx,
  getCoinOfValue,
  MYSTEN_LABS_K8S,
  POW_9,
  tuskrTestnet,
} from '../utils.script';

(async () => {
  const tx = new Transaction();

  const walCoin = await getCoinOfValue({
    tx,
    coinType: TYPES.testnet.WAL,
    coinValue: POW_9,
  });

  const { returnValues: nft } = await tuskrTestnet
    .setTuskrStaking(
      SHARED_OBJECTS.testnet.WW_STAKING({ mutable: true }).objectId
    )
    .mintAfterVotesFinished({
      tx,
      nodeId: MYSTEN_LABS_K8S,
      walCoin,
    });

  tuskrTestnet.keepStakeNft({
    tx,
    nft,
  });

  await executeTx(tx);
})();
