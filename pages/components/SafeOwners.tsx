import { useEffect, useState } from "react";
import { Box, Text, Stack, Tag, Spinner } from "@chakra-ui/react";

interface Owner {
  address: string;
  name?: string;
}

export default function SafeOwners({ safeAddress }: { safeAddress: string }) {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [threshold, setThreshold] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const primarySigner = process.env.NEXT_PUBLIC_SIGNER?.toLowerCase();

  useEffect(() => {
    async function fetchOwners() {
      const res = await fetch(`https://safe-transaction-arbitrum.safe.global/api/v1/safes/${safeAddress}`);
      const data = await res.json();
      setOwners(data.owners);
      setThreshold(data.threshold);
      setLoading(false);
    }

    fetchOwners();
  }, [safeAddress]);

  if (loading) return <Spinner />;

  return (
    <Box border="1px solid #eee" p={5} borderRadius="lg" mt={8}>
      <Text fontSize="lg" mb={4}>🧑‍🤝‍🧑 Safe Owners (Threshold: {threshold})</Text>
      <Stack spacing={3}>
        {owners.map((owner, index) => (
          <Box key={index} display="flex" alignItems="center" justifyContent="space-between">
            <Text fontFamily="mono">{owner.address}</Text>
            <Tag colorScheme={owner.address.toLowerCase() === primarySigner ? "green" : "gray"}>
              {owner.address.toLowerCase() === primarySigner ? "Primary Signer" : "Signer"}
            </Tag>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
