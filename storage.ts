import { 
  safes, 
  proposals, 
  activities, 
  systemStatus,
  type Safe, 
  type InsertSafe,
  type Proposal,
  type InsertProposal,
  type Activity,
  type InsertActivity,
  type SystemStatus,
  type InsertSystemStatus
} from "@shared/schema";

export interface IStorage {
  // Safes
  getSafes(): Promise<Safe[]>;
  getSafe(address: string): Promise<Safe | undefined>;
  createSafe(safe: InsertSafe): Promise<Safe>;
  updateSafe(address: string, updates: Partial<InsertSafe>): Promise<Safe | undefined>;

  // Proposals
  getProposals(): Promise<Proposal[]>;
  getProposal(id: number): Promise<Proposal | undefined>;
  getProposalsBySafe(safeAddress: string): Promise<Proposal[]>;
  createProposal(proposal: InsertProposal): Promise<Proposal>;
  updateProposal(id: number, updates: Partial<InsertProposal>): Promise<Proposal | undefined>;

  // Activities
  getActivities(limit?: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;

  // System Status
  getSystemStatuses(): Promise<SystemStatus[]>;
  updateSystemStatus(component: string, status: string): Promise<SystemStatus>;
}

export class MemStorage implements IStorage {
  private safes: Map<string, Safe> = new Map();
  private proposals: Map<number, Proposal> = new Map();
  private activities: Activity[] = [];
  private systemStatuses: Map<string, SystemStatus> = new Map();
  private currentSafeId = 1;
  private currentProposalId = 1;
  private currentActivityId = 1;
  private currentStatusId = 1;

  constructor() {
    // Initialize with mock data
    this.initializeData();
  }

  private initializeData() {
    // Initialize Safes
    const mockSafes: InsertSafe[] = [
      {
        name: "Legacy Vault",
        address: "0x10A1...2e4f",
        network: "Ethereum",
        balance: "12.45 ETH",
        threshold: "2 of 3",
        status: "active"
      },
      {
        name: "Primary Org Vault",
        address: "0x821f...Ed675",
        network: "Arbitrum",
        balance: "8.92 ETH",
        threshold: "3 of 5",
        status: "active"
      },
      {
        name: "Signer Key Vault",
        address: "0xAfD5...A0A0",
        network: "Ethereum",
        balance: "2.18 ETH",
        threshold: "2 of 2",
        status: "active"
      }
    ];

    mockSafes.forEach(safe => {
      const newSafe: Safe = { 
        ...safe, 
        id: this.currentSafeId++, 
        createdAt: new Date() 
      };
      this.safes.set(safe.address, newSafe);
    });

    // Initialize Proposals
    const mockProposals: InsertProposal[] = [
      {
        safeAddress: "0x821f...Ed675",
        title: "Transfer 5 ETH to Development Fund",
        description: "Monthly allocation for development expenses",
        status: "pending",
        signatures: "2",
        required: "3"
      },
      {
        safeAddress: "0x10A1...2e4f",
        title: "Add New Signer: 0x123...456",
        description: "Onboard new team member as vault signer",
        status: "executed",
        signatures: "2",
        required: "2",
        txHash: "0xabc...def"
      },
      {
        safeAddress: "0x821f...Ed675",
        title: "Update Safe Configuration",
        description: "Change threshold from 2/3 to 3/5 signers",
        status: "ready",
        signatures: "3",
        required: "3"
      },
      {
        safeAddress: "0xAfD5...A0A0",
        title: "Emergency Fund Withdrawal",
        description: "Withdraw 2 ETH for urgent infrastructure costs",
        status: "rejected",
        signatures: "1",
        required: "2"
      }
    ];

    mockProposals.forEach(proposal => {
      const newProposal: Proposal = { 
        ...proposal, 
        id: this.currentProposalId++, 
        createdAt: new Date(),
        executedAt: proposal.status === "executed" ? new Date() : null
      };
      this.proposals.set(newProposal.id, newProposal);
    });

    // Initialize Activities
    const mockActivities: InsertActivity[] = [
      {
        action: "Proposal executed",
        description: "Add New Signer: 0x123...456",
        safeAddress: "0x10A1...2e4f",
        proposalId: 2
      },
      {
        action: "New signature",
        description: "thegoodeth12 signed proposal",
        safeAddress: "0x821f...Ed675",
        proposalId: 1
      },
      {
        action: "Proposal created",
        description: "Transfer 5 ETH to Development Fund",
        safeAddress: "0x821f...Ed675",
        proposalId: 1
      },
      {
        action: "GitHub sync",
        description: "README updated with latest data",
        safeAddress: null,
        proposalId: null
      }
    ];

    mockActivities.forEach(activity => {
      const newActivity: Activity = { 
        ...activity, 
        id: this.currentActivityId++, 
        createdAt: new Date(Date.now() - Math.random() * 86400000) // Random time in last 24h
      };
      this.activities.push(newActivity);
    });

    // Initialize System Status
    const mockStatuses: InsertSystemStatus[] = [
      { component: "GitHub Actions", status: "running" },
      { component: "Vercel UI", status: "online" },
      { component: "Replit Preview", status: "active" },
      { component: "Safe API", status: "syncing" }
    ];

    mockStatuses.forEach(status => {
      const newStatus: SystemStatus = { 
        ...status, 
        id: this.currentStatusId++, 
        lastChecked: new Date() 
      };
      this.systemStatuses.set(status.component, newStatus);
    });
  }

