import { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Gavel, Users, Clock, ArrowLeft, Timer, TrendingUp, Eye, ExternalLink } from "lucide-react";
import { mockBids, mockUsers, mockAssets, mockDAOs, mockFunctions } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function BidDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [bidAmount, setBidAmount] = useState('');
  const [bidType, setBidType] = useState<'individual' | 'dao'>('individual');
  const [selectedDAO, setSelectedDAO] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');

  const bid = mockBids.find(b => b.id === id);
  const asset = bid ? mockAssets.find(a => a.id === bid.asset_id) : null;
  const creator = bid ? mockUsers.find(u => u.id === bid.created_by) : null;

  useEffect(() => {
    if (!bid) return;
    
    const updateTimer = () => {
      const now = new Date();
      const end = new Date(bid.end_date);
      const diff = end.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeRemaining("Ended");
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      if (days > 0) setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
      else if (hours > 0) setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      else setTimeRemaining(`${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [bid]);

  if (!bid) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Bid Not Found</h1>
            <p className="text-muted-foreground mb-6">The bid you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/bids">Back to Bids</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number, currency: string) => {
    return `${price.toLocaleString()} ${currency}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-accent/20 text-accent border-accent/30';
      case 'ended': return 'bg-muted text-muted-foreground border-border';
      case 'cancelled': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const priceIncrease = bid.current_price - bid.starting_price;
  const percentageIncrease = ((priceIncrease / bid.starting_price) * 100).toFixed(1);
  const isActive = bid.status === 'active' && timeRemaining !== "Ended";
  const progressPercentage = Math.min((priceIncrease / bid.starting_price) * 100, 100);

  const handlePlaceBid = async () => {
    if (!bidAmount) return;
    
    const amount = parseFloat(bidAmount);
    if (amount <= bid.current_price) {
      toast({
        title: "Invalid Bid",
        description: "Your bid must be higher than the current bid.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await mockFunctions.placeBid(bid.id, amount, bidType, selectedDAO);
      if (result.success) {
        toast({
          title: "Bid Placed!",
          description: `Your bid of ${formatPrice(amount, bid.currency)} has been placed successfully.`,
        });
        setBidAmount('');
      }
    } catch (error) {
      toast({
        title: "Bid Failed",
        description: "Something went wrong placing your bid.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/bids">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bids
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Asset Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={asset?.image_url || "/placeholder.svg"}
                alt={bid.title}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute top-4 left-4 space-x-2">
                <Badge className={cn("border", getStatusColor(bid.status))} variant="outline">
                  {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                </Badge>
                <Badge 
                  className={cn(
                    "border",
                    isActive 
                      ? "bg-primary/20 text-primary border-primary/30" 
                      : "bg-muted text-muted-foreground border-border"
                  )}
                  variant="outline"
                >
                  <Timer className="h-3 w-3 mr-1" />
                  {timeRemaining}
                </Badge>
              </div>
              
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-xs opacity-80">Current Bid</div>
                <div className="text-3xl font-bold">
                  {formatPrice(bid.current_price, bid.currency)}
                </div>
              </div>

              {priceIncrease > 0 && (
                <div className="absolute bottom-4 right-4 text-white">
                  <div className="flex items-center space-x-1 bg-accent/20 backdrop-blur-sm rounded-lg px-3 py-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-medium">+{percentageIncrease}%</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Bid Action */}
            {isActive && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">
                    <Gavel className="h-5 w-5 mr-2" />
                    Place Bid
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Place Your Bid</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">Current Highest Bid</div>
                      <div className="text-2xl font-bold">
                        {formatPrice(bid.current_price, bid.currency)}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Your Bid Amount ({bid.currency})</Label>
                      <Input
                        type="number"
                        placeholder={`Minimum: ${bid.current_price + 1}`}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        min={bid.current_price + 1}
                      />
                    </div>

                    <div>
                      <Label>Bid as:</Label>
                      <Select value={bidType} onValueChange={(value: 'individual' | 'dao') => setBidType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="dao">DAO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {bidType === 'dao' && (
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
                    
                    <Button 
                      onClick={handlePlaceBid} 
                      disabled={isLoading || !bidAmount || (bidType === 'dao' && !selectedDAO)}
                      className="w-full"
                    >
                      {isLoading ? 'Placing Bid...' : 
                       bidType === 'dao' ? 'Create Bid Proposal' : 'Place Bid'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Bid Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{bid.title}</h1>
              <p className="text-muted-foreground text-lg mb-4">
                {bid.description}
              </p>
            </div>

            {/* Bid Progress */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Bid Progress</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Starting Price</span>
                    <span>{formatPrice(bid.starting_price, bid.currency)}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Current Bid</span>
                    <span className="font-semibold">{formatPrice(bid.current_price, bid.currency)}</span>
                  </div>
                </div>
                
                {priceIncrease > 0 && (
                  <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                    <span className="text-sm">Price Increase</span>
                    <span className="font-semibold text-accent">
                      +{formatPrice(priceIncrease, bid.currency)} (+{percentageIncrease}%)
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bid Information */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Bid Information</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="font-medium">{bid.status}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Time Remaining</div>
                    <div className="font-medium">{timeRemaining}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Started</div>
                    <div className="font-medium">
                      {new Date(bid.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Ends</div>
                    <div className="font-medium">
                      {new Date(bid.end_date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Creator Info */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Created By</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={creator?.avatar_url} />
                    <AvatarFallback>
                      {creator?.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{creator?.username || 'Unknown User'}</div>
                    <div className="text-sm text-muted-foreground">{creator?.email}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Asset Link */}
            {asset && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Related Asset</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-sm text-muted-foreground">{asset.category}</div>
                    </div>
                    <Button variant="outline" asChild>
                      <Link to={`/assets/${asset.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Asset
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Quick Actions</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Blockchain
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  View All Bidders
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