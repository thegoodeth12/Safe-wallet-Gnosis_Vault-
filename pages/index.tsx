// pages/index.tsx
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', padding: '2rem', backgroundColor: '#f9f9f9', color: '#222' }}>
      <Head>
        <title>Safe Wallet – Secure Multichain dApp</title>
        <meta name="description" content="Custom secure Safe Wallet integrated with GitHub, Discord, and automated onchain coordination tools." />
      </Head>

      <header style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>🛡️ Safe Wallet</h1>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>
          Secure. Automated. Multichain. Built for next-gen onchain coordination.
        </p>
        <div style={{ marginTop: '1.5rem' }}>
          <Link href="https://github.com/apps/safe-wallet" passHref legacyBehavior>
            <a style={buttonStyle}>🔗 Install GitHub App</a>
          </Link>
          <Link href="/docs" passHref legacyBehavior>
            <a style={{ ...buttonStyle, backgroundColor: '#005eff', marginLeft: '1rem' }}>📚 View Docs</a>
          </Link>
        </div>
      </header>

      <main style={{ marginTop: '3rem' }}>
        <section>
          <h2>🧠 Features</h2>
          <ul>
            <li>🔐 Gnosis Safe-compatible wallet logic</li>
            <li>📡 Proposal alerts via GitHub & Slack/Discord</li>
            <li>💬 Auto-signer logic with GitHub Actions</li>
            <li>🔍 Owner + threshold viewer</li>
            <li>⚙️ Dynamic ETH/token/contract proposal builder</li>
          </ul>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>🚀 Quick Actions</h2>
          <ul>
            <li><a href="https://safe.global" target="_blank" rel="noopener noreferrer">Propose Transaction</a></li>
            <li><a href="https://discord.gg/YOUR_DISCORD_ID" target="_blank" rel="noopener noreferrer">Join Discord Signers</a></li>
          </ul>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>💼 Safe Wallet Overview</h2>
          <div style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            backgroundColor: '#fff'
          }}>
            <p><strong>Address:</strong> <code>0xAfD5...D9A0A0</code></p>
            <p><strong>Chain:</strong> Arbitrum</p>
            <p><strong>Threshold:</strong> 2 of 3</p>
            <p><strong>Owners:</strong> 0xABC…, 0xDEF…, 0xGHI…</p>
          </div>
        </section>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '4rem', fontSize: '0.9rem', color: '#999' }}>
        <p>&copy; {year} Safe Wallet – A Custom Secure dApp</p>
        <p>
          <Link href="/privacy">Privacy</Link> | <Link href="/terms">Terms</Link> | <Link href="/transparency">Transparency</Link>
        </p>
      </footer>
    </div>
  );
}

const buttonStyle = {
  display: 'inline-block',
  padding: '0.75rem 1.5rem',
  backgroundColor: '#111',
  color: '#fff',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: 'bold'
};
