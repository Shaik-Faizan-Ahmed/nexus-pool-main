import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { 
  Moon, 
  Sun, 
  Wallet, 
  User, 
  LogOut, 
  Settings,
  Zap,
  Menu,
  X,
  Home,
  Package,
  Gavel,
  Target,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Mock user session check
  useEffect(() => {
    const mockUser = localStorage.getItem('chainfund_user');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
    }
    
    const mockWallet = localStorage.getItem('chainfund_wallet');
    if (mockWallet) {
      setWalletConnected(true);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('chainfund_user');
    localStorage.removeItem('chainfund_wallet');
    setUser(null);
    setWalletConnected(false);
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', href: user ? `/u/${user?.username}` : '/', icon: Home },
    { label: 'Assets', href: '/assets', icon: Package },
    { label: 'Bids', href: '/bids', icon: Gavel },
    { label: 'Campaigns', href: '/campaigns', icon: Target },
    { label: 'DAOs', href: '/groups', icon: Users },
  ];

  const isActivePath = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to={user ? `/u/${user.username}` : "/"} 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <Zap className="h-8 w-8 text-primary animate-pulse-glow" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              ChainFund
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {user && walletConnected && navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActivePath(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {!user ? (
              // Not logged in
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button variant="crypto" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            ) : !walletConnected ? (
              // Logged in but no wallet
              <Button variant="crypto" asChild>
                <Link to="/connect-wallet">
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </Link>
              </Button>
            ) : (
              // Fully connected
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage src={user.avatar_url} alt={user.username} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {user.username?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {/* Online indicator */}
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-accent rounded-full border-2 border-background" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.username}</p>
                      <p className="w-40 truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={`/u/${user.username}`} className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  {user.is_admin && (
                    <DropdownMenuItem asChild>
                      <Link to="/nimda" className="flex items-center">
                        <Zap className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t">
            {user && walletConnected ? (
              navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors w-full",
                    isActivePath(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))
            ) : (
              <div className="space-y-2">
                <Button variant="ghost" asChild className="w-full justify-start">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                </Button>
                <Button variant="crypto" asChild className="w-full justify-start">
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}