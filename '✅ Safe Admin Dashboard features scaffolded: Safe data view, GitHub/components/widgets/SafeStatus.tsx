'use client';
import { useEffect, useState } from 'react';
import { useGitHubStatus } from '@/hooks/useGitHubStatus';

export default function GitHubStatus() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    useGitHubStatus().then(setStatus);
  }, []);

  if (!status) return <div>Loading GitHub data...</div>;

  return (
    <div className="widget">
      <h3>📦 GitHub Repo</h3>
      <p>⭐ Stars: {status.stars}</p>
      <p>🔀 Forks: {status.forks}</p>
      <p>🐛 Open Issues: {status.openIssues}</p>
    </div>
  );
}
