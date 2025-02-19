import { blizzardTestnet } from '../utils.script';

(async () => {
  const walrusPackage = await blizzardTestnet.getLatestWalrusPackage();

  console.log(walrusPackage);
})();
