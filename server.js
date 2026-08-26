const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Kumuha ng data mula sa JSON file
app.get('/api/sales', (req, res) => {
  const month = req.query.month || '2026-08';
  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      const allData = JSON.parse(raw || '{}');
      return res.json(allData[month] || null);
    } catch (e) {
      return res.status(500).json({ error: 'Failed to read data' });
    }
  }
  res.json(null);
});

// Mag-save ng data sa JSON file
app.post('/api/sales', (req, res) => {
  const { month, data } = req.body;
  let allData = {};

  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      allData = JSON.parse(raw || '{}');
    } catch (e) {
      allData = {};
    }
  }

  allData[month] = data;

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(allData, null, 2));
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
