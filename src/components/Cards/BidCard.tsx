import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Gavel, TrendingUp, Clock, Timer } from "lucide-react";
import { Bid, mockUsers, mockAssets } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface BidCardProps {
  bid: Bid;
  className?: string;
  showActions?: boolean;
}

export function BidCard({ bid, className, showActions = true }: BidCardProps) {
  const creator = mockUsers.find(user => user.id === bid.created_by);
  const asset = mockAssets.find(a => a.id === bid.asset_id);

  const formatPrice = (price: number, currency: string) => {
    return `${price.toLocaleString()} ${currency}`;
  };

  const getTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Ended";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
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
  const timeRemaining = getTimeRemaining(bid.end_date);
  const isActive = bid.status === 'active' && timeRemaining !== "Ended";

  return (
    <Card className={cn("crypto-card group hover:shadow-lg transition-all duration-300", className)}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={asset?.image_url || "/placeholder.svg"}
            alt={bid.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Status Badge */}
          <Badge 
            className={cn("absolute top-3 left-3 border", getStatusColor(bid.status))}
            variant="outline"
          >
            {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
          </Badge>

          {/* Time Remaining */}
          <Badge 
            className={cn(
              "absolute top-3 right-3 border",
              isActive 
                ? "bg-primary/20 text-primary border-primary/30" 
                : "bg-muted text-muted-foreground border-border"
            )}
            variant="outline"
          >
            <Timer className="h-3 w-3 mr-1" />
            {timeRemaining}
          </Badge>

          {/* Current Price */}
          <div className="absolute bottom-3 left-3 text-white">
            <div className="text-xs opacity-80">Current Bid</div>
            <div className="text-2xl font-bold">
              {formatPrice(bid.current_price, bid.currency)}
            </div>
          </div>

          {/* Price Increase */}
          {priceIncrease > 0 && (
            <div className="absolute bottom-3 right-3 text-white">
              <div className="flex items-center space-x-1 bg-accent/20 backdrop-blur-sm rounded-lg px-2 py-1">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs font-medium">+{percentageIncrease}%</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Title and Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">{bid.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {bid.description}
            </p>
          </div>

          {/* Bid Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Starting Price</div>
              <div className="font-medium">
                {formatPrice(bid.starting_price, bid.currency)}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Price Increase</div>
              <div className={cn(
                "font-medium",
                priceIncrease > 0 ? "text-accent" : "text-muted-foreground"
              )}>
                {priceIncrease > 0 ? `+${formatPrice(priceIncrease, bid.currency)}` : "No increase"}
              </div>
            </div>
          </div>

          {/* Creator Info */}
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={creator?.avatar_url} />
              <AvatarFallback className="text-xs">
                {creator?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              Created by {creator?.username || 'Unknown User'}
            </span>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>Started {new Date(bid.created_at).toLocaleDateString()}</span>
            </div>
            <div className="font-mono">
              ID: {bid.id.slice(-8)}
            </div>
          </div>
        </div>
      </CardContent>

      {showActions && (
        <CardFooter className="p-6 pt-0 space-x-2">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link to={`/bids/${bid.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </Button>
          {isActive && (
            <Button variant="default" size="sm" className="flex-1">
              <Gavel className="h-4 w-4 mr-2" />
              Place Bid
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}