import express from 'express';

const router = express.Router();

let forumPosts = [
  {
    id: 'post-1',
    authorName: 'Sunita Rao',
    authorRole: 'Founder, Organic Spices Co-op',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    title: 'How we got our Mudra Kishore Loan approved in 5 days without collateral!',
    category: 'Funding & Loans',
    content: 'Sharing our step-by-step experience applying for the Mudra loan through FemFinHub. The key was showing consistent UPI digital transaction records and our SHG peer rating rather than traditional property papers.',
    upvotes: 42,
    commentsCount: 18,
    createdAt: '2 hours ago',
    tags: ['MudraLoan', 'NoCollateral', 'SuccessStory']
  },
  {
    id: 'post-2',
    authorName: 'Aarti Menon',
    authorRole: 'Handicraft Artisan & Exporter',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    title: 'Looking for 3 co-investors for our Jute Crafts SHG Micro-Lending Circle',
    category: 'Peer Micro-Lending',
    content: 'Our Self-Help Group in Kochi is pooling $200 each per month to finance inventory for peak festive season. We have 1 slot open for a fellow woman entrepreneur. High return & community trust guaranteed!',
    upvotes: 29,
    commentsCount: 11,
    createdAt: '5 hours ago',
    tags: ['SHGCircle', 'PeerLending', 'MicroFinance']
  },
  {
    id: 'post-3',
    authorName: 'Priyanka Ghosh',
    authorRole: 'Tech Founder, EduKids',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80',
    title: 'What GST & tax registration documents are required for Stand-Up India Grants?',
    category: 'Legal & Tax',
    content: 'Does anyone have a checklist of required CA certificates for the 25% Stand-Up India margin money subsidy? Would love guidance from founders who have unlocked this grant.',
    upvotes: 19,
    commentsCount: 7,
    createdAt: '1 day ago',
    tags: ['Grants', 'TaxCompliance', 'StandUpIndia']
  }
];

const microLendingCircles = [
  {
    id: 'circle-1',
    name: 'Kochi Mahila Craft Collective Circle',
    monthlyContribution: '$150 / member',
    membersCount: 8,
    totalPool: '$1,200',
    currentBeneficiary: 'Aarti Menon (Festive Inventory)',
    nextCycleDate: '1st of Next Month',
    repaymentRate: '100% On-Time'
  },
  {
    id: 'circle-2',
    name: 'Jaipur Rural Women Agri-Group',
    monthlyContribution: '$100 / member',
    membersCount: 12,
    totalPool: '$1,200',
    currentBeneficiary: 'Sunita Rao (Solar Pump Maintenance)',
    nextCycleDate: '15th of Next Month',
    repaymentRate: '98.5% On-Time'
  }
];

// GET /api/community/posts
router.get('/posts', (req, res) => {
  const { category } = req.query;
  let filtered = [...forumPosts];
  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  res.json({
    success: true,
    posts: filtered
  });
});

// POST /api/community/posts
router.post('/posts', (req, res) => {
  const { title, category, content, authorName, authorRole, tags } = req.body;

  const newPost = {
    id: `post-${Date.now()}`,
    authorName: authorName || 'Anonymous Entrepreneur',
    authorRole: authorRole || 'FemFin Member',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    title: title || 'New Discussion Thread',
    category: category || 'General',
    content: content || '',
    upvotes: 1,
    commentsCount: 0,
    createdAt: 'Just now',
    tags: Array.isArray(tags) ? tags : ['Community']
  };

  forumPosts.unshift(newPost);

  res.json({
    success: true,
    post: newPost
  });
});

// POST /api/community/posts/:id/upvote
router.post('/posts/:id/upvote', (req, res) => {
  const { id } = req.params;
  const post = forumPosts.find(p => p.id === id);

  if (post) {
    post.upvotes += 1;
    return res.json({ success: true, upvotes: post.upvotes });
  }
  res.status(404).json({ success: false, message: 'Post not found' });
});

// GET /api/community/circles
router.get('/circles', (req, res) => {
  res.json({
    success: true,
    circles: microLendingCircles
  });
});

export default router;
