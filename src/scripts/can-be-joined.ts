import { walrusSDK } from './utils.script';

(async () => {
  const canBeJoined = await walrusSDK.canBeJoined(
    '0xf9d1ffe49c85b627ce5fff1848614540b1f99164abd69f594bee5a5d162bda89',
    '0xf9d1ffe49c85b627ce5fff1848614540b1f99164abd69f594bee5a5d162bda89'
  );
  console.log(canBeJoined);
})();
