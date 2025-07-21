// pages/index.tsx
import { Box, Container, Heading, Divider } from "@chakra-ui/react";
import SafeInfoCard from "../components/SafeInfoCard";
import ProposalList from "../components/ProposalList";
import SettingsPanel from "../components/SettingsPanel";

export default function Home() {
  return (
    <Container maxW="container.md" py={6}>
      <Heading mb={4}>🛡️ Gnosis Vault Dashboard</Heading>
      <SafeInfoCard safeAddress="0x821f2b40d965b81202b181Aba1c7a380C49Ed675" />
      <Divider my={6} />
      <ProposalList />
      <Divider my={6} />
      <SettingsPanel />
    </Container>
  );
}
