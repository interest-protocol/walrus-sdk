import { client, executeTx, log } from './utils.script';

// struct SwapEvent has copy, drop, store {
//     atob: bool,
//     pool: ID,
//     partner: ID,
//     amount_in: u64,
//     amount_out: u64,
//     ref_amount: u64,
//     fee_amount: u64,
//     vault_a_amount: u64,
//     vault_b_amount: u64,
//     before_sqrt_price: u128,
//     after_sqrt_price: u128,
//     steps: u64,
// }

(async () => {
  try {
    const { data, hasNextPage, nextCursor } = await client.queryEvents({
      query: {
        All: [
          {
            MoveEventType:
              '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb::pool::SwapEvent',
          },
          {
            TimeRange: {
              endTime: '1',
              startTime: '2',
            },
          },
        ],
      },
    });

    client.getObject({
      id: '0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb::pool::SwapEvent',
    });

    client.getCoinMetadata({ coinType: '0x2::sui::SUI' });

    log(events);
  } catch (e) {
    console.log(e);
  }
})();
