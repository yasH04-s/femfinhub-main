
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlarmClock, Shield, Landmark, DollarSign, PiggyBank, ExternalLink, HelpCircle, AlertTriangle } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const Emergency = () => {
  const [emergencyFund, setEmergencyFund] = useState({
    current: 4500,
    target: 10000,
    monthlyContribution: 300,
  });

  // Calculate emergency fund progress percentage
  const fundProgress = Math.min(100, Math.round((emergencyFund.current / emergencyFund.target) * 100));
  
  // Calculate months remaining to reach target
  const remainingAmount = emergencyFund.target - emergencyFund.current;
  const monthsRemaining = Math.ceil(remainingAmount / emergencyFund.monthlyContribution);

  const resources = [
    {
      title: "Women's Financial Crisis Hotline",
      description: "24/7 support for women facing financial emergencies",
      phone: "1-800-555-HELP",
      website: "#",
      category: "Support"
    },
    {
      title: "Emergency Fund Planning Guide",
      description: "Learn how to build and manage your emergency fund",
      website: "#",
      category: "Education"
    },
    {
      title: "Financial Hardship Relief Programs",
      description: "Government and nonprofit assistance programs",
      website: "#",
      category: "Assistance"
    },
  ];

  const emergencyPlans = [
    {
      title: "Job Loss Plan",
      description: "Steps to take if you lose your job unexpectedly",
      status: "Complete",
      lastUpdated: "2023-09-15"
    },
    {
      title: "Medical Emergency Plan",
      description: "Insurance details and financial steps for medical emergencies",
      status: "In Progress",
      lastUpdated: "2023-10-01"
    },
    {
      title: "Housing Emergency Plan",
      description: "What to do if you face housing insecurity",
      status: "Not Started",
      lastUpdated: null
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Emergency Planning</h1>
        <p className="text-muted-foreground">Prepare for financial emergencies with proactive planning and resources.</p>
      </div>

      <Tabs defaultValue="fund" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="fund">
            <PiggyBank className="mr-2 h-4 w-4" />
            Emergency Fund
          </TabsTrigger>
          <TabsTrigger value="plans">
            <Shield className="mr-2 h-4 w-4" />
            Emergency Plans
          </TabsTrigger>
          <TabsTrigger value="resources">
            <HelpCircle className="mr-2 h-4 w-4" />
            Resources
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="fund">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Emergency Fund Progress</CardTitle>
                <CardDescription>Track your emergency savings against your target</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Current: ${emergencyFund.current.toLocaleString()}</span>
                    <span className="text-sm font-medium">Target: ${emergencyFund.target.toLocaleString()}</span>
                  </div>
                  <Progress value={fundProgress} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {fundProgress < 100 
                      ? `${monthsRemaining} months until fully funded at current contribution rate`
                      : "Your emergency fund is fully funded! 🎉"}
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <AlarmClock className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Emergency Fund Coverage</h3>
                  </div>
                  <p className="text-sm mb-2">
                    Your emergency fund currently covers approximately <strong>{Math.floor(emergencyFund.current / 1500)} months</strong> of essential expenses.
                  </p>
                  <div className="flex items-center text-sm">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="link" className="p-0 h-auto text-xs">How is this calculated?</Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <p className="text-sm">
                          This estimate is based on your average monthly essential expenses of approximately $1,500, 
                          which includes housing, food, utilities, and other necessities.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <div>
                    <Label htmlFor="current-amount">Current Amount ($)</Label>
                    <Input 
                      id="current-amount" 
                      type="number" 
                      value={emergencyFund.current}
                      onChange={(e) => setEmergencyFund({...emergencyFund, current: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="target-amount">Target Amount ($)</Label>
                    <Input 
                      id="target-amount" 
                      type="number" 
                      value={emergencyFund.target}
                      onChange={(e) => setEmergencyFund({...emergencyFund, target: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <Label htmlFor="monthly-contribution">Monthly Contribution ($)</Label>
                  <Input 
                    id="monthly-contribution" 
                    type="number" 
                    value={emergencyFund.monthlyContribution}
                    onChange={(e) => setEmergencyFund({...emergencyFund, monthlyContribution: Number(e.target.value)})}
                  />
                </div>
                <Button className="w-full">Update Emergency Fund</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Access</CardTitle>
                <CardDescription>Essential resources for emergencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Landmark className="mr-2 h-4 w-4" />
                  Banking Access
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Loan Options
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Insurance Details
                </Button>
                <div className="pt-4 mt-4 border-t">
                  <p className="text-sm font-medium mb-2">Emergency Contacts</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Financial Advisor</span>
                      <span>555-123-4567</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insurance Agent</span>
                      <span>555-987-6543</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="plans">
          <div className="grid grid-cols-1 gap-6">
            {emergencyPlans.map((plan, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{plan.title}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </div>
                    <Badge variant={
                      plan.status === "Complete" ? "default" : 
                      plan.status === "In Progress" ? "secondary" : 
                      "outline"
                    }>
                      {plan.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {plan.status === "Complete" && (
                    <div className="text-sm text-muted-foreground">
                      Last updated: {new Date(plan.lastUpdated!).toLocaleDateString()}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View Details</Button>
                  {plan.status !== "Complete" && <Button>Complete Plan</Button>}
                  {plan.status === "Complete" && <Button>Update Plan</Button>}
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>Create New Emergency Plan</CardTitle>
                <CardDescription>
                  Prepare for specific scenarios with custom emergency plans
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Create New Plan
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{resource.title}</CardTitle>
                    <Badge variant="outline">{resource.category}</Badge>
                  </div>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {resource.phone && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Phone:</span>
                      <span>{resource.phone}</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <a href={resource.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Emergency Financial Checklist</CardTitle>
                <CardDescription>
                  Essential steps to prepare for financial emergencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="h-6 w-6 flex-shrink-0 rounded-full border flex items-center justify-center">
                      <span className="text-xs">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Build an Emergency Fund</p>
                      <p className="text-sm text-muted-foreground">
                        Aim for 3-6 months of essential expenses in a liquid, easily accessible account.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="h-6 w-6 flex-shrink-0 rounded-full border flex items-center justify-center">
                      <span className="text-xs">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Review Insurance Coverage</p>
                      <p className="text-sm text-muted-foreground">
                        Ensure adequate health, home/rental, auto, and disability insurance.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="h-6 w-6 flex-shrink-0 rounded-full border flex items-center justify-center">
                      <span className="text-xs">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Organize Important Documents</p>
                      <p className="text-sm text-muted-foreground">
                        Store copies of important financial and legal documents in a secure, accessible location.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Download Complete Checklist
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Emergency;
