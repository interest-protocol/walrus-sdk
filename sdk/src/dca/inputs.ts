import { Inputs } from '@mysten/sui/transactions';
import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui/utils';

export const CLOCK = Inputs.SharedObjectRef({
  mutable: true,
  objectId: SUI_CLOCK_OBJECT_ID,
  initialSharedVersion: '',
}) as ReturnType<typeof Inputs.SharedObjectRef>;
