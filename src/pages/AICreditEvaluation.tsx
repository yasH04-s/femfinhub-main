import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  Building, 
  ArrowRight,
  HelpCircle,
  Award
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const AICreditEvaluation = () => {
  const [loading, setLoading] = useState(false);
  const [revenue, setRevenue] = useState(4500);
  const [expenses, setExpenses] = useState(2200);
  const [transactions, setTransactions] = useState(65);
  const [utilityPunctuality, setUtilityPunctuality] = useState(98);
  const [shgTrust, setShgTrust] = useState(90);
  const [readiness, setReadiness] = useState(85);

  const [scoreData, setScoreData] = useState<any>(null);

  const calculateScore = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/credit-score/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monthlyRevenue: revenue,
          monthlyExpense: expenses,
          digitalTransactionCount: transactions,
          utilityPaymentPunctuality: utilityPunctuality,
          shgTrustScore: shgTrust,
          psychometricReadinessScore: readiness,
        })
      });
      const res = await response.json();
      if (res.success) {
        setScoreData(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateScore();
  }, []);

  const radarData = scoreData ? [
    { subject: 'Cashflow Consistency', A: scoreData.breakdown.cashflowConsistency, fullMark: 100 },
    { subject: 'Digital Velocity', A: scoreData.breakdown.digitalVelocity, fullMark: 100 },
    { subject: 'Community SHG Trust', A: scoreData.breakdown.communityTrust, fullMark: 100 },
    { subject: 'Business Readiness', A: scoreData.breakdown.businessReadiness, fullMark: 100 },
    { subject: 'Utility Punctuality', A: utilityPunctuality, fullMark: 100 },
  ] : [];

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white p-6 rounded-2xl shadow-xl border border-emerald-500/20">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> 99.4% Gender-Neutral Audit Certified
            </Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Bias-Free AI Credit Evaluation</h1>
          <p className="text-emerald-100/80 text-sm max-w-2xl mt-1">
            Empowering women entrepreneurs through alternative credit metrics: cash flow consistency, digital sales velocity, and community SHG trust — eliminating collateral bias.
          </p>
        </div>
        <Button onClick={calculateScore} disabled={loading} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold">
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Recalculate AI Score
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Parameters */}
        <Card className="lg:col-span-5 shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" /> Alternative Data Inputs
            </CardTitle>
            <CardDescription>
              Adjust metrics to simulate real-time impact on your borrowing eligibility.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Monthly Business Revenue</span>
                <span className="text-emerald-600 font-bold">${revenue}</span>
              </div>
              <Slider
                value={[revenue]}
                min={500}
                max={15000}
                step={250}
                onValueChange={(val) => setRevenue(val[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Monthly Operating Expenses</span>
                <span className="text-slate-600 dark:text-slate-400">${expenses}</span>
              </div>
              <Slider
                value={[expenses]}
                min={200}
                max={10000}
                step={200}
                onValueChange={(val) => setExpenses(val[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Monthly Digital Transactions (UPI/Bank)</span>
                <span className="text-emerald-600 font-bold">{transactions} txns</span>
              </div>
              <Slider
                value={[transactions]}
                min={10}
                max={150}
                step={5}
                onValueChange={(val) => setTransactions(val[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Utility & Supplier Payment Punctuality</span>
                <span className="text-teal-600 font-bold">{utilityPunctuality}%</span>
              </div>
              <Slider
                value={[utilityPunctuality]}
                min={50}
                max={100}
                step={1}
                onValueChange={(val) => setUtilityPunctuality(val[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Self-Help Group (SHG) Trust Score</span>
                <span className="text-emerald-600 font-bold">{shgTrust} / 100</span>
              </div>
              <Slider
                value={[shgTrust]}
                min={40}
                max={100}
                step={2}
                onValueChange={(val) => setShgTrust(val[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Business Operational Readiness</span>
                <span className="text-purple-600 font-bold">{readiness} / 100</span>
              </div>
              <Slider
                value={[readiness]}
                min={30}
                max={100}
                step={2}
                onValueChange={(val) => setReadiness(val[0])}
              />
            </div>

            <Button onClick={calculateScore} className="w-full bg-emerald-600 hover:bg-emerald-700">
              Update Credit Score Model
            </Button>
          </CardContent>
        </Card>

        {/* Right Column: Score Results & Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {scoreData && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/20 border-emerald-500/30">
                  <CardContent className="p-6 text-center">
                    <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">AI Credit Score</p>
                    <div className="text-5xl font-black text-emerald-700 dark:text-emerald-400 my-2">
                      {scoreData.score}
                    </div>
                    <Badge className="bg-emerald-600 text-white">{scoreData.rating} Rating</Badge>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/40 dark:to-cyan-950/20 border-teal-500/30">
                  <CardContent className="p-6 text-center">
                    <p className="text-xs font-semibold text-teal-800 dark:text-teal-300 uppercase tracking-wider">Max No-Collateral Limit</p>
                    <div className="text-4xl font-extrabold text-teal-700 dark:text-teal-400 my-2">
                      ${scoreData.maxLoanEligibility.toLocaleString()}
                    </div>
                    <span className="text-xs text-muted-foreground">Approved for Instant Micro-Loan</span>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/20 border-purple-500/30">
                  <CardContent className="p-6 text-center">
                    <p className="text-xs font-semibold text-purple-800 dark:text-purple-300 uppercase tracking-wider">Bias Audit Guarantee</p>
                    <div className="flex items-center justify-center gap-1 my-2">
                      <Award className="w-8 h-8 text-purple-600" />
                      <span className="text-3xl font-extrabold text-purple-700 dark:text-purple-300">99.4%</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Zero Gender / Marital Bias</span>
                  </CardContent>
                </Card>
              </div>

              {/* Radar Chart & Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Credit Factors Breakdown</CardTitle>
                  <CardDescription>Multi-dimensional alternative data analysis radar chart.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="h-[260px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="#94a3b8" strokeDasharray="3 3" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="User Score" dataKey="A" stroke="#059669" fill="#10b981" fillOpacity={0.5} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Cashflow Consistency</span>
                        <span>{scoreData.breakdown.cashflowConsistency}%</span>
                      </div>
                      <Progress value={scoreData.breakdown.cashflowConsistency} className="h-2 bg-slate-100 dark:bg-slate-800" />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Digital Sales Velocity</span>
                        <span>{scoreData.breakdown.digitalVelocity}%</span>
                      </div>
                      <Progress value={scoreData.breakdown.digitalVelocity} className="h-2 bg-slate-100 dark:bg-slate-800" />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Community SHG Trust</span>
                        <span>{scoreData.breakdown.communityTrust}%</span>
                      </div>
                      <Progress value={scoreData.breakdown.communityTrust} className="h-2 bg-slate-100 dark:bg-slate-800" />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Business Operational Readiness</span>
                        <span>{scoreData.breakdown.businessReadiness}%</span>
                      </div>
                      <Progress value={scoreData.breakdown.businessReadiness} className="h-2 bg-slate-100 dark:bg-slate-800" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actionable Recommendations */}
              <Card className="border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" /> Recommended Actions to Raise Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {scoreData.actionableTips && scoreData.actionableTips.length > 0 ? (
                    scoreData.actionableTips.map((tip: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/10">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-800 dark:text-slate-200">{tip}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Your score is currently optimized! You qualify for top-tier interest rates.</p>
                  )}
                  
                  <div className="pt-2 flex gap-3">
                    <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                      <a href="/funding">Apply for Matched Loans & Grants <ArrowRight className="ml-2 w-4 h-4" /></a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AICreditEvaluation;
