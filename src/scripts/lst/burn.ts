import { Transaction } from '@mysten/sui/transactions';

import { SHARED_OBJECTS, TYPES } from '../../blizzard/constants';
import { blizzardTestnet, executeTx, keypair, POW_9 } from '../utils.script';

// Add a coin object id
const SNOW_COIN_ID =
  '0x5ad2fe6b824b967b2fbaf143ffdf44ac96f71b42699862c974c7efdf870d4889';

(async () => {
  const txb = new Transaction();

  const amount = POW_9 / 3n;

  const wal = txb.splitCoins(txb.object(SNOW_COIN_ID), [txb.pure.u64(amount)]);

  const { returnValues: withdrawIXs, tx } = await blizzardTestnet.fcfs({
    tx: txb,
    value: amount,
    blizzardStaking: SHARED_OBJECTS.testnet.SNOW_STAKING({
      mutable: true,
    }).objectId,
  });

  const { returnValues: stakedWalVector } = await blizzardTestnet.burnLst({
    tx,
    lstCoin: wal,
    withdrawIXs,
    minWalValue: amount - 1n,
    blizzardStaking: SHARED_OBJECTS.testnet.SNOW_STAKING({
      mutable: true,
    }).objectId,
  });

  blizzardTestnet.vectorTransfer({
    tx,
    vector: stakedWalVector,
    to: keypair.toSuiAddress(),
    type: TYPES.testnet.STAKED_WAL,
  });

  await executeTx(tx);
})();
