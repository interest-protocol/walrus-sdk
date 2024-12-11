import { CONFIG_KEYS } from '../../memez';
import { log, memezTestnet } from '../utils.script';

(async () => {
  const fees = await memezTestnet.getFees({
    configurationKey: CONFIG_KEYS.testnet.DEFAULT,
  });

  log(fees);
})();
