import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Zap, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-texture">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Zap className="h-12 w-12 text-primary glow-primary" />
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              ChainFund
            </span>
          </div>

          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent mb-4">
              404
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Oops! This page went to the moon 🚀
            </h2>
            <p className="text-lg text-muted-foreground mb-2">
              The page you're looking for doesn't exist in our decentralized universe.
            </p>
            <p className="text-sm text-muted-foreground font-mono">
              Path: {location.pathname}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="crypto" size="lg" asChild>
              <Link to="/">
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link to="/assets">
                <Search className="h-5 w-5 mr-2" />
                Browse Assets
              </Link>
            </Button>
          </motion.div>

          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 p-6 crypto-card"
          >
            <h3 className="text-lg font-semibold mb-3">While you're here...</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div>
                <div className="font-semibold text-accent">$25M+</div>
                <div>Total Volume Traded</div>
              </div>
              <div>
                <div className="font-semibold text-accent">150+</div>
                <div>Active DAOs</div>
              </div>
              <div>
                <div className="font-semibold text-accent">5,000+</div>
                <div>Assets Listed</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
