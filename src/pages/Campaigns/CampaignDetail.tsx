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
import { Progress } from "@/components/ui/progress";
import { Heart, Share2, DollarSign, Users, Calendar, ArrowLeft, Target, TrendingUp, Clock } from "lucide-react";
import { mockCampaigns, mockUsers, mockDAOs, mockFunctions } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function CampaignDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [fundAmount, setFundAmount] = useState('');
  const [fundType, setFundType] = useState<'individual' | 'dao'>('individual');
  const [selectedDAO, setSelectedDAO] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const campaign = mockCampaigns.find(c => c.id === id);
  
  if (!campaign) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Campaign Not Found</h1>
            <p className="text-muted-foreground mb-6">The campaign you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/campaigns">Back to Campaigns</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const creator = campaign.creator_type === 'dao' 
    ? mockDAOs.find(dao => dao.id === campaign.dao_id)
    : mockUsers.find(user => user.id === campaign.creator_id);

  const creatorName = campaign.creator_type === 'dao' 
    ? (creator as any)?.name 
    : (creator as any)?.username;

  const formatPrice = (price: number, currency: string) => {
    return `${price.toLocaleString()} ${currency}`;
  };

  const progressPercentage = (campaign.raised_amount / campaign.target_amount) * 100;
  const remainingAmount = campaign.target_amount - campaign.raised_amount;
  const daysRemaining = campaign.end_date 
    ? Math.ceil((new Date(campaign.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const handleFunding = async () => {
    if (!fundAmount) return;
    
    setIsLoading(true);
    try {
      const result = await mockFunctions.fundCampaign(campaign.id, parseFloat(fundAmount), fundType, selectedDAO);
      if (result.success) {
        toast({
          title: "Funding Successful!",
          description: `Contributed ${formatPrice(parseFloat(fundAmount), campaign.currency)} to the campaign${fundType === 'dao' ? ' via DAO proposal' : ''}.`,
        });
        setFundAmount('');
      }
    } catch (error) {
      toast({
        title: "Funding Failed",
        description: "Something went wrong with your contribution.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technology': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'environmental': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'education': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'healthcare': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-accent/20 text-accent border-accent/30';
      case 'completed': return 'bg-primary/20 text-primary border-primary/30';
      case 'cancelled': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/campaigns">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Campaigns
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Campaign Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={campaign.image_url}
                alt={campaign.title}
                className="w-full aspect-video object-cover"
              />
              <div className="absolute top-4 left-4 space-x-2">
                <Badge className={cn("border", getStatusColor(campaign.status))} variant="outline">
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </Badge>
                <Badge className={cn("border", getCategoryColor(campaign.category))} variant="outline">
                  {campaign.category}
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

            {/* Funding Progress */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold text-primary">
                      {formatPrice(campaign.raised_amount, campaign.currency)}
                    </span>
                    <span className="text-lg text-muted-foreground">
                      of {formatPrice(campaign.target_amount, campaign.currency)}
                    </span>
                  </div>
                  
                  <Progress value={progressPercentage} className="h-3" />
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-accent">
                        {progressPercentage.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Funded</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">
                        {formatPrice(remainingAmount, campaign.currency)}
                      </div>
                      <div className="text-sm text-muted-foreground">Remaining</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">
                        {daysRemaining ? `${daysRemaining}d` : 'No limit'}
                      </div>
                      <div className="text-sm text-muted-foreground">Left</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Fund Action */}
            {campaign.status === 'active' && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Fund This Campaign
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Fund Campaign</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">Campaign Progress</div>
                      <div className="text-lg font-semibold">
                        {formatPrice(campaign.raised_amount, campaign.currency)} / {formatPrice(campaign.target_amount, campaign.currency)}
                      </div>
                      <Progress value={progressPercentage} className="h-2 mt-2" />
                    </div>
                    
                    <div>
                      <Label>Funding Amount ({campaign.currency})</Label>
                      <Input
                        type="number"
                        placeholder="Enter amount to fund"
                        value={fundAmount}
                        onChange={(e) => setFundAmount(e.target.value)}
                        min="1"
                      />
                    </div>

                    <div>
                      <Label>Fund as:</Label>
                      <Select value={fundType} onValueChange={(value: 'individual' | 'dao') => setFundType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="dao">DAO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {fundType === 'dao' && (
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
                    
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        {fundType === 'dao' 
                          ? 'This will create a proposal for DAO members to vote on the funding.'
                          : 'Your contribution will be processed immediately and help fund this campaign.'
                        }
                      </p>
                    </div>
                    
                    <Button 
                      onClick={handleFunding} 
                      disabled={isLoading || !fundAmount || (fundType === 'dao' && !selectedDAO)}
                      className="w-full"
                    >
                      {isLoading ? 'Processing...' : 
                       fundType === 'dao' ? 'Create Funding Proposal' : 'Fund Campaign'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Campaign Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {campaign.description}
              </p>
            </div>

            {/* Creator Info */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Campaign Creator</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  {campaign.creator_type === 'dao' ? (
                    <>
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{creatorName || 'Unknown DAO'}</div>
                        <div className="text-sm text-muted-foreground">Decentralized Autonomous Organization</div>
                        <Badge variant="outline" className="dao-badge mt-2">
                          DAO
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={(creator as any)?.avatar_url} />
                        <AvatarFallback>
                          {creatorName?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{creatorName || 'Unknown User'}</div>
                        <div className="text-sm text-muted-foreground">Individual Creator</div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Campaign Stats */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Campaign Statistics</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Target className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Target</div>
                      <div className="font-semibold">
                        {formatPrice(campaign.target_amount, campaign.currency)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Raised</div>
                      <div className="font-semibold">
                        {formatPrice(campaign.raised_amount, campaign.currency)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Started</div>
                      <div className="font-semibold">
                        {new Date(campaign.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                      <Clock className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {daysRemaining ? 'Days Left' : 'Duration'}
                      </div>
                      <div className="font-semibold">
                        {daysRemaining ? `${daysRemaining} days` : 'Ongoing'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Details */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Campaign Information</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Category</div>
                    <div className="font-medium">{campaign.category}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="font-medium">{campaign.status}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Campaign ID</div>
                    <div className="font-mono text-sm">{campaign.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Currency</div>
                    <div className="font-medium">{campaign.currency}</div>
                  </div>
                </div>
                
                {campaign.end_date && (
                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground">Campaign Deadline</div>
                    <div className="font-medium">
                      {new Date(campaign.end_date).toLocaleDateString()} at {new Date(campaign.end_date).toLocaleTimeString()}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Related Campaigns */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Similar Campaigns</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCampaigns
                    .filter(c => c.id !== campaign.id && c.category === campaign.category)
                    .slice(0, 2)
                    .map(relatedCampaign => (
                      <div key={relatedCampaign.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{relatedCampaign.title}</div>
                          <div className="text-xs text-muted-foreground">{relatedCampaign.category}</div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/campaigns/${relatedCampaign.id}`}>
                            View
                          </Link>
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}