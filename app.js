/* written by Brian McCarthy */
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import pinoHttp from "pino-http";
import logger from "./server/logger.js";
import giftRoutes from "./server/routes/giftRoutes.js";
import authRoutes from "./server/routes/authRoutes.js";
import searchRoutes from "./server/routes/searchRoutes.js";
import natural from "natural";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

// Task 7: Route serving /api/search
app.use('/api/search', searchRoutes);
app.use('/api/gifts', giftRoutes);
app.use('/api/auth', authRoutes);

// Sentiment Analysis Route
app.post('/api/sentiment', async (req, res) => {
  const { sentence } = req.query;
  if (!sentence) {
    return res.status(400).json({ error: 'No sentence provided' });
  }
  const Analyzer = natural.SentimentAnalyzer;
  const stemmer = natural.PorterStemmer;
  const analyzer = new Analyzer("English", stemmer, "afinn");
  try {
    const analysisResult = analyzer.getSentiment(sentence.split(' '));
    let sentiment = analysisResult < 0 ? "negative" : (analysisResult > 0.33 ? "positive" : "neutral");
    res.status(200).json({ sentimentScore: analysisResult, sentiment: sentiment });
  } catch (error) {
    res.status(500).json({ message: 'Error performing sentiment analysis' });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

if (process.env.NODE_ENV !== "production") {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

export default app;
