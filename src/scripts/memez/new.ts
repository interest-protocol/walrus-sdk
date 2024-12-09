import { Transaction } from '@mysten/sui/transactions';

import { CONFIG_KEYS, MIGRATOR_WITNESSES } from '../../memez';
import { executeTx, keypair, memezTestnet } from '../utils.script';

const configurationKey = CONFIG_KEYS.testnet.DEFAULT;

const TREASURY_CAP =
  '0x9f6ec35e883f38304524b414b94bc287fd79b9614e758890bcbb335d754d94d9';

const MEME_COIN_TYPE =
  '0x97bb63c347b46a4f96f52bdb99a72b1311dee2bd9535c27164c7d62113e40e21::aptos::APTOS';

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
