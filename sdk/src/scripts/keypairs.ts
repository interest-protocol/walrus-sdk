import { Transaction } from '@mysten/sui/transactions';

import { executeTx, keypair, log } from './utils.script';

(async () => {
  try {
    const tx = new Transaction();

    const nfts = tx.moveCall({
      target:
        '0xb26fc61ba0b79edb998f2a32967ff30d3c2a56371b01fed608b42916c51cc22d::game::new_player',
      arguments: [
        tx.pure.string('onigiri'),
        tx.object(
          '0xc2a2d0ad249681074bc16f242513dc790d9a27c17becec36cbdb15d1de8f9de8'
        ),
        tx.object(
          '0x6ae7de8f1709fcde31416b0e41ccc5acfedd56e1026ceddd29b9df4ad8d38140'
        ),
      ],
    });

    console.log(nfts);

    nfts.forEach((x) => {
      tx.transferObjects([x], keypair.toSuiAddress());
    });

    const result = await executeTx(tx);

    log(result);
  } catch (e) {
    console.log(e);
  }
})();
