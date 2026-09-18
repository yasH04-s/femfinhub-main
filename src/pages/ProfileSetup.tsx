import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Building2, Sparkles, ShieldCheck, ArrowRight, Upload, CheckCircle2 } from 'lucide-react';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'Retail & Handloom',
    location: 'Jaipur, Rajasthan',
    yearsInBusiness: '2',
    monthlyRevenue: '3500',
    monthlyExpenses: '1800',
    digitalTransactionsMonthly: '55',
    shgMember: true,
    shgGroupName: 'Kochi Mahila Craft Circle',
    loanPurpose: 'Inventory expansion for festive order',
    agreeBiasFreeTerms: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Setup Completed! 🎉",
      description: "Your business profile has been initialized with bias-free AI audit checks.",
    });
    navigate('/credit-evaluation');
  };

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Step {step} of 2 • Smart Business Onboarding
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight">Complete Your FemFin Profile</h1>
        <p className="text-muted-foreground mt-2">
          Help our bias-free AI understand your business cashflow and community reputation to unlock tailored funding.
        </p>
      </div>

      <Card className="shadow-lg border-emerald-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Building2 className="h-5 w-5 text-emerald-600" />
            {step === 1 ? 'Business & Operations Overview' : 'Financial Velocity & Community Credentials'}
          </CardTitle>
          <CardDescription>
            {step === 1 ? 'Enter basic business details and sector specialization.' : 'No collateral required. We evaluate cashflow consistency and peer trust.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business / SHG Name</Label>
                    <Input
                      id="businessName"
                      placeholder="e.g. EcoThread Handlooms"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Sector</Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(val) => setFormData({ ...formData, businessType: val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Retail & Handloom">Retail, Crafts & Handloom</SelectItem>
                        <SelectItem value="Food Processing & Catering">Food Processing & Catering</SelectItem>
                        <SelectItem value="AgriTech & Farming">AgriTech & Farming Co-op</SelectItem>
                        <SelectItem value="Tech & Digital Services">Tech & Digital Services</SelectItem>
                        <SelectItem value="Handicrafts & Fashion">Handicrafts & Sustainable Fashion</SelectItem>
                        <SelectItem value="Self-Help Group (SHG)">Self-Help Group (SHG) Collective</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">City & Region</Label>
                    <Input
                      id="location"
                      placeholder="e.g. Kochi, Kerala"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearsInBusiness">Years Operating</Label>
                    <Select
                      value={formData.yearsInBusiness}
                      onValueChange={(val) => setFormData({ ...formData, yearsInBusiness: val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select years" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">Less than 1 Year</SelectItem>
                        <SelectItem value="1">1 to 2 Years</SelectItem>
                        <SelectItem value="2">2 to 5 Years</SelectItem>
                        <SelectItem value="5">5+ Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanPurpose">Primary Financial Goal / Loan Purpose</Label>
                  <Textarea
                    id="loanPurpose"
                    placeholder="Describe how funding will grow your enterprise (e.g. purchasing raw materials, hiring artisans, solar pump)..."
                    value={formData.loanPurpose}
                    onChange={(e) => setFormData({ ...formData, loanPurpose: e.target.value })}
                  />
                </div>

                <Button type="button" onClick={() => setStep(2)} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Next Step: Cashflow & Community Verification <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyRevenue">Avg. Monthly Revenue ($)</Label>
                    <Input
                      id="monthlyRevenue"
                      type="number"
                      placeholder="e.g. 3500"
                      value={formData.monthlyRevenue}
                      onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyExpenses">Avg. Monthly Expenses ($)</Label>
                    <Input
                      id="monthlyExpenses"
                      type="number"
                      placeholder="e.g. 1800"
                      value={formData.monthlyExpenses}
                      onChange={(e) => setFormData({ ...formData, monthlyExpenses: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="digitalTransactions">Digital Transactions per Month (UPI/Bank)</Label>
                    <Input
                      id="digitalTransactions"
                      type="number"
                      placeholder="e.g. 50"
                      value={formData.digitalTransactionsMonthly}
                      onChange={(e) => setFormData({ ...formData, digitalTransactionsMonthly: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shgGroupName">SHG or Community Association (Optional)</Label>
                    <Input
                      id="shgGroupName"
                      placeholder="e.g. Mahila Vikas SHG"
                      value={formData.shgGroupName}
                      onChange={(e) => setFormData({ ...formData, shgGroupName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="border border-dashed rounded-lg p-4 bg-muted/40 text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Upload Cashflow Proof or UPI Bank Statement (Optional)</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB. Document AI will automatically verify monthly income.</p>
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeBiasFreeTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeBiasFreeTerms: !!checked })}
                  />
                  <Label htmlFor="terms" className="text-xs leading-none text-muted-foreground">
                    I consent to evaluating my creditworthiness using FemFinHub's transparent, bias-free AI model without traditional male co-signer or property collateral constraints.
                  </Label>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/3">
                    Back
                  </Button>
                  <Button type="submit" className="w-2/3 bg-emerald-600 hover:bg-emerald-700">
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Calculate AI Credit Readiness
                  </Button>
                </div>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetup;
