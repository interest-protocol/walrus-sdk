import invariant from 'tiny-invariant';

import { COINS } from './constants.script';
import { DCATestnet } from './utils.script';

(async () => {
  try {
    const isActive = await DCATestnet.isActive({
      dca: '0x18260caaa53dd5229d2344f02def6dd811b9ed0166ae99d2f05f39fa999389c5',
      coinInType: COINS.usdc.coinType,
      coinOutType: COINS.eth.coinType,
    });

    invariant(typeof isActive === 'boolean', 'Error is not active');
    invariant(isActive, 'Error is not active');
  } catch (e) {
    console.log(e);
  }
})();
