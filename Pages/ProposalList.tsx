// components/ProposalList.tsx
import { Box, Text, Link, VStack, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Proposal {
  title: string;
  url: string;
  created_at: string;
}

export default function ProposalList() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const res = await axios.get("/api/proposals"); // You’ll build this backend API
        setProposals(res.data);
      } catch (e) {
        console.error("Error fetching proposals:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  if (loading) return <Spinner />;

  return (
    <Box p={4}>
      <Text fontWeight="bold" mb={2}>🔐 Safe Proposals from GitHub</Text>
      <VStack align="start" spacing={3}>
        {proposals.map((p, i) => (
          <Box key={i}>
            <Link href={p.url} color="blue.500" isExternal>{p.title}</Link>
            <Text fontSize="xs" color="gray.500">{new Date(p.created_at).toLocaleString()}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
