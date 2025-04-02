import { devInspectTransaction, walrusSDK } from './utils.script';

(async () => {
  const splitStakedWal = await walrusSDK.splitStakedWal({
    from: '0xf9d1ffe49c85b627ce5fff1848614540b1f99164abd69f594bee5a5d162bda89',
    amount: 1_000_000_000n + 1n,
  });

  devInspectTransaction({
    tx: splitStakedWal.tx,
    sender:
      '0x8460005b0378efac468a1704d353afb8fa7e3d6743536d197c9d59f86809961e',
  });
})();
