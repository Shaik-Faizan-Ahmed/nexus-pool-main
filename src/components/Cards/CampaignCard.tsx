import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Eye, Heart, Users, Clock, Target } from "lucide-react";
import { Campaign, mockDAOs, mockUsers } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface CampaignCardProps {
  campaign: Campaign;
  className?: string;
  showActions?: boolean;
}

export function CampaignCard({ campaign, className, showActions = true }: CampaignCardProps) {
  const creator = campaign.creator_type === 'dao' 
    ? mockDAOs.find(dao => dao.id === campaign.dao_id)
    : mockUsers.find(user => user.id === campaign.creator_id);

  const creatorName = campaign.creator_type === 'dao' 
    ? (creator as any)?.name 
    : (creator as any)?.username;
  const creatorAvatar = (creator as any)?.avatar_url;

  const formatPrice = (price: number, currency: string) => {
    return `${price.toLocaleString()} ${currency}`;
  };

  const getTimeRemaining = (endDate?: string) => {
    if (!endDate) return null;
    
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Ended";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} days left`;
    if (hours > 0) return `${hours} hours left`;
    return "Ending soon";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-accent/20 text-accent border-accent/30';
      case 'completed': return 'bg-primary/20 text-primary border-primary/30';
      case 'cancelled': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted text-muted-foreground border-border';
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

  const fundingProgress = (campaign.raised_amount / campaign.target_amount) * 100;
  const timeRemaining = getTimeRemaining(campaign.end_date);
  const isActive = campaign.status === 'active';

  return (
    <Card className={cn("crypto-card group hover:shadow-lg transition-all duration-300", className)}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={campaign.image_url}
            alt={campaign.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Status Badge */}
          <Badge 
            className={cn("absolute top-3 left-3 border", getStatusColor(campaign.status))}
            variant="outline"
          >
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>

          {/* Category Badge */}
          <Badge 
            className={cn("absolute top-3 right-3 border", getCategoryColor(campaign.category))}
            variant="outline"
          >
            {campaign.category}
          </Badge>

          {/* Funding Progress */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="text-xs opacity-80 mb-1">
              {formatPrice(campaign.raised_amount, campaign.currency)} raised of {formatPrice(campaign.target_amount, campaign.currency)}
            </div>
            <Progress 
              value={fundingProgress} 
              className="h-2 bg-black/30"
            />
            <div className="text-xs mt-1 opacity-80">
              {fundingProgress.toFixed(1)}% funded
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Title and Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">{campaign.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {campaign.description}
            </p>
          </div>

          {/* Funding Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Target Amount</div>
              <div className="font-medium">
                {formatPrice(campaign.target_amount, campaign.currency)}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Raised Amount</div>
              <div className="font-medium text-accent">
                {formatPrice(campaign.raised_amount, campaign.currency)}
              </div>
            </div>
          </div>

          {/* Creator Info */}
          <div className="flex items-center space-x-3">
            {campaign.creator_type === 'dao' ? (
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {creatorName || 'Unknown DAO'}
                </span>
                <Badge variant="outline" className="dao-badge text-xs">
                  DAO
                </Badge>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={creatorAvatar} />
                  <AvatarFallback className="text-xs">
                    {creatorName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  {creatorName || 'Unknown User'}
                </span>
              </div>
            )}
          </div>

          {/* Time and Metadata */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>
                {timeRemaining || `Started ${new Date(campaign.created_at).toLocaleDateString()}`}
              </span>
            </div>
            <div className="font-mono">
              ID: {campaign.id.slice(-8)}
            </div>
          </div>
        </div>
      </CardContent>

      {showActions && (
        <CardFooter className="p-6 pt-0 space-x-2">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link to={`/campaigns/${campaign.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </Button>
          {isActive && (
            <Button variant="success" size="sm" className="flex-1">
              <Heart className="h-4 w-4 mr-2" />
              Fund Project
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}