import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Navbar } from "@/components/Layout/Navbar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { 
  Zap, 
  Mail, 
  User, 
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import { mockFunctions } from "@/data/mockData";

export default function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!emailOrUsername) {
        throw new Error("Email or username is required");
      }

      // Mock login
      const result = await mockFunctions.signIn(emailOrUsername);
      
      if (result.success) {
        setEmailSent(true);
        toast.success("Magic link sent! Check your email to sign in.");
      }
    } catch (error: any) {
      toast.error(error.message || "Sign in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock magic link verification (simulates clicking link in email)
  const handleMockLogin = () => {
    // Simulate successful login
    const mockUser = {
      id: "user-1",
      username: emailOrUsername.includes("@") ? "demo_user" : emailOrUsername,
      email: emailOrUsername.includes("@") ? emailOrUsername : "demo@chainfund.io",
      avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      is_admin: emailOrUsername === "admin" || emailOrUsername === "admin@chainfund.io"
    };
    
    localStorage.setItem('chainfund_user', JSON.stringify(mockUser));
    toast.success("Welcome back to ChainFund!");
    navigate("/connect-wallet");
  };

  if (emailSent) {
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
                <CardTitle className="text-2xl">Check Your Email</CardTitle>
                <CardDescription>
                  We've sent a magic link to your email
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Mail className="h-4 w-4" />
                  <AlertDescription>
                    Click the link in your email to sign in to your account.
                  </AlertDescription>
                </Alert>
                
                {/* Demo/Mock Login Button */}
                <Alert className="border-primary/20 bg-primary/5">
                  <Zap className="h-4 w-4 text-primary" />
                  <AlertDescription>
                    <strong>Demo Mode:</strong> Click below to simulate the magic link click
                  </AlertDescription>
                </Alert>
                
                <Button 
                  variant="crypto" 
                  className="w-full" 
                  onClick={handleMockLogin}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Demo Login (Skip Email)
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/register">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Sign In
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <Card className="crypto-card">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Zap className="h-8 w-8 text-primary glow-primary" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                    ChainFund
                  </span>
                </div>
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email or Username */}
                  <div className="space-y-2">
                    <Label htmlFor="emailOrUsername">Email or Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="emailOrUsername"
                        type="text"
                        placeholder="you@example.com or username"
                        required
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    variant="crypto"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending Magic Link..." : "Send Magic Link"}
                  </Button>

                  {/* Demo Login Shortcuts */}
                  <div className="space-y-2">
                    <div className="text-xs text-center text-muted-foreground">
                      Quick Demo Access:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm"
                        onClick={() => setEmailOrUsername("crypto_pioneer")}
                      >
                        Demo User
                      </Button>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm"
                        onClick={() => setEmailOrUsername("admin")}
                      >
                        Admin Demo
                      </Button>
                    </div>
                  </div>
                </form>

                {/* Sign Up Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary hover:underline font-medium">
                      Create one now
                    </Link>
                  </p>
                </div>

                {/* Forgot Password */}
                <div className="mt-4 text-center">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}