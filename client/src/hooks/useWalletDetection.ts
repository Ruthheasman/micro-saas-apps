import { useState, useEffect, useCallback } from "react";

export type WalletProvider = "yours" | null;

interface WalletInfo {
  isInstalled: boolean;
  isConnected: boolean;
  provider: WalletProvider;
  connect: () => Promise<{ success: boolean; error?: string }>;
  disconnect: () => void;
}

declare global {
  interface Window {
    yours?: {
      isReady?: boolean;
      connect?: () => Promise<any>;
      disconnect?: () => Promise<void>;
      getBalance?: () => Promise<any>;
      getAddresses?: () => Promise<string[]>;
      sendBsv?: (params: any) => Promise<any>;
    };
  }
}

export function useWalletDetection(): WalletInfo {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState<WalletProvider>(null);

  useEffect(() => {
    const checkForWallet = () => {
      if (typeof window.yours !== 'undefined') {
        setIsInstalled(true);
        setProvider("yours");
        return true;
      }
      return false;
    };

    if (checkForWallet()) {
      return;
    }

    const timeout = setTimeout(() => {
      checkForWallet();
    }, 1000);

    const handleYoursInitialized = () => {
      checkForWallet();
    };

    window.addEventListener('yours#initialized', handleYoursInitialized);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('yours#initialized', handleYoursInitialized);
    };
  }, []);

  const connect = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (typeof window.yours === 'undefined') {
      return {
        success: false,
        error: "Yours Wallet not detected. Please install it from the Chrome Web Store.",
      };
    }

    try {
      if (window.yours.connect) {
        await window.yours.connect();
      }
      setIsConnected(true);
      return { success: true };
    } catch (error) {
      console.error("Wallet connection error:", error);
      setIsConnected(false);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to connect wallet",
      };
    }
  }, []);

  const disconnect = useCallback(() => {
    setIsConnected(false);
    if (window.yours?.disconnect) {
      window.yours.disconnect().catch(console.error);
    }
  }, []);

  return {
    isInstalled,
    isConnected,
    provider,
    connect,
    disconnect,
  };
}

export async function getWalletBalance(): Promise<{ balance: number; error?: string }> {
  if (typeof window.yours === 'undefined' || !window.yours.getBalance) {
    return {
      balance: 0,
      error: "Wallet not available",
    };
  }

  try {
    const balance = await window.yours.getBalance();
    return { balance: balance || 0 };
  } catch (error) {
    console.error("Error fetching balance:", error);
    return {
      balance: 0,
      error: error instanceof Error ? error.message : "Failed to fetch balance",
    };
  }
}
