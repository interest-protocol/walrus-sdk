import { blizzardSDK } from '../utils.script';

(async () => {
  const epochData = await blizzardSDK.getEpochData();

  console.log(epochData);
})();
