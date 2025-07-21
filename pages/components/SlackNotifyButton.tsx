import { useState } from 'react'

export default function SlackNotifyButton({ safeAddress, proposalType, txHash }) {
  const [sent, setSent] = useState(false)

  const handleClick = async () => {
    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ safeAddress, proposalType, txHash }),
    })
    if (res.ok) setSent(true)
  }

  return (
    <button onClick={handleClick} disabled={sent}>
      {sent ? '✅ Notified Slack' : '📣 Notify Slack'}
    </button>
  )
}
