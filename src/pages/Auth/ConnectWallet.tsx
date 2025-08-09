import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Navbar } from "@/components/Layout/Navbar";
import { motion } from "framer-motion";
import { 
  Wallet, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Zap,
  Shield,
  Globe
} from "lucide-react";
import { toast } from "sonner";
import { mockFunctions } from "@/data/mockData";

export default function ConnectWallet() {
  const [user, setUser] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mockUser = localStorage.getItem('chainfund_user');
    if (!mockUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(mockUser));

    // Check if wallet is already connected
    const mockWallet = localStorage.getItem('chainfund_wallet');
    if (mockWallet) {
      setConnectedWallet(JSON.parse(mockWallet));
    }
  }, [navigate]);

  const connectWallet = async (walletType: 'metamask' | 'walletconnect') => {
    setIsConnecting(true);
    
    try {
      // Mock wallet connection
      const result = await mockFunctions.connectWallet(walletType);
      
      if (result.success) {
        const walletData = {
          type: walletType,
          address: result.address,
          connected_at: new Date().toISOString()
        };
        
        localStorage.setItem('chainfund_wallet', JSON.stringify(walletData));
        setConnectedWallet(walletData);
        
        toast.success(`${walletType === 'metamask' ? 'MetaMask' : 'WalletConnect'} connected successfully!`);
        
        // Redirect to dashboard after successful connection
        setTimeout(() => {
          navigate(`/u/${user?.username}`);
        }, 1500);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const walletOptions = [
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Connect using MetaMask browser extension',
      icon: '🦊',
      popular: true
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      description: 'Connect using WalletConnect protocol',
      icon: '📱',
      popular: false
    }
  ];

  if (connectedWallet) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full max-w-md crypto-card">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-2xl">Wallet Connected!</CardTitle>
                <CardDescription>
                  Your {connectedWallet.type === 'metamask' ? 'MetaMask' : 'WalletConnect'} wallet is now connected
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Wallet className="h-4 w-4" />
                  <AlertDescription>
                    <div className="font-mono text-sm">
                      {connectedWallet.address}
                    </div>
                  </AlertDescription>
                </Alert>
                
                <div className="text-center text-sm text-muted-foreground">
                  Redirecting to your dashboard...
                </div>
                
                <Button 
                  variant="crypto" 
                  className="w-full" 
                  onClick={() => navigate(`/u/${user?.username}`)}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Loading or redirecting
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Zap className="h-8 w-8 text-primary glow-primary" />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  ChainFund
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Connect Your Wallet</h1>
              <p className="text-muted-foreground">
                Choose a wallet to securely access the ChainFund platform
              </p>
            </div>

            {/* Security Notice */}
            <Alert className="mb-8">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Your security is our priority.</strong> ChainFund never stores your private keys. 
                All transactions are processed directly through your wallet.
              </AlertDescription>
            </Alert>

            {/* Wallet Options */}
            <div className="grid gap-4 mb-8">
              {walletOptions.map((wallet) => (
                <Card 
                  key={wallet.id}
                  className="crypto-card hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => connectWallet(wallet.id as 'metamask' | 'walletconnect')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{wallet.icon}</div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-lg">{wallet.name}</h3>
                            {wallet.popular && (
                              <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">{wallet.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Loading State */}
            {isConnecting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-lg">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span className="text-sm">Connecting wallet...</span>
                </div>
              </motion.div>
            )}

            {/* Help Text */}
            <div className="text-center text-sm text-muted-foreground">
              <p className="mb-2">
                Don't have a wallet? 
                <a 
                  href="https://metamask.io/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline ml-1"
                >
                  Get MetaMask
                </a>
              </p>
              <p className="flex items-center justify-center space-x-1">
                <Globe className="h-3 w-3" />
                <span>Supported on Ethereum and compatible networks</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}