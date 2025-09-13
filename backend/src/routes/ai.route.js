import express from "express";
import OpenAI from "openai";

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /api/ai
router.post("/", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ reply: "No prompt provided" });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
      max_tokens: 500,
    });

    const aiReply = response.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ reply: "AI service unavailable" });
  }
});

export default router;
