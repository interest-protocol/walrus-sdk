import { Transaction } from '@mysten/sui/transactions';

import { SHARED_OBJECTS, TYPES } from '../../blizzard/constants';
import {
  blizzardTestnet,
  executeTx,
  getCoinOfValue,
  keypair,
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

  const { returnValues: coin } = await blizzardTestnet.mint({
    tx,
    nodeId: MYSTEN_LABS_K8S,
    walCoin,
    blizzardStaking: SHARED_OBJECTS.testnet.SNOW_STAKING({
      mutable: true,
    }).objectId,
  });

  tx.transferObjects([coin], keypair.toSuiAddress());

  await executeTx(tx);
})();
