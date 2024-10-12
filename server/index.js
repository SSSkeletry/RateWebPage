require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./models/database');
const Page = require('./models/page');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to check server
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// API route to get pages data
app.get('/api/pages', async (req, res) => {
  try {
    const pages = await Page.findAll();
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pages' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.sync().then(() => console.log('Database synced'));
});