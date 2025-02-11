import { tuskrTestnet } from '../utils.script';

(async () => {
  const epochData = await tuskrTestnet.getEpochData();

  console.log(epochData);
})();
