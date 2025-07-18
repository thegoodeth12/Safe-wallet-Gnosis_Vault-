import { apiRequest } from "./queryClient";
import type { Safe, Proposal, Activity, SystemStatus } from "@shared/schema";

export const api = {
  // Safes
  safes: {
    getAll: (): Promise<Safe[]> => 
      apiRequest("GET", "/api/safes").then(res => res.json()),
    
    getByAddress: (address: string): Promise<Safe> =>
      apiRequest("GET", `/api/safes/${address}`).then(res => res.json()),
    
    create: (safe: Omit<Safe, "id" | "createdAt">): Promise<Safe> =>
      apiRequest("POST", "/api/safes", safe).then(res => res.json()),
    
    update: (address: string, updates: Partial<Safe>): Promise<Safe> =>
      apiRequest("PATCH", `/api/safes/${address}`, updates).then(res => res.json()),
  },

  // Proposals
  proposals: {
    getAll: (safeAddress?: string): Promise<Proposal[]> => {
      const url = safeAddress ? `/api/proposals?safe=${safeAddress}` : "/api/proposals";
      return apiRequest("GET", url).then(res => res.json());
    },
    
    getById: (id: number): Promise<Proposal> =>
      apiRequest("GET", `/api/proposals/${id}`).then(res => res.json()),
    
    create: (proposal: Omit<Proposal, "id" | "createdAt" | "executedAt">): Promise<Proposal> =>
      apiRequest("POST", "/api/proposals", proposal).then(res => res.json()),
    
    update: (id: number, updates: Partial<Proposal>): Promise<Proposal> =>
      apiRequest("PATCH", `/api/proposals/${id}`, updates).then(res => res.json()),
  },

  // Activities
  activities: {
    getAll: (limit?: number): Promise<Activity[]> => {
      const url = limit ? `/api/activities?limit=${limit}` : "/api/activities";
      return apiRequest("GET", url).then(res => res.json());
    },
    
    create: (activity: Omit<Activity, "id" | "createdAt">): Promise<Activity> =>
      apiRequest("POST", "/api/activities", activity).then(res => res.json()),
  },

  // System Status
  systemStatus: {
    getAll: (): Promise<SystemStatus[]> =>
      apiRequest("GET", "/api/system-status").then(res => res.json()),
    
    update: (component: string, status: string): Promise<SystemStatus> =>
      apiRequest("PATCH", `/api/system-status/${component}`, { status }).then(res => res.json()),
  },
};
