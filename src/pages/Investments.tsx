
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ArrowUp, ArrowDown, DollarSign, TrendingUp, PiggyBank, Briefcase } from 'lucide-react';

const Investments = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample data for portfolio performance chart
  const performanceData = [
    { month: 'Jan', value: 5000 },
    { month: 'Feb', value: 5200 },
    { month: 'Mar', value: 5150 },
    { month: 'Apr', value: 5400 },
    { month: 'May', value: 5800 },
    { month: 'Jun', value: 6100 },
    { month: 'Jul', value: 6050 },
    { month: 'Aug', value: 6300 },
    { month: 'Sep', value: 6500 },
    { month: 'Oct', value: 6800 },
    { month: 'Nov', value: 7200 },
    { month: 'Dec', value: 7500 },
  ];

  // Sample data for asset allocation
  const allocationData = [
    { name: 'Stocks', value: 55, color: '#8884d8' },
    { name: 'Bonds', value: 20, color: '#82ca9d' },
    { name: 'Real Estate', value: 15, color: '#ffc658' },
    { name: 'Cash', value: 10, color: '#ff8042' },
  ];

  // Sample holdings data
  const holdingsData = [
    { id: 1, name: 'VTI - Vanguard Total Stock Market ETF', shares: 25, price: 230.45, value: 5761.25, change: 2.3 },
    { id: 2, name: 'VXUS - Vanguard Total International Stock ETF', shares: 30, price: 58.70, value: 1761.00, change: -0.7 },
    { id: 3, name: 'BND - Vanguard Total Bond Market ETF', shares: 20, price: 75.30, value: 1506.00, change: 0.2 },
    { id: 4, name: 'VNQ - Vanguard Real Estate ETF', shares: 12, price: 85.40, value: 1024.80, change: 1.5 },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Investments</h1>
        <p className="text-muted-foreground">Track and manage your investment portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Portfolio Value</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <DollarSign className="h-5 w-5 mr-1 text-muted-foreground" />
              10,053.05
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <ArrowUp className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-green-500 font-medium mr-1">+3.2%</span>
              <span className="text-muted-foreground">this month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Realized Returns</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <DollarSign className="h-5 w-5 mr-1 text-muted-foreground" />
              1,253.45
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <ArrowUp className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-green-500 font-medium mr-1">+12.5%</span>
              <span className="text-muted-foreground">all time</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly Contributions</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <DollarSign className="h-5 w-5 mr-1 text-muted-foreground" />
              250.00
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-4 w-4 mr-1 text-primary" />
              <span className="text-muted-foreground">Auto-invest active</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Your investment growth over the past 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => ['$' + value, 'Value']} />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="holdings">
          <Card>
            <CardHeader>
              <CardTitle>Your Holdings</CardTitle>
              <CardDescription>Individual investments in your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Investment</th>
                      <th className="text-right p-2">Shares</th>
                      <th className="text-right p-2">Price</th>
                      <th className="text-right p-2">Value</th>
                      <th className="text-right p-2">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdingsData.map((holding) => (
                      <tr key={holding.id} className="border-b hover:bg-muted/50">
                        <td className="p-2 text-left">{holding.name}</td>
                        <td className="p-2 text-right">{holding.shares}</td>
                        <td className="p-2 text-right">${holding.price.toFixed(2)}</td>
                        <td className="p-2 text-right">${holding.value.toFixed(2)}</td>
                        <td className={`p-2 text-right ${holding.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {holding.change >= 0 ? '+' : ''}{holding.change}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="allocation">
          <Card>
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
              <CardDescription>Distribution of your investments across asset classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Investment Ideas</CardTitle>
              <CardDescription>Personalized suggestions for your portfolio</CardDescription>
            </div>
            <Briefcase className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="font-medium mb-1">Diversify with International Stocks</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Adding more international exposure could help balance your portfolio.
                </p>
                <Button size="sm" variant="outline">Explore Options</Button>
              </div>
              <div>
                <p className="font-medium mb-1">Consider ESG Investments</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Sustainable investing aligns with your profile preferences.
                </p>
                <Button size="sm" variant="outline">Learn More</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Goals Progress</CardTitle>
              <CardDescription>Track your investment goals</CardDescription>
            </div>
            <PiggyBank className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Emergency Fund</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Home Down Payment</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Retirement</span>
                  <span className="text-sm text-muted-foreground">32%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Investments;
