import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO = "Safe-Wallet-Custom-Secure-dApp/.github-private";

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${GITHUB_REPO}/issues?labels=safe-proposal`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    const proposals = response.data.map((issue: any) => ({
      title: issue.title,
      url: issue.html_url,
      created_at: issue.created_at,
    }));

    res.status(200).json(proposals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "GitHub proposal fetch failed" });
  }
}
