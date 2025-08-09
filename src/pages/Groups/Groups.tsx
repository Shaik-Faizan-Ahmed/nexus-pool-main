import { useState } from "react";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { DAOCard } from "@/components/Cards/DAOCard";
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
  Users,
  TrendingUp,
  DollarSign,
  ShieldCheck
} from "lucide-react";
import { mockDAOs } from "@/data/mockData";

export default function Groups() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "investment", label: "Investment" },
    { value: "protocol", label: "Protocol" },
    { value: "social", label: "Social" },
    { value: "creative", label: "Creative" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "members_high", label: "Members: High to Low" },
    { value: "members_low", label: "Members: Low to High" },
    { value: "treasury_high", label: "Treasury: High to Low" },
    { value: "treasury_low", label: "Treasury: Low to High" },
  ];

  // Filter and sort DAOs
  let filteredDAOs = mockDAOs.filter(dao => {
    const matchesSearch = dao.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dao.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           dao.category.toLowerCase() === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort DAOs
  filteredDAOs.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "oldest":
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case "members_high":
        return b.member_count - a.member_count;
      case "members_low":
        return a.member_count - b.member_count;
      case "treasury_high":
        return b.treasury_balance - a.treasury_balance;
      case "treasury_low":
        return a.treasury_balance - b.treasury_balance;
      default:
        return 0;
    }
  });

  const stats = [
    {
      title: "Total DAOs",
      value: mockDAOs.length.toString(),
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Total Treasury",
      value: `$${mockDAOs.reduce((sum, dao) => sum + dao.treasury_balance, 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Total Members",
      value: mockDAOs.reduce((sum, dao) => sum + dao.member_count, 0).toLocaleString(),
      icon: TrendingUp,
      color: "text-purple-500"
    },
    {
      title: "Verified DAOs",
      value: mockDAOs.filter(dao => dao.is_verified).length.toString(),
      icon: ShieldCheck,
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
              <h1 className="text-3xl font-bold mb-2">Decentralized Autonomous Organizations</h1>
              <p className="text-muted-foreground">
                Join forces with like-minded individuals to build the future
              </p>
            </div>
            <Button variant="crypto">
              <Plus className="h-4 w-4 mr-2" />
              Create DAO
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
                      placeholder="Search DAOs..."
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
                {filteredDAOs.length} DAOs Found
              </h2>
              {(searchTerm || selectedCategory !== "all") && (
                <Badge variant="outline" className="ml-2">
                  Filtered
                </Badge>
              )}
            </div>
          </div>
        </motion.div>

        {/* DAOs Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {filteredDAOs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDAOs.map((dao, index) => (
                <motion.div
                  key={dao.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <DAOCard dao={dao} />
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="crypto-card">
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No DAOs Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or browse all available DAOs.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
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
