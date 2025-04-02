import { getFullnodeUrl, SuiObjectResponse } from '@mysten/sui/client';
import { normalizeSuiObjectId } from '@mysten/sui/utils';
import { pathOr } from 'ramda';

import {
  GetMsUntilNextEpochArgs,
  SdkConstructorArgs,
  StakedWal,
  StakedWalState,
} from './walrus.types';

export const getSdkDefaultArgs = (): SdkConstructorArgs => ({
  fullNodeUrl: getFullnodeUrl('mainnet'),
});

export const msToHours = (ms: number) => {
  return Math.ceil(ms / (1000 * 60 * 60));
};

export const msToDays = (ms: number) => {
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
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

export const getStakedWal = (response: SuiObjectResponse): StakedWal => {
  const objectId = normalizeSuiObjectId(
    pathOr('', ['data', 'objectId'], response)
  );
  const version = pathOr('', ['data', 'version'], response);
  const digest = pathOr('', ['data', 'digest'], response);

  const activationEpoch = pathOr(
    '',
    ['data', 'content', 'fields', 'activation_epoch'],
    response
  );

  const nodeId = normalizeSuiObjectId(
    pathOr('', ['data', 'content', 'fields', 'node_id'], response)
  );

  const principal = pathOr(
    '',
    ['data', 'content', 'fields', 'principal'],
    response
  );

  const state = pathOr(
    '' as string,
    ['data', 'content', 'fields', 'state', 'variant'],
    response
  );

  const withdrawingEpoch = +pathOr(
    '0',
    ['data', 'content', 'fields', 'state', 'fields', ' withdraw_epoch'],
    response
  );

  return {
    objectId,
    version,
    digest,
    activationEpoch: +activationEpoch,
    nodeId,
    principal: BigInt(principal),
    state:
      state === 'Staked' ? StakedWalState.Staked : StakedWalState.Withdrawing,
    withdrawingEpoch: !withdrawingEpoch ? null : withdrawingEpoch,
  };
};
