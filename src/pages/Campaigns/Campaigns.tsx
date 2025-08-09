import { useState } from "react";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { CampaignCard } from "@/components/Cards/CampaignCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  SortAsc, 
  Plus,
  Target,
  TrendingUp,
  DollarSign,
  Users
} from "lucide-react";
import { mockCampaigns } from "@/data/mockData";

export default function Campaigns() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "technology", label: "Technology" },
    { value: "environmental", label: "Environmental" },
    { value: "education", label: "Education" },
    { value: "healthcare", label: "Healthcare" },
  ];

  const statusTypes = [
    { value: "all", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "target_high", label: "Target: High to Low" },
    { value: "target_low", label: "Target: Low to High" },
    { value: "raised_high", label: "Raised: High to Low" },
    { value: "raised_low", label: "Raised: Low to High" },
  ];

  // Filter and sort campaigns
  let filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           campaign.category.toLowerCase() === selectedCategory;
    const matchesStatus = selectedStatus === "all" || 
                            campaign.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort campaigns
  filteredCampaigns.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "oldest":
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case "target_high":
        return b.target_amount - a.target_amount;
      case "target_low":
        return a.target_amount - b.target_amount;
      case "raised_high":
        return b.raised_amount - a.raised_amount;
      case "raised_low":
        return a.raised_amount - b.raised_amount;
      default:
        return 0;
    }
  });

  const stats = [
    {
      title: "Total Campaigns",
      value: mockCampaigns.length.toString(),
      icon: Target,
      color: "text-blue-500"
    },
    {
      title: "Total Raised",
      value: `$${mockCampaigns.reduce((sum, campaign) => sum + campaign.raised_amount, 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Active Campaigns",
      value: mockCampaigns.filter(campaign => campaign.status === 'active').length.toString(),
      icon: TrendingUp,
      color: "text-purple-500"
    },
    {
      title: "Completed Campaigns",
      value: mockCampaigns.filter(campaign => campaign.status === 'completed').length.toString(),
      icon: Users,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Fundraising Campaigns</h1>
              <p className="text-muted-foreground">
                Support innovative projects and ideas from individuals and DAOs
              </p>
            </div>
            <Button variant="crypto">
              <Plus className="h-4 w-4 mr-2" />
              Start Campaign
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="crypto-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-muted/50 ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-lg font-bold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <Card className="crypto-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search campaigns..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Status Filter */}
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full md:w-48">
                    <Users className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48">
                    <SortAsc className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold">
                {filteredCampaigns.length} Campaigns Found
              </h2>
              {(searchTerm || selectedCategory !== "all" || selectedStatus !== "all") && (
                <Badge variant="outline" className="ml-2">
                  Filtered
                </Badge>
              )}
            </div>
          </div>
        </motion.div>

        {/* Campaigns Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {filteredCampaigns.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <CampaignCard campaign={campaign} />
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="crypto-card">
              <CardContent className="p-12 text-center">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Campaigns Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or browse all available campaigns.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedStatus("all");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
