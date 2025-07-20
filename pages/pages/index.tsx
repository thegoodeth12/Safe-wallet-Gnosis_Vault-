import { Box, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Box p={10}>
      <Heading size="xl">🔐 Safe Wallet Dashboard</Heading>
      <Text mt={4}>View Safe balances, owners, proposals, and more.</Text>
      <Link href={`/safe/${process.env.NEXT_PUBLIC_SAFE_ADDRESS}`}>
        <Button mt={6} colorScheme="teal">Go to Safe</Button>
      </Link>
    </Box>
  );
}
