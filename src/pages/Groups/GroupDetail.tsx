import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Wallet, TrendingUp, ArrowLeft, UserPlus, Vote, FileText, PlusCircle, Calendar, DollarSign } from "lucide-react";
import { mockDAOs, mockUsers, mockProposals, mockAssets, mockCampaigns, mockFunctions } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function GroupDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [proposalType, setProposalType] = useState<'funding' | 'asset_purchase' | 'governance' | 'treasury'>('funding');
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [proposalAmount, setProposalAmount] = useState('');
  const [proposalCurrency, setProposalCurrency] = useState('USDC');
  const [userIsMember, setUserIsMember] = useState(false);

  const dao = mockDAOs.find(d => d.id === id);
  
  if (!dao) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">DAO Not Found</h1>
            <p className="text-muted-foreground mb-6">The DAO you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/groups">Back to DAOs</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const creator = mockUsers.find(user => user.id === dao.created_by);
  const daoProposals = mockProposals.filter(p => p.dao_id === dao.id);
  const daoAssets = mockAssets.filter(a => a.dao_id === dao.id);
  const daoCampaigns = mockCampaigns.filter(c => c.dao_id === dao.id);

  const formatBalance = (balance: number) => {
    if (balance >= 1000000) return `${(balance / 1000000).toFixed(1)}M`;
    if (balance >= 1000) return `${(balance / 1000).toFixed(1)}K`;
    return balance.toLocaleString();
  };

  const handleJoinDAO = async () => {
    setIsLoading(true);
    try {
      const result = await mockFunctions.joinDAO(dao.id, 'current-user');
      if (result.success) {
        setUserIsMember(true);
        toast({
          title: "Joined DAO!",
          description: `You have successfully joined ${dao.name}.`,
        });
      }
    } catch (error) {
      toast({
        title: "Failed to Join",
        description: "Something went wrong joining the DAO.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProposal = async () => {
    if (!proposalTitle || !proposalDescription) return;
    
    setIsLoading(true);
    try {
      const result = await mockFunctions.createProposal({
        title: proposalTitle,
        description: proposalDescription,
        proposal_type: proposalType,
        dao_id: dao.id,
        proposer_id: 'current-user',
        amount: proposalAmount ? parseFloat(proposalAmount) : undefined,
        currency: proposalCurrency,
        status: 'active',
        votes_for: 0,
        votes_against: 0,
        votes_abstain: 0,
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
      
      if (result.success) {
        toast({
          title: "Proposal Created!",
          description: "Your proposal has been submitted and is now open for voting.",
        });
        setProposalTitle('');
        setProposalDescription('');
        setProposalAmount('');
      }
    } catch (error) {
      toast({
        title: "Proposal Failed",
        description: "Something went wrong creating the proposal.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getProposalStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-primary/20 text-primary border-primary/30';
      case 'passed': return 'bg-accent/20 text-accent border-accent/30';
      case 'rejected': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'executed': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/groups">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to DAOs
          </Link>
        </Button>

        {/* DAO Header */}
        <div className="relative overflow-hidden rounded-xl mb-8">
          <img
            src={dao.image_url}
            alt={dao.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* DAO Info Overlay */}
          <div className="absolute bottom-6 left-6 text-white">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-4xl font-bold">{dao.name}</h1>
              <Badge className="dao-badge border-0">
                DAO
              </Badge>
            </div>
            <p className="text-lg opacity-90 mb-4 max-w-2xl">
              {dao.description}
            </p>
            <div className="flex items-center space-x-6">
              <div>
                <div className="text-sm opacity-80">Treasury Balance</div>
                <div className="text-2xl font-bold">${formatBalance(dao.treasury_balance)}</div>
              </div>
              <div>
                <div className="text-sm opacity-80">Members</div>
                <div className="text-2xl font-bold">{dao.member_count}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 space-x-2">
            {!userIsMember ? (
              <Button onClick={handleJoinDAO} disabled={isLoading} className="bg-accent hover:bg-accent/90">
                <UserPlus className="h-4 w-4 mr-2" />
                {isLoading ? 'Joining...' : 'Join DAO'}
              </Button>
            ) : (
              <Badge className="bg-accent/20 text-accent border-accent/30">
                <Users className="h-3 w-3 mr-1" />
                Member
              </Badge>
            )}
          </div>
        </div>

        {/* DAO Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="treasury">Treasury</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="text-sm font-medium">Treasury Balance</h3>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">
                    ${formatBalance(dao.treasury_balance)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="text-sm font-medium">Total Members</h3>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {dao.member_count}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +15 new this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="text-sm font-medium">Active Proposals</h3>
                  <Vote className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {daoProposals.filter(p => p.status === 'active').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {daoProposals.length} total proposals
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Creator Info */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Founded By</h3>
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
                    <div className="text-xs text-muted-foreground">
                      Founded on {new Date(dao.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Recent Activity</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {daoProposals.slice(0, 3).map(proposal => (
                    <div key={proposal.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{proposal.title}</div>
                          <div className="text-xs text-muted-foreground">{proposal.proposal_type}</div>
                        </div>
                      </div>
                      <Badge className={cn("border text-xs", getProposalStatusColor(proposal.status))} variant="outline">
                        {proposal.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Treasury Tab */}
          <TabsContent value="treasury" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Treasury Overview</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
                    <div>
                      <div className="text-sm text-muted-foreground">Total Balance</div>
                      <div className="text-2xl font-bold text-accent">
                        ${formatBalance(dao.treasury_balance)}
                      </div>
                    </div>
                    <div className="p-3 bg-accent/20 rounded-full">
                      <Wallet className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Available for proposals</span>
                      <span className="font-medium">${formatBalance(dao.treasury_balance * 0.8)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Reserved funds</span>
                      <span className="font-medium">${formatBalance(dao.treasury_balance * 0.2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Treasury Actions</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {userIsMember && (
                    <>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full justify-start">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Request Treasury Funds
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Request Treasury Funds</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Proposal Title</Label>
                              <Input
                                placeholder="Enter proposal title"
                                value={proposalTitle}
                                onChange={(e) => setProposalTitle(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Amount</Label>
                              <Input
                                type="number"
                                placeholder="Enter amount"
                                value={proposalAmount}
                                onChange={(e) => setProposalAmount(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Description</Label>
                              <Textarea
                                placeholder="Explain how the funds will be used"
                                value={proposalDescription}
                                onChange={(e) => setProposalDescription(e.target.value)}
                              />
                            </div>
                            <Button onClick={handleCreateProposal} disabled={isLoading} className="w-full">
                              {isLoading ? 'Creating...' : 'Create Proposal'}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Treasury History
                      </Button>
                    </>
                  )}
                  
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Treasury Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Proposals Tab */}
          <TabsContent value="proposals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">DAO Proposals</h2>
              {userIsMember && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create Proposal
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Proposal</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Proposal Type</Label>
                        <Select value={proposalType} onValueChange={(value: any) => setProposalType(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="funding">Funding Request</SelectItem>
                            <SelectItem value="asset_purchase">Asset Purchase</SelectItem>
                            <SelectItem value="governance">Governance Change</SelectItem>
                            <SelectItem value="treasury">Treasury Management</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Title</Label>
                        <Input
                          placeholder="Enter proposal title"
                          value={proposalTitle}
                          onChange={(e) => setProposalTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Describe your proposal in detail"
                          value={proposalDescription}
                          onChange={(e) => setProposalDescription(e.target.value)}
                        />
                      </div>
                      {(proposalType === 'funding' || proposalType === 'asset_purchase') && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Amount</Label>
                            <Input
                              type="number"
                              placeholder="Enter amount"
                              value={proposalAmount}
                              onChange={(e) => setProposalAmount(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Currency</Label>
                            <Select value={proposalCurrency} onValueChange={setProposalCurrency}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="USDC">USDC</SelectItem>
                                <SelectItem value="ETH">ETH</SelectItem>
                                <SelectItem value="BTC">BTC</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                      <Button onClick={handleCreateProposal} disabled={isLoading} className="w-full">
                        {isLoading ? 'Creating...' : 'Create Proposal'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="grid gap-4">
              {daoProposals.map(proposal => (
                <Card key={proposal.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{proposal.title}</h3>
                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {proposal.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{proposal.proposal_type.replace('_', ' ')}</span>
                          {proposal.amount && (
                            <span>{proposal.amount.toLocaleString()} {proposal.currency}</span>
                          )}
                          <span>{new Date(proposal.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={cn("border", getProposalStatusColor(proposal.status))} variant="outline">
                          {proposal.status}
                        </Badge>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/groups/${dao.id}/proposals/${proposal.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    {/* Voting Stats */}
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span>{proposal.votes_for} For</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-destructive rounded-full" />
                        <span>{proposal.votes_against} Against</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                        <span>{proposal.votes_abstain} Abstain</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Assets Tab */}
          <TabsContent value="assets" className="space-y-6">
            <h2 className="text-2xl font-bold">DAO Assets</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {daoAssets.map(asset => (
                <Card key={asset.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={asset.image_url}
                        alt={asset.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2 bg-primary/20 text-primary border-primary/30">
                        {asset.category}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{asset.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {asset.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-primary">
                          {asset.price.toLocaleString()} {asset.currency}
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/assets/${asset.id}`}>
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">DAO Members</h2>
              <div className="text-muted-foreground">
                {dao.member_count} total members
              </div>
            </div>
            
            <div className="grid gap-4">
              {mockUsers.slice(0, 5).map(user => (
                <Card key={user.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback>
                          {user.username?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{user.username}</div>
                        <div className="text-sm text-muted-foreground">
                          Joined {new Date(user.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Member
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}