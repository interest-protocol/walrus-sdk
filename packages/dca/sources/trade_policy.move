module dca::trade_policy {
  // === Imports ===
  use std::option::{Self, Option};

  use std::type_name::{Self, TypeName};

  use sui::clock::Clock;
  use sui::coin::{Self, Coin};
  use sui::transfer::transfer;
  use sui::object::{Self, UID};
  use sui::vec_set::{Self, VecSet};
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

  struct Request<phantom Output> {
    dca_address: address,
    rule: Option<TypeName>,
    whitelist: VecSet<TypeName>,
    output: Coin<Output>
  }

  // === Public-Mutative Functions ===

  fun init(ctx: &mut TxContext) {
    transfer(Admin { id: object::new(ctx) }, tx_context::sender(ctx));
  }

  public fun request<Input, Output>(
    self: &TradePolicy,
    dca: &mut DCA<Input, Output>,
    ctx: &mut TxContext
  ): (Request<Output>, Coin<Input>) {
    let request = Request {
      dca_address: object::id_address(dca),
      rule: option::none(),
      whitelist: self.whitelist,
      output: coin::zero(ctx)
    };

    (request, dca::take(dca, ctx))
  }

  public fun add<Witness, Output>(request: &mut Request<Output>, _: Witness, output: Coin<Output>) {
    assert!(option::is_none(&request.rule), ERuleAlreadyAdded);
    request.rule = option::some(type_name::get<Witness>());
    coin::join(&mut request.output, output);
  }

  public fun confirm_request<Input, Output>(
    dca: &mut DCA<Input, Output>,
    clock: &Clock,
    request: Request<Output>,
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

    dca::resolve(dca, clock, output, ctx);
  }

  // === Public-View Functions ===

  public fun whitelist(self: &TradePolicy): vector<TypeName> {
    vec_set::into_keys(self.whitelist)
  }

  public fun dca_address<Output>(request: &Request<Output>): address {
    request.dca_address
  }

  public fun rule<Output>(request: &Request<Output>): Option<TypeName> {
    request.rule
  }

  public fun output<Output>(request: &Request<Output>): u64 {
    coin::value(&request.output)
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
