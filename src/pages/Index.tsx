import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { AssetCard } from "@/components/Cards/AssetCard";
import { CampaignCard } from "@/components/Cards/CampaignCard";
import { DAOCard } from "@/components/Cards/DAOCard";
import { motion } from "framer-motion";
import { 
  Zap, 
  TrendingUp, 
  Shield, 
  Users, 
  ArrowRight,
  Package,
  Target,
  Gavel,
  Star,
  CheckCircle,
  BarChart3
} from "lucide-react";
import { mockAssets, mockCampaigns, mockDAOs } from "@/data/mockData";

const Index = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mockUser = localStorage.getItem('chainfund_user');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
      // If user is logged in, redirect to dashboard
      const parsedUser = JSON.parse(mockUser);
      navigate(`/u/${parsedUser.username}`);
    }
  }, [navigate]);

  const features = [
    {
      icon: Package,
      title: "Asset Trading",
      description: "Buy and sell digital assets individually or through DAO governance.",
      color: "text-blue-500"
    },
    {
      icon: Gavel,
      title: "Bidding System",
      description: "Participate in transparent auctions with smart contract security.",
      color: "text-purple-500"
    },
    {
      icon: Target,
      title: "Crowdfunding",
      description: "Fund innovative projects through decentralized campaign management.",
      color: "text-green-500"
    },
    {
      icon: Users,
      title: "DAO Governance",
      description: "Join decentralized organizations and make collective decisions.",
      color: "text-orange-500"
    }
  ];

  const stats = [
    { label: "Total Volume", value: "$25M+", icon: TrendingUp },
    { label: "Active DAOs", value: "150+", icon: Users },
    { label: "Assets Traded", value: "5,000+", icon: Package },
    { label: "Success Rate", value: "98%", icon: CheckCircle }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "DeFi Investor",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1fa?w=150&h=150&fit=crop&crop=face",
      content: "ChainFund revolutionized how I participate in DeFi investments. The DAO governance model provides transparency I've never seen before."
    },
    {
      name: "Marcus Rodriguez",
      role: "NFT Creator",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The platform's bidding system helped me sell my art collection at amazing prices while maintaining complete transparency."
    },
    {
      name: "Alex Kim",
      role: "DAO Founder",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "Building our green energy DAO on ChainFund was seamless. The tools for governance and fund management are incredible."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-texture py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 dao-badge text-sm px-4 py-2">
              🚀 Decentralized Funding Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent leading-tight">
              ChainFund: Decentralized
              <br />
              <span className="animate-gradient bg-gradient-to-r from-accent to-primary bg-clip-text">
                Pooled Funding
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Empowering communities to invest, trade, and govern together through 
              transparent DAO-backed asset trading and crowdfunding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="crypto" asChild>
                <Link to="/register">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link to="/docs">
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Modern DeFi
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to participate in the decentralized economy, 
              from individual investments to DAO governance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="crypto-card p-6 text-center group hover:scale-105 transition-transform"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-muted/50 ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore the Ecosystem
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover trending assets, campaigns, and DAOs
            </p>
          </div>
          
          {/* Featured Assets */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6">Featured Assets</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAssets.slice(0, 3).map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          </div>

          {/* Active Campaigns */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6">Active Campaigns</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCampaigns.slice(0, 3).map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>

          {/* Top DAOs */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Top DAOs</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDAOs.slice(0, 3).map((dao) => (
                <DAOCard key={dao.id} dao={dao} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied users already using ChainFund
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="crypto-card p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-texture">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join the Future of Finance?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your journey in decentralized funding today. 
              Connect your wallet and begin exploring opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="crypto" asChild>
                <Link to="/register">
                  Join ChainFund <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link to="/about">
                  Learn About Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
