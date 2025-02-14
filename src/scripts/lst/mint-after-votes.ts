import { Transaction } from '@mysten/sui/transactions';

import { SHARED_OBJECTS, TYPES } from '../../blizzard/constants';
import {
  blizzardTestnet,
  executeTx,
  getCoinOfValue,
  MYSTEN_LABS_K8S,
  POW_9,
} from '../utils.script';

(async () => {
  const tx = new Transaction();

  const walCoin = await getCoinOfValue({
    tx,
    coinType: TYPES.testnet.WAL,
    coinValue: POW_9,
  });

  const { returnValues: nft } = await blizzardTestnet.mintAfterVotesFinished({
    tx,
    nodeId: MYSTEN_LABS_K8S,
    walCoin,
    blizzardStaking: SHARED_OBJECTS.testnet.SNOW_STAKING({
      mutable: true,
    }).objectId,
  });

  blizzardTestnet.keepStakeNft({
    tx,
    nft,
  });

  await executeTx(tx);
})();
