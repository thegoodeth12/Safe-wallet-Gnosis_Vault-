// pages/docs.tsx

import Head from 'next/head';

export default function Docs() {
  return (
    <>
      <Head>
        <title>Safe Wallet Docs</title>
        <meta name="description" content="Secure. Automated. Multichain. Built for the next generation of onchain coordination." />
      </Head>
      <main style={{ fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
        <h1>🛡️ Safe Wallet Documentation</h1>
        <p>Welcome to the Safe Wallet Custom Secure dApp documentation portal.</p>

        <h2>🔧 Key Features</h2>
        <ul>
          <li>🔐 Gnosis Safe-compatible wallet logic</li>
          <li>📡 GitHub + Discord automation for proposals</li>
          <li>🧠 Owner threshold awareness & approvals</li>
          <li>📈 Live transaction builder (ETH, tokens, contract calls)</li>
        </ul>

        <h2>🗃️ Getting Started</h2>
        <p>To integrate your GitHub repo, connect your Safe, and deploy securely, follow these steps:</p>
        <ol>
          <li>Connect your Safe Wallet using Reown AppKit</li>
          <li>Configure your GitHub Action triggers</li>
          <li>Use the <code>.github-private</code> repo to sync proposals</li>
        </ol>

        <h2>📎 Documentation Links</h2>
        <ul>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/transparency">Transparency Disclosure</a></li>
        </ul>
      </main>
    </>
  );
}
