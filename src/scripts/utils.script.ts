import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction, TransactionResult } from '@mysten/sui/transactions';
import dotenv from 'dotenv';
import invariant from 'tiny-invariant';
import util from 'util';

import { BlizzardAclSDK, BlizzardSDK, SHARED_OBJECTS } from '../blizzard';

dotenv.config();

invariant(process.env.KEY, 'Private key missing');

export const keypair = Ed25519Keypair.fromSecretKey(
  Uint8Array.from(Buffer.from(process.env.KEY, 'base64')).slice(1)
);

export const ADMIN_CAP =
  '0xa8b6ace968c01b592149bcf0cc758262e5f97e89c17b59fd87d7e3012b2a15e7';

export const MYSTEN_LABS_K8S =
  '0x81dae13f34dfe76170901f9f24a920c3b361acee7136bbc2ef6a0a15bfa085c8';

export const SNOW_ADMIN_CAP =
  '0x1b3aa6e42903519309271e439ff31b74f1482c25e3bcb1bd86cc8145801ce2fe';

export const POW_9 = 10n ** 9n;

export const testnetClient = new SuiClient({ url: getFullnodeUrl('testnet') });

export const blizzardAclTestnet = new BlizzardAclSDK({
  acl: SHARED_OBJECTS.testnet.BLIZZARD_ACL({ mutable: true }),
});

export const snowAclTestnet = new BlizzardAclSDK({
  acl: SHARED_OBJECTS.testnet.SNOW_ACL({ mutable: true }),
});

export const blizzardTestnet = new BlizzardSDK();

export const log = (x: unknown) =>
  console.log(util.inspect(x, false, null, true));

export const executeTx = async (tx: Transaction, client = testnetClient) => {
  const result = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
    options: { showEffects: true },
  });

  // return if the tx hasn't succeed
  if (result.effects?.status?.status !== 'success') {
    console.log('\n\nTX failed');
    return;
  }

  console.log('SUCCESS!');

  if (result.effects.created) {
    log(result.effects.created);
  }
};

export const sleep = async (ms = 0) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function removeLeadingZeros(address: string): string {
  return (address as any).replaceAll(/0x0+/g, '0x');
}

interface GetCoinOfValueArgs {
  tx: Transaction;
  coinType: string;
  coinValue: bigint;
  client?: SuiClient;
}

export async function getCoinOfValue({
  tx,
  coinType,
  coinValue,
  client = testnetClient,
}: GetCoinOfValueArgs): Promise<TransactionResult> {
  let coinOfValue: TransactionResult;
  coinType = removeLeadingZeros(coinType);
  if (coinType === '0x2::sui::SUI') {
    coinOfValue = tx.splitCoins(tx.gas, [tx.pure.u64(coinValue)]);
  } else {
    const paginatedCoins = await client.getCoins({
      owner: keypair.toSuiAddress(),
      coinType,
    });

    const [firstCoin, ...otherCoins] = paginatedCoins.data;

    const firstCoinInput = tx.object(firstCoin.coinObjectId);

    if (otherCoins.length > 0) {
      tx.mergeCoins(
        firstCoinInput,
        otherCoins.map((coin) => coin.coinObjectId)
      );
    }
    coinOfValue = tx.splitCoins(firstCoinInput, [tx.pure.u64(coinValue)]);
  }
  return coinOfValue;
}
