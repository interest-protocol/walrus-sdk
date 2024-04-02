#[test_only]
module dca::dca_tests {

 use sui::clock;
 use sui::sui::SUI;
 use sui::coin::mint_for_testing;
 use sui::tx_context::new_from_hint;
 use sui::test_utils::{destroy, assert_eq};

 use dca::dca;

 // Time scale
 const SEC: u8 = 0;
 const MIN: u8 = 1;
 const H: u8 = 2;
 const D: u8 = 3;
 const W: u8 = 4;
 const M: u8 = 5;

 const MINUTE: u64 = 60;
 const HOUR: u64 = 3600; // 60 * 60
 const DAY: u64 = 86400; // 3600 * 24
 const WEEK: u64 = 604800; // 86400 * 7
 const MONTH: u64 = 2419200; // 86400 * 28 we take the lower bound 
 const MAX_FEE: u64 = 30000000; // 3%
 const PRECISION: u64 = 1000000000; 

 const MILLISECONDS: u64 = 1000;

 const OWNER: address = @0x7;
 const DELEGATEE: address = @0x8;

struct USDC has drop {}

 #[test]
 fun test_new() {
   let ctx = new_from_hint(
    OWNER, 
    7, 
    0, 
    0, 
    0
   );
   let ctx_mut = &mut ctx;
   let clock = clock::create_for_testing(ctx_mut);

   clock::increment_for_testing(&mut clock, 15 * MILLISECONDS);

   let coin_in_value = 100;
   let every = 3;
   let number_of_orders = 10;
   let min = 1;
   let max = 2;
   let fee_percent = 77;

   let dca = dca::new<SUI, USDC>(
     &clock,
     mint_for_testing<SUI>(coin_in_value, ctx_mut),
     every,
     number_of_orders,
     MIN,
     min,
     max,
     fee_percent,
     DELEGATEE,
     ctx_mut
   );

   assert_eq(dca::owner(&dca), OWNER);
   assert_eq(dca::delegatee(&dca), DELEGATEE);
   assert_eq(dca::start_timestamp(&dca), 15);
   assert_eq(dca::last_trade_timestamp(&dca), 15);
   assert_eq(dca::time_scale(&dca), MIN);
   assert_eq(dca::amount_per_trade(&dca), 100 / number_of_orders);
   assert_eq(dca::min(&dca), min);
   assert_eq(dca::max(&dca), max);
   assert_eq(dca::active(&dca), true);
   assert_eq(dca::cooldown(&dca), MINUTE * every);
   assert_eq(dca::input(&dca), 100);
   assert_eq(dca::owner_output(&dca), 0);
   assert_eq(dca::delegatee_output(&dca), 0);
   assert_eq(dca::fee_percent(&dca), fee_percent);

   destroy(dca);
   destroy(clock);
 }
}
