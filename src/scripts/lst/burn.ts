import { SHARED_OBJECTS, TYPES } from '../../blizzard/constants';
import { blizzardTestnet, executeTx, keypair, POW_9 } from '../utils.script';

// Add a coin object id
const SNOW_COIN_ID =
  '0x215d9b888bdd7ca60f494b5e49c32857bd8246f6fa490ed2605175fd88572e47';

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
