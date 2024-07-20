import { log } from 'console';

import { DCATestnet } from './utils.script';

(async () => {
  try {
    const dcaObject = await DCATestnet.get(
      '0xbe3d018c598cfeb77ef164958b0ae3671da59415d3fb6862f47c6d79032bc889'
    );

    log({ dcaObject });
  } catch (e) {
    console.log(e);
  }
})();
