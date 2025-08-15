import SafeStatus from '@/components/widgets/SafeStatus';
import GitHubStatus from '@/components/widgets/GitHubStatus';
import SlackStatus from '@/components/widgets/SlackStatus';

export default function Dashboard() {
  return (
    <main className="dashboard">
      <h1>🛡️ Safe Admin Dashboard</h1>
      <div className="grid">
        <SafeStatus />
        <GitHubStatus />
        <SlackStatus />
      </div>
    </main>
  );
}
