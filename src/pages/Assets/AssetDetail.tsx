import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, Users, Clock, ArrowLeft, Gavel, Heart, Share2, ExternalLink, Wallet } from "lucide-react";
import { mockAssets, mockUsers, mockDAOs, mockFunctions } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function AssetDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [buyType, setBuyType] = useState<'individual' | 'dao'>('individual');
  const [selectedDAO, setSelectedDAO] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const asset = mockAssets.find(a => a.id === id);
  
  if (!asset) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Asset Not Found</h1>
            <p className="text-muted-foreground mb-6">The asset you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/assets">Back to Assets</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const owner = asset.owner_type === 'dao' 
    ? mockDAOs.find(dao => dao.id === asset.dao_id)
    : mockUsers.find(user => user.id === asset.owner_id);

  const ownerName = asset.owner_type === 'dao' 
    ? (owner as any)?.name 
    : (owner as any)?.username;

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      const result = await mockFunctions.buyAsset(asset.id, buyType, selectedDAO);
      if (result.success) {
        toast({
          title: "Purchase Successful!",
          description: `Asset purchased successfully${buyType === 'dao' ? ' through DAO proposal' : ''}. Transaction: ${result.transactionHash}`,
        });
      }
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Something went wrong with the purchase.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBid = async () => {
    if (!bidAmount) return;
    
    setIsLoading(true);
    try {
      const result = await mockFunctions.createBid({
        title: `Bid for ${asset.name}`,
        description: `Competitive bid for ${asset.name}`,
        asset_id: asset.id,
        starting_price: parseFloat(bidAmount),
        current_price: parseFloat(bidAmount),
        currency: asset.currency,
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
        created_by: 'current-user'
      });
      
      if (result.success) {
        toast({
          title: "Bid Created!",
          description: `Your bid of ${bidAmount} ${asset.currency} has been created successfully.`,
        });
        setBidAmount('');
      }
    } catch (error) {
      toast({
        title: "Bid Creation Failed",
        description: "Something went wrong creating the bid.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return `${price.toLocaleString()} ${currency}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-accent/20 text-accent border-accent/30';
      case 'sold': return 'bg-muted text-muted-foreground border-border';
      case 'inactive': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'art': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'tokens': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'real estate': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/assets">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Assets
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Asset Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={asset.image_url}
                alt={asset.name}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute top-4 left-4 space-x-2">
                <Badge className={cn("border", getStatusColor(asset.status))} variant="outline">
                  {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                </Badge>
                <Badge className={cn("border", getCategoryColor(asset.category))} variant="outline">
                  {asset.category}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button size="sm" variant="outline" className="bg-background/80 backdrop-blur-sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-background/80 backdrop-blur-sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {asset.status === 'active' && (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex-1">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Buy Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Purchase Asset</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Purchase as:</Label>
                          <Select value={buyType} onValueChange={(value: 'individual' | 'dao') => setBuyType(value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="individual">Individual</SelectItem>
                              <SelectItem value="dao">DAO</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {buyType === 'dao' && (
                          <div>
                            <Label>Select DAO:</Label>
                            <Select value={selectedDAO} onValueChange={setSelectedDAO}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a DAO" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockDAOs.map(dao => (
                                  <SelectItem key={dao.id} value={dao.id}>
                                    {dao.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="text-lg font-semibold">
                            Total: {formatPrice(asset.price, asset.currency)}
                          </div>
                          {buyType === 'dao' && (
                            <p className="text-sm text-muted-foreground mt-2">
                              This purchase will create a proposal for DAO members to vote on.
                            </p>
                          )}
                        </div>
                        
                        <Button 
                          onClick={handlePurchase} 
                          disabled={isLoading || (buyType === 'dao' && !selectedDAO)}
                          className="w-full"
                        >
                          {isLoading ? 'Processing...' : 
                           buyType === 'dao' ? 'Create Purchase Proposal' : 'Purchase Now'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        <Gavel className="h-4 w-4 mr-2" />
                        Create Bid
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Bid</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Bid Amount ({asset.currency})</Label>
                          <Input
                            type="number"
                            placeholder="Enter bid amount"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                          />
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            This will create a new bid auction for this asset. The bid will be open for 7 days.
                          </p>
                        </div>
                        <Button 
                          onClick={handleCreateBid} 
                          disabled={isLoading || !bidAmount}
                          className="w-full"
                        >
                          {isLoading ? 'Creating...' : 'Create Bid'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </div>

          {/* Asset Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{asset.name}</h1>
              <div className="text-4xl font-bold text-primary mb-4">
                {formatPrice(asset.price, asset.currency)}
              </div>
            </div>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Description</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {asset.description}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Owner Information</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  {asset.owner_type === 'dao' ? (
                    <>
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{ownerName || 'Unknown DAO'}</div>
                        <div className="text-sm text-muted-foreground">Decentralized Autonomous Organization</div>
                        <Badge variant="outline" className="dao-badge mt-2">
                          DAO
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={(owner as any)?.avatar_url} />
                        <AvatarFallback>
                          {ownerName?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{ownerName || 'Unknown User'}</div>
                        <div className="text-sm text-muted-foreground">Individual Owner</div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Asset Details</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Category</div>
                    <div className="font-medium">{asset.category}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="font-medium">{asset.status}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Listed Date</div>
                    <div className="font-medium">
                      {new Date(asset.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Asset ID</div>
                    <div className="font-mono text-sm">{asset.id}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Quick Actions</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Blockchain Explorer
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Wallet className="h-4 w-4 mr-2" />
                  Check Ownership History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  View Similar Assets
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}