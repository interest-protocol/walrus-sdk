import { SHARED_OBJECTS } from '../../tuskr/constants';
import { tuskrTestnet } from '../utils.script';

(async () => {
  const lst = await tuskrTestnet.toLstAtEpoch({
    tuskrStaking: SHARED_OBJECTS.testnet.WW_STAKING({ mutable: false })
      .objectId,
    epoch: 13,
    value: 1_000_000_000n,
  });

  console.log(lst);
})();
