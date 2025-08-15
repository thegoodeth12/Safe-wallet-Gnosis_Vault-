export default async function useSlackStatus() {
  const hook = process.env.NEXT_PUBLIC_SLACK_WEBHOOK!;
  try {
    const res = await fetch(hook, {
      method: 'POST',
      body: JSON.stringify({ text: "Ping from Safe Admin Dashboard 🛡️" }),
      headers: { 'Content-Type': 'application/json' },
    });
    return { connected: res.ok, lastPing: new Date().toISOString() };
  } catch {
    return { connected: false, lastPing: null };
  }
}
