import { Transaction } from '@mysten/sui/transactions';

import { SHARED_OBJECTS, TYPES } from '../../blizzard/constants';
import { blizzardTestnet, executeTx, keypair, POW_9 } from '../utils.script';

// Add a coin object id
const SNOW_COIN_ID =
  '0x0bfcfede0c1d785a3a0723bb9476e0618b3518e07c5b23b002d16d340a4a3d0e';

(async () => {
  const txb = new Transaction();

  const amount = POW_9 / 5n;

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
