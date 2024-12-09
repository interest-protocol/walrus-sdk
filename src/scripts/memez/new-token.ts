import { Transaction } from '@mysten/sui/transactions';

import { CONFIG_KEYS, MIGRATOR_WITNESSES } from '../../memez';
import { executeTx, keypair, memezTestnet } from '../utils.script';

const configurationKey = CONFIG_KEYS.testnet.DEFAULT;

const TREASURY_CAP =
  '0xad60b6e9c59c409c607f04a5c8b3a885d1c9f5e44e9bd1641315c059bb0a066c';

const MEME_COIN_TYPE =
  'fafb7a9d33dd31fc9d6f37d625aa877d7982fe25eb16ba06f4a5861e541030f8::aptos::APTOS';

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
    useTokenStandard: true,
  });

  tx.transferObjects([metadataCap], tx.pure.address(recipient));

  await executeTx(tx2);
})();
