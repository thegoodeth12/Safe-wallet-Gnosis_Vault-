import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Text, Spinner } from "@chakra-ui/react";

export default function SafeView() {
  const { query } = useRouter();
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSafe() {
      const safeAddress = query.address as string;
      if (!safeAddress) return;

      const res = await fetch(`https://safe-transaction-arbitrum.safe.global/api/v1/safes/${safeAddress}`);
      const data = await res.json();
      setBalance(data.ethBalance / 1e18 + ' ETH');
      setLoading(false);
    }

    fetchSafe();
  }, [query.address]);

  return (
    <Box p={8}>
      {loading ? <Spinner /> : <Text fontSize="xl">Balance: {balance}</Text>}
    </Box>
  );
}
