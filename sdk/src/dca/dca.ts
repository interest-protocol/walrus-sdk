import { bcs } from '@mysten/sui/bcs';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Transaction, TransactionArgument } from '@mysten/sui/transactions';
import {
  isValidSuiAddress,
  isValidSuiObjectId,
  SUI_CLOCK_OBJECT_ID,
} from '@mysten/sui/utils';
import { devInspectAndGetResults } from '@polymedia/suitcase-core';
import invariant from 'tiny-invariant';

import {
  DCA,
  DCAConstructorArgs,
  DestroyArgs,
  IsActiveArgs,
  NewArgs,
  StopArgs,
  SwapHopEndArgs,
  SwapHopStartArgs,
} from './dca.types';
import { parseDCAObject } from './utils';
export class DcaSDK {
  #client: SuiClient;
  #defaultDcaPackage =
    '0x29d181f4154973ccd5e392ccce3b2ed44d7644ba7e1a2479239bea26c615d9ac';
  #defaultAdaptersPackage =
    '0xa4c68051bf638dbb2e0e0f6532680a5f4c0cb31a21fb1fbe50f3336c9110ea11';
  #defaultTradePolicyId =
    '0x7574069b7fa1a87114433ed3cbcc29fa64fb47e0b0f63ad142484b5cd1babc89';
  #defaultAdminCap =
    '0xf933a1b16fac37bba263ed30872f51a39513bbc04bf125bd882414004a33834c';
  #tradePolicy: string;
  #dcaPackage: string;
  #adapters: string;
  #MAX_U64 = 18446744073709551615n;
  #defaultFee = 500000n;

  constructor(args?: DCAConstructorArgs | undefined) {
    this.#dcaPackage = args?.dcaAddress
      ? args.dcaAddress
      : this.#defaultDcaPackage;
    this.#adapters = args?.adaptersAddress
      ? args.adaptersAddress
      : this.#defaultAdaptersPackage;
    this.#client = new SuiClient({
      url: args?.fullNodeUrl ? args.fullNodeUrl : getFullnodeUrl('mainnet'),
    });
    this.#tradePolicy = args?.tradePolicyId
      ? args.tradePolicyId
      : this.#defaultTradePolicyId;
  }

  async get(objectId: string): Promise<DCA> {
    invariant(isValidSuiObjectId(objectId), 'Invalid DCA id');

    const obj = await this.#client.getObject({
      id: objectId,
      options: { showContent: true, showType: true },
    });

    return parseDCAObject(obj);
  }

  newAndShare({
    tx = new Transaction(),
    coinInType,
    coinOutType,
    coinIn,
    timeScale,
    every,
    numberOfOrders,
    max = this.#MAX_U64,
    min = 0n,
    fee,
    delegatee,
  }: NewArgs): Transaction {
    invariant(isValidSuiAddress(delegatee), 'Invalid delegatee address');
    invariant(numberOfOrders > 0, 'Number of orders must be greater than 0');

    const dca = tx.moveCall({
      target: `${this.#dcaPackage}::dca::new`,
      typeArguments: [coinInType, coinOutType],
      arguments: [
        tx.object(SUI_CLOCK_OBJECT_ID),
        tx.object(coinIn),
        tx.pure.u64(every),
        tx.pure.u64(numberOfOrders),
        tx.pure.u8(timeScale),
        tx.pure.u64(min),
        tx.pure.u64(max),
        tx.pure.u64(fee ? BigInt(fee * 1e7) : this.#defaultFee),
        tx.pure.address(delegatee),
      ],
    });

    tx.moveCall({
      target: `${this.#dcaPackage}::dca::share`,
      typeArguments: [coinInType, coinOutType],
      arguments: [tx.object(dca)],
    });

    return tx;
  }

  async isActive({
    dca,
    coinInType,
    coinOutType,
  }: IsActiveArgs): Promise<boolean> {
    invariant(isValidSuiObjectId(dca), 'Invalid DCA id');

    const tx = new Transaction();

    tx.moveCall({
      target: `${this.#dcaPackage}::dca::active`,
      typeArguments: [coinInType, coinOutType],
      arguments: [tx.object(dca)],
    });

    const result = await devInspectAndGetResults(this.#client, tx);

    const values = result[result.length - 1].returnValues;

    invariant(values && values.length, 'Failed to get values');

    return values.map((elem) => {
      const [x] = elem;
      return bcs.Bool.parse(new Uint8Array(x));
    })[0];
  }

  stop({ dca, coinInType, coinOutType }: StopArgs): Transaction {
    invariant(isValidSuiObjectId(dca), 'Invalid DCA id');

    const tx = new Transaction();

    tx.moveCall({
      target: `${this.#dcaPackage}::dca::stop`,
      typeArguments: [coinInType, coinOutType],
      arguments: [tx.object(dca)],
    });

    return tx;
  }

  destroy({ dca, coinInType, coinOutType }: DestroyArgs): Transaction {
    invariant(isValidSuiObjectId(dca), 'Invalid DCA id');

    const tx = new Transaction();

    tx.moveCall({
      target: `${this.#dcaPackage}::dca::destroy`,
      typeArguments: [coinInType, coinOutType],
      arguments: [tx.object(dca)],
    });

    return tx;
  }

  stopAndDestroy({ dca, coinInType, coinOutType }: DestroyArgs): Transaction {
    invariant(isValidSuiObjectId(dca), 'Invalid DCA id');

    const tx = new Transaction();

    tx.moveCall({
      target: `${this.#dcaPackage}::dca::stop`,
      typeArguments: [coinInType, coinOutType],
      arguments: [tx.object(dca)],
    });

    tx.moveCall({
      target: `${this.#dcaPackage}::dca::destroy`,
      typeArguments: [coinInType, coinOutType],
      arguments: [tx.object(dca)],
    });

    return tx;
  }

  swapHopStart({
    dca,
    coinInType,
    coinOutType,
    tx = new Transaction(),
  }: SwapHopStartArgs) {
    invariant(isValidSuiObjectId(dca), 'Invalid DCA id');

    const [request, coinIn] = tx.moveCall({
      target: `${this.#dcaPackage}::trade_policy::request`,
      typeArguments: [coinInType, coinOutType],
      arguments: [tx.object(this.#tradePolicy), tx.object(dca)],
    });

    return {
      coinIn,
      request,
      tx,
    };
  }

  swapHopEnd({
    dca,
    coinInType,
    coinOutType,
    tx = new Transaction(),
    request,
    coinOut,
    admin = this.#defaultAdminCap,
  }: SwapHopEndArgs) {
    invariant(isValidSuiObjectId(dca), 'Invalid DCA id');

    tx.moveCall({
      target: `${this.#adapters}::hop_adapter::swap`,
      typeArguments: [coinOutType],
      arguments: [tx.object(admin), request as TransactionArgument, coinOut],
    });

    tx.moveCall({
      target: `${this.#dcaPackage}::trade_policy::confirm`,
      typeArguments: [coinInType, coinOutType],
      arguments: [
        tx.object(dca),
        tx.object(SUI_CLOCK_OBJECT_ID),
        request as TransactionArgument,
      ],
    });

    return tx;
  }
}
