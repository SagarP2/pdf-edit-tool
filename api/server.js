const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Example route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Export for Vercel serverless function
module.exports = app; 