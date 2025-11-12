import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  timestamp,
  integer,
  decimal,
  boolean,
  index,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  creditBalance: integer("credit_balance").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const apps = pgTable("apps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  code: text("code").notNull(),
  thumbnail: text("thumbnail"),
  status: text("status").notNull().default("draft"),
  deploymentTxId: text("deployment_tx_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const appUsage = pgTable("app_usage", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  appId: varchar("app_id").notNull().references(() => apps.id, { onDelete: "cascade" }),
  userId: varchar("user_id").references(() => users.id, { onDelete: "set null" }),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const agents = pgTable("agents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  creditCost: integer("credit_cost").notNull(),
  systemPrompt: text("system_prompt").notNull(),
  modelProvider: text("model_provider").notNull(),
  modelName: text("model_name").notNull(),
  inputSchema: jsonb("input_schema").notNull(),
  icon: text("icon"),
  avatarUrl: text("avatar_url"),
  featured: boolean("featured").notNull().default(false),
  usageCount: integer("usage_count").notNull().default(0),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  status: text("status").notNull().default("draft"),
  conversationStarters: jsonb("conversation_starters"),
  customCss: text("custom_css"),
  themeSettings: jsonb("theme_settings"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const agentRuns = pgTable("agent_runs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  agentId: varchar("agent_id").notNull().references(() => agents.id, { onDelete: "cascade" }),
  userId: varchar("user_id").references(() => users.id, { onDelete: "set null" }),
  inputData: jsonb("input_data").notNull(),
  outputData: jsonb("output_data"),
  creditsUsed: integer("credits_used").notNull(),
  status: text("status").notNull().default("pending"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const creditTransactions = pgTable("credit_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(),
  type: text("type").notNull(),
  description: text("description"),
  txId: text("tx_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const insertAppSchema = createInsertSchema(apps).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAppUsageSchema = createInsertSchema(appUsage).omit({
  id: true,
  createdAt: true,
});

export type InsertApp = z.infer<typeof insertAppSchema>;
export type App = typeof apps.$inferSelect;

export type InsertAppUsage = z.infer<typeof insertAppUsageSchema>;
export type AppUsage = typeof appUsage.$inferSelect;

export const insertAgentSchema = createInsertSchema(agents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  usageCount: true,
  rating: true,
});

export const insertAgentRunSchema = createInsertSchema(agentRuns).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertCreditTransactionSchema = createInsertSchema(creditTransactions).omit({
  id: true,
  createdAt: true,
});

export type InsertAgent = z.infer<typeof insertAgentSchema>;
export type Agent = typeof agents.$inferSelect;

export type InsertAgentRun = z.infer<typeof insertAgentRunSchema>;
export type AgentRun = typeof agentRuns.$inferSelect;

export type InsertCreditTransaction = z.infer<typeof insertCreditTransactionSchema>;
export type CreditTransaction = typeof creditTransactions.$inferSelect;
