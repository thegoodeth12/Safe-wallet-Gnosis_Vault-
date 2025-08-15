// components/SettingsPanel.tsx
import { Box, Switch, Text, Stack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { sendSlackNotification } from "../lib/slack";

export default function SettingsPanel() {
  const [slackEnabled, setSlackEnabled] = useState(true);
  const toast = useToast();

  const handleSlackToggle = async () => {
    setSlackEnabled(!slackEnabled);
    toast({
      title: slackEnabled ? "Slack alerts disabled" : "Slack alerts enabled",
      status: slackEnabled ? "warning" : "success",
      duration: 2000,
      isClosable: true,
    });

    if (!slackEnabled) {
      await sendSlackNotification("✅ Slack notifications activated in Safe Dashboard");
    }
  };

  return (
    <Box p={4} mt={4} borderTop="1px solid lightgray">
      <Text fontWeight="bold" mb={2}>⚙️ Dashboard Settings</Text>
      <Stack direction="row" align="center">
        <Text>Slack Alerts</Text>
        <Switch isChecked={slackEnabled} onChange={handleSlackToggle} />
      </Stack>
    </Box>
  );
}
