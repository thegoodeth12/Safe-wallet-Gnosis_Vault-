// pages/index.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', backgroundColor: '#f8f9fa' }}>
      <header style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛡️ Safe Wallet</h1>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>
          Secure. Automated. Multichain. Built for the next generation of onchain coordination.
        </p>
      </header>

      <main style={{ marginTop: '3rem' }}>
        <section style={{ marginBottom: '2rem' }}>
          <h2>🔧 Features</h2>
          <ul>
            <li>🔐 Gnosis Safe-compatible wallet logic</li>
            <li>📡 Slack alert integration for proposal notifications</li>
            <li>💬 GitHub Actions + Slack hooks</li>
            <li>🧠 Owner + threshold awareness</li>
            <li>🧾 Dynamic transaction builder (ETH, tokens, contract calls)</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2>🚀 Get Started</h2>
          <Link href="https://github.com/apps/safe-wallet" passHref legacyBehavior>
            <a style={{ 
              display: 'inline-block', 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#000', 
              color: '#fff', 
              textDecoration: 'none', 
              borderRadius: '5px' 
            }}>Install GitHub App</a>
          </Link>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2>📂 Resources</h2>
          <ul>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/transparency">Transparency Report</Link></li>
          </ul>
        </section>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '4rem', fontSize: '0.9rem', color: '#888' }}>
        <p>&copy; {new Date().getFullYear()} Safe Wallet – A Custom Secure dApp</p>
      </footer>
    </div>
  );
}
