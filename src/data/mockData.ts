// ChainFund Mock Data - All sample data for the platform

export interface User {
  id: string;
  username: string;
  email: string;
  mobile?: string;
  avatar_url?: string;
  wallet_address?: string;
  is_admin: boolean;
  created_at: string;
}

export interface DAO {
  id: string;
  name: string;
  description: string;
  image_url: string;
  treasury_balance: number;
  member_count: number;
  created_by: string;
  created_at: string;
}

export interface Asset {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  image_url: string;
  owner_id: string;
  owner_type: 'individual' | 'dao';
  dao_id?: string;
  status: 'active' | 'sold' | 'inactive';
  created_at: string;
}

export interface Bid {
  id: string;
  title: string;
  description: string;
  asset_id: string;
  starting_price: number;
  current_price: number;
  currency: string;
  end_date: string;
  status: 'active' | 'ended' | 'cancelled';
  winner_id?: string;
  created_by: string;
  created_at: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  target_amount: number;
  raised_amount: number;
  currency: string;
  category: string;
  image_url: string;
  creator_id: string;
  creator_type: 'individual' | 'dao';
  dao_id?: string;
  end_date?: string;
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  proposal_type: 'funding' | 'asset_purchase' | 'governance' | 'treasury';
  dao_id: string;
  proposer_id: string;
  amount?: number;
  currency?: string;
  target_asset_id?: string;
  target_campaign_id?: string;
  status: 'active' | 'passed' | 'rejected' | 'executed';
  votes_for: number;
  votes_against: number;
  votes_abstain: number;
  end_date?: string;
  created_at: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user-1",
    username: "crypto_pioneer",
    email: "pioneer@chainfund.io",
    mobile: "+1234567890",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    wallet_address: "0x742d35Cc6636C0532925aBc6Bc1234567890abcd",
    is_admin: false,
    created_at: "2024-01-15T00:00:00Z"
  },
  {
    id: "user-2", 
    username: "defi_builder",
    email: "builder@chainfund.io",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    wallet_address: "0x8ba1f109551bD432803012645Hac189451c24cd",
    is_admin: false,
    created_at: "2024-01-20T00:00:00Z"
  },
  {
    id: "admin-1",
    username: "chainfund_admin",
    email: "admin@chainfund.io", 
    avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    wallet_address: "0x1234567890abcdef1234567890abcdef12345678",
    is_admin: true,
    created_at: "2024-01-01T00:00:00Z"
  }
];

// Mock DAOs
export const mockDAOs: DAO[] = [
  {
    id: "dao-1",
    name: "DeFi Innovators DAO",
    description: "Building the future of decentralized finance through collaborative funding and governance.",
    image_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=200&fit=crop",
    treasury_balance: 250000,
    member_count: 127,
    created_by: "user-1",
    created_at: "2024-01-10T00:00:00Z"
  },
  {
    id: "dao-2", 
    name: "NFT Collective",
    description: "Democratizing NFT ownership through pooled investments and shared governance.",
    image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop",
    treasury_balance: 180000,
    member_count: 89,
    created_by: "user-2",
    created_at: "2024-01-15T00:00:00Z"
  },
  {
    id: "dao-3",
    name: "Green Energy DAO", 
    description: "Funding sustainable energy projects through decentralized autonomous organization.",
    image_url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=300&h=200&fit=crop",
    treasury_balance: 420000,
    member_count: 203,
    created_by: "user-1",
    created_at: "2024-01-05T00:00:00Z"
  }
];

// Mock Assets
export const mockAssets: Asset[] = [
  {
    id: "asset-1",
    name: "Rare Digital Art Collection",
    description: "Exclusive collection of 10 unique digital artworks by renowned crypto artists.",
    price: 50000,
    currency: "ETH",
    category: "Art",
    image_url: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=300&fit=crop",
    owner_id: "user-1",
    owner_type: "individual",
    status: "active",
    created_at: "2024-02-01T00:00:00Z"
  },
  {
    id: "asset-2",
    name: "DeFi Protocol Tokens",
    description: "Early access tokens to upcoming DeFi protocol with governance rights.",
    price: 25000,
    currency: "USDC", 
    category: "Tokens",
    image_url: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop",
    owner_id: "dao-1",
    owner_type: "dao",
    dao_id: "dao-1",
    status: "active",
    created_at: "2024-02-05T00:00:00Z"
  },
  {
    id: "asset-3",
    name: "Metaverse Land Parcel",
    description: "Prime virtual real estate in the metaverse with high development potential.",
    price: 75000,
    currency: "ETH",
    category: "Real Estate",
    image_url: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=400&h=300&fit=crop",
    owner_id: "dao-2",
    owner_type: "dao", 
    dao_id: "dao-2",
    status: "active",
    created_at: "2024-02-10T00:00:00Z"
  }
];

