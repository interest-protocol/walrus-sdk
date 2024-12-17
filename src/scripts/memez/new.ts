import { Transaction } from '@mysten/sui/transactions';

import { CONFIG_KEYS, MIGRATOR_WITNESSES } from '../../memez';
import { executeTx, keypair, memezTestnet } from '../utils.script';

const configurationKey = CONFIG_KEYS.testnet.DEFAULT;

const TREASURY_CAP =
  '0xc86e4bf2f1886c509ab785b5b208344124fe57fa3b92bfc6479eb4cb083156bf';

const MEME_COIN_TYPE =
  '0x2b9da441d0f56ea40cfb6a0b433aef9bbba2fe60ad82cf02e392e764799c0c9e::aptos::APTOS';

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
