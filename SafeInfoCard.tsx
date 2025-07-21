// components/SafeInfoCard.tsx
import { Box, Text, Heading, Badge, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Safe, { EthersAdapter } from "@safe-global/safe-core-sdk";
import SafeApiKit from "@safe-global/api-kit";

interface Props {
  safeAddress: string;
}

export default function SafeInfoCard({ safeAddress }: Props) {
  const [loading, setLoading] = useState(true);
  const [owners, setOwners] = useState<string[]>([]);
  const [threshold, setThreshold] = useState<number>(0);

  useEffect(() => {
    const fetchSafe = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/arbitrum");
        const signer = provider.getSigner();
        const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: signer });
        const safeSdk = await Safe.create({ ethAdapter, safeAddress });

        const ownerList = await safeSdk.getOwners();
        const threshold = await safeSdk.getThreshold();

        setOwners(ownerList);
        setThreshold(threshold);
        setLoading(false);
      } catch (e) {
        console.error("Error loading Safe:", e);
        setLoading(false);
      }
    };

    fetchSafe();
  }, [safeAddress]);

  if (loading) return <Spinner />;

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" shadow="md" bg="gray.50">
      <Heading size="md" mb={2}>Safe Address</Heading>
      <Text fontSize="sm" mb={4}>{safeAddress}</Text>

      <Text><strong>Threshold:</strong> {threshold}</Text>

      <Text mt={2}><strong>Owners:</strong></Text>
      {owners.map((owner) => (
        <Badge key={owner} colorScheme="teal" mr={2}>{owner}</Badge>
      ))}
    </Box>
  );
}
