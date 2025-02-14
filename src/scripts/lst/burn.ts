import { SHARED_OBJECTS, TYPES } from '../../blizzard/constants';
import { blizzardTestnet, executeTx, keypair, POW_9 } from '../utils.script';

// Add a coin object id
const SNOW_COIN_ID =
  '0x30c20447b960b7ad6cc64a516aca93d53680ac6585ad0c9f480bbd1f07dadf68';

(async () => {
  const { returnValues: withdrawIXs, tx } = await blizzardTestnet.fcfs({
    value: POW_9,
    blizzardStaking: SHARED_OBJECTS.testnet.SNOW_STAKING({
      mutable: true,
    }).objectId,
  });

  const { returnValues: stakedWalVector } = await blizzardTestnet.burnLst({
    tx,
    lstCoin: SNOW_COIN_ID,
    withdrawIXs,
    minWalValue: POW_9,
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
