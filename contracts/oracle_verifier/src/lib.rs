#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype,
    Address, Env, Symbol, Vec, symbol_short,
};

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Verifiers,
    Verification(u64),
    Threshold,
}

#[contract]
pub struct OracleVerifier;

#[contractimpl]
impl OracleVerifier {
    pub fn initialize(env: Env, verifiers: Vec<Address>, threshold: u32) {
        if env.storage().instance().has(&DataKey::Verifiers) {
            panic!("Already initialized");
        }
        env.storage().instance().set(&DataKey::Verifiers, &verifiers);
        env.storage().instance().set(&DataKey::Threshold, &threshold);
    }

    pub fn verify_delivery(
        env: Env,
        invoice_id: u64,
        verifier: Address,
        approved: bool,
    ) -> bool {
        verifier.require_auth();

        let verifiers: Vec<Address> = env
            .storage()
            .instance()
            .get(&DataKey::Verifiers)
            .expect("Not initialized");

        if !verifiers.contains(&verifier) {
            panic!("Unauthorized verifier");
        }

        let key = DataKey::Verification(invoice_id);
        let mut count: u32 = env.storage().instance().get(&key).unwrap_or(0);

        if approved {
            count = count.checked_add(1).expect("Count overflow");
            env.storage().instance().set(&key, &count);
        }

        let threshold: u32 = env
            .storage()
            .instance()
            .get(&DataKey::Threshold)
            .expect("Threshold not set");

        let confirmed = count >= threshold;

        if confirmed {
            env.events().publish(
                (symbol_short!("DELIVERY"), symbol_short!("CONFIRM")),
                (invoice_id, count),
            );
        }

        confirmed
    }

    pub fn get_verification_count(env: Env, invoice_id: u64) -> u32 {
        env.storage()
            .instance()
            .get(&DataKey::Verification(invoice_id))
            .unwrap_or(0)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, vec, Env};

    #[test]
    fn test_multisig_verification() {
        let env = Env::default();
        env.mock_all_auths();

        let v1 = Address::generate(&env);
        let v2 = Address::generate(&env);
        let v3 = Address::generate(&env);

        let contract_id = env.register_contract(None, OracleVerifier);
        let client = OracleVerifierClient::new(&env, &contract_id);

        client.initialize(&vec![&env, v1.clone(), v2.clone(), v3.clone()], &2);

        assert_eq!(client.verify_delivery(&1, &v1, &true), false);
        assert_eq!(client.get_verification_count(&1), 1);

        assert_eq!(client.verify_delivery(&1, &v2, &true), true);
        assert_eq!(client.get_verification_count(&1), 2);
    }
}