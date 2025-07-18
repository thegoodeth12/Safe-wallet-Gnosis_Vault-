import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import SlackIntegration from "./slack-integration";
import { 
  Check, 
  Signature, 
  Plus, 
  RotateCw, 
  UserPlus, 
  Download, 
  Settings,
  Rocket,
  Code,
  Github
} from "lucide-react";

const activityIcons = {
  "Proposal executed": Check,
  "New signature": Signature,
  "Proposal created": Plus,
  "GitHub sync": RotateCw,
  "Proposal updated": Settings,
  "Proposal rejected": Check,
};

const activityColors = {
  "Proposal executed": "bg-green-100 text-green-600",
  "New signature": "bg-blue-100 text-blue-600",
  "Proposal created": "bg-yellow-100 text-yellow-600",
  "GitHub sync": "bg-purple-100 text-purple-600",
  "Proposal updated": "bg-gray-100 text-gray-600",
  "Proposal rejected": "bg-red-100 text-red-600",
};

export default function ActivitySidebar() {
  const { toast } = useToast();
  
  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ["/api/activities"],
    queryFn: () => api.activities.getAll(4),
    refetchInterval: 30000,
  });

  const { data: systemStatuses, isLoading: statusLoading } = useQuery({
    queryKey: ["/api/system-status"],
    queryFn: () => api.systemStatus.getAll(),
  });

  const handleQuickAction = (action: string) => {
    toast({
      title: "Info",
      description: `${action} feature coming soon!`,
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const environmentStatuses = [
    { name: "Vercel", icon: Rocket, status: "online", color: "text-green-600" },
    { name: "Replit", icon: Code, status: "active", color: "text-blue-600" },
    { name: "GitHub", icon: Github, status: "synced", color: "text-gray-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Recent Activity */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-safe-gray mb-4">Recent Activity</h3>
          
          {activitiesLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {activities?.map((activity) => {
                const Icon = activityIcons[activity.action as keyof typeof activityIcons] || Check;
                const colorClass = activityColors[activity.action as keyof typeof activityColors] || activityColors["Proposal executed"];
                
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-safe-gray">{activity.action}</p>
                      <p className="text-xs text-safe-gray-light">{activity.description}</p>
                      <p className="text-xs text-safe-gray-light">{formatTimeAgo(activity.createdAt)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-safe-gray mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button
              variant="ghost"
              className="w-full justify-start p-3 h-auto bg-slate-50 hover:bg-slate-100"
              onClick={() => handleQuickAction("Create Proposal")}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-safe-green rounded-lg flex items-center justify-center">
                  <Plus className="text-white h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-safe-gray">Create Proposal</p>
                  <p className="text-xs text-safe-gray-light">Start a new transaction</p>
                </div>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start p-3 h-auto bg-slate-50 hover:bg-slate-100"
              onClick={() => handleQuickAction("Add Signer")}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <UserPlus className="text-white h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-safe-gray">Add Signer</p>
                  <p className="text-xs text-safe-gray-light">Invite new vault member</p>
                </div>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start p-3 h-auto bg-slate-50 hover:bg-slate-100"
              onClick={() => handleQuickAction("Export Data")}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Download className="text-white h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-safe-gray">Export Data</p>
                  <p className="text-xs text-safe-gray-light">Download transaction history</p>
                </div>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start p-3 h-auto bg-slate-50 hover:bg-slate-100"
              onClick={() => handleQuickAction("Settings")}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                  <Settings className="text-white h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-safe-gray">Settings</p>
                  <p className="text-xs text-safe-gray-light">Configure vault preferences</p>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Environment Status */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-safe-gray mb-4">Environments</h3>
          
          {statusLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="w-16 h-4" />
                  </div>
                  <Skeleton className="w-12 h-5 rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {environmentStatuses.map((env) => {
                const Icon = env.icon;
                const statusText = env.status.charAt(0).toUpperCase() + env.status.slice(1);
                
                return (
                  <div key={env.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-4 w-4 ${env.color}`} />
                      <span className="text-sm font-medium text-safe-gray">{env.name}</span>
                    </div>
                    <Badge 
                      className={`text-xs ${
                        env.status === "online" || env.status === "synced" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {statusText}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Slack Integration */}
      <SlackIntegration />
    </div>
  );
}
