import { COINS } from './coins.script';
import { DCATestnet, executeTx, log } from './utils.script';

(async () => {
  try {
    const tx = DCATestnet.stopAndDestroy({
      dca: '0x818a58304a87878395f2a1ac41bbcac8d30b436b03823bd471af80ac449923b0',
      coinInType: COINS.usdc.coinType,
      coinOutType: COINS.eth.coinType,
    });

    const result = await executeTx(tx);

    log(result);
  } catch (e) {
    console.log(e);
  }
})();
