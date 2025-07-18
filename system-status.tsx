import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const statusColors = {
  running: "bg-green-500",
  online: "bg-green-500",
  active: "bg-green-500",
  syncing: "bg-yellow-500",
  offline: "bg-red-500",
  error: "bg-red-500",
};

const statusLabels = {
  running: "Running",
  online: "Online", 
  active: "Active",
  syncing: "Syncing",
  offline: "Offline",
  error: "Error",
};

export default function SystemStatus() {
  const { data: statuses, isLoading } = useQuery({
    queryKey: ["/api/system-status"],
    queryFn: () => api.systemStatus.getAll(),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const lastUpdated = statuses?.[0]?.lastChecked 
    ? new Date(statuses[0].lastChecked).toLocaleTimeString() 
    : "Unknown";

  return (
    <div className="mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-safe-gray">System Status</h2>
            <span className="text-sm text-safe-gray-light">
              Last updated: {lastUpdated}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {statuses?.map((status) => (
              <div key={status.component} className="flex items-center space-x-3">
                <div 
                  className={`w-3 h-3 rounded-full ${
                    statusColors[status.status as keyof typeof statusColors] || statusColors.offline
                  }`} 
                />
                <div>
                  <p className="text-sm font-medium text-safe-gray">{status.component}</p>
                  <p className="text-xs text-safe-gray-light">
                    {statusLabels[status.status as keyof typeof statusLabels] || status.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
