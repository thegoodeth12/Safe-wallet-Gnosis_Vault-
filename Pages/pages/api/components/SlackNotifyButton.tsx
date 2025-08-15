// components/SlackNotifyButton.tsx
import { useState } from 'react'
import { Button } from '@chakra-ui/react'

export default function SlackNotifyButton({ safeAddress, proposalType, txHash }: { safeAddress: string; proposalType: string; txHash?: string }) {
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
    <Button onClick={handleClick} colorScheme="purple" isDisabled={sent}>
      {sent ? '✅ Slack Notified' : '📣 Notify Slack'}
    </Button>
  )
}
<SlackNotifyButton safeAddress={safeAddress} proposalType="GitHub PR" txHash={txHash} />
