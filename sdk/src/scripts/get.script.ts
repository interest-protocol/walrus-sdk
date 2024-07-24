import { log } from 'console';

import { DCATestnet } from './utils.script';

(async () => {
  try {
    const dcaObject = await DCATestnet.get(
      '0x18260caaa53dd5229d2344f02def6dd811b9ed0166ae99d2f05f39fa999389c5'
    );

    log({ dcaObject });
  } catch (e) {
    console.log(e);
  }
})();
