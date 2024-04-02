#[test_only]
module dca::trade_policy_tests {
 use std::option;
 use std::type_name;

 use sui::object;
 use sui::sui::SUI;
 use sui::clock::{Self, Clock};
 use sui::test_utils::{destroy, assert_eq};
 use sui::coin::{mint_for_testing, burn_for_testing};
 use sui::test_scenario::{Self, next_tx, Scenario};

 use dca::dca;
 use dca::trade_policy::{Self, TradePolicy, Admin};

 // Time scale
 const MIN: u8 = 1;

 const MINUTE: u64 = 60 * 1000;

 const ADMIN: address = @0x5;
 const OWNER: address = @0x7;
 const DELEGATEE: address = @0x8;

 struct USDC has drop {}
 struct Whitelisted has drop {}
 struct Blacklisted has drop {}

 #[test]
 fun test_request() {
  let (scenario, clock) = set_up();

  let scenario_mut = &mut scenario;

  next_tx(scenario_mut, OWNER);

  let trade_policy = test_scenario::take_shared<TradePolicy>(scenario_mut);

  let dca = dca::new<SUI, USDC>(
   &clock, 
   mint_for_testing(1000, test_scenario::ctx(&mut scenario)),
   2,
   2,
   MIN,
   0,
   10_000,
   0,
   DELEGATEE, 
   test_scenario::ctx(&mut scenario)
  );

  let (request, sui_coin) = trade_policy::request(&trade_policy, &mut dca, test_scenario::ctx(&mut scenario));


  assert_eq(burn_for_testing(sui_coin), 500);
  assert_eq(trade_policy::whitelist(&trade_policy), vector[]);
  assert_eq(trade_policy::dca_address(&request), object::id_address(&dca));
  assert_eq(trade_policy::rule(&request), option::none());
  assert_eq(trade_policy::output(&request), 0);

  destroy(dca);
  destroy(request);
  destroy(clock);
  destroy(trade_policy);
  test_scenario::end(scenario);
 }

 #[test]
 fun test_add() {
  let (scenario, clock) = set_up_with_wit();

  let scenario_mut = &mut scenario;

  next_tx(scenario_mut, OWNER);

  let trade_policy = test_scenario::take_shared<TradePolicy>(scenario_mut);

  let dca = dca::new<SUI, USDC>(
   &clock, 
   mint_for_testing(1000, test_scenario::ctx(scenario_mut)),
   2,
   2,
   MIN,
   0,
   10_000,
   0,
   DELEGATEE, 
   test_scenario::ctx(scenario_mut)
  );

  let (request, sui_coin) = trade_policy::request(&trade_policy, &mut dca, test_scenario::ctx(scenario_mut));

  trade_policy::add(&mut request, Whitelisted {}, mint_for_testing(3_000, test_scenario::ctx(scenario_mut)));

  assert_eq(trade_policy::rule(&request), option::some(type_name::get<Whitelisted>()));
  assert_eq(trade_policy::output(&request), 3_000);

  destroy(dca);
  destroy(clock);
  destroy(request);
  destroy(sui_coin);
  destroy(trade_policy);
  test_scenario::end(scenario);
 }

 #[test]
 #[expected_failure(abort_code = dca::trade_policy::ERuleAlreadyAdded)]
 fun test_add_rule_already_added_error() {
  let (scenario, clock) = set_up_with_wit();

  let scenario_mut = &mut scenario;

  next_tx(scenario_mut, OWNER);

  let trade_policy = test_scenario::take_shared<TradePolicy>(scenario_mut);

  let dca = dca::new<SUI, USDC>(
   &clock, 
   mint_for_testing(1000, test_scenario::ctx(scenario_mut)),
   2,
   2,
   MIN,
   0,
   10_000,
   0,
   DELEGATEE, 
   test_scenario::ctx(scenario_mut)
  );

  let (request, sui_coin) = trade_policy::request(&trade_policy, &mut dca, test_scenario::ctx(scenario_mut));

  trade_policy::add(&mut request, Whitelisted {}, mint_for_testing(3_000, test_scenario::ctx(scenario_mut)));
  trade_policy::add(&mut request, Whitelisted {}, mint_for_testing(3_000, test_scenario::ctx(scenario_mut)));

  destroy(dca);
  destroy(clock);
  destroy(request);
  destroy(sui_coin);
  destroy(trade_policy);
  test_scenario::end(scenario);
 }

 #[test]
 fun test_confirm() {
  let (scenario, clock) = set_up_with_wit();

  let scenario_mut = &mut scenario;

  next_tx(scenario_mut, OWNER);

  let trade_policy = test_scenario::take_shared<TradePolicy>(scenario_mut);

  let dca = dca::new<SUI, USDC>(
   &clock, 
   mint_for_testing(1000, test_scenario::ctx(scenario_mut)),
   2,
   2,
   MIN,
   0,
   10_000,
   1000000,
   DELEGATEE, 
   test_scenario::ctx(scenario_mut)
  );

  let (request, sui_coin) = trade_policy::request(&trade_policy, &mut dca, test_scenario::ctx(scenario_mut));

  trade_policy::add(&mut request, Whitelisted {}, mint_for_testing(3_000, test_scenario::ctx(scenario_mut)));

  clock::increment_for_testing(&mut clock, 2 * MINUTE);

  assert_eq(dca::owner_output(&dca), 0);
  assert_eq(dca::remaining_orders(&dca), 2);
  assert_eq(dca::delegatee_output(&dca), 0); 

  trade_policy::confirm(&mut dca, &clock, request);

  assert_eq(dca::owner_output(&dca), 2997);
  assert_eq(dca::remaining_orders(&dca), 1);
  assert_eq(dca::delegatee_output(&dca), 3); 

  destroy(dca);
  destroy(clock);
  destroy(sui_coin);
  destroy(trade_policy);
  test_scenario::end(scenario);  
 }

