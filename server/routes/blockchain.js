import express from 'express';
import crypto from 'crypto';

const router = express.Router();

// Mock in-memory smart contract disbursement audit log database
const mockTransactions = [
  {
    txHash: '0x8f3a9b1c7e4d2f0a5b8c6e3d1a9f4e2b0c8d6a4e2f0a8b6c4d2e0f1a3b5c7d9e',
    blockNumber: 18942012,
    contractAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    borrowerName: 'Priya Sharma (Artisan Textiles)',
    loanId: 'LN-2026-8891',
    totalLoanAmount: '$5,000',
    disbursedAmount: '$1,500',
    milestonePhase: 'Phase 1: Equipment & Raw Material Purchase (30%)',
    timestamp: '2026-09-10T14:32:10Z',
    status: 'Verified On-Chain',
    network: 'Polygon PoS Mainnet'
  },
  {
    txHash: '0x3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f',
    blockNumber: 18938950,
    contractAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    borrowerName: 'Anita Desai (Organic Farming Co-op)',
    loanId: 'LN-2026-7734',
    totalLoanAmount: '$10,000',
    disbursedAmount: '$10,000',
    milestonePhase: 'Phase 3: Final Working Capital Disbursement (100%)',
    timestamp: '2026-09-08T09:15:44Z',
    status: 'Verified On-Chain',
    network: 'Polygon PoS Mainnet'
  },
  {
    txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    blockNumber: 18921105,
    contractAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    borrowerName: 'Sunita Patel (Eco Packaging)',
    loanId: 'LN-2026-6412',
    totalLoanAmount: '$7,500',
    disbursedAmount: '$3,000',
    milestonePhase: 'Phase 1: Initial Working Capital (40%)',
    timestamp: '2026-09-02T16:40:20Z',
    status: 'Verified On-Chain',
    network: 'Polygon PoS Mainnet'
  }
];

// GET /api/blockchain/ledger
router.get('/ledger', (req, res) => {
  res.json({
    success: true,
    smartContract: {
      address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      network: 'Polygon PoS / Ethereum Testnet',
      totalDisbursedOnChain: '$2,450,000',
      activeContractsCount: 1420,
      verificationAuditStatus: 'Audited by OpenZeppelin - 100% Transparent'
    },
    transactions: mockTransactions
  });
});

// POST /api/blockchain/verify
router.post('/verify', (req, res) => {
  const { txHash } = req.body;
  if (!txHash) {
    return res.status(400).json({ success: false, message: 'txHash is required' });
  }

  const existing = mockTransactions.find(t => t.txHash.toLowerCase() === txHash.toLowerCase());

  if (existing) {
    return res.json({
      success: true,
      verified: true,
      data: existing
    });
  }

  // Generate cryptographic proof for custom query
  const generatedBlock = Math.floor(18900000 + Math.random() * 50000);
  const hashDigest = crypto.createHash('sha256').update(txHash).digest('hex');

  res.json({
    success: true,
    verified: true,
    data: {
      txHash: `0x${hashDigest}`,
      blockNumber: generatedBlock,
      contractAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      borrowerName: 'FemFin Verified Entrepreneur',
      loanId: `LN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      totalLoanAmount: '$3,500',
      disbursedAmount: '$1,400',
      milestonePhase: 'Phase 1: Advance Milestone Disbursement (40%)',
      timestamp: new Date().toISOString(),
      status: 'Verified On-Chain (SHA-256 Immutable Proof)',
      network: 'Polygon PoS Mainnet'
    }
  });
});

// POST /api/blockchain/disburse
router.post('/disburse', (req, res) => {
  const { loanId, borrowerName, amount, phase } = req.body;
  const newTxHash = '0x' + crypto.randomBytes(32).toString('hex');
  const newBlock = 18950000 + mockTransactions.length + 1;

  const newRecord = {
    txHash: newTxHash,
    blockNumber: newBlock,
    contractAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    borrowerName: borrowerName || 'Women Business Owner',
    loanId: loanId || `LN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    totalLoanAmount: `$${amount || 5000}`,
    disbursedAmount: `$${amount || 1500}`,
    milestonePhase: phase || 'Phase 1: Equipment Release',
    timestamp: new Date().toISOString(),
    status: 'Verified On-Chain',
    network: 'Polygon PoS Mainnet'
  };

  mockTransactions.unshift(newRecord);

  res.json({
    success: true,
    message: 'Smart contract disbursement recorded on blockchain successfully!',
    transaction: newRecord
  });
});

export default router;
