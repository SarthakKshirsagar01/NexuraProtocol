"use client";

import { useState, useEffect } from "react";
import { isConnected, getAddress, requestAccess } from "@stellar/freighter-api";

export function useWallet() {
  const [publicKey, setPublicKey] = useState<string>("");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const { isConnected: walletConnected } = await isConnected();
      if (walletConnected) {
        const { address, error } = await getAddress();
        if (error || !address) return;
        setPublicKey(address);
        setConnected(true);
      }
    } catch (error) {
      console.error("Wallet check failed:", error);
    }
  };

  const connect = async () => {
    setLoading(true);
    try {
      const { address, error } = await requestAccess();
      if (error) {
        throw new Error(error.message || "Failed to connect wallet");
      }
      if (address) {
        setPublicKey(address);
        setConnected(true);
      }
    } catch (error: any) {
      alert(error.message || "Failed to connect wallet");
    }
    setLoading(false);
  };

  const disconnect = () => {
    setPublicKey("");
    setConnected(false);
  };

  return { publicKey, connected, loading, connect, disconnect };
}
