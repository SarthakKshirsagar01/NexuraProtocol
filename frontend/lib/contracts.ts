/**
 * Nexura Protocol - Smart Contract Integration
 *
 * This file contains the integration logic between the Next.js frontend
 * and the deployed Soroban smart contracts on Stellar Testnet.
 */

import * as StellarSdk from "@stellar/stellar-sdk";

// Deployed Contract Addresses on Stellar Testnet
export const CONTRACTS = {
  INVOICE_FACTORY: "CA3EIXJF43GIEYG3DQC7GNKREF7FK57YKUALLABDH66GRBLSCGYJCDMH",
  ESCROW_VAULT: "CCPIEXBMQ5ULOOZHDGRODRLEYCVWIGNHODBTJO4JQ25MIOHCONODAZBF",
  ORACLE_VERIFIER: "CB7YB2EXLCPLEMEGXR7NJKEED22EID2VIGHL5OFTFH4PXZWLLNOOIJHW",
} as const;

// Network Configuration
export const NETWORK_CONFIG = {
  networkPassphrase: StellarSdk.Networks.TESTNET,
  rpcUrl: "https://soroban-testnet.stellar.org",
  horizonUrl: "https://horizon-testnet.stellar.org",
} as const;

// Initialize Soroban Server
const server = new StellarSdk.SorobanRpc.Server(NETWORK_CONFIG.rpcUrl);

/**
 * Create Invoice
 * Calls the InvoiceFactory contract to create a new invoice
 */
export async function createInvoice(params: {
  buyer: string;
  seller: string;
  amount: string;
  description: string;
  userPublicKey: string;
}) {
  try {
    // Build transaction to call create_invoice function
    const contract = new StellarSdk.Contract(CONTRACTS.INVOICE_FACTORY);

    const account = await server.getAccount(params.userPublicKey);

    // Prepare contract call
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: NETWORK_CONFIG.networkPassphrase,
    })
      .addOperation(
        contract.call(
          "create_invoice",
          StellarSdk.Address.fromString(params.buyer).toScVal(),
          StellarSdk.Address.fromString(params.seller).toScVal(),
          StellarSdk.nativeToScVal(BigInt(params.amount), { type: "i128" }),
          StellarSdk.nativeToScVal(params.description, { type: "string" }),
        ),
      )
      .setTimeout(30)
      .build();

    // Simulate transaction
    const simulated = await server.simulateTransaction(transaction);

    if (StellarSdk.SorobanRpc.Api.isSimulationSuccess(simulated)) {
      // Prepare for signing
      const preparedTransaction = StellarSdk.SorobanRpc.assembleTransaction(
        transaction,
        simulated,
      ).build();

      return {
        transaction: preparedTransaction.toXDR(),
        simulationResult: simulated,
      };
    } else {
      throw new Error("Transaction simulation failed");
    }
  } catch (error) {
    console.error("Contract call error:", error);
    throw error;
  }
}

/**
 * Lock Funds in Escrow
 * Calls the EscrowVault contract to lock funds for an invoice
 */
export async function lockFunds(params: {
  invoiceId: number;
  buyer: string;
  seller: string;
  token: string;
  amount: string;
  userPublicKey: string;
}) {
  try {
    const contract = new StellarSdk.Contract(CONTRACTS.ESCROW_VAULT);
    const account = await server.getAccount(params.userPublicKey);

    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: NETWORK_CONFIG.networkPassphrase,
    })
      .addOperation(
        contract.call(
          "lock",
          StellarSdk.nativeToScVal(params.invoiceId, { type: "u64" }),
          StellarSdk.Address.fromString(params.buyer).toScVal(),
          StellarSdk.Address.fromString(params.seller).toScVal(),
          StellarSdk.Address.fromString(params.token).toScVal(),
          StellarSdk.nativeToScVal(BigInt(params.amount), { type: "i128" }),
        ),
      )
      .setTimeout(30)
      .build();

    const simulated = await server.simulateTransaction(transaction);

    if (StellarSdk.SorobanRpc.Api.isSimulationSuccess(simulated)) {
      const preparedTransaction = StellarSdk.SorobanRpc.assembleTransaction(
        transaction,
        simulated,
      ).build();

      return {
        transaction: preparedTransaction.toXDR(),
        simulationResult: simulated,
      };
    } else {
      throw new Error("Escrow lock simulation failed");
    }
  } catch (error) {
    console.error("Escrow lock error:", error);
    throw error;
  }
}

