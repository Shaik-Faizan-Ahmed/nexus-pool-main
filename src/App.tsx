import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth Pages
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ConnectWallet from "./pages/Auth/ConnectWallet";

// Main App Pages  
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Assets from "./pages/Assets/Assets";
import AssetDetail from "./pages/Assets/AssetDetail";
import CreateAsset from "./pages/Assets/CreateAsset";
import Bids from "./pages/Bids/Bids";
import BidDetail from "./pages/Bids/BidDetail";
import Campaigns from "./pages/Campaigns/Campaigns";
import CampaignDetail from "./pages/Campaigns/CampaignDetail";
import CreateCampaign from "./pages/Campaigns/CreateCampaign";
import Groups from "./pages/Groups/Groups";
import GroupDetail from "./pages/Groups/GroupDetail";
import Proposals from "./pages/Groups/Proposals";
import ProposalDetail from "./pages/Groups/ProposalDetail";

// Admin
import AdminDashboard from "./pages/Admin/AdminDashboard";

// Static Pages
import About from "./pages/Static/About";
import Blog from "./pages/Static/Blog";
import Contact from "./pages/Static/Contact";
import Help from "./pages/Static/Help";
import Docs from "./pages/Docs/Docs";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<Index />} />
            
            {/* Auth Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/connect-wallet" element={<ConnectWallet />} />
            
            {/* Dashboard */}
            <Route path="/u/:username" element={<Dashboard />} />
            {/* Profile */}
            <Route path="/profile" element={<Profile />} />
            
            {/* Assets */}
            <Route path="/assets" element={<Assets />} />
            <Route path="/assets/:id" element={<AssetDetail />} />
            <Route path="/assets/create" element={<CreateAsset />} />
            
            {/* Bids */}
            <Route path="/bids" element={<Bids />} />
            <Route path="/bids/:id" element={<BidDetail />} />
            
            {/* Campaigns */}
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaigns/:id" element={<CampaignDetail />} />
            <Route path="/campaigns/create" element={<CreateCampaign />} />
            
            {/* Groups/DAOs */}
            <Route path="/groups" element={<Groups />} />
            <Route path="/groups/:id" element={<GroupDetail />} />
            <Route path="/groups/:groupId/proposals" element={<Proposals />} />
            <Route path="/groups/:groupId/proposals/:proposalId" element={<ProposalDetail />} />
            
            {/* Admin */}
            <Route path="/nimda" element={<AdminDashboard />} />
            
            {/* Static Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/docs/*" element={<Docs />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
