import { Transaction } from "@mysten/sui/transactions";
import { SUI_TYPE_ARG } from "@mysten/sui/utils";
import { TimeScale } from "src/dca";

import { WITNESSES } from "../dca/constants";
import { DCAMainnet, executeTx, keypair, log } from "./utils.script.ts";

(async () => {
  try {
    const initTx = new Transaction();

    const sui = initTx.splitCoins(initTx.gas, [1000n]);

    const USDCType =
      "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN";

    const tx = DCAMainnet.newAndShare({
      tx: initTx,
      coinInType: SUI_TYPE_ARG,
      coinOutType: USDCType,
      coinIn: sui,
      timeScale: TimeScale.Minutes,
      every: 30,
      numberOfOrders: 1000,
      delegatee: keypair.getPublicKey().toSuiAddress(),
      witnessType: WITNESSES.mainnet.WHITELIST_ADAPTER,
    });

    const result = await executeTx(tx);

    log(result);
  } catch (e) {
    console.log(e);
  }
})();
