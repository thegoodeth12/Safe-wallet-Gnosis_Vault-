// /pages/api/proposals.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { safe } = req.query;

  if (!safe) return res.status(400).json({ error: "Missing safe address" });

  try {
    const response = await fetch(`https://safe-transaction-arbitrum.safe.global/api/v1/safes/${safe}/multisig-transactions/`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
}
