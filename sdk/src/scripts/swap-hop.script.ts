import { Transaction } from '@mysten/sui/transactions';
import { normalizeSuiAddress } from '@mysten/sui/utils';

import {
  COINS,
  OBJECT_IDS,
  // WHITELIST_TESTNET_WITNESS,
} from './constants.script';
import { DCATestnet, executeTx, log } from './utils.script';

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
      dca: '0x18260caaa53dd5229d2344f02def6dd811b9ed0166ae99d2f05f39fa999389c5',
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
      dca: '0x18260caaa53dd5229d2344f02def6dd811b9ed0166ae99d2f05f39fa999389c5',
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
