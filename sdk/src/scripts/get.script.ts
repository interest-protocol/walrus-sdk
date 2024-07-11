import { DCATestnet } from './utils.script';

import { log } from 'console';

(async () => {
  try {
    const dcaObject = await DCATestnet.get(
      '0x04d4e2d1f13381b4e4a8ec916f1f4068721f1b11aeab79815b835ed96db64503'
    );

    log({ dcaObject });
  } catch (e) {
    console.log(e);
  }
})();
