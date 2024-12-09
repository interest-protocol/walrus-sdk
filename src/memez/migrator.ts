import { Transaction } from '@mysten/sui/transactions';
import { isValidSuiAddress } from '@mysten/sui/utils';
import invariant from 'tiny-invariant';

import { MigrateArgs, SdkConstructorArgs } from './memez.types';
import { SDK } from './sdk';

export class MigratorSDK extends SDK {
  constructor(args: SdkConstructorArgs | undefined | null = null) {
    super(args);
  }

  public async migrate({ tx = new Transaction(), pool }: MigrateArgs) {
    if (typeof pool === 'string') {
      invariant(
        isValidSuiAddress(pool),
        'pool must be a valid Sui address or MemezPool'
      );
      pool = await this.getPumpPool(pool);
    }

    const migrator = tx.moveCall({
      package: this.packages.MEMEZ_MIGRATOR,
      module: 'test_migrator',
      function: 'migrate',
      arguments: [tx.object(pool.objectId), this.getVersion(tx)],
    });

    return {
      migrator,
      tx,
    };
  }
}
