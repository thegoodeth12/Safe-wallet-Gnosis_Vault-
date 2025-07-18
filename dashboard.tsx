import { Helmet } from "react-helmet-async";
import Header from "@/components/dashboard/header";
import SystemStatus from "@/components/dashboard/system-status";
import VaultOverview from "@/components/dashboard/vault-overview";
import ProposalsTable from "@/components/dashboard/proposals-table";
import ActivitySidebar from "@/components/dashboard/activity-sidebar";

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Gnosis Vault Dashboard - Safe Multisig Management</title>
        <meta name="description" content="Comprehensive Safe multisig vault management dashboard with proposal tracking, multi-chain support, and GitHub Actions integration." />
      </Helmet>
      
      <div className="min-h-screen bg-slate-50">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SystemStatus />
          
          <VaultOverview />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <ProposalsTable />
            </div>
            <div>
              <ActivitySidebar />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
