import { walrusSDK } from './utils.script';

(async () => {
  const pkg = await walrusSDK.getLatestWalrusPackage();
  console.log(pkg);
})();
