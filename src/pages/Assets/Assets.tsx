import { useState } from "react";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { AssetCard } from "@/components/Cards/AssetCard";
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
  Package,
  TrendingUp,
  DollarSign,
  Users
} from "lucide-react";
import { mockAssets } from "@/data/mockData";

export default function Assets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedOwnerType, setSelectedOwnerType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "art", label: "Art" },
    { value: "tokens", label: "Tokens" },
    { value: "real estate", label: "Real Estate" },
  ];

  const ownerTypes = [
    { value: "all", label: "All Owners" },
    { value: "individual", label: "Individual" },
    { value: "dao", label: "DAO" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "price_low", label: "Price: Low to High" },
  ];

  // Filter and sort assets
  let filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           asset.category.toLowerCase() === selectedCategory;
    const matchesOwnerType = selectedOwnerType === "all" || 
                            asset.owner_type === selectedOwnerType;
    
    return matchesSearch && matchesCategory && matchesOwnerType;
  });

  // Sort assets
  filteredAssets.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "oldest":
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case "price_high":
        return b.price - a.price;
      case "price_low":
        return a.price - b.price;
      default:
        return 0;
    }
  });

  const stats = [
    {
      title: "Total Assets",
      value: mockAssets.length.toString(),
      icon: Package,
      color: "text-blue-500"
    },
    {
      title: "Total Value",
      value: `$${mockAssets.reduce((sum, asset) => sum + asset.price, 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Active Listings",
      value: mockAssets.filter(asset => asset.status === 'active').length.toString(),
      icon: TrendingUp,
      color: "text-purple-500"
    },
    {
      title: "DAO Owned",
      value: mockAssets.filter(asset => asset.owner_type === 'dao').length.toString(),
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
              <h1 className="text-3xl font-bold mb-2">Digital Assets Marketplace</h1>
              <p className="text-muted-foreground">
                Discover and trade unique digital assets from individuals and DAOs
              </p>
            </div>
            <Button variant="crypto">
              <Plus className="h-4 w-4 mr-2" />
              List Asset
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
                      placeholder="Search assets..."
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

                {/* Owner Type Filter */}
                <Select value={selectedOwnerType} onValueChange={setSelectedOwnerType}>
                  <SelectTrigger className="w-full md:w-48">
                    <Users className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ownerTypes.map(type => (
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
                {filteredAssets.length} Assets Found
              </h2>
              {(searchTerm || selectedCategory !== "all" || selectedOwnerType !== "all") && (
                <Badge variant="outline" className="ml-2">
                  Filtered
                </Badge>
              )}
            </div>
          </div>
        </motion.div>

        {/* Assets Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {filteredAssets.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssets.map((asset, index) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <AssetCard asset={asset} />
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="crypto-card">
              <CardContent className="p-12 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Assets Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or browse all available assets.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedOwnerType("all");
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