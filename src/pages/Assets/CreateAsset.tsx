import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CreateAsset = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle asset creation logic here
    console.log("Asset creation form submitted!");
    alert("Asset creation form submitted! (Check console for details)");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl crypto-card">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Create New Asset</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="assetName">Asset Name</Label>
              <Input id="assetName" placeholder="e.g., Digital Art Piece" required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your asset" rows={4} required />
            </div>
            <div>
              <Label htmlFor="price">Price (ETH)</Label>
              <Input id="price" type="number" step="0.01" placeholder="e.g., 0.5" required />
            </div>
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" type="url" placeholder="e.g., https://example.com/image.jpg" />
            </div>
            <Button type="submit" className="w-full">Create Asset</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAsset;
