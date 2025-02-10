import { TUSKR_STAKING, TYPES } from '../tuskr/constants';
import { executeTx, tuskrTestnet } from './utils.script';

(async () => {
  const { tx } = tuskrTestnet.syncExchangeRate({
    lstType: TYPES.testnet.WW,
    tuskrStaking: TUSKR_STAKING.testnet.WW,
  });

  await executeTx(tx);
})();