  // Safes
  async getSafes(): Promise<Safe[]> {
    return Array.from(this.safes.values());
  }

  async getSafe(address: string): Promise<Safe | undefined> {
    return this.safes.get(address);
  }

  async createSafe(safe: InsertSafe): Promise<Safe> {
    const newSafe: Safe = { 
      ...safe, 
      id: this.currentSafeId++, 
      createdAt: new Date() 
    };
    this.safes.set(safe.address, newSafe);
    return newSafe;
  }

  async updateSafe(address: string, updates: Partial<InsertSafe>): Promise<Safe | undefined> {
    const existingSafe = this.safes.get(address);
    if (!existingSafe) return undefined;

    const updatedSafe = { ...existingSafe, ...updates };
    this.safes.set(address, updatedSafe);
    return updatedSafe;
  }

  // Proposals
  async getProposals(): Promise<Proposal[]> {
    return Array.from(this.proposals.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getProposal(id: number): Promise<Proposal | undefined> {
    return this.proposals.get(id);
  }

  async getProposalsBySafe(safeAddress: string): Promise<Proposal[]> {
    return Array.from(this.proposals.values())
      .filter(p => p.safeAddress === safeAddress)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createProposal(proposal: InsertProposal): Promise<Proposal> {
    const newProposal: Proposal = { 
      ...proposal, 
      id: this.currentProposalId++, 
      createdAt: new Date(),
      executedAt: null
    };
    this.proposals.set(newProposal.id, newProposal);
    return newProposal;
  }

  async updateProposal(id: number, updates: Partial<InsertProposal>): Promise<Proposal | undefined> {
    const existingProposal = this.proposals.get(id);
    if (!existingProposal) return undefined;

    const updatedProposal = { 
      ...existingProposal, 
      ...updates,
      executedAt: updates.status === "executed" ? new Date() : existingProposal.executedAt
    };
    this.proposals.set(id, updatedProposal);
    return updatedProposal;
  }

  // Activities
  async getActivities(limit = 10): Promise<Activity[]> {
    return this.activities
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const newActivity: Activity = { 
      ...activity, 
      id: this.currentActivityId++, 
      createdAt: new Date() 
    };
    this.activities.push(newActivity);
    return newActivity;
  }

  // System Status
  async getSystemStatuses(): Promise<SystemStatus[]> {
    return Array.from(this.systemStatuses.values());
  }

  async updateSystemStatus(component: string, status: string): Promise<SystemStatus> {
    const existing = this.systemStatuses.get(component);
    if (existing) {
      const updated = { ...existing, status, lastChecked: new Date() };
      this.systemStatuses.set(component, updated);
      return updated;
    } else {
      const newStatus: SystemStatus = {
        id: this.currentStatusId++,
        component,
        status,
        lastChecked: new Date()
      };
      this.systemStatuses.set(component, newStatus);
      return newStatus;
    }
  }
}

export const storage = new MemStorage();
