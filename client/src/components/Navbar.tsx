import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User, Wallet, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useWalletDetection } from "@/hooks/useWalletDetection";
import { getWalletAdapter } from "@/lib/walletAdapters";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletPopoverOpen, setWalletPopoverOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();
  const { availableProviders, selectedProvider, isConnected, connect, disconnect, selectProvider } = useWalletDetection();
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/discover", label: "Discover Apps" },
    { href: "/builder", label: "AI Builder" },
    { href: "/agents", label: "AI Agents" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const getUserInitials = () => {
    if (!user) return "U";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    return user.email?.[0]?.toUpperCase() || "U";
  };

  const handleWalletConnect = async () => {
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
      setWalletPopoverOpen(false);
    } else {
      toast({
        title: "Connection Failed",
        description: result.error || "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  const handleWalletDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
    setWalletPopoverOpen(false);
  };

  const currentAdapter = selectedProvider ? getWalletAdapter(selectedProvider) : null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2" data-testid="link-home">
            <span className="text-3xl font-black text-primary leading-none italic" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}>μ</span>
            <span className="text-xl font-bold">MicroSaaS Apps</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover-elevate active-elevate-2 ${
                  location === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Wallet Status */}
            <Popover open={walletPopoverOpen} onOpenChange={setWalletPopoverOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative"
                  data-testid="button-wallet-status"
                >
                  <Wallet className="h-5 w-5" />
                  {isConnected && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">BSV Wallet</h4>
                  
                  {availableProviders.length === 0 ? (
                    <div className="space-y-3">
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <p>No BSV wallet detected. Install one to deploy apps on-chain.</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="justify-start gap-2"
                          asChild
                        >
                          <a
                            href="https://chromewebstore.google.com/detail/yours-wallet/mlbnicldlpdimbjdcncnklfempedeipj"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Yours Wallet
                            <ExternalLink className="h-3 w-3 ml-auto" />
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="justify-start gap-2"
                          asChild
                        >
                          <a
                            href="https://getmetanet.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Metanet Desktop
                            <ExternalLink className="h-3 w-3 ml-auto" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ) : isConnected ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">{currentAdapter?.label}</span>
                        <Badge variant="default" className="ml-auto text-xs">Connected</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Your wallet is ready for blockchain deployment
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleWalletDisconnect}
                        className="w-full"
                      >
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4" />
                        <span className="text-sm font-medium">{currentAdapter?.label}</span>
                        <Badge variant="secondary" className="ml-auto text-xs">Detected</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Connect to enable blockchain deployment
                      </p>
                      
                      {availableProviders.length > 1 && (
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">Select Wallet</label>
                          <Select
                            value={selectedProvider || undefined}
                            onValueChange={(value) => selectProvider(value as any)}
                          >
                            <SelectTrigger className="h-9 text-sm">
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
                      
                      <Button
                        size="sm"
                        onClick={handleWalletConnect}
                        disabled={isConnecting || !selectedProvider}
                        className="w-full"
                      >
                        {isConnecting ? "Connecting..." : "Connect Wallet"}
                      </Button>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {!isLoading && (
              <>
                {isAuthenticated && user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-full p-1" data-testid="button-user-menu">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.profileImageUrl || undefined} alt={user.email || "User"} />
                          <AvatarFallback>{getUserInitials()}</AvatarFallback>
                        </Avatar>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.firstName && user.lastName
                              ? `${user.firstName} ${user.lastName}`
                              : user.email}
                          </p>
                          {user.email && (
                            <p className="text-xs leading-none text-muted-foreground">
                              {user.email}
                            </p>
                          )}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <a href="/api/logout" className="cursor-pointer text-destructive">
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </a>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button size="sm" asChild data-testid="button-sign-in">
                    <a href="/api/login">Sign In</a>
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover-elevate active-elevate-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded-md text-sm font-medium hover-elevate active-elevate-2 ${
                  location === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              {!isLoading && (
                <>
                  {isAuthenticated && user ? (
                    <>
                      <div className="px-4 py-2 text-sm">
                        <p className="font-medium">
                          {user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : user.email}
                        </p>
                      </div>
                      <Button variant="outline" className="w-full" size="sm" asChild>
                        <a href="/api/logout" data-testid="button-mobile-sign-out">
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </a>
                      </Button>
                    </>
                  ) : (
                    <Button className="w-full" size="sm" asChild data-testid="button-mobile-sign-in">
                      <a href="/api/login">Sign In</a>
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
