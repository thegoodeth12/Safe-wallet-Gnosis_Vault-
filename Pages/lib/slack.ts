import axios from 'axios';

export const sendSlackNotification = async (message: string) => {
  const webhook = process.env.NEXT_PUBLIC_SLACK_WEBHOOK;
  if (!webhook) return;

  await axios.post(webhook, { text: message });
};
