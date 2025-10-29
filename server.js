import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const HF_TOKEN = process.env.HF_TOKEN;
const MODEL = 'MiniMaxAI/SynLogic-Mix-3-32B'; // model path

if (!HF_TOKEN) {
  console.error('Missing HF_TOKEN in environment');
  process.exit(1);
}

app.use(cors({ origin: 'https://aichatbot-inky-sigma.vercel.app' })); // restrict origin in production: cors({ origin: 'https://your-frontend.com' })
app.use(express.json({ limit: '128kb' })); // small limit to avoid huge prompts

app.post('/api/ask-llm', async (req, res) => {
  try {
    const { prompt, max_tokens = 512 } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid prompt' });
    }

    // Optionally: sanitize or truncate prompt to a safe max length
    const payload = { inputs: prompt, parameters: { max_new_tokens: max_tokens } };

    const hfResponse = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!hfResponse.ok) {
      const txt = await hfResponse.text();
      console.error('HuggingFace error:', hfResponse.status, txt);
      return res.status(502).json({ error: 'Model inference failed', details: txt });
    }

    const result = await hfResponse.json(); // structure depends on model / HF return type
    // Example: result might be [{ generated_text: "..." }] or { error: "..."}
    return res.json(result);

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`LLM backend listening on port ${PORT}`);
});
