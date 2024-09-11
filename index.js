const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for the React app (adjust the origin as per your React app URL)
app.use(cors({ origin: 'http://localhost:3000' }));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Node.js server is running!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Node.js server running on http://localhost:${port}`);
});
