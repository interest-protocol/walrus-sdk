import { log } from 'console';

import { DCATestnet } from './utils.script';

(async () => {
  try {
    const dcaObject = await DCATestnet.get(
      '0x818a58304a87878395f2a1ac41bbcac8d30b436b03823bd471af80ac449923b0'
    );

    log({ dcaObject });
  } catch (e) {
    console.log(e);
  }
})();
