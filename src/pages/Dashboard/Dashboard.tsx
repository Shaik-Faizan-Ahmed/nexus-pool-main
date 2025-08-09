import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AssetCard } from "@/components/Cards/AssetCard";
import { CampaignCard } from "@/components/Cards/CampaignCard";
import { DAOCard } from "@/components/Cards/DAOCard";
import { BidCard } from "@/components/Cards/BidCard";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Wallet, 
  Users, 
  Target, 
  Package,
  Gavel,
  Plus,
  BarChart3,
  Activity,
  DollarSign
} from "lucide-react";
import { 
  mockUsers, 
  mockDAOs, 
  mockAssets, 
  mockCampaigns, 
  mockBids,
  mockProposals 
} from "@/data/mockData";

export default function Dashboard() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    const mockUser = localStorage.getItem('chainfund_user');
    const mockWallet = localStorage.getItem('chainfund_wallet');
    
    if (!mockUser) {
      navigate('/login');
      return;
    }
    
    if (!mockWallet) {
      navigate('/connect-wallet');
      return;
    }

    const userData = JSON.parse(mockUser);
    if (userData.username !== username) {
      navigate(`/u/${userData.username}`);
      return;
    }

    setUser(userData);
    setWalletConnected(true);
  }, [username, navigate]);

  if (!user || !walletConnected) {
    return null; // Loading or redirecting
  }

  // Mock data for user's involvement
  const userDAOs = mockDAOs.slice(0, 3);
  const userAssets = mockAssets.filter(asset => asset.owner_id === user.id);
  const userCampaigns = mockCampaigns.filter(campaign => campaign.creator_id === user.id);
  const userBids = mockBids.slice(0, 2);
  const suggestedDAOs = mockDAOs.slice(3, 6);

  const stats = [
    {
      title: "Portfolio Value",
      value: "$127,500",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Active Investments",
      value: "23",
      change: "+3 this week",
      icon: Package,
      color: "text-blue-500"
    },
    {
      title: "DAO Memberships",
      value: userDAOs.length.toString(),
      change: "+1 this month",
      icon: Users,
      color: "text-purple-500"
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "+2% from last month",
      icon: TrendingUp,
      color: "text-green-500"
    }
  ];

  const recentActivity = [
    { action: "Joined DeFi Innovators DAO", time: "2 hours ago", type: "dao" },
    { action: "Placed bid on Crypto Art Collection", time: "5 hours ago", type: "bid" },
    { action: "Funded Green Energy NFT Marketplace", time: "1 day ago", type: "campaign" },
    { action: "Listed Metaverse Land Parcel", time: "2 days ago", type: "asset" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user.username}! 👋</h1>
              <p className="text-muted-foreground">
                Here's what's happening with your investments
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create Asset
              </Button>
              <Button variant="crypto">
                <Target className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="crypto-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-muted/50 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My DAOs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">My DAOs</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {userDAOs.map((dao) => (
                  <DAOCard key={dao.id} dao={dao} userIsMember={true} />
                ))}
              </div>
            </motion.div>

            {/* Active Bids */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Active Bids</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {userBids.map((bid) => (
                  <BidCard key={bid.id} bid={bid} />
                ))}
              </div>
            </motion.div>

            {/* My Assets */}
            {userAssets.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">My Assets</h2>
                  <Button variant="outline" size="sm">Manage All</Button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {userAssets.map((asset) => (
                    <AssetCard key={asset.id} asset={asset} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'dao' ? 'bg-purple-500' :
                        activity.type === 'bid' ? 'bg-blue-500' :
                        activity.type === 'campaign' ? 'bg-green-500' : 'bg-orange-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Suggested DAOs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Suggested DAOs</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {suggestedDAOs.map((dao) => (
                    <div key={dao.id} className="flex items-center space-x-3">
                      <img 
                        src={dao.image_url} 
                        alt={dao.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{dao.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {dao.member_count} members
                        </p>
                      </div>
                      <Button size="sm" variant="outline">Join</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card className="crypto-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Quick Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">This Month</span>
                    <span className="font-medium">+$12,450</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Proposals Voted</span>
                    <span className="font-medium">17</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Assets Created</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Campaigns Funded</span>
                    <span className="font-medium">8</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}