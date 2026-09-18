import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Landmark, 
  Sparkles, 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  HeartHandshake, 
  DollarSign, 
  ShieldAlert, 
  FileText,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

const Funding = () => {
  const { toast } = useToast();
  const [schemes, setSchemes] = useState<any[]>([]);
  const [crowdCampaigns, setCrowdCampaigns] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  const [pledgeAmount, setPledgeAmount] = useState('50');

  useEffect(() => {
    fetchSchemes();
    fetchCrowdfunding();
  }, [selectedCategory]);

  const fetchSchemes = async () => {
    try {
      const url = selectedCategory !== 'All' ? `/api/funding/schemes?category=${selectedCategory}` : '/api/funding/schemes';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setSchemes(data.schemes);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCrowdfunding = async () => {
    try {
      const res = await fetch('/api/funding/crowdfunding');
      const data = await res.json();
      if (data.success) {
        setCrowdCampaigns(data.campaigns);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleApplyScheme = async (scheme: any) => {
    try {
      const res = await fetch('/api/funding/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schemeId: scheme.id,
          applicantName: 'Priya Sharma',
          businessType: 'Retail Crafts'
        })
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: "Application Submitted! 🚀",
          description: `Application ID: ${data.applicationId}. Estimated processing: 3 business days.`,
        });
        setSelectedScheme(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePledge = async (campaignId: string) => {
    try {
      const res = await fetch('/api/funding/crowdfunding/pledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          amount: Number(pledgeAmount),
          backerName: 'Priya S.'
        })
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: "Contribution Successful! ❤️",
          description: data.message,
        });
        fetchCrowdfunding();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredSchemes = schemes.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.targetSector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-900 text-white p-6 md:p-8 rounded-2xl shadow-xl">
        <div className="max-w-3xl space-y-3">
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
            <Landmark className="w-3.5 h-3.5 mr-1" /> Verified Government & Private Connector
          </Badge>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Funding Recommendation & Scheme Aggregator
          </h1>
          <p className="text-emerald-100/80 text-sm md:text-base">
            Discover matched zero-collateral microloans, government grants, and peer crowdfunding tailored specifically for female business owners.
          </p>
        </div>
      </div>

      <Tabs defaultValue="schemes" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <TabsList className="bg-slate-100 dark:bg-slate-800 p-1">
            <TabsTrigger value="schemes" className="flex items-center gap-2">
              <Landmark className="w-4 h-4" /> Government & Institutional Schemes
            </TabsTrigger>
            <TabsTrigger value="crowd" className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4" /> Peer Crowdfunding & Micro-Pledges
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schemes or sectors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        {/* Tab 1: Schemes */}
        <TabsContent value="schemes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSchemes.map((scheme) => (
              <Card key={scheme.id} className="hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <CardHeader>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-500/30">
                      {scheme.category}
                    </Badge>
                    <Badge className="bg-emerald-600 text-white font-bold">
                      {scheme.eligibilityMatch}% Match
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold">{scheme.title}</CardTitle>
                  <CardDescription className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Provider: {scheme.provider}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <p className="text-muted-foreground">{scheme.description}</p>

                  <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs">
                    <div>
                      <span className="text-muted-foreground block">Max Funding</span>
                      <span className="font-bold text-base text-emerald-700 dark:text-emerald-400">{scheme.maxAmount}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Interest / Subsidy</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{scheme.interestRate}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Collateral Required</span>
                      <span className="font-semibold text-emerald-600">No Collateral</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Target Sector</span>
                      <span className="font-medium truncate block">{scheme.targetSector}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-1/2" onClick={() => setSelectedScheme(scheme)}>
                        <FileText className="w-4 h-4 mr-2" /> Requirements
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>{scheme.title}</DialogTitle>
                        <DialogDescription>{scheme.provider}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-2 text-sm">
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-500/20">
                          <p className="font-bold text-emerald-800 dark:text-emerald-300">Special Benefit:</p>
                          <p className="text-xs">{scheme.subsidyPercentage}</p>
                        </div>
                        <div>
                          <p className="font-semibold mb-2">Required Documents:</p>
                          <ul className="space-y-1">
                            {scheme.documentsNeeded?.map((doc: string, idx: number) => (
                              <li key={idx} className="flex items-center text-xs text-muted-foreground">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2" /> {doc}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => handleApplyScheme(scheme)}>
                          Instant Direct Application
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button className="w-1/2 bg-emerald-600 hover:bg-emerald-700" onClick={() => handleApplyScheme(scheme)}>
                    Apply Now <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 2: Crowdfunding */}
        <TabsContent value="crowd" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {crowdCampaigns.map((camp) => {
              const pct = Math.min(100, Math.round((camp.raisedAmount / camp.goalAmount) * 100));
              return (
                <Card key={camp.id} className="overflow-hidden border-slate-200 dark:border-slate-800">
                  <div className="h-48 w-full overflow-hidden relative">
                    <img src={camp.imageUrl} alt={camp.businessTitle} className="w-full h-full object-cover" />
                    <Badge className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white">
                      {camp.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">{camp.businessTitle}</CardTitle>
                    <CardDescription>By {camp.founderName} • {camp.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <p className="text-muted-foreground text-xs line-clamp-3">{camp.story}</p>
                    
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-emerald-600 font-bold">${camp.raisedAmount.toLocaleString()} raised</span>
                        <span className="text-muted-foreground">${camp.goalAmount.toLocaleString()} goal ({pct}%)</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>

                    <div className="flex justify-between text-xs text-muted-foreground pt-1">
                      <span>👥 {camp.backersCount} Backers</span>
                      <span>⏳ {camp.daysLeft} Days Left</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex gap-2">
                    <Input
                      type="number"
                      value={pledgeAmount}
                      onChange={(e) => setPledgeAmount(e.target.value)}
                      className="w-28 text-xs"
                      placeholder="$ Amount"
                    />
                    <Button onClick={() => handlePledge(camp.id)} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                      <HeartHandshake className="w-4 h-4 mr-2" /> Support Campaign
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Funding;
