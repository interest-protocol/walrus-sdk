import { SHARED_OBJECTS, TYPES } from '../../tuskr/constants';
import { executeTx, keypair, POW_9, tuskrTestnet } from '../utils.script';

// Add a coin object id
const WINTER_COIN_ID =
  '0x30c20447b960b7ad6cc64a516aca93d53680ac6585ad0c9f480bbd1f07dadf68';

(async () => {
  const { returnValues: withdrawIXs, tx } = await tuskrTestnet
    .setTuskrStaking(
      SHARED_OBJECTS.testnet.WW_STAKING({ mutable: true }).objectId
    )
    .fcfs({
      value: POW_9,
    });

  const { returnValues: stakedWalVector } = await tuskrTestnet.burnLst({
    tx,
    lstCoin: WINTER_COIN_ID,
    withdrawIXs,
    minWalValue: POW_9,
  });

  tuskrTestnet.vectorTransfer({
    tx,
    vector: stakedWalVector,
    to: keypair.toSuiAddress(),
    type: TYPES.testnet.STAKED_WAL,
  });

  await executeTx(tx);
})();
