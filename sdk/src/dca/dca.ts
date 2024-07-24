import { bcs } from '@mysten/sui/bcs';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import {
  Inputs,
  Transaction,
  TransactionArgument,
} from '@mysten/sui/transactions';
import {
  isValidSuiAddress,
  isValidSuiObjectId,
  SUI_CLOCK_OBJECT_ID,
} from '@mysten/sui/utils';
import { devInspectAndGetResults } from '@polymedia/suitcase-core';
import invariant from 'tiny-invariant';

import {
  DCA,
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
  #tradePolicy = Inputs.SharedObjectRef({
    objectId:
      '0x68fec6e6f2528821bcaba9f6fd1750e8eac7de75fc09dc68e03174c04c828539',
    initialSharedVersion: '89042362',
    mutable: false,
  });
  #dcaPackage =
    '0x8cff310615dd198bb64af09efcf1bc54bd6a71bcc2fe2a1c8302b6f76f8ee427';
  #adapters =
    '0x5fee448eda1dd26b9fe1c8d72ee5228631c4b337c995d1e62dc8e61ef4aa30b9';
  #adapterWhitelist = Inputs.SharedObjectRef({
    objectId:
      '0xb977fc79289fd51c932ec8de1ca460b4d1bc8875adc5d363ae5eb0920ed8152d',
    initialSharedVersion: '89042363',
    mutable: false,
  });
  #MAX_U64 = 18446744073709551615n;
  #defaultFee = 500000n;

  constructor(nodeUrl?: string) {
    this.#client = new SuiClient({
      url: nodeUrl ? nodeUrl : getFullnodeUrl('mainnet'),
    });
  }

  async get(objectId: string): Promise<DCA> {
    invariant(isValidSuiObjectId(objectId), 'Invalid DCA id');

    const obj = await this.#client.getObject({
      id: objectId,
      options: { showContent: true, showType: true },
    });

    console.log(obj);

    return parseDCAObject(obj);
  }

  newAndShare({
    tx = new Transaction(),
    coinInType,
    coinOutType,
    witnessType,
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
      typeArguments: [coinInType, coinOutType, witnessType],
      arguments: [
        tx.object(this.#tradePolicy),
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
      target: `${this.#dcaPackage}::dca::request`,
      typeArguments: [coinInType, coinOutType],
      arguments: [tx.object(dca)],
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
  }: SwapHopEndArgs) {
    invariant(isValidSuiObjectId(dca), 'Invalid DCA id');

    tx.moveCall({
      target: `${this.#adapters}::whitelist_adapter::swap`,
      typeArguments: [coinOutType],
      arguments: [
        tx.object(this.#adapterWhitelist),
        request as TransactionArgument,
        coinOut,
      ],
    });

    tx.moveCall({
      target: `${this.#dcaPackage}::dca::confirm`,
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
