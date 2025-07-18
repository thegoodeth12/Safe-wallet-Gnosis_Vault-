import { type ChatPostMessageArguments, WebClient } from "@slack/web-api";

if (!process.env.SLACK_BOT_TOKEN) {
  console.warn("SLACK_BOT_TOKEN environment variable not set - Slack notifications disabled");
}

if (!process.env.SLACK_CHANNEL_ID) {
  console.warn("SLACK_CHANNEL_ID environment variable not set - Slack notifications disabled");
}

const slack = process.env.SLACK_BOT_TOKEN ? new WebClient(process.env.SLACK_BOT_TOKEN) : null;

/**
 * Sends a structured message to Slack channel
 * @param message - Structured message to send
 * @returns Promise resolving to the sent message's timestamp
 */
async function sendSlackMessage(
  message: ChatPostMessageArguments
): Promise<string | undefined> {
  if (!slack || !process.env.SLACK_CHANNEL_ID) {
    console.log("Slack not configured - would have sent:", message.text || message.blocks?.[0]);
    return undefined;
  }

  try {
    const response = await slack.chat.postMessage({
      ...message,
      channel: process.env.SLACK_CHANNEL_ID,
    });
    return response.ts;
  } catch (error) {
    console.error('Error sending Slack message:', error);
    throw error;
  }
}

/**
 * Send notification for new proposals
 */
export async function notifyNewProposal(proposal: {
  title: string;
  description: string | null;
  safeAddress: string;
  signatures: string;
  required: string;
}) {
  return sendSlackMessage({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `🔔 *New Safe Proposal Created*`
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Title:*\n${proposal.title}`
          },
          {
            type: 'mrkdwn',
            text: `*Safe:*\n\`${proposal.safeAddress}\``
          },
          {
            type: 'mrkdwn',
            text: `*Description:*\n${proposal.description || 'No description'}`
          },
          {
            type: 'mrkdwn',
            text: `*Signatures:*\n${proposal.signatures}/${proposal.required} required`
          }
        ]
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '🔍 View Dashboard'
            },
            url: process.env.FRONTEND_URL || 'https://replit.com/@thegoodeth12/Gnosis-vault',
            action_id: 'view_dashboard'
          }
        ]
      }
    ]
  });
}

/**
 * Send notification when proposal is signed
 */
export async function notifyProposalSigned(proposal: {
  title: string;
  safeAddress: string;
  signatures: string;
  required: string;
  status: string;
}) {
  const isReady = proposal.status === 'ready';
  const emoji = isReady ? '✅' : '✍️';
  const statusText = isReady ? 'Ready to Execute' : 'Awaiting More Signatures';

  return sendSlackMessage({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `${emoji} *Proposal Signed - ${statusText}*`
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Proposal:*\n${proposal.title}`
          },
          {
            type: 'mrkdwn',
            text: `*Safe:*\n\`${proposal.safeAddress}\``
          },
          {
            type: 'mrkdwn',
            text: `*Progress:*\n${proposal.signatures}/${proposal.required} signatures`
          },
          {
            type: 'mrkdwn',
            text: `*Status:*\n${statusText}`
          }
        ]
      }
    ]
  });
}

/**
 * Send notification when proposal is executed
 */
export async function notifyProposalExecuted(proposal: {
  title: string;
  safeAddress: string;
  txHash: string | null;
}) {
  return sendSlackMessage({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `🚀 *Proposal Successfully Executed*`
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Proposal:*\n${proposal.title}`
          },
          {
            type: 'mrkdwn',
            text: `*Safe:*\n\`${proposal.safeAddress}\``
          },
          {
            type: 'mrkdwn',
            text: `*Transaction:*\n${proposal.txHash ? `\`${proposal.txHash}\`` : 'Hash not available'}`
          }
        ]
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: '✅ Transaction has been successfully executed on the blockchain'
          }
        ]
      }
    ]
  });
}

/**
 * Send notification when proposal is rejected
 */
export async function notifyProposalRejected(proposal: {
  title: string;
  safeAddress: string;
}) {
  return sendSlackMessage({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `❌ *Proposal Rejected*`
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Proposal:*\n${proposal.title}`
          },
          {
            type: 'mrkdwn',
            text: `*Safe:*\n\`${proposal.safeAddress}\``
          }
        ]
      }
    ]
  });
}

/**
 * Send notification for system status changes
 */
export async function notifySystemStatus(component: string, status: string, previousStatus?: string) {
  const statusEmoji = {
    running: '🟢',
    online: '🟢', 
    active: '🟢',
    syncing: '🟡',
    offline: '🔴',
    error: '🔴'
  };

  const emoji = statusEmoji[status as keyof typeof statusEmoji] || '⚪';
  
  return sendSlackMessage({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `${emoji} *System Status Update*`
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Component:*\n${component}`
          },
          {
            type: 'mrkdwn',
            text: `*Status:*\n${status.charAt(0).toUpperCase() + status.slice(1)}`
          }
        ]
      }
    ]
  });
}

/**
 * Send daily summary of vault activity
 */
export async function sendDailySummary(data: {
  totalProposals: number;
  pendingProposals: number;
  executedToday: number;
  activeSafes: number;
}) {
  return sendSlackMessage({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `📊 *Daily Vault Summary - ${new Date().toLocaleDateString()}*`
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Total Proposals:*\n${data.totalProposals}`
          },
          {
            type: 'mrkdwn',
            text: `*Pending Signatures:*\n${data.pendingProposals}`
          },
          {
            type: 'mrkdwn',
            text: `*Executed Today:*\n${data.executedToday}`
          },
          {
            type: 'mrkdwn',
            text: `*Active Safes:*\n${data.activeSafes}`
          }
        ]
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '📈 View Full Dashboard'
            },
            url: process.env.FRONTEND_URL || 'https://replit.com/@thegoodeth12/Gnosis-vault',
            action_id: 'view_dashboard'
          }
        ]
      }
    ]
  });
}

export { sendSlackMessage };