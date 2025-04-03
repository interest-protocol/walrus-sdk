import { walrusSDK } from './utils.script';

(async () => {
  const canBeJoined = await walrusSDK.canBeJoined(
    '0x3b7c77696eff21ea4b2894ce87651f1b39e169fccd475b9245a2c9ed3574df72',
    '0xf9d1ffe49c85b627ce5fff1848614540b1f99164abd69f594bee5a5d162bda89'
  );
  console.log(canBeJoined);
})();
