import { Transaction } from '@mysten/sui/transactions';

import { CONFIG_KEYS, MIGRATOR_WITNESSES } from '../../memez';
import { executeTx, keypair, memezTestnet } from '../utils.script';

const configurationKey = CONFIG_KEYS.testnet.DEFAULT;

const TREASURY_CAP =
  '0xa762bfe43cd4aa4f122a270ab60a15118bc566c6b5c6944fe0ca6a7745812305';

const TOTAL_SUPPLY = 1_000_000_000_000_000_000n;

(async () => {
  const recipient = keypair.toSuiAddress();

  const tx = new Transaction();

  const creationSuiFee = tx.splitCoins(tx.gas, [tx.pure.u64(20)]);

  const { tx: tx2, metadataCap } = await memezTestnet.newPumpPool({
    tx,
    configurationKey,
    developer: recipient,
    metadata: {
      X: 'https://x.com/Meme',
      Website: 'https://meme.xyz/',
      GitHub: 'https://github.com/meme',
    },
    creationSuiFee,
    memeCoinTreasuryCap: TREASURY_CAP,
    migrationWitness: MIGRATOR_WITNESSES.testnet.TEST,
    totalSupply: TOTAL_SUPPLY,
    useTokenStandard: false,
  });

  tx.transferObjects([metadataCap], tx.pure.address(recipient));

  await executeTx(tx2);
})();
