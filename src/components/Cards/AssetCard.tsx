import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, ShoppingCart, Users, Clock } from "lucide-react";
import { Asset, mockDAOs, mockUsers } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface AssetCardProps {
  asset: Asset;
  className?: string;
  showActions?: boolean;
}

export function AssetCard({ asset, className, showActions = true }: AssetCardProps) {
  const owner = asset.owner_type === 'dao' 
    ? mockDAOs.find(dao => dao.id === asset.dao_id)
    : mockUsers.find(user => user.id === asset.owner_id);

  const ownerName = asset.owner_type === 'dao' 
    ? (owner as any)?.name 
    : (owner as any)?.username;
  const ownerAvatar = (owner as any)?.avatar_url;

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
    <Card className={cn("crypto-card group hover:shadow-lg transition-all duration-300", className)}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={asset.image_url}
            alt={asset.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Status Badge */}
          <Badge 
            className={cn("absolute top-3 left-3 border", getStatusColor(asset.status))}
            variant="outline"
          >
            {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
          </Badge>

          {/* Category Badge */}
          <Badge 
            className={cn("absolute top-3 right-3 border", getCategoryColor(asset.category))}
            variant="outline"
          >
            {asset.category}
          </Badge>

          {/* Price */}
          <div className="absolute bottom-3 left-3 text-white">
            <div className="text-2xl font-bold">
              {formatPrice(asset.price, asset.currency)}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Title and Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">{asset.name}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {asset.description}
            </p>
          </div>

          {/* Owner Info */}
          <div className="flex items-center space-x-3">
            {asset.owner_type === 'dao' ? (
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {ownerName || 'Unknown DAO'}
                </span>
                <Badge variant="outline" className="dao-badge text-xs">
                  DAO
                </Badge>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={ownerAvatar} />
                  <AvatarFallback className="text-xs">
                    {ownerName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  {ownerName || 'Unknown User'}
                </span>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>Listed {new Date(asset.created_at).toLocaleDateString()}</span>
            </div>
            <div className="font-mono">
              ID: {asset.id.slice(-8)}
            </div>
          </div>
        </div>
      </CardContent>

      {showActions && (
        <CardFooter className="p-6 pt-0 space-x-2">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link to={`/assets/${asset.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </Button>
          {asset.status === 'active' && (
            <Button variant="default" size="sm" className="flex-1">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}