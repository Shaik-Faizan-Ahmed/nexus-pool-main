import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AssetCard } from "@/components/Cards/AssetCard";
import { CampaignCard } from "@/components/Cards/CampaignCard";
import { mockAssets, mockCampaigns } from "@/data/mockData";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const mockUser = localStorage.getItem('chainfund_user');
    if (mockUser) {
      const userData = JSON.parse(mockUser);
      // Add dummy data for new fields
      userData.walletId = userData.walletId || "0xAbC123...DeF456";
      userData.avatar_url = userData.avatar_url || "https://api.dicebear.com/7.x/initials/svg?seed=" + userData.username;
      userData.rating = userData.rating || 4.5;
      userData.trustScore = userData.trustScore || 85; // Out of 100
      setUser(userData);
    }
  }, []);

  if (!user) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Loading Profile...</h1>
        <p>Please ensure you are logged in.</p>
      </div>
    );
  }

  // Filter mock data based on the logged-in user's ID
  const userAssets = mockAssets.filter(asset => asset.owner_id === user.id);
  const userCampaigns = mockCampaigns.filter(campaign => campaign.creator_id === user.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">User Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="md:col-span-1">
            <Card className="crypto-card">
              <CardHeader className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4 border-4 border-primary/20">
                  <AvatarImage src={user.avatar_url} alt={user.username} />
                  <AvatarFallback className="bg-primary/10 text-primary text-4xl font-semibold">
                    {user.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl">{user.username}</CardTitle>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-muted-foreground text-sm">Wallet ID:</p>
                  <p className="font-medium text-foreground break-all">{user.walletId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">User Rating:</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(user.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill={i < Math.floor(user.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                    <span className="ml-2 text-foreground font-medium">{user.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Trust Score:</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <motion.div
                      className="bg-green-500 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${user.trustScore}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      style={{ width: `${user.trustScore}%` }}
                    ></motion.div>
                  </div>
                  <p className="text-right text-sm text-muted-foreground mt-1">{user.trustScore}%</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Assets and Campaigns */}
          <div className="md:col-span-2 space-y-8">
            {/* My Assets */}
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-2xl">My Assets</CardTitle>
              </CardHeader>
              <CardContent>
                {userAssets.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userAssets.map(asset => (
                      <AssetCard key={asset.id} asset={asset} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">You haven't listed any assets yet.</p>
                )}
              </CardContent>
            </Card>

            {/* My Campaigns */}
            <Card className="crypto-card">
              <CardHeader>
                <CardTitle className="text-2xl">My Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                {userCampaigns.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userCampaigns.map(campaign => (
                      <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">You haven't created any campaigns yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
