// backend/server.js
const express = require('express');
const { notifySlack } = require('./slack');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/trigger', async (req, res) => {
  const { message } = req.body;
  await notifySlack(message || "Safe App triggered ✅");
  res.send({ status: "ok" });
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
