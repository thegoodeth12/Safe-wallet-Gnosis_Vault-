// /pages/api/github.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const event = req.headers["x-github-event"];
  const body = req.body;

  if (event === "pull_request" && body.action === "opened") {
    const prTitle = body.pull_request.title;
    const proposer = process.env.NEXT_PUBLIC_SIGNER;

    // Create a dummy Safe transaction for demo (replace with actual logic)
    console.log(`Auto-proposing tx for PR: ${prTitle} by ${proposer}`);
    // TODO: Post to Safe transaction service
  }

  res.status(200).json({ ok: true });
}
