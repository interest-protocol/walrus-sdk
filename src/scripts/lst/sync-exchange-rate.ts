import { SHARED_OBJECTS, TYPES } from '../../tuskr/constants';
import { executeTx, tuskrTestnet } from '../utils.script';

(async () => {
  const { tx } = await tuskrTestnet.syncExchangeRate({
    lstType: TYPES.testnet.WW,
    tuskrStaking: SHARED_OBJECTS.testnet.WW_STAKING({ mutable: false })
      .objectId,
  });

  await executeTx(tx);
})();
