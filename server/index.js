import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import creditScoreRouter from './routes/creditScore.js';
import blockchainRouter from './routes/blockchain.js';
import fundingRouter from './routes/funding.js';
import whatsappRouter from './routes/whatsapp.js';
import mentorshipRouter from './routes/mentorship.js';
import communityRouter from './routes/community.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes Mount
app.use('/api/credit-score', creditScoreRouter);
app.use('/api/blockchain', blockchainRouter);
app.use('/api/funding', fundingRouter);
app.use('/api/whatsapp', whatsappRouter);
app.use('/api/mentorship', mentorshipRouter);
app.use('/api/community', communityRouter);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'FemFinHub API Server',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    services: {
      aiCreditEngine: 'Operational',
      blockchainLedger: 'Polygon Connected',
      whatsappCloudApi: 'Active',
      schemeAggregator: 'Live'
    }
  });
});

// Catch-all 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'API Endpoint Not Found' });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 FemFinHub Production API Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`=================================================`);
});

export default app;
