import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

function verifySignature(req) {
  const signature = `sha256=${crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex")}`;

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(req.headers["x-hub-signature-256"])
  );
}

app.post("/github-webhook", (req, res) => {
  if (!verifySignature(req)) {
    return res.status(401).send("Invalid signature");
  }

  const event = req.headers["x-github-event"];
  console.log(`Received ${event} event`, req.body);

  res.status(200).send("OK");
});

app.listen(3000, () => console.log("Listening on port 3000"));
