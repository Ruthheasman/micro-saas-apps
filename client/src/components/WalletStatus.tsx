import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Wallet, ExternalLink, AlertCircle, CheckCircle } from "lucide-react";
import { useWalletDetection } from "@/hooks/useWalletDetection";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { getWalletAdapter } from "@/lib/walletAdapters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function WalletStatus() {
  const { availableProviders, selectedProvider, isConnected, connect, disconnect, selectProvider } = useWalletDetection();
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!selectedProvider) return;
    
    setIsConnecting(true);
    const result = await connect(selectedProvider);
    setIsConnecting(false);

    if (result.success) {
      const adapter = getWalletAdapter(selectedProvider);
      toast({
        title: "Wallet Connected",
        description: `Your ${adapter?.label} is now connected`,
      });
    } else {
      toast({
        title: "Connection Failed",
        description: result.error || "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  if (availableProviders.length === 0) {
    return (
      <Alert className="border-muted" data-testid="alert-wallet-not-installed">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-3">
            <p className="text-sm">
              No BSV wallet detected. Install one to deploy apps on-chain.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                asChild
                data-testid="button-install-yours"
              >
                <a
                  href="https://chromewebstore.google.com/detail/yours-wallet/mlbnicldlpdimbjdcncnklfempedeipj"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Yours Wallet
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                asChild
                data-testid="button-install-metanet"
              >
                <a
                  href="https://getmetanet.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Metanet Desktop
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  const currentAdapter = selectedProvider ? getWalletAdapter(selectedProvider) : null;

  if (!isConnected) {
    return (
      <Card className="p-4" data-testid="card-wallet-detected">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Wallet className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium" data-testid="text-wallet-provider">
                    {currentAdapter?.label || "BSV Wallet"}
                  </span>
                  <Badge variant="secondary" className="text-xs" data-testid="badge-wallet-status">
                    Detected
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Connect to deploy on-chain
                </p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={handleConnect}
              disabled={isConnecting || !selectedProvider}
              data-testid="button-connect-wallet"
            >
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          </div>

          {availableProviders.length > 1 && (
            <div className="flex items-center gap-2 pt-2 border-t">
              <span className="text-xs text-muted-foreground">Wallet:</span>
              <Select
                value={selectedProvider || undefined}
                onValueChange={(value) => selectProvider(value as any)}
              >
                <SelectTrigger className="h-8 text-xs flex-1" data-testid="select-wallet-provider">
                  <SelectValue placeholder="Select wallet" />
                </SelectTrigger>
                <SelectContent>
                  {availableProviders.map((provider) => {
                    const adapter = getWalletAdapter(provider);
                    return (
                      <SelectItem key={provider} value={provider || ""}>
                        {adapter?.label || provider}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4" data-testid="card-wallet-connected">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium" data-testid="text-wallet-provider">
                {currentAdapter?.label || "BSV Wallet"}
              </span>
              <Badge variant="default" className="text-xs" data-testid="badge-wallet-status">
                Connected
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Ready for blockchain deployment
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDisconnect}
          data-testid="button-disconnect-wallet"
        >
          Disconnect
        </Button>
      </div>
    </Card>
  );
}
