import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Filter, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  ready: "bg-blue-100 text-blue-800", 
  executed: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function ProposalsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: proposals, isLoading } = useQuery({
    queryKey: ["/api/proposals"],
    queryFn: () => api.proposals.getAll(),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const updateProposalMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: any }) =>
      api.proposals.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/proposals"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({
        title: "Success",
        description: "Proposal updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update proposal",
        variant: "destructive",
      });
    },
  });

  const handleSign = (proposalId: number) => {
    const proposal = proposals?.find(p => p.id === proposalId);
    if (!proposal) return;

    const currentSigs = parseInt(proposal.signatures);
    const required = parseInt(proposal.required);
    const newSigs = currentSigs + 1;
    
    updateProposalMutation.mutate({
      id: proposalId,
      updates: {
        signatures: newSigs.toString(),
        status: newSigs >= required ? "ready" : "pending"
      }
    });
  };

  const handleExecute = (proposalId: number) => {
    updateProposalMutation.mutate({
      id: proposalId,
      updates: {
        status: "executed",
        txHash: `0x${Math.random().toString(16).substring(2, 66)}`
      }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusDisplay = (proposal: any) => {
    if (proposal.status === "pending") {
      return `Pending (${proposal.signatures}/${proposal.required})`;
    }
    if (proposal.status === "ready") {
      return `Ready (${proposal.signatures}/${proposal.required})`;
    }
    return proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1);
  };

  const canSign = (proposal: any) => {
    return proposal.status === "pending" && parseInt(proposal.signatures) < parseInt(proposal.required);
  };

  const canExecute = (proposal: any) => {
    return proposal.status === "ready";
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-28" />
              </div>
            </div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 border rounded">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-safe-gray">Live Proposals</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Filter className="mr-1 h-3 w-3" />
              Filter
            </Button>
            <Button size="sm" className="bg-safe-green hover:bg-safe-green-dark text-white text-xs">
              <Plus className="mr-1 h-3 w-3" />
              New Proposal
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="text-xs font-medium text-safe-gray-light uppercase tracking-wider">
                  Date
                </TableHead>
                <TableHead className="text-xs font-medium text-safe-gray-light uppercase tracking-wider">
                  Description
                </TableHead>
                <TableHead className="text-xs font-medium text-safe-gray-light uppercase tracking-wider">
                  Safe
                </TableHead>
                <TableHead className="text-xs font-medium text-safe-gray-light uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="text-xs font-medium text-safe-gray-light uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposals?.map((proposal) => (
                <TableRow key={proposal.id} className="hover:bg-slate-50">
                  <TableCell className="text-sm text-safe-gray">
                    {formatDate(proposal.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-safe-gray">{proposal.title}</div>
                    <div className="text-xs text-safe-gray-light">{proposal.description}</div>
                  </TableCell>
                  <TableCell className="text-sm font-mono text-safe-gray">
                    {proposal.safeAddress}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={`text-xs font-medium rounded-full ${
                        statusColors[proposal.status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {getStatusDisplay(proposal)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {canSign(proposal) && (
                      <Button
                        variant="link"
                        size="sm"
                        className="text-safe-green hover:text-safe-green-dark font-medium p-0 h-auto"
                        onClick={() => handleSign(proposal.id)}
                        disabled={updateProposalMutation.isPending}
                      >
                        Sign
                      </Button>
                    )}
                    {canExecute(proposal) && (
                      <Button
                        variant="link"
                        size="sm"
                        className="text-safe-green hover:text-safe-green-dark font-medium p-0 h-auto"
                        onClick={() => handleExecute(proposal.id)}
                        disabled={updateProposalMutation.isPending}
                      >
                        Execute
                      </Button>
                    )}
                    {proposal.status === "executed" || proposal.status === "rejected" ? (
                      <Button
                        variant="link"
                        size="sm"
                        className="text-safe-gray-light cursor-not-allowed p-0 h-auto"
                        disabled
                      >
                        View
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
          <p className="text-sm text-safe-gray-light">
            Showing {proposals?.length || 0} proposals
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-safe-gray-light hover:text-safe-gray"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-safe-green text-white"
            >
              {currentPage}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-safe-gray-light hover:text-safe-gray"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
