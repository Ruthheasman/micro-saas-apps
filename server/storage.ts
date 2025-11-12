import {
  users,
  apps,
  appUsage,
  agents,
  agentRuns,
  creditTransactions,
  type User,
  type UpsertUser,
  type App,
  type InsertApp,
  type AppUsage,
  type InsertAppUsage,
  type Agent,
  type InsertAgent,
  type AgentRun,
  type InsertAgentRun,
  type CreditTransaction,
  type InsertCreditTransaction,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql, inArray, gt } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  createApp(app: InsertApp): Promise<App>;
  getApp(id: string): Promise<App | undefined>;
  getAppsByUser(userId: string): Promise<App[]>;
  getAllApps(): Promise<App[]>;
  updateApp(id: string, updates: Partial<InsertApp>): Promise<App | undefined>;
  deleteApp(id: string): Promise<void>;
  
  createAppUsage(usage: InsertAppUsage): Promise<AppUsage>;
  getAppUsageByApp(appId: string): Promise<AppUsage[]>;
  getAppUsageByUser(userId: string): Promise<AppUsage[]>;
  getUserStats(userId: string): Promise<{
    totalApps: number;
    totalRevenue: string;
    totalUses: number;
  }>;

  getUserCredits(userId: string): Promise<number>;
  addCredits(userId: string, amount: number, txId?: string): Promise<User>;
  deductCredits(userId: string, amount: number, description: string): Promise<User>;
  createCreditTransaction(transaction: InsertCreditTransaction): Promise<CreditTransaction>;
  getUserCreditTransactions(userId: string): Promise<CreditTransaction[]>;

  createAgent(agent: InsertAgent): Promise<Agent>;
  getAgent(id: string): Promise<Agent | undefined>;
  getAgentsByUser(userId: string): Promise<Agent[]>;
  getAllAgents(category?: string): Promise<Agent[]>;
  getFeaturedAgents(): Promise<Agent[]>;
  updateAgent(id: string, updates: Partial<InsertAgent>): Promise<Agent | undefined>;
  deleteAgent(id: string): Promise<void>;
  incrementAgentUsage(id: string): Promise<void>;

  createAgentRun(run: InsertAgentRun): Promise<AgentRun>;
  getAgentRun(id: string): Promise<AgentRun | undefined>;
  updateAgentRun(id: string, updates: Partial<InsertAgentRun>): Promise<AgentRun | undefined>;
  getAgentRunsByUser(userId: string): Promise<AgentRun[]>;
  getAgentRunsByAgent(agentId: string): Promise<AgentRun[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async createApp(appData: InsertApp): Promise<App> {
    const [app] = await db.insert(apps).values(appData).returning();
    return app;
  }

  async getApp(id: string): Promise<App | undefined> {
    const [app] = await db.select().from(apps).where(eq(apps.id, id));
    return app;
  }

  async getAppsByUser(userId: string): Promise<App[]> {
    return db
      .select()
      .from(apps)
      .where(eq(apps.userId, userId))
      .orderBy(desc(apps.createdAt));
  }

  async getAllApps(): Promise<App[]> {
    return db
      .select()
      .from(apps)
      .where(eq(apps.status, "deployed"))
      .orderBy(desc(apps.createdAt));
  }

  async updateApp(id: string, updates: Partial<InsertApp>): Promise<App | undefined> {
    const [app] = await db
      .update(apps)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(apps.id, id))
      .returning();
    return app;
  }

  async deleteApp(id: string): Promise<void> {
    await db.delete(apps).where(eq(apps.id, id));
  }

  async createAppUsage(usageData: InsertAppUsage): Promise<AppUsage> {
    const [usage] = await db.insert(appUsage).values(usageData).returning();
    return usage;
  }

  async getAppUsageByApp(appId: string): Promise<AppUsage[]> {
    return db
      .select()
      .from(appUsage)
      .where(eq(appUsage.appId, appId))
      .orderBy(desc(appUsage.createdAt));
  }

  async getAppUsageByUser(userId: string): Promise<AppUsage[]> {
    return db
      .select()
      .from(appUsage)
      .where(eq(appUsage.userId, userId))
      .orderBy(desc(appUsage.createdAt));
  }

  async getUserStats(userId: string): Promise<{
    totalApps: number;
    totalRevenue: string;
    totalUses: number;
  }> {
    const userApps = await this.getAppsByUser(userId);
    const appIds = userApps.map(app => app.id);

    if (appIds.length === 0) {
      return {
        totalApps: 0,
        totalRevenue: "0",
        totalUses: 0,
      };
    }

    const [stats] = await db
      .select({
        totalRevenue: sql<string>`COALESCE(SUM(${appUsage.amount}), 0)`,
        totalUses: sql<number>`COUNT(*)`,
      })
      .from(appUsage)
      .where(inArray(appUsage.appId, appIds));

    return {
      totalApps: userApps.length,
      totalRevenue: stats?.totalRevenue || "0",
      totalUses: stats?.totalUses || 0,
    };
  }

  async getUserCredits(userId: string): Promise<number> {
    const user = await this.getUser(userId);
    return user?.creditBalance || 0;
  }

  async addCredits(userId: string, amount: number, txId?: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        creditBalance: sql`${users.creditBalance} + ${amount}`,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    await this.createCreditTransaction({
      userId,
      amount,
      type: "purchase",
      description: "Credit purchase",
      txId,
    });

    return user;
  }

  async deductCredits(userId: string, amount: number, description: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        creditBalance: sql`${users.creditBalance} - ${amount}`,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    await this.createCreditTransaction({
      userId,
      amount: -amount,
      type: "usage",
      description,
    });

    return user;
  }

  async createCreditTransaction(transactionData: InsertCreditTransaction): Promise<CreditTransaction> {
    const [transaction] = await db.insert(creditTransactions).values(transactionData).returning();
    return transaction;
  }

  async getUserCreditTransactions(userId: string): Promise<CreditTransaction[]> {
    return db
      .select()
      .from(creditTransactions)
      .where(eq(creditTransactions.userId, userId))
      .orderBy(desc(creditTransactions.createdAt));
  }

  async createAgent(agentData: InsertAgent): Promise<Agent> {
    const [agent] = await db.insert(agents).values(agentData).returning();
    return agent;
  }

  async getAgent(id: string): Promise<Agent | undefined> {
    const [agent] = await db.select().from(agents).where(eq(agents.id, id));
    return agent;
  }

  async getAgentsByUser(userId: string): Promise<Agent[]> {
    return db
      .select()
      .from(agents)
      .where(eq(agents.userId, userId))
      .orderBy(desc(agents.createdAt));
  }

  async getAllAgents(category?: string): Promise<Agent[]> {
    if (category) {
      return db
        .select()
        .from(agents)
        .where(and(eq(agents.status, "published"), eq(agents.category, category)))
        .orderBy(desc(agents.usageCount));
    }
    
    return db
      .select()
      .from(agents)
      .where(eq(agents.status, "published"))
      .orderBy(desc(agents.usageCount));
  }

  async getFeaturedAgents(): Promise<Agent[]> {
    return db
      .select()
      .from(agents)
      .where(and(eq(agents.status, "published"), eq(agents.featured, true)))
      .orderBy(desc(agents.usageCount))
      .limit(10);
  }

  async updateAgent(id: string, updates: Partial<InsertAgent>): Promise<Agent | undefined> {
    const [agent] = await db
      .update(agents)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(agents.id, id))
      .returning();
    return agent;
  }

  async deleteAgent(id: string): Promise<void> {
    await db.delete(agents).where(eq(agents.id, id));
  }

  async incrementAgentUsage(id: string): Promise<void> {
    await db
      .update(agents)
      .set({ usageCount: sql`${agents.usageCount} + 1` })
      .where(eq(agents.id, id));
  }

  async createAgentRun(runData: InsertAgentRun): Promise<AgentRun> {
    const [run] = await db.insert(agentRuns).values(runData).returning();
    return run;
  }

  async getAgentRun(id: string): Promise<AgentRun | undefined> {
    const [run] = await db.select().from(agentRuns).where(eq(agentRuns.id, id));
    return run;
  }

  async updateAgentRun(id: string, updates: Partial<InsertAgentRun>): Promise<AgentRun | undefined> {
    const [run] = await db
      .update(agentRuns)
      .set(updates)
      .where(eq(agentRuns.id, id))
      .returning();
    return run;
  }

  async getAgentRunsByUser(userId: string): Promise<AgentRun[]> {
    return db
      .select()
      .from(agentRuns)
      .where(eq(agentRuns.userId, userId))
      .orderBy(desc(agentRuns.createdAt));
  }

  async getAgentRunsByAgent(agentId: string): Promise<AgentRun[]> {
    return db
      .select()
      .from(agentRuns)
      .where(eq(agentRuns.agentId, agentId))
      .orderBy(desc(agentRuns.createdAt));
  }
}

export const storage = new DatabaseStorage();
