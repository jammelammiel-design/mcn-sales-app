const express = require('express');
const path = require('path');

const app = express();
// Gumamit ng process.env.PORT para sa Render
const PORT = process.env.PORT || 3000; 

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});