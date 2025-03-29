import { OWNED_OBJECTS, SHARED_OBJECTS } from '../../blizzard/constants';
import { blizzardSDK, executeTx, wwalAcl } from '../utils.script';

(async () => {
  const { tx, returnValues } = await wwalAcl.signIn({
    admin: OWNED_OBJECTS.WWAL_ADMIN,
  });
  await blizzardSDK.updateDescription({
    tx,
    value: 'A Liquid Staking Wal Coin',
    adminWitness: returnValues,
    blizzardStaking: SHARED_OBJECTS.WWAL_STAKING({
      mutable: true,
    }).objectId,
  });
  await executeTx(tx);
})();
