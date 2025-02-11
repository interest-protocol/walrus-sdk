import { MYSTEN_LABS_K8S, tuskrTestnet } from '../utils.script';

(async () => {
  const apr = await tuskrTestnet.lastEpochApr({
    nodeId: MYSTEN_LABS_K8S,
  });

  console.log(apr);
})();
