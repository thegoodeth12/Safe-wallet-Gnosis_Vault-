// /pages/api/safe-info.ts (or use client-side if needed)
export default async function handler(req, res) {
  const safeAddress = '0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0';
  const chain = 'arbitrum'; // or 'mainnet', 'polygon', etc.
  const apiBase = `https://safe-transaction-${chain}.safe.global`;

  try {
    const response = await fetch(`${apiBase}/api/v1/safes/${safeAddress}/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Safe data: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json({
      address: data.address,
      threshold: data.threshold,
      owners: data.owners,
      nonce: data.nonce,
      version: data.version,
    });
  } catch (err) {
    console.error('Safe fetch error:', err);
    res.status(500).json({ error: err.message });
  }
}
