"use client";

import { useEffect, useState } from "react";
import { isConnected, getAddress, requestAccess } from "@stellar/freighter-api";

export function useWallet() {
  const [publicKey, setPublicKey] = useState<string>("");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      void (async () => {
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
      })();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

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
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to connect wallet";
      alert(message);
    }
    setLoading(false);
  };

  const disconnect = () => {
    setPublicKey("");
    setConnected(false);
  };

  return { publicKey, connected, loading, connect, disconnect };
}