/**
 * Verify Delivery
 * Calls the OracleVerifier contract to confirm delivery
 */
export async function verifyDelivery(params: {
  invoiceId: number;
  verifier: string;
  approved: boolean;
  userPublicKey: string;
}) {
  try {
    const contract = new StellarSdk.Contract(CONTRACTS.ORACLE_VERIFIER);
    const account = await server.getAccount(params.userPublicKey);

    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: NETWORK_CONFIG.networkPassphrase,
    })
      .addOperation(
        contract.call(
          "verify_delivery",
          StellarSdk.nativeToScVal(params.invoiceId, { type: "u64" }),
          StellarSdk.Address.fromString(params.verifier).toScVal(),
          StellarSdk.nativeToScVal(params.approved, { type: "bool" }),
        ),
      )
      .setTimeout(30)
      .build();

    const simulated = await server.simulateTransaction(transaction);

    if (StellarSdk.SorobanRpc.Api.isSimulationSuccess(simulated)) {
      const preparedTransaction = StellarSdk.SorobanRpc.assembleTransaction(
        transaction,
        simulated,
      ).build();

      return {
        transaction: preparedTransaction.toXDR(),
        simulationResult: simulated,
      };
    } else {
      throw new Error("Verification simulation failed");
    }
  } catch (error) {
    console.error("Verification error:", error);
    throw error;
  }
}

/**
 * Get Invoice Details
 * Reads invoice data from the InvoiceFactory contract
 */
export async function getInvoice(invoiceId: number) {
  try {
    const contract = new StellarSdk.Contract(CONTRACTS.INVOICE_FACTORY);

    // Build read-only transaction
    const account = new StellarSdk.Account(
      "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF", // Null account for read-only
      "0",
    );

    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: NETWORK_CONFIG.networkPassphrase,
    })
      .addOperation(
        contract.call(
          "get_invoice",
          StellarSdk.nativeToScVal(invoiceId, { type: "u64" }),
        ),
      )
      .setTimeout(30)
      .build();

    const simulated = await server.simulateTransaction(transaction);

    if (StellarSdk.SorobanRpc.Api.isSimulationSuccess(simulated)) {
      return simulated.result?.retval;
    } else {
      throw new Error("Failed to fetch invoice");
    }
  } catch (error) {
    console.error("Get invoice error:", error);
    throw error;
  }
}

/**
 * Sign and Submit Transaction
 * Uses Freighter wallet to sign and submit to Stellar network
 */
export async function signAndSubmitTransaction(xdr: string) {
  try {
    // Check if Freighter is available
    if (typeof window === "undefined" || !(window as any).freighter) {
      throw new Error("Freighter wallet not installed");
    }

    // Request signature from Freighter
    const signedXdr = await (window as any).freighter.signTransaction(xdr, {
      network: "TESTNET",
      networkPassphrase: NETWORK_CONFIG.networkPassphrase,
    });

    // Submit to network
    const transaction = StellarSdk.TransactionBuilder.fromXDR(
      signedXdr,
      NETWORK_CONFIG.networkPassphrase,
    );

    const result = await server.sendTransaction(
      transaction as StellarSdk.Transaction,
    );

    // Wait for confirmation
    let status = await server.getTransaction(result.hash);
    while (status.status === "NOT_FOUND") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      status = await server.getTransaction(result.hash);
    }

    return {
      hash: result.hash,
      status: status.status,
      result: status,
    };
  } catch (error) {
    console.error("Transaction signing/submission error:", error);
    throw error;
  }
}
