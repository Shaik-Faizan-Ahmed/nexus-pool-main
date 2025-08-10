import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CreateCampaign = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle campaign creation logic here
    console.log("Campaign creation form submitted!");
    alert("Campaign creation form submitted! (Check console for details)");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl crypto-card">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Create New Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="campaignName">Campaign Title</Label>
              <Input id="campaignName" placeholder="e.g., Fund a Green Energy Project" required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your campaign goals" rows={4} required />
            </div>
            <div>
              <Label htmlFor="goalAmount">Goal Amount (ETH)</Label>
              <Input id="goalAmount" type="number" step="0.01" placeholder="e.g., 100" required />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" required />
            </div>
            <Button type="submit" className="w-full">Create Campaign</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCampaign;
