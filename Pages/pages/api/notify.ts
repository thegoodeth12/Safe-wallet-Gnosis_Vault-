// pages/api/notify.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const slackWebhook = process.env.SLACK_WEBHOOK_URL as string

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!slackWebhook) {
    return res.status(500).json({ error: 'Slack webhook URL not configured.' })
  }

  const { safeAddress, proposalType, txHash } = req.body

  if (!safeAddress || !proposalType) {
    return res.status(400).json({ error: 'safeAddress and proposalType are required in request body.' })
  }

  const payload = {
    text: `🔐 *New Proposal Submitted*\n📬 Type: ${proposalType}\n🏦 Safe: \`${safeAddress}\`\n📦 Tx Hash: \`${txHash || 'Pending...'}\``
  }

  try {
    await axios.post(slackWebhook, payload)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Slack notification failed:', err)
    return res.status(500).json({ error: 'Slack notification failed.' })
  }
}
