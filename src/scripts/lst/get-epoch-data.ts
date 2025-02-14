import { blizzardTestnet } from '../utils.script';

(async () => {
  const epochData = await blizzardTestnet.getEpochData();

  console.log(epochData);
})();
