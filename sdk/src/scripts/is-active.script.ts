import { DCATestnet } from './utils.script';
import { COINS } from './constants.script';

import invariant from 'tiny-invariant';

(async () => {
  try {
    const isActive = await DCATestnet.isActive({
      dca: '0x4af0d205fbf6e1ce5cc03f34b22af373a17e266940a3c23db457386f13d67285',
      coinInType: COINS.usdc.coinType,
      coinOutType: COINS.eth.coinType,
    });

    invariant(typeof isActive === 'boolean', 'Error is not active');
    invariant(isActive, 'Error is not active');
  } catch (e) {
    console.log(e);
  }
})();
