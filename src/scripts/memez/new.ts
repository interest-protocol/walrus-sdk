import { Transaction } from '@mysten/sui/transactions';

import { CONFIG_KEYS, MIGRATOR_WITNESSES } from '../../memez';
import { executeTx, keypair, memezTestnet } from '../utils.script';

const configurationKey = CONFIG_KEYS.testnet.DEFAULT;

const TREASURY_CAP =
  '0xf2c510f4f601b64f5aa350aeeacf765f58fb157861c9df47450a46abc987407e';

const MEME_COIN_TYPE =
  '0x82652f8ad0dd655581b6acf8b7f993b65ce368aebf6a4e2910db250f6f4b1a44::aptos::APTOS';

const TOTAL_SUPPLY = 1_000_000_000_000_000_000n;

(async () => {
  const recipient = keypair.toSuiAddress();

  const tx = new Transaction();

  const creationSuiFee = tx.splitCoins(tx.gas, [tx.pure.u64(20)]);

  const { tx: tx2, metadataCap } = memezTestnet.newPumpPool({
    tx,
    configurationKey,
    developer: recipient,
    metadata: {
      X: 'https://x.com/Aptos',
      Website: 'https://aptosfoundation.org/',
      GitHub: 'https://github.com/aptos-foundation',
    },
    creationSuiFee,
    memeCoinTreasuryCap: TREASURY_CAP,
    migrationWitness: MIGRATOR_WITNESSES.testnet.TEST,
    memeCoinType: MEME_COIN_TYPE,
    totalSupply: TOTAL_SUPPLY,
    useTokenStandard: false,
  });

  tx.transferObjects([metadataCap], tx.pure.address(recipient));

  await executeTx(tx2);
})();
