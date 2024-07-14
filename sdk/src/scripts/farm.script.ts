import { executeTx, log, getCoinOfValue } from './utils.script';
import { HOP_TESTNET_WITNESS, OBJECT_IDS } from './constants.script';
import { Transaction } from '@mysten/sui/transactions';
import { SuiClient } from '@mysten/sui/client';
import { SUI_TYPE_ARG } from '@mysten/sui/dist/cjs/utils';

export const client = new SuiClient({
  url: 'https://sui.devnet.m2.movementlabs.xyz:443',
});

const COINS_PKG =
  '0x2e92e323161b7128012270910d55ba19033e193fc7a7af37810e280853d3926e';

(async () => {
  try {
    const tx = new Transaction();

    const coinEth = tx.moveCall({
      target: `0x2::coin::mint`,
      typeArguments: [`${COINS_PKG}::eth::ETH`],
      arguments: [
        tx.object(
          '0x8ed18d4f15991b3d36e60e7b7ca088e6ff2b08797f308045cdef665f67bc91e6'
        ),
        tx.pure.u64(100_000_000_000),
      ],
    });

    const moveCoin = tx.splitCoins(tx.gas, [tx.pure.u64(100_000_000_000n)]);

    tx.moveCall({
      target:
        '0x6cd108f303c318cdef1bbbf309e23f97ef9648fdc0e2e6a9d2ef2db014f9504c::interest_protocol_amm::new',
    });

    const result = await executeTx(tx);

    log(result);
  } catch (e) {
    console.log(e);
  }
})();
