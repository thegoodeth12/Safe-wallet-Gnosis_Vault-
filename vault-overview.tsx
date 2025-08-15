import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Vault, Shield, Key } from "lucide-react";

const vaultIcons = {
  "Legacy Vault": Vault,
  "Primary Org Vault": Shield,
  "Signer Key Vault": Key,
};

const vaultGradients = {
  "Legacy Vault": "from-green-400 to-blue-500",
  "Primary Org Vault": "from-purple-400 to-pink-500", 
  "Signer Key Vault": "from-orange-400 to-red-500",
};

export default function VaultOverview() {
  const { data: safes, isLoading } = useQuery({
    queryKey: ["/api/safes"],
    queryFn: () => api.safes.getAll(),
    refetchInterval: 60000, // Refetch every minute
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div>
                    <Skeleton className="h-5 w-24 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
              <div className="space-y-3">
                <div>
                  <Skeleton className="h-3 w-20 mb-1" />
                  <Skeleton className="h-8 w-full rounded" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <Skeleton className="h-3 w-12 mb-1" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-3 w-16 mb-1" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {safes?.map((safe) => {
        const Icon = vaultIcons[safe.name as keyof typeof vaultIcons] || Vault;
        const gradient = vaultGradients[safe.name as keyof typeof vaultGradients] || vaultGradients["Legacy Vault"];
        
        return (
          <Card key={safe.address}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center`}>
                    <Icon className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-safe-gray">{safe.name}</h3>
                    <p className="text-xs text-safe-gray-light">{safe.network}</p>
                  </div>
                </div>
                <Badge 
                  variant={safe.status === "active" ? "default" : "secondary"}
                  className={safe.status === "active" ? "bg-green-100 text-green-800" : ""}
                >
                  {safe.status === "active" ? "Active" : safe.status}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-safe-gray-light mb-1">Safe Address</p>
                  <p className="text-sm font-mono text-safe-gray bg-slate-50 p-2 rounded">
                    {safe.address}
                  </p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-safe-gray-light">Balance</p>
                    <p className="text-lg font-semibold text-safe-gray">{safe.balance}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-safe-gray-light">Threshold</p>
                    <p className="text-lg font-semibold text-safe-gray">{safe.threshold}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
