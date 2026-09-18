import express from 'express';

const router = express.Router();

/**
 * WhatsApp Cloud API Integration Endpoint
 * Handles Meta Webhook verification & incoming WhatsApp user messages
 */

// GET /api/whatsapp/webhook (Meta Cloud API Verification)
router.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'femfinhub_secure_token';

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WhatsApp Webhook Verified Successfully!');
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }
  res.status(400).json({ message: 'Missing parameters' });
});

// POST /api/whatsapp/webhook (Inbound Message Handler)
router.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object) {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      const phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;
      const from = body.entry[0].changes[0].value.messages[0].from;
      const msg_body = body.entry[0].changes[0].value.messages[0].text?.body || '';

      console.log(`Received WhatsApp Message from ${from}: "${msg_body}"`);
      // Here Meta Graph API call to send WhatsApp reply back can be triggered using process.env.WHATSAPP_CLOUD_API_TOKEN
    }
    return res.status(200).send('EVENT_RECEIVED');
  } else {
    return res.sendStatus(404);
  }
});

// POST /api/whatsapp/send-demo (App Interactive WhatsApp Trigger)
router.post('/send-demo', (req, res) => {
  const { phoneNumber, queryKeyword } = req.body;
  const keyword = (queryKeyword || '').toLowerCase();

  let autoReply = "👋 Welcome to FemFinHub WhatsApp Financial Assistant!\n\nOptions:\n1️⃣ Reply 'LOAN' for low-interest microloans\n2️⃣ Reply 'SCORE' for instant AI credit check\n3️⃣ Reply 'SCHEMES' for government subsidies\n4️⃣ Reply 'MENTOR' for female founder guidance";

  if (keyword.includes('loan')) {
    autoReply = "💰 FemFinHub Microloans:\n\n• Mudra Tarun: Up to $12,500 (No collateral)\n• Stand-Up India: Up to $120,000 (Subsidized)\n\nApply now directly on your phone: https://femfinhub.app/funding";
  } else if (keyword.includes('score')) {
    autoReply = "📊 Your FemFin AI Credit Readiness: 740 (Strong)\n\n✅ Cashflow consistency: High\n✅ Community SHG trust: 92/100\n✅ Gender-bias free audit verified";
  } else if (keyword.includes('scheme')) {
    autoReply = "🏛️ Top Government Schemes for Women:\n1. Annapurna Scheme (Food Catering)\n2. Stree Shakti Package\n3. Mahila Samriddhi Yojana\n\nLearn more: https://femfinhub.app/funding";
  }

  res.json({
    success: true,
    recipient: phoneNumber || '+1234567890',
    messageSent: autoReply,
    status: 'Delivered via WhatsApp Cloud API Demo Gateway',
    timestamp: new Date().toISOString()
  });
});

export default router;