// Mock Bids
export const mockBids: Bid[] = [
  {
    id: "bid-1",
    title: "Crypto Art Auction",
    description: "Bidding for exclusive crypto art collection with verified provenance.",
    asset_id: "asset-1",
    starting_price: 40000,
    current_price: 47500,
    currency: "ETH",
    end_date: "2024-02-28T23:59:59Z",
    status: "active",
    created_by: "user-2",
    created_at: "2024-02-15T00:00:00Z"
  },
  {
    id: "bid-2",
    title: "DeFi Token Bid",
    description: "Competitive bidding for early access DeFi protocol tokens.",
    asset_id: "asset-2", 
    starting_price: 20000,
    current_price: 23000,
    currency: "USDC",
    end_date: "2024-02-25T23:59:59Z",
    status: "active",
    created_by: "dao-2",
    created_at: "2024-02-12T00:00:00Z"
  }
];

// Mock Campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: "campaign-1",
    title: "Next-Gen DeFi Platform",
    description: "Building a revolutionary DeFi platform with advanced yield farming and liquidity mining features.",
    target_amount: 500000,
    raised_amount: 325000,
    currency: "USDC",
    category: "Technology",
    image_url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop",
    creator_id: "dao-1",
    creator_type: "dao",
    dao_id: "dao-1",
    end_date: "2024-03-15T23:59:59Z",
    status: "active",
    created_at: "2024-01-20T00:00:00Z"
  },
  {
    id: "campaign-2",
    title: "Green Energy NFT Marketplace",
    description: "Creating a sustainable NFT marketplace powered by renewable energy sources.",
    target_amount: 300000,
    raised_amount: 180000,
    currency: "ETH",
    category: "Environmental",
    image_url: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=300&fit=crop",
    creator_id: "dao-3",
    creator_type: "dao",
    dao_id: "dao-3", 
    end_date: "2024-04-01T23:59:59Z",
    status: "active",
    created_at: "2024-01-25T00:00:00Z"
  },
  {
    id: "campaign-3",
    title: "Crypto Education Platform",
    description: "Democratizing crypto education through interactive courses and real-world simulations.",
    target_amount: 150000,
    raised_amount: 95000,
    currency: "USDC",
    category: "Education",
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    creator_id: "user-1",
    creator_type: "individual",
    status: "active",
    created_at: "2024-02-01T00:00:00Z"
  }
];

// Mock Proposals
export const mockProposals: Proposal[] = [
  {
    id: "proposal-1",
    title: "Fund New DeFi Integration",
    description: "Proposal to allocate 100,000 USDC for developing integration with leading DeFi protocols.",
    proposal_type: "funding",
    dao_id: "dao-1",
    proposer_id: "user-1",
    amount: 100000,
    currency: "USDC",
    status: "active",
    votes_for: 45,
    votes_against: 12,
    votes_abstain: 8,
    end_date: "2024-02-28T23:59:59Z",
    created_at: "2024-02-10T00:00:00Z"
  },
  {
    id: "proposal-2",
    title: "Purchase Metaverse Land",
    description: "Proposal to purchase premium metaverse land for DAO's virtual headquarters.",
    proposal_type: "asset_purchase",
    dao_id: "dao-2",
    proposer_id: "user-2",
    target_asset_id: "asset-3",
    amount: 75000,
    currency: "ETH",
    status: "active",
    votes_for: 23,
    votes_against: 5,
    votes_abstain: 3,
    end_date: "2024-02-25T23:59:59Z", 
    created_at: "2024-02-08T00:00:00Z"
  }
];

