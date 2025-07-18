import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Send, Settings, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const notificationTypes = [
  { id: "new_proposal", label: "New Proposals", icon: "🔔", enabled: true },
  { id: "proposal_signed", label: "Signature Updates", icon: "✍️", enabled: true },
  { id: "proposal_executed", label: "Execution Alerts", icon: "🚀", enabled: true },
  { id: "system_status", label: "System Status Changes", icon: "⚡", enabled: true },
  { id: "daily_summary", label: "Daily Summaries", icon: "📊", enabled: false },
];

export default function SlackIntegration() {
  const [testSent, setTestSent] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const sendTestMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/slack/test"),
    onSuccess: () => {
      setTestSent(true);
      toast({
        title: "Test message sent!",
        description: "Check your Slack channel for the test notification.",
      });
      setTimeout(() => setTestSent(false), 3000);
    },
    onError: () => {
      toast({
        title: "Test failed",
        description: "Make sure your Slack credentials are configured correctly.",
        variant: "destructive",
      });
    },
  });

  const handleTestMessage = () => {
    sendTestMutation.mutate();
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="text-white h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-safe-gray">Slack Notifications</h3>
              <p className="text-sm text-safe-gray-light">Receive real-time updates in Slack</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">
            Configured
          </Badge>
        </div>

        <div className="space-y-4 mb-6">
          <h4 className="text-sm font-medium text-safe-gray">Notification Types</h4>
          <div className="grid grid-cols-1 gap-3">
            {notificationTypes.map((type) => (
              <div key={type.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{type.icon}</span>
                  <span className="text-sm font-medium text-safe-gray">{type.label}</span>
                </div>
                <Badge 
                  className={`text-xs ${
                    type.enabled 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {type.enabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleTestMessage}
            disabled={sendTestMutation.isPending}
          >
            {sendTestMutation.isPending ? (
              <Send className="mr-2 h-4 w-4 animate-spin" />
            ) : testSent ? (
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            {testSent ? "Message Sent!" : "Send Test Message"}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-safe-gray-light hover:text-safe-gray"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Channel:</strong> Notifications are sent to your configured Slack channel. 
            Make sure the bot has permission to post messages.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}