import { getFullnodeUrl, SuiObjectResponse } from '@mysten/sui/client';
import { pathOr } from 'ramda';

import { GetMsUntilNextEpochArgs, SdkConstructorArgs } from './blizzard.types';
import { Network } from './blizzard.types';
import { PACKAGES, SHARED_OBJECTS, TYPES } from './constants';

export const getSdkDefaultArgs = (
  network = Network.Testnet
): SdkConstructorArgs => ({
  packages: PACKAGES[network],
  fullNodeUrl: getFullnodeUrl(
    network === Network.Mainnet ? 'mainnet' : 'testnet'
  ),
  sharedObjects: SHARED_OBJECTS[network],
  network,
  types: TYPES[network],
});

export const msToHours = (ms: number) => {
  return Math.ceil(ms / (1000 * 60 * 60));
};

export const msToDays = (ms: number) => {
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
};

export const getFees = (response: SuiObjectResponse) => {
  const fields = pathOr(
    {},
    ['data', 'content', 'fields', 'fee_config', 'fields'],
    response
  );

  const fieldPath = ['fields', 'pos0'];

  return {
    mint: pathOr(0, ['mint', ...fieldPath], fields),
    burn: pathOr(0, ['burn', ...fieldPath], fields),
    transmute: pathOr(0, ['transmute', ...fieldPath], fields),
  };
};

export const getEpochData = (response: SuiObjectResponse) => {
  const fields = pathOr(
    {},
    ['data', 'content', 'fields', 'value', 'fields'],
    response
  );

  const currentEpoch = +pathOr('0', ['epoch'], fields);
  const epochDurationMs = +pathOr('0', ['epoch_duration'], fields);
  const firstEpochStartTimestamp = +pathOr('0', ['first_epoch_start'], fields);

  const msUntilNextEpoch = getMsUntilNextEpoch({
    currentEpoch,
    epochDurationMs,
    firstEpochStartTimestamp,
  });

  return {
    currentEpoch,
    epochDurationMs,
    firstEpochStartTimestamp,
    msUntilNextEpoch,
  };
};

export const getMsUntilNextEpoch = (
  epochData: GetMsUntilNextEpochArgs
): number => {
  const { currentEpoch, epochDurationMs, firstEpochStartTimestamp } = epochData;

  const now = Date.now();

  const nextEpochStartTimestamp =
    firstEpochStartTimestamp + currentEpoch * epochDurationMs;

  return nextEpochStartTimestamp - now;
};
