module dca::trade_policy {
  // === Imports ===
  use std::option::{Self, Option};

  use std::type_name::{Self, TypeName};

  use sui::clock::Clock;
  use sui::coin::{Self, Coin};
  use sui::transfer::transfer;
  use sui::object::{Self, UID};
  use sui::vec_set::{Self, VecSet};
  use sui::balance::{Self, Balance};
  use sui::tx_context::{Self, TxContext};

  use dca::dca::{Self, DCA};

  // === Errors ===

  const EInvalidDcaAddress: u64 = 0;
  const ERuleAlreadyAdded: u64 = 1;
  const EMustHaveARule: u64 = 2;
  const EInvalidRule: u64 = 3;

  // === Structs ===

  struct Admin has key, store {
    id: UID
  }

  struct TradePolicy has key {
    id: UID,
    whitelist: VecSet<TypeName>
  }

  struct Request<phantom Input, phantom Output> {
    dca_address: address,
    rule: Option<TypeName>,
    whitelist: VecSet<TypeName>,
    output: Balance<Output>
  }

  // === Public-Mutative Functions ===

  fun init(ctx: &mut TxContext) {
    transfer(Admin { id: object::new(ctx) }, tx_context::sender(ctx));
  }

  public fun request<Input, Output>(
    self: &TradePolicy,
    dca: &mut DCA<Input, Output>,
    ctx: &mut TxContext
  ): (Request<Input, Output>, Coin<Input>) {
    let req = Request {
      dca_address: object::id_address(dca),
      rule: option::none(),
      whitelist: self.whitelist,
      output: balance::zero()
    };

    (req, dca::take(dca, ctx))
  }

  public fun add_rule<Witness, Input, Output>(request: &mut Request<Input, Output>) {
    assert!(option::is_none(&request.rule), ERuleAlreadyAdded);
    request.rule = option::some(type_name::get<Witness>());
  }

  public fun confirm_request<Input, Output>(
    dca: &mut DCA<Input, Output>,
    clock: &Clock,
    request: Request<Input, Output>,
    ctx: &mut TxContext    
  ) {
    let Request { 
      dca_address, 
      rule, 
      whitelist, 
      output
    } = request;

    assert!(object::id_address(dca) == dca_address, EInvalidDcaAddress);
    assert!(option::is_some(&rule), EMustHaveARule);
    assert!(vec_set::contains(&whitelist, &option::destroy_some(rule)), EInvalidRule);

    dca::resolve(dca, clock, coin::from_balance(output, ctx));
  } 

  // === Public-View Functions ===

  public fun whitelist(self: &TradePolicy): vector<TypeName> {
    vec_set::into_keys(self.whitelist)
  }

  public fun dca_address<Input, Output>(req: &Request<Input, Output>): address {
    req.dca_address
  }

  public fun rule<Input, Output>(req: &Request<Input, Output>): Option<TypeName> {
    req.rule
  }

  public fun output<Input, Output>(req: &Request<Input, Output>): u64 {
    balance::value(&req.output)
  }

  // === Admin Functions ===

  public fun add<Witness: drop>(self: &mut TradePolicy) {
    vec_set::insert(&mut self.whitelist, type_name::get<Witness>());
  }

  public fun remove<Witness: drop>(self: &mut TradePolicy) {
    vec_set::remove(&mut self.whitelist, &type_name::get<Witness>());
  }

  // === Test Functions === 
}
