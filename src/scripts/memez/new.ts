import { Transaction } from '@mysten/sui/transactions';

import { CONFIG_KEYS, MIGRATOR_WITNESSES } from '../../memez';
import { executeTx, keypair, memezTestnet } from '../utils.script';

const configurationKey = CONFIG_KEYS.testnet.DEFAULT;

const TREASURY_CAP =
  '0x7e342b9fad97f61219bdaf1976851b270f4e325ea3571caf0472777eaea271d1';

const MEME_COIN_TYPE =
  '0x8705f5951f4313dfd99521a5567518bc488da2b71c50c54612f43a7d19ba035c::aptos::APTOS';

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