// Helper functions for mock operations
export const mockFunctions = {
  // Authentication
  signUp: async (email: string, username: string) => {
    console.log(`Mock: Sending magic link to ${email} for user ${username}`);
    return { success: true, message: "Magic link sent successfully!" };
  },

  signIn: async (emailOrUsername: string) => {
    console.log(`Mock: Sending magic link to ${emailOrUsername}`);
    return { success: true, message: "Magic link sent successfully!" };
  },

  // Wallet operations
  connectWallet: async (walletType: 'metamask' | 'walletconnect') => {
    console.log(`Mock: Connecting ${walletType} wallet`);
    // Simulate wallet connection
    const mockAddress = "0x742d35Cc6636C0532925aBc6Bc1234567890abcd";
    return { success: true, address: mockAddress };
  },

  // Asset operations
  buyAsset: async (assetId: string, buyerType: 'individual' | 'dao', groupId?: string) => {
    console.log(`Mock: Buying asset ${assetId} as ${buyerType}`, groupId ? `through DAO ${groupId}` : '');
    return { success: true, transactionHash: "0x1234567890abcdef..." };
  },

  createAsset: async (assetData: Partial<Asset>) => {
    console.log('Mock: Creating new asset', assetData);
    return { success: true, assetId: `asset-${Date.now()}` };
  },

  // Bid operations
  placeBid: async (bidId: string, amount: number, bidderType: 'individual' | 'dao', groupId?: string) => {
    console.log(`Mock: Placing bid of ${amount} on ${bidId} as ${bidderType}`, groupId ? `through DAO ${groupId}` : '');
    return { success: true, transactionHash: "0x1234567890abcdef..." };
  },

  createBid: async (bidData: Partial<Bid>) => {
    console.log('Mock: Creating new bid', bidData);
    return { success: true, bidId: `bid-${Date.now()}` };
  },

  // Campaign operations
  fundCampaign: async (campaignId: string, amount: number, funderType: 'individual' | 'dao', groupId?: string) => {
    console.log(`Mock: Funding campaign ${campaignId} with ${amount} as ${funderType}`, groupId ? `through DAO ${groupId}` : '');
    return { success: true, transactionHash: "0x1234567890abcdef..." };
  },

  createCampaign: async (campaignData: Partial<Campaign>) => {
    console.log('Mock: Creating new campaign', campaignData);
    return { success: true, campaignId: `campaign-${Date.now()}` };
  },

  // DAO operations
  joinDAO: async (daoId: string, userId: string) => {
    console.log(`Mock: User ${userId} joining DAO ${daoId}`);
    return { success: true };
  },

  createDAO: async (daoData: Partial<DAO>) => {
    console.log('Mock: Creating new DAO', daoData);
    return { success: true, daoId: `dao-${Date.now()}` };
  },

  // Proposal operations
  createProposal: async (proposalData: Partial<Proposal>) => {
    console.log('Mock: Creating new proposal', proposalData);
    return { success: true, proposalId: `proposal-${Date.now()}` };
  },

  voteOnProposal: async (proposalId: string, vote: 'for' | 'against' | 'abstain', voterId: string) => {
    console.log(`Mock: User ${voterId} voting ${vote} on proposal ${proposalId}`);
    return { success: true };
  },

  executeProposal: async (proposalId: string) => {
    console.log(`Mock: Executing proposal ${proposalId}`);
    return { success: true, transactionHash: "0x1234567890abcdef..." };
  }
};

// Contract addresses (mock)
export const mockContracts = {
  CHAIN_ID: 1, // Ethereum Mainnet
  DAO_FACTORY: "0x1234567890abcdef1234567890abcdef12345678",
  ASSET_REGISTRY: "0x234567890abcdef1234567890abcdef123456789",
  CAMPAIGN_MANAGER: "0x34567890abcdef1234567890abcdef1234567890",
  BID_MANAGER: "0x4567890abcdef1234567890abcdef12345678901",
  TREASURY: "0x567890abcdef1234567890abcdef123456789012"
};

// Social links
export const socialLinks = {
  github: "https://github.com/chainfund",
  twitter: "https://twitter.com/chainfund",
  linkedin: "https://linkedin.com/company/chainfund",
  email: "contact@chainfund.io",
  discord: "https://discord.gg/chainfund",
  telegram: "https://t.me/chainfund"
};