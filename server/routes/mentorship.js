import express from 'express';

const router = express.Router();

const mentors = [
  {
    id: 'm-1',
    name: 'Dr. Radhika Varma',
    title: 'Founder & Managing Director, Venturi Impact Fund',
    specialization: 'Microfinance & Capital Growth',
    experienceYears: 16,
    rating: 4.9,
    sessionsCompleted: 142,
    location: 'Mumbai / Remote',
    bio: 'Pioneer in gender-lens investing and financial access for rural micro-enterprises.',
    availableSlots: ['Mon 3:00 PM', 'Wed 11:00 AM', 'Fri 4:30 PM'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'm-2',
    name: 'Shalini Nair',
    title: 'Co-Founder, Crafts & Co. (Ex-McKinsey)',
    specialization: 'Retail Operations & Export Scaling',
    experienceYears: 12,
    rating: 4.85,
    sessionsCompleted: 98,
    location: 'Bengaluru / Remote',
    bio: 'Helped 50+ artisan brands scale from local workshops to global e-commerce channels.',
    availableSlots: ['Tue 2:00 PM', 'Thu 10:00 AM', 'Sat 1:00 PM'],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'm-3',
    name: 'Pooja Agarwal, CA',
    title: 'Chief Financial Officer & Tax Strategist',
    specialization: 'Tax Compliance, Cashflow & Debt Advisory',
    experienceYears: 14,
    rating: 4.95,
    sessionsCompleted: 210,
    location: 'Delhi / Remote',
    bio: 'Chartered Accountant specializing in financial governance and government grant paperwork for female business owners.',
    availableSlots: ['Wed 4:00 PM', 'Fri 2:00 PM', 'Sun 11:00 AM'],
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80'
  }
];

const scheduledBookings = [];

// GET /api/mentorship/mentors
router.get('/mentors', (req, res) => {
  res.json({
    success: true,
    mentors
  });
});

// POST /api/mentorship/match
router.post('/match', (req, res) => {
  const { industry, stage, primaryGoal } = req.body;
  // Match algorithm ranks mentors based on user goal & industry
  const recommended = [...mentors].sort((a, b) => b.rating - a.rating);

  res.json({
    success: true,
    matchingCriteria: { industry, stage, primaryGoal },
    topMatches: recommended
  });
});

// POST /api/mentorship/book
router.post('/book', (req, res) => {
  const { mentorId, slot, userNotes, userName } = req.body;
  const mentor = mentors.find(m => m.id === mentorId);

  if (!mentor) {
    return res.status(404).json({ success: false, message: 'Mentor not found' });
  }

  const booking = {
    bookingId: `BK-FEMFIN-${Math.floor(1000 + Math.random() * 9000)}`,
    mentorId,
    mentorName: mentor.name,
    mentorTitle: mentor.title,
    slot,
    userName: userName || 'FemFin Entrepreneur',
    userNotes: userNotes || 'General business & loan strategy consultation',
    status: 'Confirmed & Calendar Invitation Sent',
    meetingLink: 'https://meet.femfinhub.org/session-' + Math.random().toString(36).substring(7),
    bookedAt: new Date().toISOString()
  };

  scheduledBookings.push(booking);

  res.json({
    success: true,
    booking
  });
});

export default router;
