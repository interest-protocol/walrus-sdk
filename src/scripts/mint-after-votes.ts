import { Transaction } from '@mysten/sui/transactions';

import { TUSKR_STAKING, TYPES } from '../tuskr/constants';
import {
  executeTx,
  getCoinOfValue,
  MYSTEN_LABS_K8S,
  POW_9,
  tuskrTestnet,
} from './utils.script';

(async () => {
  const tx = new Transaction();

  const walCoin = await getCoinOfValue({
    tx,
    coinType: TYPES.testnet.WAL,
    coinValue: POW_9,
  });

  const { returnValues: nft } = tuskrTestnet
    .setLstType(TYPES.testnet.WW)
    .setTuskrStaking(TUSKR_STAKING.testnet.WW)
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
