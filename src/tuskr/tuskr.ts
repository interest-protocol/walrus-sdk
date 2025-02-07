// import { bcs } from '@mysten/sui/bcs';
// import { Transaction } from '@mysten/sui/transactions';
// import {
//   isValidSuiAddress,
//   isValidSuiObjectId,
//   normalizeStructTag,
//   normalizeSuiAddress,
//   SUI_FRAMEWORK_ADDRESS,
//   SUI_TYPE_ARG,
// } from '@mysten/sui/utils';

import { SDK } from './sdk';
import { SdkConstructorArgs } from './tuskr.types';

export class TuskrSDK extends SDK {
  tuskrStaking: string;

  constructor(args: SdkConstructorArgs | undefined | null = null) {
    super(args);
  }

  public setTuskrStaking(tuskrStaking: string) {
    this.tuskrStaking = tuskrStaking;
  }
}
