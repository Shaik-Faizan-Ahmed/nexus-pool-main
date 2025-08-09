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
  Phone, 
  Upload,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import { mockFunctions } from "@/data/mockData";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    avatar_url: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      if (!formData.username || !formData.email) {
        throw new Error("Username and email are required");
      }

      // Mock registration
      const result = await mockFunctions.signUp(formData.email, formData.username);
      
      if (result.success) {
        setEmailSent(true);
        toast.success("Magic link sent! Check your email to complete registration.");
      }
    } catch (error: any) {
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
                  We've sent a magic link to <strong>{formData.email}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Mail className="h-4 w-4" />
                  <AlertDescription>
                    Click the link in your email to complete registration and access your account.
                  </AlertDescription>
                </Alert>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login">
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
                <CardTitle className="text-2xl">Create Your Account</CardTitle>
                <CardDescription>
                  Join the decentralized funding revolution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Profile Picture Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="avatar_url">Profile Picture (Optional)</Label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        {formData.avatar_url ? (
                          <img 
                            src={formData.avatar_url} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Input
                          id="avatar_url"
                          name="avatar_url"
                          type="url"
                          placeholder="https://example.com/your-photo.jpg"
                          value={formData.avatar_url}
                          onChange={handleChange}
                          className="text-sm"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Provide a URL to your profile image
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username">Username *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="crypto_pioneer"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number (Optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.mobile}
                        onChange={handleChange}
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
                    {isLoading ? "Creating Account..." : "Send Magic Link"}
                  </Button>

                  {/* Terms */}
                  <p className="text-xs text-muted-foreground text-center">
                    By creating an account, you agree to our{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>

                {/* Sign In Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Sign In
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}