// pages/privacy.tsx

import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Safe Wallet</title>
      </Head>
      <main style={{ fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
        <h1>🔒 Privacy Policy</h1>
        <p>Effective Date: July 20, 2025</p>

        <p>
          Safe Wallet Custom Secure dApp respects your privacy. We do not collect, store, or share any personal data unless explicitly authorized by you through wallet connection or GitHub account linking.
        </p>

        <h2>What We Collect</h2>
        <ul>
          <li>GitHub usernames (if linked to Safe Wallet)</li>
          <li>Wallet addresses and onchain activity</li>
        </ul>

        <h2>How We Use It</h2>
        <p>This data is used solely for Safe Wallet automation, signing, and transaction proposals. No third-party tracking is used.</p>

        <p>
          If you have any questions or want your data deleted, contact us at <code>support@safe-wallet.xyz</code>.
        </p>
      </main>
    </>
  );
}
