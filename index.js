/* written by Brian McCarthy */
import app from './app.js';
import logger from './server/logger.js';
import natural from "natural";

const PORT = 3000;

// Task 8: Import natural in index.js
console.log("Natural package version:", natural.SentimentAnalyzer ? "Loaded" : "Error");

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
  logger.info(`Server started on port ${PORT}`);
});
