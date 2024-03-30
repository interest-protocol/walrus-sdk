module dca::dca {
  // === Imports ===
  use std::option::{Self, Option, none, is_some};

  use sui::event;
  use sui::sui::SUI;
  use sui::coin::{Coin, Self};
  use sui::object::{Self, UID};
  use sui::clock::{Self, Clock};
  use sui::balance::{Self, Balance};
  use sui::tx_context::{Self, TxContext};
  use sui::transfer::{public_transfer, share_object};

  use suitears::math64::{div_down, min};

  // === Friends ===

  friend dca::trade_policy;

  // === Errors ===

  const ESlippage: u64 = 0;
  const EInactive: u64 = 1;
  const EInvalidTimeScale: u64 = 2;
  const EInvalidEvery: u64 = 3;
  const EInvalidTimestamp: u64 = 4;
  const ETooEarly: u64 = 5;

  // === Constants ===
  
  const MINUTE: u64 = 60;
  const HOUR: u64 = 3600; // 60 * 60
  const DAY: u64 = 86400; // 3600 * 24
  const WEEK: u64 = 604800; // 86400 * 7
  const MONTH: u64 = 2419200; // 86400 * 28 we take the lower bound 

  // === Structs ===

  struct DCA<phantom Input, phantom Output> has key {
    id: UID,
    /// The original owner of the funds
    owner: address,
    /// Start timestamp determined by the Clock time of when the init
    /// transaction took place
    start_time_ms: u64,
    /// Last time funds were withdrawn from the balance
    last_time_ms: u64,
    /// How many units of time, define in terms of time scale
    every: u64,
    /// How many orders remain to be executed
    remaining_orders: u64,
    /// Bit Flag representing the time scale
    /// 0 => seconds
    /// 1 => minutes
    /// 2 => hour
    /// 3 => day
    /// 4 => week
    /// 5 => month
    time_scale: u8,
    cooldown: u64,
    /// Balance to be invested over time. This amount can increase or decrease
    input_balance: Balance<Input>,
    split_allocation: u64, // amonut to withdraw each time
    min_output: Option<u64>,
    active: bool,
    gas: Balance<SUI>,
    total_output: u64
  }

  // === Public-Mutative Functions ===

  public fun start<Input, Output>(
    clock: &Clock,
    coin_in: Coin<Input>,
    gas: Coin<SUI>,
    every: u64,
    number_of_orders: u64,
    time_scale: u8,
    min_output: u64,
    ctx: &mut TxContext
  ) {
    assert_every(every, time_scale);
    let start_time_ms = timestamp_s(clock);

    let split_allocation = div_down(coin::value(&coin_in), number_of_orders);

    let dca = DCA<Input, Output> {
      id: object::new(ctx),
      owner: tx_context::sender(ctx),
      start_time_ms,
      last_time_ms: start_time_ms,
      every,
      remaining_orders: number_of_orders,
      time_scale,
      input_balance: coin::into_balance(coin_in),
      split_allocation,
      min_output: if (min_output == 0) option::none() else option::some(min_output),
      active: true,
      cooldown: convert_to_timestamp(every, time_scale),
      gas: coin::into_balance(gas),
      total_output: 0
    };

    share_object(dca);
  }

  public fun resolve<Input, Output>(
    self: &mut DCA<Input, Output>,
    clock: &Clock,
    coin_out: Coin<Output>,
  ) {
    assert!(self.active, EInactive);

    let time_elapsed = timestamp_s(clock);

    assert!(time_elapsed >= self.cooldown, ETooEarly);

    let output_value = coin::value(&coin_out);

    if (is_some(&self.min_output))
      assert!(output_value >= option::destroy_some(self.min_output), ESlippage);

    self.remaining_orders = self.remaining_orders - 1;

    if (self.remaining_orders == 0 || balance::value(&self.input_balance) == 0)
      self.active = false;

    public_transfer(coin_out, self.owner);
  }

  // === Public-View Functions ===

  // === Admin Functions ===

  // === Public-Friend Functions ===

  public(friend) fun take<Input, Output>(self: &mut DCA<Input, Output>, ctx: &mut TxContext): Coin<Input> {
    let value = balance::value(&self.input_balance);
    coin::take(&mut self.input_balance, min(self.split_allocation, value), ctx)
  }

  // === Private Functions ===

  fun convert_to_timestamp(every: u64, time_scale: u8): u64 {
    if (time_scale == 0) return 1 * every;

    if (time_scale == 1) return MINUTE * every;

    if (time_scale == 2) return HOUR * every;

    if (time_scale == 3) return DAY * every;

    if (time_scale == 4) return WEEK * every;

    if (time_scale == 5) return MONTH * every;

    abort EInvalidTimestamp
  }

  fun timestamp_s(clock: &Clock): u64 {
    clock::timestamp_ms(clock) / 1000
  }

  fun assert_every(every: u64, time_scale: u8) {
    // Depending on the time_scale the restrictions on `every` are different
    let is_ok = {
      if (time_scale == 0) { // 0 => seconds
        // Lower bound --> 30 seconds
        // Upper bound --> 59 seconds
        every >= 30 && every <= 59
      } else if (time_scale == 1) { // 1 => minutes
        // Lower bound --> 1 minute
        // Upper bound --> 59 minutes
        every >= 1 && every <= 59
      } else if (time_scale == 2) { // 2 => hours
        // Lower bound --> 1 hour
        // Upper bound --> 24 hours
        every >= 1 && every <= 24
      } else if (time_scale == 3) { // 3 => days
        // Lower bound --> 1 day
        // Upper bound --> 6 days
        every >= 1 && every <= 6
      } else if (time_scale == 4) { // 4 => weeks
        // Lower bound --> 1 week
        // Upper bound --> 4 weeks
        every >= 1 && every <= 4
      } else if (time_scale == 5) { // 5 => months
        // Lower bound --> 1 month
        // Upper bound --> 12 months
        every >= 1 && every <= 12
      } else {
        abort(EInvalidTimeScale)
      }
    };

    assert!(is_ok, EInvalidEvery);
  }

  // === Test Functions ===  
}
