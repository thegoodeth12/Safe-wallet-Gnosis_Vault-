// pages/terms.tsx

import Head from 'next/head';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service | Safe Wallet</title>
      </Head>
      <main style={{ fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
        <h1>📜 Terms of Service</h1>
        <p>By using Safe Wallet Custom Secure dApp, you agree to the following:</p>

        <ul>
          <li>You are responsible for managing your Safe Wallet and approving transactions.</li>
          <li>We do not have access to your private keys or assets.</li>
          <li>All transaction data is signed and executed onchain.</li>
          <li>No financial advice is provided via this application.</li>
        </ul>

        <p>
          Violations of these terms may result in revoked access to GitHub or Discord automations.
        </p>

        <p>
          Questions? Reach out at <code>legal@safe-wallet.xyz</code>.
        </p>
      </main>
    </>
  );
}
