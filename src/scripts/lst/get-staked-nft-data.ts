import { blizzardTestnet, log } from '../utils.script';

(async () => {
  const stakeNFTData = await blizzardTestnet.getStakeNFTData(
    '0x8ba285d394e097af0736eed5bc03ca718c5916d237ff11c7ccceb79c22f9adc4'
  );

  log(stakeNFTData);
})();
