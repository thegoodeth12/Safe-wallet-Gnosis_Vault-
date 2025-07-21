import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const slackWebhook = process.env.SLACK_WEBHOOK_URL as string

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { safeAddress, proposalType, txHash } = req.body

    const message = {
      text: `🔐 *New ${proposalType} Proposal Submitted*\nSafe Address: \`${safeAddress}\`\nTx Hash: \`${txHash || 'Pending'}\``,
    }

    await axios.post(slackWebhook, message)
    res.status(200).json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to send to Slack' })
  }
}
