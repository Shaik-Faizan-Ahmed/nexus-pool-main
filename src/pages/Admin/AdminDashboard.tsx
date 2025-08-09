import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Admin dashboard coming soon...</p>
      </div>
      <Footer />
    </div>
  );
}