 #[test]
 #[expected_failure(abort_code = dca::trade_policy::EInvalidDcaAddress)]
 fun test_confirm_invalid_dca_address_error() {
  let (scenario, clock) = set_up_with_wit();

  let scenario_mut = &mut scenario;

  next_tx(scenario_mut, OWNER);

  let trade_policy = test_scenario::take_shared<TradePolicy>(scenario_mut);

  let dca = dca::new<SUI, USDC>(
   &clock, 
   mint_for_testing(1000, test_scenario::ctx(scenario_mut)),
   2,
   2,
   MIN,
   0,
   10_000,
   1000000,
   DELEGATEE, 
   test_scenario::ctx(scenario_mut)
  );

  let dca2 = dca::new<SUI, USDC>(
   &clock, 
   mint_for_testing(1000, test_scenario::ctx(scenario_mut)),
   2,
   2,
   MIN,
   0,
   10_000,
   1000000,
   DELEGATEE, 
   test_scenario::ctx(scenario_mut)
  );

  let (request, sui_coin) = trade_policy::request(&trade_policy, &mut dca, test_scenario::ctx(scenario_mut));

  trade_policy::add(&mut request, Whitelisted {}, mint_for_testing(3_000, test_scenario::ctx(scenario_mut)));

  clock::increment_for_testing(&mut clock, 2 * MINUTE);

  trade_policy::confirm(&mut dca2, &clock, request);

  destroy(dca);
  destroy(dca2);
  destroy(clock);
  destroy(sui_coin);
  destroy(trade_policy);
  test_scenario::end(scenario);  
 }

 #[test]
 #[expected_failure(abort_code = dca::trade_policy::EMustHaveARule)]
 fun test_confirm_must_have_a_rule_error() {
  let (scenario, clock) = set_up_with_wit();

  let scenario_mut = &mut scenario;

  next_tx(scenario_mut, OWNER);

  let trade_policy = test_scenario::take_shared<TradePolicy>(scenario_mut);

  let dca = dca::new<SUI, USDC>(
   &clock, 
   mint_for_testing(1000, test_scenario::ctx(scenario_mut)),
   2,
   2,
   MIN,
   0,
   10_000,
   1000000,
   DELEGATEE, 
   test_scenario::ctx(scenario_mut)
  );

  let (request, sui_coin) = trade_policy::request(&trade_policy, &mut dca, test_scenario::ctx(scenario_mut));

  clock::increment_for_testing(&mut clock, 2 * MINUTE);

  trade_policy::confirm(&mut dca, &clock, request);

  destroy(dca);
  destroy(clock);
  destroy(sui_coin);
  destroy(trade_policy);
  test_scenario::end(scenario);  
 }

 #[test]
 #[expected_failure(abort_code = dca::trade_policy::EInvalidRule)]
 fun test_confirm_invalid_rule_error() {
  let (scenario, clock) = set_up_with_wit();

  let scenario_mut = &mut scenario;

  next_tx(scenario_mut, OWNER);

  let trade_policy = test_scenario::take_shared<TradePolicy>(scenario_mut);

  let dca = dca::new<SUI, USDC>(
   &clock, 
   mint_for_testing(1000, test_scenario::ctx(scenario_mut)),
   2,
   2,
   MIN,
   0,
   10_000,
   1000000,
   DELEGATEE, 
   test_scenario::ctx(scenario_mut)
  );

  let (request, sui_coin) = trade_policy::request(&trade_policy, &mut dca, test_scenario::ctx(scenario_mut));

  clock::increment_for_testing(&mut clock, 2 * MINUTE);

  trade_policy::add(&mut request, Blacklisted {}, mint_for_testing(3_000, test_scenario::ctx(scenario_mut)));

  trade_policy::confirm(&mut dca, &clock, request);

  destroy(dca);
  destroy(clock);
  destroy(sui_coin);
  destroy(trade_policy);
  test_scenario::end(scenario);  
 }

 fun set_up(): (Scenario, Clock) {
  let scenario = test_scenario::begin(ADMIN);

   trade_policy::init_for_testing(test_scenario::ctx(&mut scenario));

   let clock = clock::create_for_testing(test_scenario::ctx(&mut scenario));

   (scenario, clock)
 } 

 fun set_up_with_wit(): (Scenario, Clock) {
  let scenario = test_scenario::begin(ADMIN);

   trade_policy::init_for_testing(test_scenario::ctx(&mut scenario));

   let clock = clock::create_for_testing(test_scenario::ctx(&mut scenario));

   next_tx(&mut scenario, ADMIN);

   let trade_policy = test_scenario::take_shared<TradePolicy>(&scenario);
   let admin_cap = test_scenario::take_from_sender<Admin>(&scenario);

   trade_policy::approve<Whitelisted>(&admin_cap, &mut trade_policy);

   test_scenario::return_shared(trade_policy);
   test_scenario::return_to_sender(&scenario, admin_cap);

   (scenario, clock)
 }  
}
