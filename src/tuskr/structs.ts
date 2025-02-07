import { bcs } from '@mysten/sui/bcs';
import { fromHex, toHex } from '@mysten/sui/utils';

export const Address = bcs.bytes(32).transform({
  // To change the input type, you need to provide a type definition for the input
  input: (val: string) => fromHex(val),
  output: (val) => toHex(val),
});

export const ID = bcs.fixedArray(32, bcs.u8()).transform({
  input: (id: string) => fromHex(id),
  output: (id) => toHex(Uint8Array.from(id)),
});

export const EpochValue = bcs.struct('EpochValue', {
  epoch: bcs.u32(),
  value: bcs.u64(),
});

export const IX = bcs.struct('IX', {
  node_id: ID,
  epoch_values: bcs.vector(EpochValue),
});

export const TuskrWithdrawIXs = bcs.struct('TuskrWithdrawIXs', {
  ixs: bcs.vector(IX),
  hook_witness: bcs.option(bcs.TypeTag),
});
