import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProposalSchema, insertSafeSchema, insertActivitySchema } from "@shared/schema";
import { z } from "zod";
import { 
  notifyNewProposal, 
  notifyProposalSigned, 
  notifyProposalExecuted, 
  notifyProposalRejected,
  notifySystemStatus 
} from "./slack";

export async function registerRoutes(app: Express): Promise<Server> {
  // Safes endpoints
  app.get("/api/safes", async (req, res) => {
    try {
      const safes = await storage.getSafes();
      res.json(safes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch safes" });
    }
  });

  app.get("/api/safes/:address", async (req, res) => {
    try {
      const safe = await storage.getSafe(req.params.address);
      if (!safe) {
        return res.status(404).json({ message: "Safe not found" });
      }
      res.json(safe);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch safe" });
    }
  });

  app.post("/api/safes", async (req, res) => {
    try {
      const safeData = insertSafeSchema.parse(req.body);
      const safe = await storage.createSafe(safeData);
      res.status(201).json(safe);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid safe data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create safe" });
    }
  });

  app.patch("/api/safes/:address", async (req, res) => {
    try {
      const updates = req.body;
      const safe = await storage.updateSafe(req.params.address, updates);
      if (!safe) {
        return res.status(404).json({ message: "Safe not found" });
      }
      res.json(safe);
    } catch (error) {
      res.status(500).json({ message: "Failed to update safe" });
    }
  });

  // Proposals endpoints
  app.get("/api/proposals", async (req, res) => {
    try {
      const safeAddress = req.query.safe as string;
      let proposals;
      
      if (safeAddress) {
        proposals = await storage.getProposalsBySafe(safeAddress);
      } else {
        proposals = await storage.getProposals();
      }
      
      res.json(proposals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch proposals" });
    }
  });

  app.get("/api/proposals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid proposal ID" });
      }
      
      const proposal = await storage.getProposal(id);
      if (!proposal) {
        return res.status(404).json({ message: "Proposal not found" });
      }
      res.json(proposal);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch proposal" });
    }
  });

  app.post("/api/proposals", async (req, res) => {
    try {
      const proposalData = insertProposalSchema.parse(req.body);
      const proposal = await storage.createProposal(proposalData);
      
      // Create activity for new proposal
      await storage.createActivity({
        action: "Proposal created",
        description: proposal.title,
        safeAddress: proposal.safeAddress,
        proposalId: proposal.id
      });

      // Send Slack notification for new proposal
      try {
        await notifyNewProposal({
          title: proposal.title,
          description: proposal.description,
          safeAddress: proposal.safeAddress,
          signatures: proposal.signatures,
          required: proposal.required
        });
      } catch (slackError) {
        console.error("Failed to send Slack notification:", slackError);
      }
      
      res.status(201).json(proposal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid proposal data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create proposal" });
    }
  });

  app.patch("/api/proposals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid proposal ID" });
      }
      
      const updates = req.body;
      const proposal = await storage.updateProposal(id, updates);
      if (!proposal) {
        return res.status(404).json({ message: "Proposal not found" });
      }
      
      // Create activity for proposal updates
      if (updates.status) {
        let action = "Proposal updated";
        if (updates.status === "executed") action = "Proposal executed";
        if (updates.status === "rejected") action = "Proposal rejected";
        
        await storage.createActivity({
          action,
          description: proposal.title,
          safeAddress: proposal.safeAddress,
          proposalId: proposal.id
        });

        // Send Slack notifications based on status
        try {
          if (updates.status === "executed") {
            await notifyProposalExecuted({
              title: proposal.title,
              safeAddress: proposal.safeAddress,
              txHash: proposal.txHash
            });
          } else if (updates.status === "rejected") {
            await notifyProposalRejected({
              title: proposal.title,
              safeAddress: proposal.safeAddress
            });
          }
        } catch (slackError) {
          console.error("Failed to send Slack notification:", slackError);
        }
      }

      // Send notification for signature updates
      if (updates.signatures && !updates.status) {
        try {
          await notifyProposalSigned({
            title: proposal.title,
            safeAddress: proposal.safeAddress,
            signatures: proposal.signatures,
            required: proposal.required,
            status: proposal.status
          });
        } catch (slackError) {
          console.error("Failed to send Slack notification:", slackError);
        }
      }
      
      res.json(proposal);
    } catch (error) {
      res.status(500).json({ message: "Failed to update proposal" });
    }
  });

  // Activities endpoint
  app.get("/api/activities", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const activities = await storage.getActivities(limit);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  app.post("/api/activities", async (req, res) => {
    try {
      const activityData = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(activityData);
      res.status(201).json(activity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid activity data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create activity" });
    }
  });

  // System Status endpoints
  app.get("/api/system-status", async (req, res) => {
    try {
      const statuses = await storage.getSystemStatuses();
      res.json(statuses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch system status" });
    }
  });

  app.patch("/api/system-status/:component", async (req, res) => {
    try {
      const { component } = req.params;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const currentStatuses = await storage.getSystemStatuses();
      const previousStatus = currentStatuses.find(s => s.component === component)?.status;
      
      const updatedStatus = await storage.updateSystemStatus(component, status);

      // Send Slack notification if status changed
      if (previousStatus && previousStatus !== status) {
        try {
          await notifySystemStatus(component, status, previousStatus);
        } catch (slackError) {
          console.error("Failed to send Slack notification:", slackError);
        }
      }
      
      res.json(updatedStatus);
    } catch (error) {
      res.status(500).json({ message: "Failed to update system status" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Slack test endpoint
  app.post("/api/slack/test", async (req, res) => {
    try {
      const { sendSlackMessage } = await import("./slack");
      
      await sendSlackMessage({
        channel: process.env.SLACK_CHANNEL_ID || '#general',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `🧪 *Test Message from Gnosis Vault Dashboard*`
            }
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'This is a test notification to confirm your Slack integration is working correctly!'
            }
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: `✅ Sent at ${new Date().toLocaleString()}`
              }
            ]
          }
        ]
      });

      res.json({ success: true, message: "Test message sent to Slack" });
    } catch (error) {
      console.error("Failed to send test Slack message:", error);
      res.status(500).json({ success: false, message: "Failed to send test message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
