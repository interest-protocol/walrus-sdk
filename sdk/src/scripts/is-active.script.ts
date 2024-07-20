import invariant from 'tiny-invariant';

import { COINS } from './constants.script';
import { DCATestnet } from './utils.script';

(async () => {
  try {
    const isActive = await DCATestnet.isActive({
      dca: '0xbe3d018c598cfeb77ef164958b0ae3671da59415d3fb6862f47c6d79032bc889',
      coinInType: COINS.usdc.coinType,
      coinOutType: COINS.eth.coinType,
    });

    invariant(typeof isActive === 'boolean', 'Error is not active');
    invariant(isActive, 'Error is not active');
  } catch (e) {
    console.log(e);
  }
})();
