// pages/index.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { getSafeInfo } from '../lib/safeApi';

export default function Home() {
  const [safeData, setSafeData] = useState<any>(null);
  const safeAddress = '0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0';

  useEffect(() => {
    getSafeInfo(safeAddress).then(setSafeData).catch(console.error);
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <Head>
        <title>Safe Wallet – Live Data</title>
      </Head>

      <h1>🛡️ Safe Wallet Dashboard</h1>
      <p>Secure. Automated. Live.</p>

      <section style={{ marginTop: '2rem' }}>
        <h2>💼 Safe Wallet Details</h2>

        {!safeData ? (
          <p>Loading Safe details…</p>
        ) : (
          <div style={{
            background: '#f0f0f0',
            borderRadius: '8px',
            padding: '1rem',
            lineHeight: '1.6'
          }}>
            <p><strong>Address:</strong> {safeData.address}</p>
            <p><strong>Network:</strong> Arbitrum</p>
            <p><strong>Threshold:</strong> {safeData.threshold} out of {safeData.owners.length} owners</p>
            <p><strong>Owners:</strong></p>
            <ul>
              {safeData.owners.map((owner: any) => (
                <li key={owner.address}>{owner.address}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
