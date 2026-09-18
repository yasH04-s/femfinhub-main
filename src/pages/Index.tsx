import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Landmark, 
  Lock, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Award,
  CheckCircle2,
  Building2,
  HeartHandshake
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-28 bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 text-white">
        {/* Glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl text-center space-y-6">
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-xs px-3 py-1">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Empowering 14,200+ Women Business Owners
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            Bias-Free Capital & Financial Inclusion for Women Entrepreneurs
          </h1>
          
          <p className="max-w-2xl mx-auto text-emerald-100/80 text-base md:text-xl">
            FemFinHub replaces biased male-cosigner requirements with transparent AI cashflow evaluation, blockchain loan tracking, and direct government scheme access.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 shadow-lg shadow-emerald-500/20">
              <Link to="/credit-evaluation">
                Calculate AI Credit Score <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-emerald-500/40 text-emerald-200 hover:bg-emerald-500/10 font-semibold">
              <Link to="/funding">Explore Govt Schemes</Link>
            </Button>
          </div>

          {/* Key Impact Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 border-t border-emerald-500/20 text-center">
            <div>
              <div className="text-2xl md:text-4xl font-extrabold text-emerald-400">$2.45M+</div>
              <div className="text-xs text-emerald-200/70 uppercase font-medium">Loans Facilitated</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-extrabold text-emerald-400">99.4%</div>
              <div className="text-xs text-emerald-200/70 uppercase font-medium">Bias Reduction Rate</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-extrabold text-emerald-400">1,420+</div>
              <div className="text-xs text-emerald-200/70 uppercase font-medium">Blockchain Audit Logs</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-extrabold text-emerald-400">98.8%</div>
              <div className="text-xs text-emerald-200/70 uppercase font-medium">On-Time Repayment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Platform Features */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Built Specifically for Female Business Leaders</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              From micro-enterprises to high-growth tech startups, FemFinHub provides end-to-end financial inclusion tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
              <CardContent className="pt-6 space-y-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl w-fit">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Bias-Free AI Credit Engine</h3>
                <p className="text-sm text-muted-foreground">
                  Evaluates creditworthiness using UPI sales velocity, utility payment history, and Self-Help Group (SHG) trust ratings instead of traditional collateral.
                </p>
                <Link to="/credit-evaluation" className="text-xs font-bold text-emerald-600 hover:underline inline-flex items-center">
                  Try AI Credit Simulator <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
              <CardContent className="pt-6 space-y-4">
                <div className="p-3 bg-teal-500/10 text-teal-600 rounded-xl w-fit">
                  <Landmark className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Scheme Aggregator & Grants</h3>
                <p className="text-sm text-muted-foreground">
                  Direct access to Mudra Tarun/Kishore loans, Stand-Up India subsidies, Annapurna food catering grants, and peer crowdfunding.
                </p>
                <Link to="/funding" className="text-xs font-bold text-teal-600 hover:underline inline-flex items-center">
                  Browse Government Schemes <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
              <CardContent className="pt-6 space-y-4">
                <div className="p-3 bg-purple-500/10 text-purple-600 rounded-xl w-fit">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Blockchain Loan Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  Immutable milestone release logs recorded on Polygon smart contracts — ensuring zero hidden cuts, speed, and complete audit visibility.
                </p>
                <Link to="/loan-transparency" className="text-xs font-bold text-purple-600 hover:underline inline-flex items-center">
                  Inspect On-Chain Ledger <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
              <CardContent className="pt-6 space-y-4">
                <div className="p-3 bg-green-500/10 text-green-600 rounded-xl w-fit">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">WhatsApp Cloud API Assistant</h3>
                <p className="text-sm text-muted-foreground">
                  Instant balance updates, loan status alerts, and financial literacy prompts delivered straight to women via WhatsApp Cloud API.
                </p>
                <Link to="/chatbot" className="text-xs font-bold text-green-600 hover:underline inline-flex items-center">
                  Chat with WhatsApp Bot <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
              <CardContent className="pt-6 space-y-4">
                <div className="p-3 bg-indigo-500/10 text-indigo-600 rounded-xl w-fit">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">1-on-1 Female Mentorship</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with venture investors, CFOs, and successful women business owners for 1-on-1 strategy sessions and grant paper review.
                </p>
                <Link to="/learning" className="text-xs font-bold text-indigo-600 hover:underline inline-flex items-center">
                  Book Female Advisor <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
              <CardContent className="pt-6 space-y-4">
                <div className="p-3 bg-pink-500/10 text-pink-600 rounded-xl w-fit">
                  <HeartHandshake className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Peer Micro-Lending Circles</h3>
                <p className="text-sm text-muted-foreground">
                  Join community revolving funds, upvote forum advice, and pool working capital for festive inventory orders.
                </p>
                <Link to="/community" className="text-xs font-bold text-pink-600 hover:underline inline-flex items-center">
                  Join Community Forum <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Founder Testimonials */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-center mb-12">Empowerment Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground italic">
                  "Traditional banks demanded a male guarantor for my handloom workshop. FemFinHub evaluated my UPI sales velocity and approved our $5,000 Mudra loan in 3 days!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    PS
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Priya Sharma</h4>
                    <p className="text-xs text-muted-foreground">Founder, EcoThread Crafts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground italic">
                  "The blockchain transparency ledger gave our SHG 100% confidence. Every dollar of our grant disbursement was verified on Polygon with zero middleman cuts."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
                    AD
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Anita Desai</h4>
                    <p className="text-xs text-muted-foreground">Lead, AgriPure Co-op</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground italic">
                  "Booking a 1-on-1 advisor through the Mentorship Hub helped me structure our Stand-Up India 25% margin money application. Truly transformative!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                    SR
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Sunita Rao</h4>
                    <p className="text-xs text-muted-foreground">Co-Founder, Spices Direct</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-900 to-teal-900 text-white text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-4">
          <h2 className="text-3xl font-extrabold">Start Your Financial Empowerment Journey Today</h2>
          <p className="text-emerald-100/80 text-sm md:text-base">
            No collateral constraints. No gender bias. Get instant access to bias-free credit scoring, government loans, and mentorship.
          </p>
          <div className="pt-2">
            <Button asChild size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-8">
              <Link to="/signup">Register Free Profile <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 FemFinHub. AI & Blockchain Financial Inclusion for Women. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-slate-200">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-200">Terms of Service</Link>
            <Link to="/help" className="hover:text-slate-200">Help & Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
