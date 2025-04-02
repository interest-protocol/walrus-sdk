import { walrusSDK } from './utils.script';

(async () => {
  const epochData = await walrusSDK.getEpochData();
  console.log(epochData);
})();
