import BN from 'bn.js';
import Decimal from 'decimal.js';

Decimal.config({
  precision: 64,
  rounding: Decimal.ROUND_DOWN,
  toExpNeg: -64,
  toExpPos: 64,
});

const TARGET_USD_MARKET_CAP = new Decimal(60_000);

const SUI_PRICE_USD = new Decimal(5);

const TOTAL_MEME_SUPPLY = new Decimal(1_000_000_000);

const memePriceInUsd = TARGET_USD_MARKET_CAP.div(TOTAL_MEME_SUPPLY);

const memePriceInSui = memePriceInUsd.div(SUI_PRICE_USD);

const priceToSqrtPriceX64 = (
  price: Decimal,
  decimalsA: number,
  decimalsB: number
) =>
  price
    .mul(Decimal.pow(10, decimalsB - decimalsA))
    .sqrt()
    .mul(new Decimal(2).pow(new Decimal(64)));

/*
  memePriceInUsd: 0.00006,
  memePriceInSui: 0.000012,
  priceInSqrtX64: 63901395939770060.40629260795585418174313090711434782392775384127
*/

console.log({
  memePriceInUsd,
  memePriceInSui,
  priceInSqrtX64: priceToSqrtPriceX64(
    new Decimal(memePriceInSui.toString()),
    9,
    9
  ),
});
