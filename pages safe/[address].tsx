import { useRouter } from "next/router";
import SafeOwners from "@/components/SafeOwners";
import ProposalList from "@/components/ProposalList";
import { Box, Heading } from "@chakra-ui/react";

export default function SafeDashboardPage() {
  const { query } = useRouter();
  const safeAddress = query.address as string;

  if (!safeAddress) return null;

  return (
    <Box p={8}>
      <Heading size="lg">🔐 Safe Dashboard</Heading>
      <Box mt={6}>
        <SafeOwners safeAddress={safeAddress} />
        <ProposalList safeAddress={safeAddress} />
      </Box>
    </Box>
  );
}
