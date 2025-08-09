import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";

export default function ProposalDetail() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Proposal Detail</h1>
        <p className="text-muted-foreground">Proposal detail page coming soon...</p>
      </div>
      <Footer />
    </div>
  );
}