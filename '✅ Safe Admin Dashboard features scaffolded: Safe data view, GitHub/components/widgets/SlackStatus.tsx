'use client';
import { useEffect, useState } from 'react';
import { useSlackStatus } from '@/hooks/useSlackStatus';

export default function SlackStatus() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    useSlackStatus().then(setStatus);
  }, []);

  if (!status) return <div>Loading Slack status...</div>;

  return (
    <div className="widget">
      <h3>📣 Slack Webhook</h3>
      <p>Status: {status.connected ? '✅ Connected' : '❌ Failed'}</p>
      {status.lastPing && <p>Last Ping: {new Date(status.lastPing).toLocaleString()}</p>}
    </div>
  );
}
