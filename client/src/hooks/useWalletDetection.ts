import { useState, useEffect, useCallback } from "react";
import {
  WalletProvider,
  detectAvailableWallets,
  getWalletAdapter,
} from "@/lib/walletAdapters";

interface WalletInfo {
  availableProviders: WalletProvider[];
  selectedProvider: WalletProvider;
  isConnected: boolean;
  connect: (provider: WalletProvider) => Promise<{ success: boolean; error?: string }>;
  disconnect: () => void;
  selectProvider: (provider: WalletProvider) => void;
}

const WALLET_PROVIDER_KEY = "selected_wallet_provider";

export function useWalletDetection(): WalletInfo {
  const [availableProviders, setAvailableProviders] = useState<WalletProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<WalletProvider>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkForWallets = () => {
      const detected = detectAvailableWallets();
      setAvailableProviders(detected);

      const savedProvider = localStorage.getItem(WALLET_PROVIDER_KEY) as WalletProvider;
      if (savedProvider && detected.includes(savedProvider)) {
        setSelectedProvider(savedProvider);
      } else if (detected.length > 0) {
        setSelectedProvider(detected[0]);
      }
    };

    checkForWallets();

    const timeout = setTimeout(() => {
      checkForWallets();
    }, 1000);

    const handleYoursInitialized = () => {
      checkForWallets();
    };

    window.addEventListener('yours#initialized', handleYoursInitialized);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('yours#initialized', handleYoursInitialized);
    };
  }, []);

  const connect = useCallback(async (provider: WalletProvider): Promise<{ success: boolean; error?: string }> => {
    if (!provider) {
      return {
        success: false,
        error: "No wallet provider selected",
      };
    }

    const adapter = getWalletAdapter(provider);
    if (!adapter) {
      return {
        success: false,
        error: "Invalid wallet provider",
      };
    }

    const result = await adapter.connect();
    if (result.success) {
      setIsConnected(true);
      setSelectedProvider(provider);
      localStorage.setItem(WALLET_PROVIDER_KEY, provider);
    } else {
      setIsConnected(false);
    }

    return result;
  }, []);

  const disconnect = useCallback(() => {
    if (selectedProvider) {
      const adapter = getWalletAdapter(selectedProvider);
      adapter?.disconnect();
    }
    setIsConnected(false);
  }, [selectedProvider]);

  const selectProvider = useCallback((provider: WalletProvider) => {
    setSelectedProvider(provider);
    if (provider) {
      localStorage.setItem(WALLET_PROVIDER_KEY, provider);
    } else {
      localStorage.removeItem(WALLET_PROVIDER_KEY);
    }
    setIsConnected(false);
  }, []);

  return {
    availableProviders,
    selectedProvider,
    isConnected,
    connect,
    disconnect,
    selectProvider,
  };
}
