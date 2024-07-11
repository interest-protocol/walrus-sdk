import { Transaction } from '@mysten/sui/transactions';

import { executeTx, log, DCATestnet } from './utils.script';
import { COINS, OBJECT_IDS } from './constants.script';
import { normalizeSuiAddress } from '@mysten/sui/utils';

(async () => {
  try {
    const initTx = new Transaction();

    const {
      tx: tx1,
      request,
      coinIn,
    } = DCATestnet.swapHopStart({
      tx: initTx,
      coinInType: COINS.usdc.coinType,
      coinOutType: COINS.eth.coinType,
      dca: '0xf0d4b116f61e55a941e789d5070c76a1c6c4b10f3529a051fcb11365f3b8cee5',
    });

    tx1.transferObjects([coinIn], normalizeSuiAddress('0x0'));

    // hop logic here
    const coinETH = initTx.moveCall({
      target: '0x2::coin::mint',
      typeArguments: [COINS.eth.coinType],
      arguments: [initTx.object(COINS.eth.treasuryCap), initTx.pure.u64(100n)],
    });

    const tx2 = DCATestnet.swapHopEnd({
      tx: tx1,
      coinInType: COINS.usdc.coinType,
      coinOutType: COINS.eth.coinType,
      dca: '0xf0d4b116f61e55a941e789d5070c76a1c6c4b10f3529a051fcb11365f3b8cee5',
      request,
      admin: OBJECT_IDS.testnet.adminCap,
      coinOut: coinETH,
    });

    const result = await executeTx(tx2);

    log(result);
  } catch (e) {
    console.log(e);
  }
})();
