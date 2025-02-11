import { getFullnodeUrl, SuiObjectResponse } from '@mysten/sui/client';
import { pathOr } from 'ramda';

import { PACKAGES, SHARED_OBJECTS, TYPES } from './constants';
import { GetMsUntilNextEpochArgs, SdkConstructorArgs } from './tuskr.types';
import { Network } from './tuskr.types';

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

const msToHours = (ms: number) => {
  return Math.ceil(ms / (1000 * 60 * 60));
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
    hoursUntilNextEpoch: msToHours(msUntilNextEpoch),
    epochDurationInHours: msToHours(epochDurationMs),
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
