import { walrusSDK } from './utils.script';

(async () => {
  const canBeSplit = await walrusSDK.canBeSplit(
    '0xf9d1ffe49c85b627ce5fff1848614540b1f99164abd69f594bee5a5d162bda89',
    1_000_000_000n + 1n
  );

  console.log(canBeSplit);
})();
