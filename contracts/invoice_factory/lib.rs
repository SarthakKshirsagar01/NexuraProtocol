#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype,
    Address, Env, String, Symbol, symbol_short,
};

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Invoice(u64),
    Counter,
}

#[contracttype]
#[derive(Clone)]
pub struct Invoice {
    pub id: u64,
    pub buyer: Address,
    pub seller: Address,
    pub amount: i128,
    pub description: String,
    pub status: Symbol,
    pub created_at: u64,
}

#[contract]
pub struct InvoiceFactory;

#[contractimpl]
impl InvoiceFactory {
    pub fn create_invoice(
        env: Env,
        buyer: Address,
        seller: Address,
        amount: i128,
        description: String,
    ) -> u64 {
        buyer.require_auth();

        let counter: u64 = env
            .storage()
            .instance()
            .get(&DataKey::Counter)
            .unwrap_or(0);

        let id = counter + 1;

        let invoice = Invoice {
            id,
            buyer: buyer.clone(),
            seller: seller.clone(),
            amount,
            description,
            status: symbol_short!("PENDING"),
            created_at: env.ledger().timestamp(),
        };

        env.storage()
            .instance()
            .set(&DataKey::Invoice(id), &invoice);

        env.storage()
            .instance()
            .set(&DataKey::Counter, &id);

        env.events().publish(
            (symbol_short!("INVOICE"), symbol_short!("CREATED")),
            (id, buyer, seller, amount),
        );

        id
    }

    pub fn get_invoice(env: Env, id: u64) -> Invoice {
        env.storage()
            .instance()
            .get(&DataKey::Invoice(id))
            .expect("Invoice not found")
    }

    pub fn update_status(env: Env, id: u64, new_status: Symbol) {
        let mut invoice: Invoice = env
            .storage()
            .instance()
            .get(&DataKey::Invoice(id))
            .expect("Invoice not found");

        invoice.status = new_status.clone();

        env.storage()
            .instance()
            .set(&DataKey::Invoice(id), &invoice);

        env.events().publish(
            (symbol_short!("INVOICE"), symbol_short!("UPDATED")),
            (id, new_status),
        );
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::testutils::{Address as _, Ledger};
    use soroban_sdk::{Env, String};

    #[test]
    fn test_create_invoice() {
        let env = Env::default();
        env.mock_all_auths();

        let contract_id = env.register_contract(None, InvoiceFactory);
        let client = InvoiceFactoryClient::new(&env, &contract_id);

        let buyer = Address::generate(&env);
        let seller = Address::generate(&env);

        let id = client.create_invoice(
            &buyer,
            &seller,
            &1000_0000000,
            &String::from_str(&env, "100kg wheat delivery"),
        );

        assert_eq!(id, 1);

        let invoice = client.get_invoice(&id);
        assert_eq!(invoice.amount, 1000_0000000);
        assert_eq!(invoice.status, symbol_short!("PENDING"));
    }
}