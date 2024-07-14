import invariant from 'tiny-invariant';

import { COINS } from './constants.script';
import { DCATestnet } from './utils.script';

(async () => {
  try {
    const isActive = await DCATestnet.isActive({
      dca: '0xbe76eebdea3f22b8f04fd72fcebd2d986df5aaac858c5882967097b0162f9ed2',
      coinInType: COINS.usdc.coinType,
      coinOutType: COINS.eth.coinType,
    });

    invariant(typeof isActive === 'boolean', 'Error is not active');
    invariant(isActive, 'Error is not active');
  } catch (e) {
    console.log(e);
  }
})();
