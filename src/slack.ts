import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

export async function sendSlackMessage(text: string) {
  const webhook = process.env.SLACK_WEBHOOK
  if (!webhook) throw new Error("SLACK_WEBHOOK not set in .env")

  const payload = {
    text,
  }

  const res = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    console.error("Slack notification failed", await res.text())
  } else {
    console.log("🔔 Slack notification sent")
  }
}
