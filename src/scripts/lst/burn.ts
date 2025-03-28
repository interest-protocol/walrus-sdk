import { coinWithBalance } from '@mysten/sui/transactions';
import { Transaction } from '@mysten/sui/transactions';

import { SHARED_OBJECTS, TYPES } from '../../blizzard/constants';
import { blizzardSDK, executeTx, keypair, POW_9 } from '../utils.script';

(async () => {
  const txb = new Transaction();

  const amount = POW_9 * 2n;

  const wal = coinWithBalance({
    type: TYPES.WWAL,
    balance: amount,
  })(txb);

  const {
    returnValues: [, withdrawIXs],
    tx,
  } = await blizzardSDK.fcfs({
    tx: txb,
    value: amount,
    blizzardStaking: SHARED_OBJECTS.WWAL_STAKING({
      mutable: true,
    }).objectId,
  });

  const {
    returnValues: [extraLst, stakedWalVector],
  } = await blizzardSDK.burnLst({
    tx,
    lstCoin: wal,
    withdrawIXs,
    blizzardStaking: SHARED_OBJECTS.WWAL_STAKING({
      mutable: true,
    }).objectId,
  });

  tx.transferObjects([extraLst], keypair.toSuiAddress());

  blizzardSDK.vectorTransferStakedWal({
    tx,
    vector: stakedWalVector,
    to: keypair.toSuiAddress(),
  });

  await executeTx(tx);
})();
