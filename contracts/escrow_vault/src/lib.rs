#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, token,
    Address, Env, symbol_short,
};

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Escrow(u64),
    ReentrancyLock,
}

#[contracttype]
#[derive(Clone)]
pub struct Escrow {
    pub invoice_id: u64,
    pub buyer: Address,
    pub seller: Address,
    pub amount: i128,
    pub token: Address,
    pub locked_at: u64,
    pub released: bool,
}

#[contract]
pub struct EscrowVault;

#[contractimpl]
impl EscrowVault {
    /// Lock funds into escrow for a specific invoice
    pub fn lock(
        env: Env,
        invoice_id: u64,
        buyer: Address,
        seller: Address,
        token: Address,
        amount: i128,
    ) {
        buyer.require_auth();

        // Overflow protection on amount
        let checked_amount = amount.checked_add(0)
            .expect("Amount overflow");

        // Transfer tokens from buyer to this contract
        let token_client = token::Client::new(&env, &token);
        token_client.transfer(
            &buyer,
            &env.current_contract_address(),
            &checked_amount,
        );

        let escrow = Escrow {
            invoice_id,
            buyer: buyer.clone(),
            seller: seller.clone(),
            amount: checked_amount,
            token: token.clone(),
            locked_at: env.ledger().timestamp(),
            released: false,
        };

        env.storage()
            .instance()
            .set(&DataKey::Escrow(invoice_id), &escrow);

        env.events().publish(
            (symbol_short!("ESCROW"), symbol_short!("LOCKED")),
            (invoice_id, buyer, seller, checked_amount),
        );
    }

    /// Release funds to seller (called by oracle after delivery confirmation)
    pub fn release(env: Env, invoice_id: u64, caller: Address) {
        caller.require_auth();

        // Reentrancy guard
        let lock_key = DataKey::ReentrancyLock;
        if env.storage().instance().has(&lock_key) {
            panic!("Reentrancy detected");
        }
        env.storage().instance().set(&lock_key, &true);

        let mut escrow: Escrow = env
            .storage()
            .instance()
            .get(&DataKey::Escrow(invoice_id))
            .expect("Escrow not found");

        if escrow.released {
            panic!("Already released");
        }

        // Transfer tokens to seller
        let token_client = token::Client::new(&env, &escrow.token);
        token_client.transfer(
            &env.current_contract_address(),
            &escrow.seller,
            &escrow.amount,
        );

        escrow.released = true;
        env.storage()
            .instance()
            .set(&DataKey::Escrow(invoice_id), &escrow);

        env.events().publish(
            (symbol_short!("ESCROW"), symbol_short!("RELEASED")),
            (invoice_id, escrow.seller.clone(), escrow.amount),
        );

        // Remove reentrancy lock
        env.storage().instance().remove(&lock_key);
    }

    /// Get escrow details
    pub fn get_escrow(env: Env, invoice_id: u64) -> Escrow {
        env.storage()
            .instance()
            .get(&DataKey::Escrow(invoice_id))
            .expect("Escrow not found")
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::testutils::Address as _;
    use soroban_sdk::{token, Address, Env};

    fn create_token_contract<'a>(
        e: &Env,
        admin: &Address,
    ) -> (Address, token::Client<'a>, token::StellarAssetClient<'a>) {
        let addr = e.register_stellar_asset_contract(admin.clone());
        (
            addr.clone(),
            token::Client::new(e, &addr),
            token::StellarAssetClient::new(e, &addr),
        )
    }

    #[test]
    fn test_lock_and_release() {
        let env = Env::default();
        env.mock_all_auths();

        let admin = Address::generate(&env);
        let buyer = Address::generate(&env);
        let seller = Address::generate(&env);
        let oracle = Address::generate(&env);

        let (token_addr, token, token_admin) = create_token_contract(&env, &admin);
        token_admin.mint(&buyer, &1000);

        let contract_id = env.register_contract(None, EscrowVault);
        let client = EscrowVaultClient::new(&env, &contract_id);

        // Lock funds
        client.lock(&1, &buyer, &seller, &token_addr, &500);

        let escrow = client.get_escrow(&1);
        assert_eq!(escrow.amount, 500);
        assert_eq!(escrow.released, false);
        assert_eq!(token.balance(&contract_id), 500);

        // Release funds
        client.release(&1, &oracle);

        let escrow = client.get_escrow(&1);
        assert_eq!(escrow.released, true);
        assert_eq!(token.balance(&seller), 500);
        assert_eq!(token.balance(&contract_id), 0);
    }

    #[test]
    #[should_panic(expected = "Already released")]
    fn test_double_release_protection() {
        let env = Env::default();
        env.mock_all_auths();

        let admin = Address::generate(&env);
        let buyer = Address::generate(&env);
        let seller = Address::generate(&env);
        let oracle = Address::generate(&env);

        let (token_addr, token, token_admin) = create_token_contract(&env, &admin);
        token_admin.mint(&buyer, &1000);

        let contract_id = env.register_contract(None, EscrowVault);
        let client = EscrowVaultClient::new(&env, &contract_id);

        client.lock(&1, &buyer, &seller, &token_addr, &500);
        client.release(&1, &oracle);
        
        // This should panic
        client.release(&1, &oracle);
    }
}