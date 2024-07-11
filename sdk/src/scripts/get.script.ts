import { DCATestnet } from './utils.script';

import { log } from 'console';

(async () => {
  try {
    const dcaObject = await DCATestnet.get(
      '0x4af0d205fbf6e1ce5cc03f34b22af373a17e266940a3c23db457386f13d67285'
    );

    log({ dcaObject });
  } catch (e) {
    console.log(e);
  }
})();
