import { IncomingWebhook } from '@slack/webhook';

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || '';

const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);

export async function notifySafeProposal(message: string) {
  try {
    await webhook.send({
      text: `🔐 New Safe Proposal:\n${message}`
    });
    console.log('✅ Slack notification sent.');
  } catch (error) {
    console.error('❌ Failed to send Slack message:', error);
  }
}
