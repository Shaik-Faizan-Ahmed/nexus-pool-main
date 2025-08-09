import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Users, Wallet, TrendingUp, Clock, UserPlus } from "lucide-react";
import { DAO, mockUsers } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface DAOCardProps {
  dao: DAO;
  className?: string;
  showActions?: boolean;
  userIsMember?: boolean;
}

export function DAOCard({ dao, className, showActions = true, userIsMember = false }: DAOCardProps) {
  const creator = mockUsers.find(user => user.id === dao.created_by);

  const formatBalance = (balance: number) => {
    if (balance >= 1000000) return `${(balance / 1000000).toFixed(1)}M`;
    if (balance >= 1000) return `${(balance / 1000).toFixed(1)}K`;
    return balance.toLocaleString();
  };

  const getTreasuryHealthColor = (balance: number) => {
    if (balance >= 500000) return "text-accent";
    if (balance >= 100000) return "text-primary";
    return "text-muted-foreground";
  };

  const getMemberCountColor = (count: number) => {
    if (count >= 200) return "text-accent";
    if (count >= 100) return "text-primary";
    return "text-muted-foreground";
  };

  return (
    <Card className={cn("crypto-card group hover:shadow-lg transition-all duration-300", className)}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={dao.image_url}
            alt={dao.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Member Status Badge */}
          {userIsMember && (
            <Badge 
              className="absolute top-3 left-3 border bg-accent/20 text-accent border-accent/30"
              variant="outline"
            >
              <Users className="h-3 w-3 mr-1" />
              Member
            </Badge>
          )}

          {/* DAO Badge */}
          <Badge 
            className="absolute top-3 right-3 dao-badge border-0"
            variant="outline"
          >
            DAO
          </Badge>

          {/* Treasury Balance */}
          <div className="absolute bottom-3 left-3 text-white">
            <div className="text-xs opacity-80">Treasury Balance</div>
            <div className="text-2xl font-bold">
              ${formatBalance(dao.treasury_balance)}
            </div>
          </div>

          {/* Member Count */}
          <div className="absolute bottom-3 right-3 text-white">
            <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1">
              <Users className="h-3 w-3" />
              <span className="text-xs font-medium">{dao.member_count} members</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Title and Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">{dao.name}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {dao.description}
            </p>
          </div>

          {/* DAO Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Treasury</div>
              <div className={cn("font-medium", getTreasuryHealthColor(dao.treasury_balance))}>
                <div className="flex items-center space-x-1">
                  <Wallet className="h-3 w-3" />
                  <span>${formatBalance(dao.treasury_balance)}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Members</div>
              <div className={cn("font-medium", getMemberCountColor(dao.member_count))}>
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{dao.member_count}</span>
                </div>
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
              Founded by {creator?.username || 'Unknown User'}
            </span>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>Created {new Date(dao.created_at).toLocaleDateString()}</span>
            </div>
            <div className="font-mono">
              ID: {dao.id.slice(-8)}
            </div>
          </div>
        </div>
      </CardContent>

      {showActions && (
        <CardFooter className="p-6 pt-0 space-x-2">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link to={`/groups/${dao.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View DAO
            </Link>
          </Button>
          {!userIsMember && (
            <Button variant="default" size="sm" className="flex-1">
              <UserPlus className="h-4 w-4 mr-2" />
              Join DAO
            </Button>
          )}
          {userIsMember && (
            <Button variant="success" size="sm" className="flex-1">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Treasury
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}