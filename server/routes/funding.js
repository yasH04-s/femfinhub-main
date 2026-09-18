import express from 'express';

const router = express.Router();

const governmentSchemes = [
  {
    id: 'scheme-1',
    title: 'Mudra Yojana for Women (Tarun & Kishore)',
    category: 'Government Loan',
    provider: 'Ministry of Finance & Micro Units Development Agency',
    maxAmount: '$12,500',
    interestRate: '7.5% p.a.',
    tenure: 'Up to 5 Years',
    collateralRequired: false,
    subsidyPercentage: '15% Capital Subsidy',
    eligibilityMatch: 96,
    description: 'No-collateral microloans designed for non-corporate, non-farm small/micro enterprises led by women entrepreneurs.',
    targetSector: 'Crafts, Food Processing, Retail, Small Services',
    applicationDeadline: 'Rolling Admissions',
    documentsNeeded: ['Aadhaar/ID Proof', 'Business Plan', 'Bank Statement 6 Months']
  },
  {
    id: 'scheme-2',
    title: 'Stand-Up India Scheme for Women Entrepreneurs',
    category: 'Government Loan & Grant',
    provider: 'Small Industries Development Bank of India (SIDBI)',
    maxAmount: '$120,000',
    interestRate: '6.8% p.a.',
    tenure: 'Up to 7 Years',
    collateralRequired: false,
    subsidyPercentage: 'Up to 25% Margin Money Support',
    eligibilityMatch: 91,
    description: 'Facilitates bank loans between $12,000 and $120,000 to women setting up greenfield enterprises in manufacturing, services, or trading.',
    targetSector: 'Manufacturing, Tech Startups, Agriculture Exports',
    applicationDeadline: 'Open Year-Round',
    documentsNeeded: ['Project Report', 'Incorporation Cert', 'ID Proof']
  },
  {
    id: 'scheme-3',
    title: 'Annapurna Scheme for Food & Catering',
    category: 'Micro Grant & Loan',
    provider: 'State Bank of India & Ministry of Micro Enterprises',
    maxAmount: '$6,000',
    interestRate: '5.5% p.a.',
    tenure: '36 Months',
    collateralRequired: false,
    subsidyPercentage: 'Zero Processing Fees',
    eligibilityMatch: 88,
    description: 'Specialized financing for women starting packaged food, tiffin services, catering, or cloud kitchens with flexible monthly EMI.',
    targetSector: 'Food & Beverage, Catering, Agricultural Products',
    applicationDeadline: '30 Days Left',
    documentsNeeded: ['FSSAI License / Registration', 'ID Proof', 'Bank Passbook']
  },
  {
    id: 'scheme-4',
    title: 'Stree Shakti Package for Women Entrepreneurs',
    category: 'Private Concessional Loan',
    provider: 'Consortium of Public Banks & NABARD',
    maxAmount: '$25,000',
    interestRate: '0.50% Interest Rate Concession',
    tenure: '60 Months',
    collateralRequired: false,
    subsidyPercentage: 'Waiver of Security for loans up to $30k',
    eligibilityMatch: 94,
    description: 'Offered to women who own more than 50% share capital in a small business. Includes free EDP (Entrepreneurship Development Training).',
    targetSector: 'All Sectors',
    applicationDeadline: 'Open Year-Round',
    documentsNeeded: ['Ownership Proof', 'Financial Statements', 'ID Proof']
  }
];

const crowdfundingCampaigns = [
  {
    id: 'crowd-1',
    founderName: 'Meera Roy',
    businessTitle: 'EcoThread: Handcrafted Bio-Degradable Jute Bags',
    category: 'Sustainable Fashion & Crafts',
    goalAmount: 8000,
    raisedAmount: 6200,
    backersCount: 142,
    daysLeft: 12,
    location: 'Jaipur, Rajasthan',
    story: 'Empowering 25 rural women artisans by scaling production of eco-friendly jute and cotton bags for international export.',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'crowd-2',
    founderName: 'Sunita & Kavita',
    businessTitle: 'AgriPure: Solar Cold Storage for Women Farmers',
    category: 'Agritech & Clean Energy',
    goalAmount: 15000,
    raisedAmount: 11400,
    backersCount: 230,
    daysLeft: 18,
    location: 'Pune, Maharashtra',
    story: 'Building modular micro-cold storage units to prevent post-harvest spoilage for smallholder women vegetable growers.',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=600&q=80'
  }
];

// GET /api/funding/schemes
router.get('/schemes', (req, res) => {
  const { category, sector } = req.query;
  let filtered = [...governmentSchemes];

  if (category && category !== 'All') {
    filtered = filtered.filter(s => s.category.toLowerCase().includes(category.toLowerCase()));
  }

  res.json({
    success: true,
    totalCount: filtered.length,
    schemes: filtered
  });
});

// POST /api/funding/apply
router.post('/apply', (req, res) => {
  const { schemeId, applicantName, businessType } = req.body;
  
  res.json({
    success: true,
    applicationId: `APP-FEMFIN-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'Application Received & Verification In-Progress',
    estimatedProcessingDays: 3,
    nextSteps: [
      'Document AI verification underway',
      'Assigned to nearest partner microfinance officer',
      'Track status in FemFinHub Loan Dashboard'
    ],
    appliedAt: new Date().toISOString()
  });
});

// GET /api/funding/crowdfunding
router.get('/crowdfunding', (req, res) => {
  res.json({
    success: true,
    campaigns: crowdfundingCampaigns
  });
});

// POST /api/funding/crowdfunding/pledge
router.post('/crowdfunding/pledge', (req, res) => {
  const { campaignId, amount, backerName } = req.body;
  const campaign = crowdfundingCampaigns.find(c => c.id === campaignId);

  if (campaign) {
    campaign.raisedAmount += (Number(amount) || 50);
    campaign.backersCount += 1;
  }

  res.json({
    success: true,
    message: `Thank you ${backerName || 'Supporter'}! Your micro-contribution of $${amount} was received!`,
    campaign
  });
});

export default router;
