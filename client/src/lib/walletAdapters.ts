export type WalletProvider = "yours" | "babbage" | null;

export interface WalletAdapter {
  id: WalletProvider;
  label: string;
  installUrl: string;
  detect: () => boolean;
  connect: () => Promise<{ success: boolean; error?: string }>;
  disconnect: () => void;
  getBalance?: () => Promise<{ balance: number; error?: string }>;
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
    CWI?: any;
  }
}

class YoursWalletAdapter implements WalletAdapter {
  id: WalletProvider = "yours";
  label = "Yours Wallet";
  installUrl = "https://chromewebstore.google.com/detail/yours-wallet/mlbnicldlpdimbjdcncnklfempedeipj";

  detect(): boolean {
    return typeof window.yours !== 'undefined';
  }

  async connect(): Promise<{ success: boolean; error?: string }> {
    if (!this.detect()) {
      return {
        success: false,
        error: "Yours Wallet not detected. Please install it from the Chrome Web Store.",
      };
    }

    try {
      if (window.yours?.connect) {
        await window.yours.connect();
      }
      return { success: true };
    } catch (error) {
      console.error("Yours Wallet connection error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to connect wallet",
      };
    }
  }

  disconnect(): void {
    if (window.yours?.disconnect) {
      window.yours.disconnect().catch(console.error);
    }
  }

  async getBalance(): Promise<{ balance: number; error?: string }> {
    if (!this.detect() || !window.yours?.getBalance) {
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
}

class BabbageWalletAdapter implements WalletAdapter {
  id: WalletProvider = "babbage";
  label = "Metanet (Babbage)";
  installUrl = "https://getmetanet.com";

  detect(): boolean {
    return typeof window.CWI !== 'undefined';
  }

  async connect(): Promise<{ success: boolean; error?: string }> {
    if (!this.detect()) {
      return {
        success: false,
        error: "Metanet wallet not detected. Please install and run the Metanet Desktop client.",
      };
    }

    try {
      const { isAuthenticated, waitForAuthentication } = await import('@babbage/sdk-ts');
      
      let authenticated = await isAuthenticated();
      
      if (!authenticated) {
        authenticated = await waitForAuthentication();
        
        if (!authenticated) {
          return {
            success: false,
            error: "Authentication was cancelled or failed. Please try again.",
          };
        }
        
        authenticated = await isAuthenticated();
        
        if (!authenticated) {
          return {
            success: false,
            error: "Failed to establish authenticated session.",
          };
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Babbage wallet connection error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to connect wallet",
      };
    }
  }

  disconnect(): void {
  }

  async getBalance(): Promise<{ balance: number; error?: string }> {
    if (!this.detect()) {
      return {
        balance: 0,
        error: "Wallet not available",
      };
    }

    try {
      return { balance: 0 };
    } catch (error) {
      console.error("Error fetching balance:", error);
      return {
        balance: 0,
        error: error instanceof Error ? error.message : "Failed to fetch balance",
      };
    }
  }
}

export const walletAdapters: Record<Exclude<WalletProvider, null>, WalletAdapter> = {
  yours: new YoursWalletAdapter(),
  babbage: new BabbageWalletAdapter(),
};

export function detectAvailableWallets(): WalletProvider[] {
  const available: WalletProvider[] = [];
  
  Object.values(walletAdapters).forEach(adapter => {
    if (adapter.detect()) {
      available.push(adapter.id);
    }
  });

  return available;
}

export function getWalletAdapter(provider: WalletProvider): WalletAdapter | null {
  if (!provider) return null;
  return walletAdapters[provider] || null;
}
