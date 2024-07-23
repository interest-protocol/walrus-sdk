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
  // #tradePolicy = Inputs.SharedObjectRef({
  //   objectId:
  //     '0x1f35cd42b9534e39617d8e2f49783f97eaa7b78e5d624d3a119bc40c97206209',
  //   initialSharedVersion: '83443963',
  //   mutable: false,
  // });
  #dcaPackage =
    '0xd94222253b6e3139c443077a6f783c2a3054479cfcc858bcd30fce352656474c';
  #adapters =
    '0x721d95ec2f1b21b032bb54a85a4a79636a420c6131b633f4fbcebe054f6c8255';
  // #hopAdapterWhitelist = Inputs.SharedObjectRef({
  //   objectId:
  //     '0xaa7646745007ea8ee8abf10d26c330d02b15ff312a11c9bbe217a55094903d58',
  //   initialSharedVersion: '83443964',
  //   mutable: false,
  // });
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
      arguments: [
        tx.object(
          '0x1f35cd42b9534e39617d8e2f49783f97eaa7b78e5d624d3a119bc40c97206209'
        ),
        tx.object(dca),
      ],
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
      target: `${this.#adapters}::hop_adapter::swap`,
      typeArguments: [coinOutType],
      arguments: [
        tx.object(
          '0xaa7646745007ea8ee8abf10d26c330d02b15ff312a11c9bbe217a55094903d58'
        ),
        request as TransactionArgument,
        coinOut,
      ],
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
