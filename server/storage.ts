import {
  users,
  apps,
  appUsage,
  type User,
  type UpsertUser,
  type App,
  type InsertApp,
  type AppUsage,
  type InsertAppUsage,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql, inArray } from "drizzle-orm";

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
}

export const storage = new DatabaseStorage();
