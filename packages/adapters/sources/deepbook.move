module adapter::deepbook_adapter {
    // === Imports ===

    use sui::{
        clock::Clock,
        coin::{Self, Coin},
        transfer::public_transfer
    };

    use deepbook::{
        clob_v2::{Self, Pool},
        custodian_v2::AccountCap
    };

    use dca::dca::Request;

    // === Structs ===

    public struct Deepbook has drop {}

    // === Public-Mutative Functions ===

    public fun swap_base<Base, Quote>(
        request: &mut Request<Quote>,
        pool: &mut Pool<Base, Quote>,
        clock: &Clock,
        account_cap: &AccountCap,
        client_order_id: u64,
        base_coin: Coin<Base>,
        ctx: &mut TxContext,  
    ) {
        let quantity = coin::value(&base_coin);

        let (base_out, quote_out) = clob_v2::place_market_order<Base, Quote>(
            pool, 
            account_cap, 
            client_order_id, 
            quantity,
            false,
            base_coin,
            coin::zero(ctx),
            clock,
            ctx
        );

        resolve(request, base_out, quote_out);
    }

    public fun swap_quote<Base, Quote>(
        request: &mut Request<Base>,
        pool: &mut Pool<Base, Quote>,
        clock: &Clock,
        account_cap: &AccountCap,
        client_order_id: u64,
        quote_coin: Coin<Quote>,
        ctx: &mut TxContext, 
    ) {
        let quantity = coin::value(&quote_coin);

        let (base_out, quote_out) = clob_v2::place_market_order<Base, Quote>(
            pool, 
            account_cap, 
            client_order_id, 
            quantity,
            true,
            coin::zero(ctx),
            quote_coin,
            clock,
            ctx
        );

        resolve(request, quote_out, base_out);
    }

    // === Private Functions ===

    fun resolve<Input, Output>(request: &mut Request<Output>, extra: Coin<Input>, output: Coin<Output>) {
        public_transfer(extra, request.owner());
        request.add<Deepbook, Output>(Deepbook {}, output);   
    }
}