import { blizzardTestnet, MYSTEN_LABS_K8S } from '../utils.script';

(async () => {
  const apr = await blizzardTestnet.lastEpochApr({
    nodeId: MYSTEN_LABS_K8S,
  });

  console.log(apr);
})();
