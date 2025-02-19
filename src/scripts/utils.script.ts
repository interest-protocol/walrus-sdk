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

export const BLIZZARD_ADMIN_CAP =
  '0x6afd4964d4af7ddb960dcb1473247e76ed180b0bfe718c099746c84f1aa1c924';

export const MYSTEN_LABS_K8S =
  '0x81dae13f34dfe76170901f9f24a920c3b361acee7136bbc2ef6a0a15bfa085c8';

export const INTEREST_LABS =
  '0x2eab79988f43bc772f4eb56be964a018b0ec627d1e92ae11985b69272030206e';

export const STUDIO_MIRAI =
  '0x164ebc90922f768dcc076edc022107c5f22d41273eb1de4ef0fd6339d26e6aa0';

export const SNOW_ADMIN_CAP =
  '0x8c48afb4575e164c4f1c15473bb01f7a7973e3632c7dc508c2d0cb194d3ca292';

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
