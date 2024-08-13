import invariant from 'tiny-invariant';

import { COINS } from './coins.script';
import { DCATestnet } from './utils.script';

(async () => {
  try {
    const isActive = await DCATestnet.isActive({
      dca: '0x818a58304a87878395f2a1ac41bbcac8d30b436b03823bd471af80ac449923b0',
      coinInType: COINS.usdc.coinType,
      coinOutType: COINS.eth.coinType,
    });

    invariant(typeof isActive === 'boolean', 'Error is not active');
    invariant(isActive, 'Error is not active');
  } catch (e) {
    console.log(e);
  }
})();
