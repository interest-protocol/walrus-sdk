import { blizzardSDK } from '../utils.script';

(async () => {
  const walrusPackage = await blizzardSDK.getLatestWalrusPackage();

  console.log(walrusPackage);
})();
