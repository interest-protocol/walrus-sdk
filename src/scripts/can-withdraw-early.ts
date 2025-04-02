import { walrusSDK } from './utils.script';

(async () => {
  const canWithdrawEarly = await walrusSDK.canWithdrawEarly(
    '0x3b7c77696eff21ea4b2894ce87651f1b39e169fccd475b9245a2c9ed3574df72'
  );

  console.log(canWithdrawEarly);
})();
