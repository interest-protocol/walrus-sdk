import { SHARED_OBJECTS } from '../../blizzard/constants';
import { blizzardTestnet, executeTx } from '../utils.script';

(async () => {
  const { tx } = await blizzardTestnet.syncExchangeRate({
    blizzardStaking: SHARED_OBJECTS.testnet.SNOW_STAKING({
      mutable: true,
    }).objectId,
  });

  await executeTx(tx);
})();
