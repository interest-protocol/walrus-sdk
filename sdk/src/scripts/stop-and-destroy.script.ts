import { COINS } from './constants.script';
import { DCATestnet,executeTx, log } from './utils.script';

(async () => {
  try {
    const tx = DCATestnet.stopAndDestroy({
      dca: '0x4af0d205fbf6e1ce5cc03f34b22af373a17e266940a3c23db457386f13d67285',
      coinInType: COINS.usdc.coinType,
      coinOutType: COINS.eth.coinType,
    });

    const result = await executeTx(tx);

    log(result);
  } catch (e) {
    console.log(e);
  }
})();
