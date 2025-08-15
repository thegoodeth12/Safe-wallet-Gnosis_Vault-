// backend/slack.js
const axios = require('axios');
require('dotenv').config();

async function notifySlack(message) {
  await axios.post(process.env.SLACK_WEBHOOK_URL, { text: message });
}

module.exports = { notifySlack };
