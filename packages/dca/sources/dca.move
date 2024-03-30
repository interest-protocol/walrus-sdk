module dca::dca {
  // === Imports ===

  use sui::coin::{Coin, Self};
  use sui::object::{Self, UID};
  use sui::clock::{Self, Clock};
  use sui::balance::{Self, Balance};
  use sui::tx_context::{Self, TxContext};
  use sui::transfer::{public_transfer, share_object};

  use suitears::math64;

  // === Friends ===

  friend dca::trade_policy;

  // === Errors ===

  const ESlippage: u64 = 0;
  const EInactive: u64 = 1;
  const EInvalidTimeScale: u64 = 2;
  const EInvalidEvery: u64 = 3;
  const EInvalidTimestamp: u64 = 4;
  const ETooEarly: u64 = 5;
  const EInvalidFee: u64 = 6;
  const EMustBeTheOwner: u64 = 7;
  const EMustBeInactive: u64 = 8;

  // === Constants ===
  
  const MINUTE: u64 = 60;
  const HOUR: u64 = 3600; // 60 * 60
  const DAY: u64 = 86400; // 3600 * 24
  const WEEK: u64 = 604800; // 86400 * 7
  const MONTH: u64 = 2419200; // 86400 * 28 we take the lower bound 
  const MAX_FEE: u64 = 30000000; // 3%
  const PRECISION: u64 = 1000000000;

  // === Structs ===

  struct DCA<phantom Input, phantom Output> has key {
    id: UID,
    /// The original owner of the funds
    owner: address,
    /// Account that gets the fee
    delegatee: address,
    /// Start timestamp determined by the Clock time of when the init
    /// transaction took place
    start_timestamp: u64,
    /// Last trade time
    last_trade_timestamp: u64,
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
    amount_per_trade: u64,
    min: u64,
    max: u64,
    active: bool,
    total_output: u64,
    fee_percent: u64
  }

  // === Public-Mutative Functions ===

  public fun start<Input, Output>(
    clock: &Clock,
    coin_in: Coin<Input>,
    every: u64,
    number_of_orders: u64,
    time_scale: u8,
    min: u64,
    max: u64,
    fee_percent: u64,
    delegatee: address,
    ctx: &mut TxContext
  ) {
    assert!(MAX_FEE > fee_percent, EInvalidFee);
    assert_every(every, time_scale);

    let start_timestamp = timestamp_s(clock);

    let amount_per_trade = math64::div_down(coin::value(&coin_in), number_of_orders);

    let dca = DCA<Input, Output> {
      id: object::new(ctx),
      owner: tx_context::sender(ctx),
      start_timestamp,
      last_trade_timestamp: start_timestamp,
      every,
      remaining_orders: number_of_orders,
      time_scale,
      input_balance: coin::into_balance(coin_in),
      amount_per_trade,
      min,
      max,
      active: true,
      cooldown: convert_to_timestamp(time_scale) * every,
      total_output: 0,
      fee_percent,
      delegatee
    };

    share_object(dca);
  }

  public fun resolve<Input, Output>(
    self: &mut DCA<Input, Output>,
    clock: &Clock,
    coin_out: Coin<Output>,
    ctx: &mut TxContext
  ) {
    assert!(self.active, EInactive);

    let current_timestamp = timestamp_s(clock);

    assert!(current_timestamp - self.last_trade_timestamp >= self.cooldown, ETooEarly);

    let output_value = coin::value(&coin_out);

    assert!(output_value >= self.min && self.max >= output_value, ESlippage);

    self.remaining_orders = self.remaining_orders - 1;

    if (self.remaining_orders == 0 || balance::value(&self.input_balance) == 0)
      self.active = false;

    let coin_fee = coin::split(&mut coin_out, math64::mul_div_up(output_value, self.fee_percent, PRECISION), ctx);

    public_transfer(coin_fee, self.delegatee);

    public_transfer(coin_out, self.owner);
  }

  public fun stop<Input, Output>(self: &mut DCA<Input, Output>, ctx: &mut TxContext) {
    assert!(tx_context::sender(ctx) == self.owner, EMustBeTheOwner);
    self.active = false;
  }

  public fun destroy<Input, Output>(self: DCA<Input, Output>, ctx: &mut TxContext) {
    let DCA { 
      id,
      owner,
      delegatee: _,
      start_timestamp: _,
      last_trade_timestamp: _,
      every: _,
      remaining_orders: _,
      time_scale: _,
      cooldown: _,
      input_balance,
      amount_per_trade: _,
      min: _,
      max: _,
      active,
      total_output: _,
      fee_percent: _  
     } = self;

     assert!(!active, EMustBeInactive);

     if (balance::value(&input_balance) == 0)
      balance::destroy_zero(input_balance)
    else 
      public_transfer(coin::from_balance(input_balance, ctx), owner);
    
    object::delete(id);
  }

  // === Public-View Functions ===

  public fun owner<Input, Output>(self: &DCA<Input, Output>): address {
    self.owner
  }

  public fun delegatee<Input, Output>(self: &DCA<Input, Output>): address {
    self.delegatee
  }

  public fun start_timestamp<Input, Output>(self: &DCA<Input, Output>): u64 {
    self.start_timestamp
  }

  public fun last_trade_timestamp<Input, Output>(self: &DCA<Input, Output>): u64 {
    self.last_trade_timestamp
  }

  public fun every<Input, Output>(self: &DCA<Input, Output>): u64 {
    self.every
  }

  public fun remaining_orders<Input, Output>(self: &DCA<Input, Output>): u64 {
    self.remaining_orders
  }

  public fun time_scale<Input, Output>(self: &DCA<Input, Output>): u8 {
    self.time_scale
  }

  public fun cooldown<Input, Output>(self: &DCA<Input, Output>): u64 {
    self.cooldown
  }

  public fun input_balance_value<Input, Output>(self: &DCA<Input, Output>): u64 {
    balance::value(&self.input_balance)
  }

  public fun amount_per_trade<Input, Output>(self: &DCA<Input, Output>): u64 {
    self.amount_per_trade
  }

  public fun min<Input, Output>(self: &DCA<Input, Output>): u64 {
    self.min
  }

  public fun max<Input, Output>(self: &DCA<Input, Output>): u64 {
    self.max
  }

  public fun active<Input, Output>(self: &DCA<Input, Output>): bool {
    self.active
  }

  public fun total_output<Input, Output>(self: &DCA<Input, Output>): u64 {
    self.total_output
  }

  public fun fee_percent<Input, Output>(self: &DCA<Input, Output>): u64 {
    self.fee_percent
  }

  // === Public-Friend Functions ===

  public(friend) fun take<Input, Output>(self: &mut DCA<Input, Output>, ctx: &mut TxContext): Coin<Input> {
    let value = balance::value(&self.input_balance);
    coin::take(&mut self.input_balance, math64::min(self.amount_per_trade, value), ctx)
  }

  // === Private Functions ===

  fun convert_to_timestamp(time_scale: u8): u64 {
    if (time_scale == 0) return 1;

    if (time_scale == 1) return MINUTE;

    if (time_scale == 2) return HOUR;

    if (time_scale == 3) return DAY;

    if (time_scale == 4) return WEEK;

    if (time_scale == 5) return MONTH;

    abort EInvalidTimeScale
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
        abort EInvalidTimeScale
      }
    };

    assert!(is_ok, EInvalidEvery);
  }

  // === Test Functions ===  
}
