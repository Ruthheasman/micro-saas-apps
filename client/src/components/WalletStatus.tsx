import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Wallet, ExternalLink, AlertCircle, CheckCircle } from "lucide-react";
import { useWalletDetection } from "@/hooks/useWalletDetection";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";

export default function WalletStatus() {
  const { isInstalled, isConnected, provider, connect, disconnect } = useWalletDetection();
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    setIsConnecting(true);
    const result = await connect();
    setIsConnecting(false);

    if (result.success) {
      toast({
        title: "Wallet Connected",
        description: "Your Yours Wallet is now connected",
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

  if (!isInstalled) {
    return (
      <Alert className="border-muted" data-testid="alert-wallet-not-installed">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between gap-4">
          <span className="text-sm">
            Yours Wallet not detected. Install it to deploy apps on-chain.
          </span>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 shrink-0"
            asChild
            data-testid="button-install-wallet"
          >
            <a
              href="https://chromewebstore.google.com/detail/yours-wallet/mlbnicldlpdimbjdcncnklfempedeipj"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install Wallet
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!isConnected) {
    return (
      <Card className="p-4" data-testid="card-wallet-detected">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <Wallet className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium" data-testid="text-wallet-provider">
                  {provider === "yours" ? "Yours Wallet" : "BSV Wallet"}
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
            disabled={isConnecting}
            data-testid="button-connect-wallet"
          >
            {isConnecting ? "Connecting..." : "Connect"}
          </Button>
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
                {provider === "yours" ? "Yours Wallet" : "BSV Wallet"}
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
