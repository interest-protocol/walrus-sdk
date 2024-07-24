module adapter::whitelist_adapter {
    // === Imports ===

    use sui::{
        coin::Coin,
        vec_set::{Self, VecSet}
    };

    use dca::dca::{Request, Admin};

    // === Errors ===

    const EInvalidCaller: u64 = 0;

    // === Structs ===

    public struct Witness has drop {}
    
    public struct Whitelist has key {
        id: UID,
        members: VecSet<address>
    }

    // === Public-Mutative Functions ===

    fun init(ctx: &mut TxContext) {
        transfer::share_object(
            Whitelist {
                id: object::new(ctx),
                members: vec_set::empty()
            }
        );
    }

    public fun swap<Output>(
        whitelist: &Whitelist,
        request: &mut Request<Output>,
        output: Coin<Output>,
        ctx: &TxContext
    ) {
        assert!(whitelist.members.contains(&ctx.sender()), EInvalidCaller);
        resolve(request, output);
    }

    // === Admin Functions ===

    public fun add(whitelist: &mut Whitelist, _: &Admin, member: address) {
        whitelist.members.insert(member)
    }

    public fun remove(whitelist: &mut Whitelist, _: &Admin, member: address) {
        whitelist.members.remove(&member)
    }

    // === Private Functions ===

    fun resolve<Output>(request: &mut Request<Output>, output: Coin<Output>) {
        request.add<Witness, Output>(Witness {}, output);   
    }
}