import { coinWithBalance } from '@mysten/sui/transactions';
import { Transaction } from '@mysten/sui/transactions';

import { SHARED_OBJECTS, TYPES } from '../../blizzard/constants';
import { blizzardTestnet, executeTx, keypair, POW_9 } from '../utils.script';

(async () => {
  const txb = new Transaction();

  const amount = POW_9;

  const wal = coinWithBalance({
    type: TYPES.testnet.SNOW,
    balance: amount,
  })(txb);

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
