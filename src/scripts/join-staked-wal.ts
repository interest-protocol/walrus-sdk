import { devInspectTransaction, walrusSDK } from './utils.script';

(async () => {
  const joinStakedWal = await walrusSDK.joinStakedWal({
    from: '0x3b7c77696eff21ea4b2894ce87651f1b39e169fccd475b9245a2c9ed3574df72',
    other: '0xf9d1ffe49c85b627ce5fff1848614540b1f99164abd69f594bee5a5d162bda89',
  });

  devInspectTransaction({
    tx: joinStakedWal.tx,
    sender:
      '0x8460005b0378efac468a1704d353afb8fa7e3d6743536d197c9d59f86809961e',
  });
})();
