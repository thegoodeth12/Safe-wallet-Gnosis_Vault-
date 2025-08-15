import { useEffect, useState } from "react";
import { Box, Text, Stack, Tag, Spinner } from "@chakra-ui/react";

export default function ProposalList({ safeAddress }: { safeAddress: string }) {
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProposals() {
      const res = await fetch(`/api/proposals?safe=${safeAddress}`);
      const data = await res.json();
      setProposals(data.results || []);
      setLoading(false);
    }

    fetchProposals();
  }, [safeAddress]);

  if (loading) return <Spinner />;

  return (
    <Box mt={8}>
      <Text fontSize="lg" mb={4}>📜 Safe Proposals</Text>
      <Stack spacing={3}>
        {proposals.length === 0 ? (
          <Text>No proposals found.</Text>
        ) : (
          proposals.map((tx, idx) => (
            <Box key={idx} p={4} border="1px solid #eee" borderRadius="md">
              <Text fontSize="sm" fontFamily="mono">{tx.to}</Text>
              <Tag mt={1} colorScheme={tx.isExecuted ? "green" : "yellow"}>
                {tx.isExecuted ? "Executed" : "Pending"}
              </Tag>
            </Box>
          ))
        )}
      </Stack>
    </Box>
  );
}
