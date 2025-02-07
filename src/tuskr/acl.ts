// import { bcs } from '@mysten/sui/bcs';
// import { Transaction } from '@mysten/sui/transactions';
// import { isValidSuiAddress } from '@mysten/sui/utils';
// import { devInspectAndGetReturnValues } from '@polymedia/suitcase-core';
// import invariant from 'tiny-invariant';

import { SDK } from './sdk';
import {
  // DestroyAdminArgs,
  // DestroySuperAdminArgs,
  // FinishSuperAdminTransferArgs,
  // IsAdminArgs,
  // NewAdminAndTransferArgs,
  // NewAdminArgs,
  // RevokeAdminArgs,
  SdkConstructorArgs,
  // StartSuperAdminTransferArgs,
} from './tuskr.types';

export class AclSDK extends SDK {
  constructor(args: SdkConstructorArgs | undefined | null = null) {
    super(args);
  }
}
