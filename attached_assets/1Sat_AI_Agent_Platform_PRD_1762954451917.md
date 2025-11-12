# 1Sat AI Agent Platform - Product Requirements Document

**Version:** 2.0 (Pivot to AI Agents)  
**Date:** November 6, 2025  
**Status:** Ready for Development  
**Target Platform:** Replit  
**Tech Stack:** Vite + React + TypeScript + Express + BSV + React-OnChain + kie.ai

---

## Executive Summary

**Product Name:** 1Sat Agents

**Vision:** Create a decentralized marketplace for AI agent wrappers—pre-configured AI workflows that combine prompt engineering, API orchestration, and blockchain permanence. Users purchase credits in BSV, creators build agents as 1Sat ordinals, platform handles API calls via kie.ai.

**One-Liner:** "Run AI agents on the blockchain. Buy credits once, use forever. Build agents, earn passive income."

**Core Innovation:** Combines Glif AI's agent marketplace model with blockchain permanence (React-OnChain), crypto-native payments (BSV credits), and API aggregation (kie.ai), creating tradable AI workflow assets.

**Key Differentiation:** Unlike Glif AI (centralized, fiat payments), our agents are permanent blockchain assets with crypto payments, enabling agents to be traded as microbusinesses.

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Why We're Pivoting](#2-why-were-pivoting)
3. [Problem Statement](#3-problem-statement)
4. [Solution](#4-solution)
5. [Target Users](#5-target-users)
6. [Core Features](#6-core-features)
7. [Technical Architecture](#7-technical-architecture)
8. [Credit System Design](#8-credit-system-design)
9. [Data Models](#9-data-models)
10. [API Specifications](#10-api-specifications)
11. [Agent Structure](#11-agent-structure)
12. [User Flows](#12-user-flows)
13. [kie.ai Integration](#13-kieai-integration)
14. [Agent Ideas](#14-agent-ideas)
15. [Business Model](#15-business-model)
16. [Implementation Roadmap](#16-implementation-roadmap)
17. [Success Metrics](#17-success-metrics)
18. [Risk Assessment](#18-risk-assessment)

---

## 1. Product Overview

### 1.1 What Are AI Agents?

**Definition:** AI agents are pre-configured workflows that combine:
- **Prompt Engineering:** Optimized system prompts for specific tasks
- **API Orchestration:** Calls to multiple AI services (text, image, video, voice)
- **User Interface:** Custom input forms and result displays
- **Business Logic:** Credit management, validation, error handling

**Example: LinkedIn Post Writer Agent**
```
User Input: "Write about AI in healthcare"
↓
System Prompt: "You're a LinkedIn growth expert who writes viral posts..."
↓
kie.ai API: GPT-4 generates post with hooks, emojis, CTA
↓
Output: Formatted LinkedIn post (copy-ready)
↓
Cost: 10 credits deducted from user balance
```

### 1.2 Product Ecosystem

**Three Interconnected Products:**

1. **1Sat Agent Builder** - Create agents with visual prompt builder
2. **1Sat Agent Marketplace** - Discover and run pre-built agents
3. **1Sat Agent Trading** - Buy/sell profitable agents as assets

### 1.3 Why This Model Works

**Glif AI Validation:**
- Agent marketplace with 100+ pre-built workflows
- Pay-per-use model
- Prompt engineering as intellectual property
- Active creator community

**Our Blockchain Advantage:**
- **Permanence:** Agents stored as 1Sat ordinals (can't be taken down)
- **Ownership:** Creators truly own their agents (tradable NFTs)
- **Payments:** BSV credits (instant, low-fee vs. Stripe's 3%)
- **Economics:** React-OnChain deployment ($0.01 vs. $50/month hosting)

---

## 2. Why We're Pivoting

### 2.1 Micro-SaaS Tools vs. AI Agents

| Aspect | Micro-SaaS Tools | AI Agents |
|--------|------------------|-----------|
| **Value Proposition** | "Compress your image" | "AI writes your LinkedIn posts" |
| **Price Point** | $0.10-$0.50 | $0.50-$5.00 |
| **Usage Frequency** | Occasional (1x/week) | Daily (5-10x/day) |
| **Emotional Payoff** | "Task completed" | "Wow, this is creative!" |
| **Differentiation** | Feature-based (hard) | Prompt-based (easy IP) |
| **Market Size** | Niche users | Universal (everyone uses AI) |
| **Viral Potential** | Low (utilitarian) | High (creative outputs) |
| **LTV** | $5-10/month | $20-50/month |

### 2.2 Key Insights from Glif AI

**What Works:**
- **Agent Library:** Users browse pre-built workflows (low friction)
- **Credit System:** One-time purchase, use across agents (reduces friction)
- **Creator Incentives:** Revenue share attracts quality creators
- **Workflow Chaining:** Combine agents for complex tasks

**What We Improve:**
- **Blockchain Hosting:** Glif agents live on AWS; ours on BSV (permanent)
- **True Ownership:** Glif agents are rented; ours are owned (tradable)
- **Crypto Payments:** Glif uses Stripe (3% fees); we use BSV (<0.1% fees)
- **kie.ai Integration:** Multi-model access via one crypto-friendly API

---

## 3. Problem Statement

### 3.1 Current Pain Points

**For Users (AI Consumers):**
- **Subscription Fatigue:** ChatGPT Plus ($20/month), Midjourney ($30/month), etc.
- **Prompt Engineering:** Don't know how to write effective prompts
- **Tool Switching:** Need 5 different apps for different tasks
- **No Ownership:** Lose access when subscription ends

**For Creators (AI Prompt Engineers):**
- **No IP Protection:** Share prompts, others copy them
- **No Monetization:** Can't sell prompt engineering expertise easily
- **Platform Dependency:** Glif/Poe can change terms anytime
- **Hosting Costs:** Running AI apps costs $50-200/month

**For Both:**
- **Centralization Risk:** Platforms can ban users/agents
- **Payment Friction:** Credit card required, international barriers
- **No Asset Value:** Can't trade successful workflows

### 3.2 Market Opportunity

- **AI API Market:** $50B by 2026 (growing 40% YoY)
- **Prompt Engineering:** Emerging as valuable skill ($100K+ salaries)
- **No-Code AI Tools:** $13.2B market (our intersection)
- **Creator Economy:** 50M+ creators seeking monetization

---

## 4. Solution

### 4.1 Core Solution Components

**4.1.1 Credit-Based Economy**
- Users buy BSV credits ($10 = 1,000 credits)
- Credits used across all agents (no per-agent subscriptions)
- Mental accounting: Feels "free" after initial purchase
- Recurring revenue: Users top up monthly

**4.1.2 Agent Marketplace**
- Browse 100+ pre-built agents by category
- Run agents instantly (no setup, no API keys needed)
- Rate and review agents (quality curation)
- Featured agents (editorial picks)

**4.1.3 kie.ai Integration**
- Single API for all AI models (GPT-4, DALL-E, Runway, etc.)
- Accepts crypto payments (BSV-native)
- Competitive pricing
- Unified billing (one invoice, not 10)

**4.1.4 React-OnChain Deployment**
- Agents stored as 1Sat ordinals (<$0.01 to deploy)
- Zero recurring hosting costs
- Permanent availability (can't be taken down)
- Versioning built-in

**4.1.5 Agent Trading**
- Successful agents sell for 10x monthly revenue
- Ownership transfer via ordinal transfer
- Revenue history on-chain (transparent due diligence)
- Platform takes 1% marketplace fee

### 4.2 How It Works (30-Second Pitch)

```
1. User buys 1,000 credits for $10 (one-time)
2. Browses agent marketplace
3. Finds "LinkedIn Post Writer" (10 credits per use)
4. Enters topic: "AI in healthcare"
5. Agent runs → GPT-4 via kie.ai → Output
6. User copies post to LinkedIn
7. 10 credits deducted (990 remaining)
8. Creator earns 9 credits (90%)
9. Platform earns 1 credit (10%)
```

**User thinks:** "I just got a $50 freelancer to write my post for $0.10!"

### 4.3 Technical Foundation

**Stack:**
- **Frontend:** Vite + React + TypeScript (fast, modern)
- **Backend:** Express + TypeScript + Prisma (Replit-friendly)
- **Database:** SQLite → PostgreSQL (easy migration)
- **Blockchain:** BSV (50MB ordinals, low fees)
- **Deployment:** React-OnChain (sub-penny hosting)
- **AI APIs:** kie.ai (crypto payments, multi-model)
- **Payments:** HandCash (BSV wallet integration)

---

## 5. Target Users

### 5.1 Primary Personas

**Persona 1: "Sarah the Social Media Manager"**
- Age: 28
- Background: Marketing manager at SaaS company
- Pain: Spends 2 hours/day writing LinkedIn posts
- Goal: Automate content creation, maintain quality
- Budget: $50/month for tools
- Tech-Savvy: Medium (uses Canva, ChatGPT)
- **Value Prop:** "10 LinkedIn posts for $1 instead of 10 hours"

**Persona 2: "Alex the AI Creator"**
- Age: 32
- Background: Prompt engineer, tech blogger
- Pain: Built great prompts but can't monetize
- Goal: Earn passive income from prompt expertise
- Skills: Expert at GPT-4, Midjourney, Runway
- **Value Prop:** "Turn your prompts into $500/month income"

**Persona 3: "Dev the Developer"**
- Age: 35
- Background: Full-stack developer, crypto enthusiast
- Pain: Needs AI for side projects, hates subscriptions
- Goal: Access AI APIs without monthly fees
- Tech-Savvy: High (writes code, runs nodes)
- **Value Prop:** "Pay-per-use AI APIs with crypto, no subscriptions"

### 5.2 Secondary Personas

**Investor Ivan** (Crypto Portfolio Diversification)
- Buys profitable agents as passive income assets
- Values: On-chain revenue transparency

**Startup Steve** (Founder Needing Marketing)
- Uses agents for content marketing
- Values: Cost-effective AI access

**Educator Emma** (Teaching AI/Prompting)
- Creates educational agents for students
- Values: Permanent hosting, easy sharing

---

## 6. Core Features

### 6.1 MVP Features (Phase 1 - Weeks 1-3)

#### 6.1.1 Credit System

**Purchase Credits:**
```typescript
interface CreditPackage {
  name: 'starter' | 'pro' | 'enterprise';
  credits: number;
  priceInBsv: number;
  priceInUsd: number; // Display only
  discount?: number; // % discount for bulk
}

const PACKAGES: CreditPackage[] = [
  { name: 'starter', credits: 100, priceInBsv: 0.01, priceInUsd: 1 },
  { name: 'pro', credits: 1000, priceInBsv: 0.08, priceInUsd: 8, discount: 20 },
  { name: 'enterprise', credits: 10000, priceInBsv: 0.70, priceInUsd: 70, discount: 30 }
];
```

**Features:**
- Display credit balance (always visible in header)
- Buy credits via HandCash (BSV wallet)
- Transaction history (all purchases)
- Low balance warning (<50 credits)
- Auto-refill option (optional)

**UI Component:**
```typescript
interface CreditBalance {
  current: number;
  lifetime: number; // Total credits purchased
  spent: number;    // Total credits used
}

<CreditBadge>
  <Icon>💎</Icon>
  <Count>{credits}</Count>
  <Button onClick={openPurchaseModal}>+</Button>
</CreditBadge>
```

#### 6.1.2 Agent Runner Interface

**Core UI Elements:**
```typescript
interface AgentRunner {
  // Header
  agentName: string;
  agentDescription: string;
  creatorName: string;
  
  // Pricing
  creditCost: number;
  estimatedCostUsd: number;
  
  // Input
  inputFields: InputField[];
  
  // Output
  result: string | ImageResult | VideoResult;
  
  // Actions
  onRun: () => Promise<void>;
  onCopy: () => void;
  onDownload: () => void;
  onShare: () => void;
}
```

**Input Types:**
- Text (single line, multi-line)
- File upload (image, audio, video)
- Dropdown (style selection)
- Slider (numeric parameters)

**Features:**
- Preview cost before running
- Loading state with progress
- Error handling (insufficient credits, API failure)
- Result display (formatted output)
- Copy/download/share buttons

#### 6.1.3 Agent Marketplace

**Discovery Features:**
- Grid view of agent cards
- Search by name/description
- Filter by category (8 categories)
- Sort by: Popular, Recent, Price, Rating
- Featured section (editorial picks)

**Agent Card:**
```typescript
interface AgentCard {
  id: string;
  name: string;
  description: string; // 100 chars max
  icon: string;        // Emoji or image URL
  category: AgentCategory;
  creditCost: number;
  rating: number;      // 1-5 stars
  usageCount: number;  // Total runs
  creatorName: string;
  featured: boolean;
}
```

**Categories:**
1. **Content Creation** (LinkedIn posts, blog writing)
2. **Image Generation** (product photos, avatars, thumbnails)
3. **Video Production** (scripts, editing, generation)
4. **Marketing** (email campaigns, ad copy, SEO)
5. **Research** (market analysis, academic summaries)
6. **Voice & Audio** (voiceovers, podcast editing)
7. **Code & Development** (documentation, debugging)
8. **Personal Productivity** (meeting notes, task planning)

#### 6.1.4 5 Starter Agents (Included in MVP)

**Agent 1: LinkedIn Post Writer**
- **Input:** Topic, tone (professional/casual), length
- **Cost:** 10 credits
- **API:** GPT-4 via kie.ai
- **Output:** Formatted post with hook, body, CTA, emojis
- **System Prompt:**
```
You're a LinkedIn growth strategist with 10 years experience.
Generate engaging posts that:
- Start with a powerful hook (question or bold statement)
- Use short paragraphs (1-2 sentences max)
- Include relevant emojis (sparingly, 3-5 total)
- End with clear CTA (comment, share, DM)
- Are 150-250 words
- Follow LinkedIn's algorithm best practices
Format: [Hook]\n\n[Body]\n\n[CTA]
```

**Agent 2: Product Photo Background Remover**
- **Input:** Product image (upload)
- **Cost:** 25 credits
- **API:** DALL-E (inpainting) via kie.ai
- **Output:** PNG with transparent background
- **Additional:** Option to add custom background (+10 credits)

**Agent 3: YouTube Title Generator**
- **Input:** Video topic, target audience
- **Cost:** 5 credits
- **API:** GPT-4 via kie.ai
- **Output:** 10 title options with CTR scores
- **System Prompt:**
```
You're a YouTube growth expert who's generated 100M+ views.
Create 10 titles that:
- Use curiosity gaps
- Include power words (secret, proven, ultimate)
- Are 50-70 characters
- Target high CTR
Score each title 1-10 for CTR potential.
```

**Agent 4: Cold Email Personalizer**
- **Input:** Company name, recipient role, product/service
- **Cost:** 15 credits
- **API:** GPT-4 + Perplexity (web research) via kie.ai
- **Output:** Personalized email with company research
- **Workflow:**
  1. Perplexity searches company news (2 credits)
  2. GPT-4 writes email using research (13 credits)

**Agent 5: Meeting Notes Summarizer**
- **Input:** Paste meeting notes (up to 5,000 words)
- **Cost:** 20 credits
- **API:** GPT-4 via kie.ai
- **Output:** Action items (who, what, when), decisions, next steps
- **System Prompt:**
```
Extract structured information from meeting notes:
1. Action Items: [Owner] - [Task] - [Deadline]
2. Decisions Made: Bullet list
3. Next Steps: Prioritized list
4. Open Questions: List
Format as markdown with headers.
```

#### 6.1.5 kie.ai Integration

**Core Service:**
```typescript
// server/src/services/kieAIService.ts

interface KieAIConfig {
  apiKey: string;
  baseUrl: string;
}

interface TextGenerationRequest {
  model: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-2';
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  maxTokens?: number;
}

interface ImageGenerationRequest {
  model: 'dall-e-3' | 'stable-diffusion-xl';
  prompt: string;
  size?: '1024x1024' | '1792x1024';
  quality?: 'standard' | 'hd';
}

class KieAIService {
  private apiKey: string;
  private baseUrl = 'https://api.kie.ai/v1';
  
  async generateText(request: TextGenerationRequest): Promise<string> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
  }
  
  async generateImage(request: ImageGenerationRequest): Promise<string> {
    const response = await fetch(`${this.baseUrl}/images/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
    
    const data = await response.json();
    return data.data[0].url;
  }
  
  async getCostEstimate(model: string, tokens: number): Promise<number> {
    // kie.ai pricing (example)
    const pricing = {
      'gpt-4': 0.03 / 1000,        // $0.03 per 1K tokens
      'gpt-3.5-turbo': 0.002 / 1000,
      'dall-e-3': 0.04,             // per image
    };
    
    return pricing[model] * tokens;
  }
}
```

**Cost Calculation:**
```typescript
// Convert kie.ai costs to credits
function convertToCredits(usdCost: number): number {
  const CREDIT_VALUE = 0.01; // 1 credit = $0.01
  return Math.ceil(usdCost / CREDIT_VALUE);
}

// Example: GPT-4 generates 500 tokens
// Cost: $0.015 (500 * $0.03 / 1000)
// Credits: 2 credits (rounded up)
```

#### 6.1.6 Wallet Integration

**HandCash Connect:**
```typescript
// client/src/services/walletService.ts

import { HandCashConnect } from '@handcash/handcash-connect';

interface WalletConnection {
  address: string;
  publicKey: string;
  balance: number; // in BSV
}

class WalletService {
  private handcash: HandCashConnect;
  
  constructor() {
    this.handcash = new HandCashConnect({
      appId: process.env.HANDCASH_APP_ID,
      appSecret: process.env.HANDCASH_APP_SECRET
    });
  }
  
  async connect(): Promise<WalletConnection> {
    const account = await this.handcash.getAccount();
    const profile = await account.profile.getCurrentProfile();
    const balance = await account.wallet.getSpendableBalance();
    
    return {
      address: profile.paymail,
      publicKey: profile.publicKey,
      balance: balance.bsv
    };
  }
  
  async purchaseCredits(
    packageType: 'starter' | 'pro' | 'enterprise'
  ): Promise<{ txid: string; credits: number }> {
    const pkg = CREDIT_PACKAGES.find(p => p.name === packageType);
    
    const payment = await this.handcash.wallet.pay({
      payments: [{
        to: PLATFORM_WALLET_ADDRESS,
        amount: pkg.priceInBsv,
        currencyCode: 'BSV'
      }]
    });
    
    return {
      txid: payment.transactionId,
      credits: pkg.credits
    };
  }
}
```

### 6.2 Phase 2 Features (Weeks 4-6)

#### 6.2.1 Agent Builder

**Visual Agent Creator:**
```typescript
interface AgentBuilderForm {
  // Basic Info
  name: string;
  description: string;
  category: AgentCategory;
  icon: string;
  
  // Configuration
  model: AIModel;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  
  // Inputs
  inputFields: InputField[];
  
  // Pricing
  creditCost: number;
  
  // Advanced
  chainedAgents?: string[]; // For multi-step workflows
}

interface InputField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'file' | 'dropdown' | 'slider';
  placeholder?: string;
  required: boolean;
  validation?: RegExp;
}
```

**Builder UI:**
1. **Setup:** Name, description, category, icon
2. **Configure:** Choose AI model, write system prompt
3. **Test:** Run agent with sample inputs
4. **Price:** Set credit cost (platform suggests based on API costs)
5. **Deploy:** Mint as 1Sat ordinal via React-OnChain

**Prompt Template Library:**
- Pre-written system prompts for common tasks
- Variables: `{topic}`, `{tone}`, `{length}`
- Examples: LinkedIn post, blog outline, product description

#### 6.2.2 Agent Analytics

**Creator Dashboard:**
```typescript
interface AgentAnalytics {
  // Usage Stats
  totalRuns: number;
  uniqueUsers: number;
  runsToday: number;
  runsThisWeek: number;
  runsThisMonth: number;
  
  // Revenue
  creditsEarned: number;
  creditsEarnedUsd: number;
  projectedMonthly: number;
  
  // Performance
  averageRating: number;
  ratingDistribution: { 1: number; 2: number; 3: number; 4: number; 5: number };
  successRate: number; // % runs without errors
  
  // Growth
  chartData: Array<{ date: string; runs: number; revenue: number }>;
}
```

**Features:**
- Line chart: Runs over time
- Bar chart: Revenue by day/week/month
- User feedback: Recent reviews
- Optimization tips: "Your agent has high error rate. Consider..."

#### 6.2.3 Agent Chaining

**Multi-Step Workflows:**
```typescript
interface ChainedAgent {
  id: string;
  agents: Array<{
    agentId: string;
    inputMapping: Record<string, string>; // Map outputs to inputs
  }>;
  totalCreditCost: number;
}
```

**Example: Blog Post Generator (Chained)**
1. **Research Agent** (20 credits)
   - Input: Topic
   - Output: 10 key points from web research
   
2. **Outline Agent** (10 credits)
   - Input: Key points from step 1
   - Output: Blog outline with H2/H3 structure
   
3. **Writing Agent** (30 credits)
   - Input: Outline from step 2
   - Output: 1,500-word blog post
   
4. **SEO Agent** (15 credits)
   - Input: Blog post from step 3
   - Output: Meta description, title tag, keywords

**Total:** 75 credits for fully-researched, SEO-optimized blog post

### 6.3 Phase 3 Features (Weeks 7-12)

#### 6.3.1 Agent Marketplace Trading

**List Agent for Sale:**
```typescript
interface AgentListing {
  agentId: string;
  askingPriceBsv: number;
  askingPriceUsd: number; // Display only
  
  // Performance Data (auto-populated)
  revenue30d: number;
  revenue90d: number;
  revenueAllTime: number;
  averageRating: number;
  totalRuns: number;
  
  // Transferable Assets
  includesPrompt: boolean; // Usually true
  includesApiKey: boolean; // Rarely (creator keeps their kie.ai key)
}
```

**Purchase Flow:**
1. Buyer browses marketplace listings
2. Views agent performance (revenue, ratings, trend)
3. Tests agent (free preview run)
4. Clicks "Buy Now"
5. BSV sent to escrow smart contract
6. Ordinal transferred to buyer's wallet
7. Escrow releases funds to seller
8. Future revenue goes to buyer

**Valuation Formula:**
```typescript
// Industry standard: 10-20x monthly revenue
function estimateAgentValue(monthlyRevenue: number): number {
  const multiplier = 15; // Conservative
  return monthlyRevenue * multiplier;
}

// Example: Agent earning $100/month
// Estimated value: $1,500
// Actual sale: Negotiated (could be $1,000-$2,000)
```

#### 6.3.2 Advanced Agent Types

**Video Generation Agent:**
```typescript
interface VideoAgent {
  model: 'runway-gen3' | 'pika-labs';
  creditCost: 50; // Higher cost
  duration: 5; // seconds
  quality: 'standard' | 'hd';
}
```

**Voice Clone Agent:**
```typescript
interface VoiceAgent {
  model: 'elevenlabs';
  voiceSample: File; // 30-second sample
  script: string;
  creditCost: 30;
}
```

**Image Analysis Agent:**
```typescript
interface VisionAgent {
  model: 'gpt-4-vision';
  image: File;
  task: 'describe' | 'ocr' | 'analyze' | 'modify';
  creditCost: 20;
}
```

---

## 7. Technical Architecture

### 7.1 System Architecture Diagram (Text)

```
┌─────────────────────────────────────────────────────────────────┐
│                    Client (Browser - React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │   Agent      │  │  Agent       │  │   Credit           │   │
│  │   Marketplace│  │  Runner      │  │   Management       │   │
│  │   (Browse)   │  │  (Execute)   │  │   (Purchase)       │   │
│  └──────────────┘  └──────────────┘  └────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS + WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Express Backend (Node.js)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │   Credit     │  │   Agent      │  │   kie.ai           │   │
│  │   Service    │  │   Execution  │  │   Integration      │   │
│  │              │  │   Service    │  │                    │   │
│  └──────────────┘  └──────────────┘  └────────────────────┘   │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │   Wallet     │  │   Database   │  │   React-OnChain    │   │
│  │   Service    │  │   (Prisma)   │  │   Deploy Service   │   │
│  │   (HandCash) │  │   (SQLite)   │  │                    │   │
│  └──────────────┘  └──────────────┘  └────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
┌─────────────────┐  ┌──────────────┐  ┌──────────────────┐
│   BSV Blockchain│  │   kie.ai     │  │   React-OnChain  │
│   (Payments +   │  │   (AI APIs)  │  │   (Storage)      │
│    Ordinals)    │  │              │  │                  │
└─────────────────┘  └──────────────┘  └──────────────────┘
```

### 7.2 Replit Tech Stack

**Frontend:**
```json
{
  "framework": "Vite + React 18",
  "language": "TypeScript 5.0",
  "styling": "Tailwind CSS 3.3 + shadcn/ui",
  "state": "Zustand 4.4 (lightweight Redux alternative)",
  "routing": "React Router v6",
  "forms": "React Hook Form + Zod",
  "http": "Axios",
  "websockets": "Socket.io-client (for real-time agent status)"
}
```

**Backend:**
```json
{
  "runtime": "Node.js 18+",
  "framework": "Express 4.18",
  "language": "TypeScript 5.0",
  "database": "SQLite (MVP) → PostgreSQL (production)",
  "orm": "Prisma 5.5",
  "validation": "Zod",
  "auth": "JWT (jsonwebtoken)",
  "websockets": "Socket.io (agent execution updates)"
}
```

**External Services:**
```json
{
  "ai_apis": "kie.ai (unified AI API gateway)",
  "blockchain": {
    "network": "Bitcoin SV",
    "wallet": "HandCash Connect",
    "deployment": "React-OnChain (npm package)",
    "queries": "WhatsOnChain API"
  },
  "storage": {
    "temp": "/tmp (build artifacts before deploy)",
    "permanent": "BSV blockchain (via React-OnChain)"
  }
}
```

### 7.3 Project Structure (Replit Monorepo)

```
1sat-agents/
├── client/                          # Frontend (Vite + React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── agents/
│   │   │   │   ├── AgentCard.tsx
│   │   │   │   ├── AgentRunner.tsx
│   │   │   │   ├── AgentList.tsx
│   │   │   │   └── AgentBuilder.tsx
│   │   │   ├── credits/
│   │   │   │   ├── CreditBalance.tsx
│   │   │   │   ├── PurchaseModal.tsx
│   │   │   │   └── TransactionHistory.tsx
│   │   │   ├── marketplace/
│   │   │   │   ├── MarketplaceGrid.tsx
│   │   │   │   ├── ListingCard.tsx
│   │   │   │   └── PurchaseFlow.tsx
│   │   │   └── shared/
│   │   │       ├── Layout.tsx
│   │   │       ├── Header.tsx
│   │   │       ├── WalletConnect.tsx
│   │   │       └── LoadingSpinner.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Marketplace.tsx
│   │   │   ├── AgentDetail.tsx
│   │   │   ├── Builder.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── Trading.tsx
│   │   ├── services/
│   │   │   ├── api.ts              # Axios client
│   │   │   ├── wallet.ts           # HandCash integration
│   │   │   ├── agents.ts           # Agent CRUD
│   │   │   └── credits.ts          # Credit operations
│   │   ├── store/
│   │   │   └── useStore.ts         # Zustand global state
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript interfaces
│   │   ├── hooks/
│   │   │   ├── useCredits.ts
│   │   │   ├── useWallet.ts
│   │   │   └── useAgent.ts
│   │   ├── utils/
│   │   │   └── helpers.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   │   └── agent-icons/            # Default agent icons
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── server/                          # Backend (Express + TypeScript)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── agents.ts           # Agent CRUD endpoints
│   │   │   ├── credits.ts          # Credit purchase/usage
│   │   │   ├── execute.ts          # Agent execution
│   │   │   ├── marketplace.ts      # Trading endpoints
│   │   │   └── wallet.ts           # Wallet operations
│   │   ├── services/
│   │   │   ├── creditService.ts    # Credit management logic
│   │   │   ├── agentService.ts     # Agent execution logic
│   │   │   ├── kieAIService.ts     # kie.ai API wrapper
│   │   │   ├── walletService.ts    # HandCash wrapper
│   │   │   ├── deployService.ts    # React-OnChain wrapper
│   │   │   └── bsvService.ts       # BSV blockchain queries
│   │   ├── middleware/
│   │   │   ├── auth.ts             # JWT verification
│   │   │   ├── errorHandler.ts     # Global error handler
│   │   │   ├── validation.ts       # Zod schema validation
│   │   │   └── rateLimit.ts        # API rate limiting
│   │   ├── db/
│   │   │   ├── schema.prisma       # Prisma schema
│   │   │   └── client.ts           # Prisma client singleton
│   │   ├── types/
│   │   │   └── index.ts            # Shared TypeScript types
│   │   ├── utils/
│   │   │   ├── creditCalculator.ts
│   │   │   └── helpers.ts
│   │   └── index.ts                # Express app entry
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── tsconfig.json
│
├── shared/                          # Shared between client/server
│   └── types.ts                    # Common TypeScript interfaces
│
├── .env.example
├── .gitignore
├── package.json                    # Root package.json
├── README.md
└── replit.nix                      # Replit configuration
```

---

## 8. Credit System Design

### 8.1 Credit Economics

**Credit Value:**
```typescript
const CREDIT_VALUE = 0.01; // 1 credit = $0.01 USD

// Credit packages (with volume discounts)
const CREDIT_PACKAGES = [
  {
    name: 'Starter',
    credits: 100,
    priceUsd: 1.00,
    pricePerCredit: 0.01,
    discount: 0
  },
  {
    name: 'Pro',
    credits: 1000,
    priceUsd: 8.00,
    pricePerCredit: 0.008,
    discount: 20 // 20% off
  },
  {
    name: 'Enterprise',
    credits: 10000,
    priceUsd: 70.00,
    pricePerCredit: 0.007,
    discount: 30 // 30% off
  }
];
```

**Credit Costs by Agent Type:**
```typescript
const TYPICAL_COSTS = {
  textGeneration: {
    gpt35turbo: 1,    // 1 credit (cheap)
    gpt4: 5,          // 5 credits (expensive)
    claude2: 3        // 3 credits (mid-range)
  },
  imageGeneration: {
    dalle3: 20,       // 20 credits per image
    stableDiffusion: 10
  },
  videoGeneration: {
    runwayGen3: 50,   // 50 credits per 5 seconds
    pikaLabs: 40
  },
  voiceClone: {
    elevenLabs: 30    // 30 credits per 10 seconds
  },
  webSearch: {
    perplexity: 2     // 2 credits per search
  }
};
```

### 8.2 Credit Flow

**User Purchase Flow:**
```
User → HandCash Wallet → Platform BSV Address
      (0.08 BSV = $8)
                    ↓
              Platform Receives Payment
                    ↓
              User Credits += 1000
                    ↓
              Transaction Recorded On-Chain
```

**Agent Usage Flow:**
```
User Runs Agent (10 credits)
        ↓
User Credits -= 10
        ↓
Split Credits:
  - Creator: 9 credits (90%)
  - Platform: 1 credit (10%)
        ↓
Call kie.ai API (costs platform ~$0.08)
        ↓
Platform Profit: $0.02 per run
```

### 8.3 Credit Service Implementation

```typescript
// server/src/services/creditService.ts

interface CreditTransaction {
  id: string;
  userId: string;
  agentId?: string;
  type: 'purchase' | 'usage' | 'refund' | 'transfer';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  metadata: Record<string, any>;
  createdAt: Date;
}

class CreditService {
  /**
   * Purchase credits via BSV payment
   */
  async purchaseCredits(
    userId: string,
    packageType: 'starter' | 'pro' | 'enterprise',
    bsvTxId: string
  ): Promise<CreditTransaction> {
    const pkg = CREDIT_PACKAGES.find(p => p.name === packageType);
    if (!pkg) throw new Error('Invalid package');
    
    const user = await db.user.findUnique({ where: { id: userId } });
    
    // Add credits to user
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { 
        credits: user.credits + pkg.credits,
        lifetimeCredits: user.lifetimeCredits + pkg.credits
      }
    });
    
    // Record transaction
    const transaction = await db.creditTransaction.create({
      data: {
        userId,
        type: 'purchase',
        amount: pkg.credits,
        balanceBefore: user.credits,
        balanceAfter: updatedUser.credits,
        metadata: { 
          packageType, 
          bsvTxId, 
          priceUsd: pkg.priceUsd 
        }
      }
    });
    
    return transaction;
  }
  
  /**
   * Deduct credits for agent usage
   */
  async deductCredits(
    userId: string,
    agentId: string,
    amount: number
  ): Promise<CreditTransaction> {
    const user = await db.user.findUnique({ where: { id: userId } });
    
    if (user.credits < amount) {
      throw new Error('Insufficient credits');
    }
    
    // Deduct from user
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { 
        credits: user.credits - amount,
        lifetimeSpent: user.lifetimeSpent + amount
      }
    });
    
    // Credit distribution (90% creator, 10% platform)
    const agent = await db.agent.findUnique({ where: { id: agentId } });
    const creatorShare = Math.floor(amount * 0.9);
    const platformShare = amount - creatorShare;
    
    // Add to creator's earnings
    await db.user.update({
      where: { id: agent.creatorId },
      data: { 
        credits: { increment: creatorShare }
      }
    });
    
    // Update agent stats
    await db.agent.update({
      where: { id: agentId },
      data: {
        totalRuns: { increment: 1 },
        totalCreditsEarned: { increment: creatorShare }
      }
    });
    
    // Record transaction
    const transaction = await db.creditTransaction.create({
      data: {
        userId,
        agentId,
        type: 'usage',
        amount: -amount,
        balanceBefore: user.credits,
        balanceAfter: updatedUser.credits,
        metadata: { 
          creatorShare, 
          platformShare 
        }
      }
    });
    
    return transaction;
  }
  
  /**
   * Get user's credit balance
   */
  async getBalance(userId: string): Promise<number> {
    const user = await db.user.findUnique({ 
      where: { id: userId },
      select: { credits: true }
    });
    return user?.credits || 0;
  }
  
  /**
   * Get transaction history
   */
  async getTransactions(
    userId: string,
    limit: number = 50
  ): Promise<CreditTransaction[]> {
    return db.creditTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  }
}

export default new CreditService();
```

### 8.4 Credit UI Components

**Credit Balance Badge:**
```tsx
// client/src/components/credits/CreditBalance.tsx

import React from 'react';
import { useCredits } from '@/hooks/useCredits';

export const CreditBalance: React.FC = () => {
  const { balance, loading } = useCredits();
  
  const getColorClass = (credits: number) => {
    if (credits > 500) return 'text-green-600';
    if (credits > 100) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
      <span className="text-2xl">💎</span>
      <div className="flex flex-col">
        <span className={`font-bold ${getColorClass(balance)}`}>
          {loading ? '...' : balance.toLocaleString()}
        </span>
        <span className="text-xs text-gray-500">credits</span>
      </div>
      <button 
        className="ml-2 px-3 py-1 bg-blue-600 text-white rounded"
        onClick={() => openPurchaseModal()}
      >
        +
      </button>
    </div>
  );
};
```

**Purchase Modal:**
```tsx
// client/src/components/credits/PurchaseModal.tsx

export const PurchaseModal: React.FC = () => {
  const { purchaseCredits } = useCredits();
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage>();
  
  return (
    <Modal title="Purchase Credits">
      <div className="grid grid-cols-3 gap-4">
        {CREDIT_PACKAGES.map(pkg => (
          <div 
            key={pkg.name}
            className={`p-4 border-2 rounded-lg cursor-pointer ${
              selectedPackage?.name === pkg.name 
                ? 'border-blue-600' 
                : 'border-gray-300'
            }`}
            onClick={() => setSelectedPackage(pkg)}
          >
            {pkg.discount > 0 && (
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mb-2">
                Save {pkg.discount}%
              </div>
            )}
            <h3 className="font-bold text-lg">{pkg.name}</h3>
            <p className="text-3xl font-bold my-2">
              {pkg.credits.toLocaleString()}
            </p>
            <p className="text-gray-600">credits</p>
            <p className="text-xl font-semibold mt-2">
              ${pkg.priceUsd}
            </p>
            <p className="text-xs text-gray-500">
              ${pkg.pricePerCredit}/credit
            </p>
          </div>
        ))}
      </div>
      
      <button
        disabled={!selectedPackage}
        onClick={() => purchaseCredits(selectedPackage.name)}
        className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Purchase with HandCash
      </button>
    </Modal>
  );
};
```

---

## 9. Data Models

### 9.1 Database Schema (Prisma)

```prisma
// server/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"  // Switch to "postgresql" for production
  url      = env("DATABASE_URL")
}

// Users (wallet holders)
model User {
  id              String    @id @default(uuid())
  walletAddress   String    @unique
  publicKey       String?
  
  // Credits
  credits         Int       @default(0)
  lifetimeCredits Int       @default(0)  // Total ever purchased
  lifetimeSpent   Int       @default(0)  // Total ever spent
  
  // Metadata
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  lastActiveAt    DateTime  @default(now())
  
  // Relations
  agentsCreated   Agent[]
  transactions    CreditTransaction[]
  agentRuns       AgentRun[]
  ratings         AgentRating[]
  listings        MarketListing[]      @relation("Seller")
  purchases       MarketListing[]      @relation("Buyer")
}

// AI Agents
model Agent {
  id              String    @id @default(uuid())
  
  // Basic Info
  name            String
  description     String
  category        String    // Content, Image, Video, etc.
  icon            String?   // Emoji or image URL
  
  // Blockchain
  inscriptionId   String    @unique
  outpoint        String    @unique
  deploymentUrl   String    // React-OnChain URL
  txid            String
  
  // Configuration
  aiModel         String    // gpt-4, dall-e-3, etc.
  systemPrompt    String    // The "secret sauce"
  temperature     Float?    @default(0.7)
  maxTokens       Int?      @default(500)
  
  // Pricing
  creditCost      Int       // Cost per run
  
  // Stats
  totalRuns       Int       @default(0)
  uniqueUsers     Int       @default(0)
  totalCreditsEarned Int    @default(0)
  averageRating   Float     @default(0)
  successRate     Float     @default(1.0)  // % runs without errors
  
  // Status
  active          Boolean   @default(true)
  featured        Boolean   @default(false)
  
  // Creator
  creatorId       String
  creator         User      @relation(fields: [creatorId], references: [id])
  
  // Timestamps
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // Relations
  runs            AgentRun[]
  ratings         AgentRating[]
  versions        AgentVersion[]
  listings        MarketListing[]
  
  @@index([category])
  @@index([featured])
  @@index([creatorId])
}

// Agent execution history
model AgentRun {
  id              String    @id @default(uuid())
  
  // References
  agentId         String
  agent           Agent     @relation(fields: [agentId], references: [id])
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  
  // Input/Output
  input           String    // JSON stringified
  output          String?   // JSON stringified
  
  // Execution
  status          String    @default("pending")  // pending, success, error
  errorMessage    String?
  executionTimeMs Int?
  
  // Costs
  creditsCost     Int
  apiCostUsd      Float?    // Actual kie.ai cost
  
  // Metadata
  ipAddress       String?
  userAgent       String?
  
  createdAt       DateTime  @default(now())
  
  @@index([agentId])
  @@index([userId])
  @@index([status])
}

// Credit transactions
model CreditTransaction {
  id              String    @id @default(uuid())
  
  // User
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  
  // Transaction details
  type            String    // purchase, usage, refund, transfer
  amount          Int       // Positive for purchase, negative for usage
  balanceBefore   Int
  balanceAfter    Int
  
  // Related entities
  agentId         String?   // For usage transactions
  
  // Metadata
  metadata        String    // JSON stringified (bsvTxId, packageType, etc.)
  
  createdAt       DateTime  @default(now())
  
  @@index([userId])
  @@index([type])
}

// Agent ratings & reviews
model AgentRating {
  id              String    @id @default(uuid())
  
  // References
  agentId         String
  agent           Agent     @relation(fields: [agentId], references: [id])
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  
  // Rating
  rating          Int       // 1-5 stars
  review          String?   // Optional text review
  
  createdAt       DateTime  @default(now())
  
  @@unique([agentId, userId])  // One rating per user per agent
  @@index([agentId])
}

// Agent versions (for updates)
model AgentVersion {
  id              String    @id @default(uuid())
  
  // Reference
  agentId         String
  agent           Agent     @relation(fields: [agentId], references: [id])
  
  // Version info
  version         String    // semver (1.0.0)
  inscriptionId   String    @unique
  changelog       String?
  
  // Configuration (at time of version)
  systemPrompt    String
  creditCost      Int
  
  // Status
  deprecated      Boolean   @default(false)
  
  createdAt       DateTime  @default(now())
  
  @@index([agentId])
}

// Marketplace listings
model MarketListing {
  id              String    @id @default(uuid())
  
  // References
  agentId         String
  agent           Agent     @relation(fields: [agentId], references: [id])
  sellerId        String
  seller          User      @relation("Seller", fields: [sellerId], references: [id])
  buyerId         String?
  buyer           User?     @relation("Buyer", fields: [buyerId], references: [id])
  
  // Pricing
  askingPriceBsv  Float
  askingPriceUsd  Float     // Display only (calculated from BSV)
  
  // Performance data
  revenue30d      Float
  revenue90d      Float
  revenueAllTime  Float
  
  // Status
  status          String    @default("active")  // active, sold, cancelled
  
  // Transferable assets
  includesPrompt  Boolean   @default(true)
  includesApiKey  Boolean   @default(false)
  
  // Transaction
  soldPriceBsv    Float?
  soldAt          DateTime?
  bsvTxId         String?   // BSV transaction for sale
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([agentId])
  @@index([sellerId])
  @@index([status])
}

// Template prompts (for builder)
model PromptTemplate {
  id              String    @id @default(uuid())
  
  // Template info
  name            String
  description     String
  category        String
  
  // Prompt
  systemPrompt    String
  exampleInput    String?
  exampleOutput   String?
  
  // Metadata
  usageCount      Int       @default(0)
  featured        Boolean   @default(false)
  
  createdAt       DateTime  @default(now())
}
```

### 9.2 TypeScript Interfaces (Shared)

```typescript
// shared/types.ts

export interface User {
  id: string;
  walletAddress: string;
  publicKey?: string;
  credits: number;
  lifetimeCredits: number;
  lifetimeSpent: number;
  createdAt: Date;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: AgentCategory;
  icon?: string;
  inscriptionId: string;
  deploymentUrl: string;
  aiModel: AIModel;
  systemPrompt: string;
  creditCost: number;
  totalRuns: number;
  averageRating: number;
  creatorId: string;
  createdAt: Date;
}

export type AgentCategory = 
  | 'Content Creation'
  | 'Image Generation'
  | 'Video Production'
  | 'Marketing'
  | 'Research'
  | 'Voice & Audio'
  | 'Code & Development'
  | 'Personal Productivity';

export type AIModel = 
  | 'gpt-4'
  | 'gpt-3.5-turbo'
  | 'claude-2'
  | 'dall-e-3'
  | 'stable-diffusion-xl'
  | 'runway-gen3'
  | 'elevenlabs';

export interface AgentRun {
  id: string;
  agentId: string;
  userId: string;
  input: any;
  output?: any;
  status: 'pending' | 'success' | 'error';
  errorMessage?: string;
  creditsCost: number;
  createdAt: Date;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  type: 'purchase' | 'usage' | 'refund' | 'transfer';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  agentId?: string;
  metadata: Record<string, any>;
  createdAt: Date;
}

export interface CreditPackage {
  name: 'starter' | 'pro' | 'enterprise';
  credits: number;
  priceInBsv: number;
  priceInUsd: number;
  discount?: number;
}

export interface MarketListing {
  id: string;
  agentId: string;
  agent: Agent;
  sellerId: string;
  askingPriceBsv: number;
  revenue30d: number;
  revenue90d: number;
  revenueAllTime: number;
  status: 'active' | 'sold' | 'cancelled';
  createdAt: Date;
}
```

---

## 10. API Specifications

### 10.1 API Overview

**Base URL:** `https://[replit-url]/api`

**Authentication:** JWT token in `Authorization: Bearer <token>` header

**Rate Limiting:** 100 requests/minute per user

### 10.2 Endpoints

#### 10.2.1 Authentication

**POST /api/auth/connect**

Connect wallet and create/fetch user.

**Request:**
```json
{
  "walletAddress": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  "publicKey": "...",
  "signature": "..."  // Signed message for verification
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "walletAddress": "...",
      "credits": 500,
      "createdAt": "2025-11-06T00:00:00Z"
    },
    "token": "jwt-token"
  }
}
```

#### 10.2.2 Credits

**POST /api/credits/purchase**

Purchase credits via BSV payment.

**Request:**
```json
{
  "packageType": "pro",
  "bsvTxId": "abc123..."  // HandCash transaction ID
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "creditsAdded": 1000,
    "newBalance": 1500,
    "transaction": {
      "id": "uuid",
      "amount": 1000,
      "priceUsd": 8.00
    }
  }
}
```

**GET /api/credits/balance**

Get current credit balance.

**Response:**
```json
{
  "success": true,
  "data": {
    "balance": 1500,
    "lifetimeCredits": 2000,
    "lifetimeSpent": 500
  }
}
```

**GET /api/credits/transactions**

Get transaction history.

**Query Parameters:**
- `limit` (default: 50, max: 100)
- `type` (optional: purchase, usage, refund, transfer)

**Response:**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "uuid",
        "type": "purchase",
        "amount": 1000,
        "balanceBefore": 500,
        "balanceAfter": 1500,
        "metadata": { "packageType": "pro", "bsvTxId": "..." },
        "createdAt": "2025-11-06T12:00:00Z"
      }
    ],
    "pagination": {
      "total": 25,
      "page": 1,
      "limit": 50
    }
  }
}
```

#### 10.2.3 Agents

**GET /api/agents**

Get list of agents with filtering.

**Query Parameters:**
- `category` (optional)
- `search` (optional)
- `sort` (recent, popular, price-asc, price-desc, rating)
- `featured` (boolean)
- `page` (default: 1)
- `limit` (default: 20, max: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "agents": [
      {
        "id": "uuid",
        "name": "LinkedIn Post Writer",
        "description": "Generate viral LinkedIn posts with hooks and CTAs",
        "category": "Content Creation",
        "icon": "✍️",
        "creditCost": 10,
        "averageRating": 4.8,
        "totalRuns": 1234,
        "deploymentUrl": "https://app.reactonchain.com/content/...",
        "createdAt": "2025-11-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "pages": 8
    }
  }
}
```

**GET /api/agents/:id**

Get single agent details.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "LinkedIn Post Writer",
    "description": "Generate viral LinkedIn posts...",
    "category": "Content Creation",
    "icon": "✍️",
    "creditCost": 10,
    "aiModel": "gpt-4",
    "totalRuns": 1234,
    "uniqueUsers": 456,
    "averageRating": 4.8,
    "successRate": 0.98,
    "deploymentUrl": "https://app.reactonchain.com/...",
    "creator": {
      "id": "uuid",
      "walletAddress": "..."
    },
    "recentReviews": [
      {
        "rating": 5,
        "review": "Amazing! Saves me 30 minutes per post.",
        "createdAt": "2025-11-05T10:00:00Z"
      }
    ]
  }
}
```

**POST /api/agents**

Create new agent (creator only).

**Request:**
```json
{
  "name": "LinkedIn Post Writer",
  "description": "Generate viral LinkedIn posts...",
  "category": "Content Creation",
  "icon": "✍️",
  "aiModel": "gpt-4",
  "systemPrompt": "You're a LinkedIn growth expert...",
  "temperature": 0.7,
  "maxTokens": 500,
  "creditCost": 10,
  "inputFields": [
    {
      "id": "topic",
      "label": "Topic",
      "type": "text",
      "required": true
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "agent": { /* agent object */ },
    "deploymentUrl": "https://app.reactonchain.com/...",
    "inscriptionId": "abc123i0",
    "deploymentCost": 0.00008  // BSV
  }
}
```

#### 10.2.4 Agent Execution

**POST /api/agents/:id/run**

Execute an agent.

**Request:**
```json
{
  "input": {
    "topic": "AI in healthcare",
    "tone": "professional"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "runId": "uuid",
    "output": {
      "text": "🏥 AI is revolutionizing healthcare...\n\n[Full post]\n\nWhat's your take? 💬"
    },
    "creditsUsed": 10,
    "newBalance": 1490,
    "executionTimeMs": 3245
  }
}
```

**Error Response (Insufficient Credits):**
```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_CREDITS",
    "message": "You need 10 credits but have 5",
    "required": 10,
    "available": 5
  }
}
```

**POST /api/agents/:id/rate**

Rate an agent after use.

**Request:**
```json
{
  "rating": 5,
  "review": "Amazing tool! Saved me 30 minutes."
}
```

#### 10.2.5 Marketplace

**GET /api/marketplace/listings**

Get marketplace listings.

**Query Parameters:**
- `category` (optional)
- `minRevenue` (optional, in USD)
- `maxPrice` (optional, in BSV)
- `sort` (revenue-desc, price-asc, recent)
- `page`, `limit`

**Response:**
```json
{
  "success": true,
  "data": {
    "listings": [
      {
        "id": "uuid",
        "agent": { /* agent object */ },
        "askingPriceBsv": 0.05,
        "askingPriceUsd": 5000,
        "revenue30d": 52,
        "revenue90d": 147,
        "revenueAllTime": 150,
        "status": "active",
        "createdAt": "2025-11-01T00:00:00Z"
      }
    ]
  }
}
```

**POST /api/marketplace/listings**

Create listing (sell agent).

**Request:**
```json
{
  "agentId": "uuid",
  "askingPriceBsv": 0.05,
  "includesApiKey": false
}
```

**POST /api/marketplace/listings/:id/purchase**

Purchase an agent.

**Request:**
```json
{
  "bsvTxId": "..." // Payment transaction
}
```

---

## 11. Agent Structure

### 11.1 Agent React Component Template

Every agent deployed via React-OnChain follows this structure:

```typescript
// Template for all agents

import React, { useState } from 'react';
import { useCredits } from './hooks/useCredits';
import { useAgentExecution } from './hooks/useAgentExecution';

interface AgentConfig {
  id: string;
  name: string;
  description: string;
  creditCost: number;
  aiModel: string;
  systemPrompt: string;
  inputFields: InputField[];
}

interface InputField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'file' | 'dropdown' | 'slider';
  placeholder?: string;
  required: boolean;
  options?: string[];  // For dropdown
  min?: number;        // For slider
  max?: number;        // For slider
}

const AgentTemplate: React.FC<AgentConfig> = ({
  id,
  name,
  description,
  creditCost,
  aiModel,
  systemPrompt,
  inputFields
}) => {
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);
  
  const { balance, deductCredits } = useCredits();
  const { execute, loading, error } = useAgentExecution();
  
  const handleInputChange = (fieldId: string, value: any) => {
    setInputs(prev => ({ ...prev, [fieldId]: value }));
  };
  
  const handleRun = async () => {
    // Validate sufficient credits
    if (balance < creditCost) {
      alert(`Insufficient credits! You need ${creditCost} but have ${balance}.`);
      return;
    }
    
    // Validate required fields
    const missingFields = inputFields
      .filter(f => f.required && !inputs[f.id])
      .map(f => f.label);
    
    if (missingFields.length > 0) {
      alert(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }
    
    try {
      // Execute agent
      const output = await execute(id, inputs);
      setResult(output);
      
      // Deduct credits (handled by backend)
      // Balance will update automatically via WebSocket
    } catch (err) {
      console.error('Agent execution failed:', err);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <p className="text-gray-600">{description}</p>
        <div className="mt-4 flex items-center gap-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            💎 {creditCost} credits
          </span>
          <span className="text-sm text-gray-500">
            Your balance: {balance} credits
          </span>
        </div>
      </div>
      
      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        {inputFields.map(field => (
          <div key={field.id}>
            <label className="block text-sm font-medium mb-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            
            {field.type === 'text' && (
              <input
                type="text"
                placeholder={field.placeholder}
                value={inputs[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            )}
            
            {field.type === 'textarea' && (
              <textarea
                placeholder={field.placeholder}
                value={inputs[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg"
              />
            )}
            
            {field.type === 'dropdown' && (
              <select
                value={inputs[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select...</option>
                {field.options?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}
            
            {field.type === 'slider' && (
              <input
                type="range"
                min={field.min}
                max={field.max}
                value={inputs[field.id] || field.min}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="w-full"
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Run Button */}
      <button
        onClick={handleRun}
        disabled={loading || balance < creditCost}
        className={`w-full py-3 rounded-lg font-semibold ${
          loading || balance < creditCost
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {loading ? 'Running...' : `Run Agent (${creditCost} credits)`}
      </button>
      
      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}
      
      {/* Result Display */}
      {result && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-3">Result:</h3>
          {typeof result === 'string' ? (
            <pre className="whitespace-pre-wrap">{result}</pre>
          ) : result.imageUrl ? (
            <img src={result.imageUrl} alt="Generated" className="max-w-full" />
          ) : result.videoUrl ? (
            <video src={result.videoUrl} controls className="max-w-full" />
          ) : (
            <pre>{JSON.stringify(result, null, 2)}</pre>
          )}
          
          {/* Action Buttons */}
          <div className="mt-4 flex gap-2">
            <button 
              onClick={() => navigator.clipboard.writeText(JSON.stringify(result))}
              className="px-4 py-2 bg-white border rounded"
            >
              📋 Copy
            </button>
            <button 
              onClick={() => {/* Download logic */}}
              className="px-4 py-2 bg-white border rounded"
            >
              ⬇️ Download
            </button>
            <button 
              onClick={() => {/* Share logic */}}
              className="px-4 py-2 bg-white border rounded"
            >
              🔗 Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentTemplate;
```

### 11.2 Specific Agent Example: LinkedIn Post Writer

```typescript
// linkedinPostWriter.tsx
// This agent is deployed as a 1Sat ordinal

import React from 'react';
import AgentTemplate from './AgentTemplate';

const LinkedInPostWriter: React.FC = () => {
  const config = {
    id: 'linkedin-post-writer-123',
    name: 'LinkedIn Post Writer',
    description: 'Generate viral LinkedIn posts with engaging hooks, strategic emojis, and clear CTAs',
    creditCost: 10,
    aiModel: 'gpt-4',
    systemPrompt: `You are a LinkedIn growth strategist with 10 years of experience helping professionals build their personal brands.

Generate engaging LinkedIn posts that follow these proven patterns:

STRUCTURE:
1. Hook (1-2 sentences): Start with a question, bold statement, or surprising fact
2. Body (3-5 short paragraphs): Each paragraph is 1-2 sentences max
3. Call-to-Action: Ask for comments, shares, or engagement

STYLE:
- Use short paragraphs (easier to read on mobile)
- Include 3-5 relevant emojis (strategic placement, not excessive)
- Write in conversational tone (like talking to a friend)
- Use "you" and "your" to engage reader
- Add line breaks between paragraphs

LENGTH: 150-250 words (sweet spot for engagement)

OUTPUT FORMAT:
[Hook with emoji]

[Body paragraph 1]

[Body paragraph 2]

[Body paragraph 3 if needed]

[Call-to-action with question emoji]`,
    inputFields: [
      {
        id: 'topic',
        label: 'Topic',
        type: 'text',
        placeholder: 'e.g., "AI in healthcare", "remote work tips"',
        required: true
      },
      {
        id: 'tone',
        label: 'Tone',
        type: 'dropdown',
        required: true,
        options: ['Professional', 'Casual', 'Inspirational', 'Educational']
      },
      {
        id: 'length',
        label: 'Length',
        type: 'dropdown',
        required: false,
        options: ['Short (150 words)', 'Medium (250 words)', 'Long (400 words)']
      }
    ]
  };
  
  return <AgentTemplate {...config} />;
};

export default LinkedInPostWriter;
```

---

## 12. User Flows

### 12.1 Flow 1: First-Time User Journey

**Persona:** Sarah (Social Media Manager)

**Goal:** Run her first agent (LinkedIn Post Writer)

**Steps:**

1. **Landing Page**
   - Sarah visits 1satagents.com
   - Sees hero: "AI Agents Running on the Blockchain"
   - Featured agents carousel
   - Clicks "Browse Agents"

2. **Marketplace Discovery**
   - Sees grid of agent cards
   - Filters by "Content Creation"
   - Finds "LinkedIn Post Writer" (10 credits, 4.8 stars, 1.2K uses)
   - Clicks to view details

3. **Agent Details Page**
   - Reads description, reviews
   - Sees example output (screenshot)
   - Wants to try it
   - Clicks "Run Agent"

4. **Wallet Connection Prompt**
   - Modal: "Connect wallet to use agents"
   - Options: HandCash, MoneyButton
   - Sarah clicks "Connect with HandCash"
   - HandCash popup: "Authorize 1Sat Agents?"
   - Sarah approves
   - Returns to app, now connected

5. **Credit Purchase (First Time)**
   - Agent page shows: "You need 10 credits"
   - Modal: "Purchase Credits"
   - Three packages displayed (Starter, Pro, Enterprise)
   - Sarah selects Pro (1,000 credits for $8)
   - Clicks "Purchase with HandCash"
   - HandCash confirms: "Send 0.08 BSV to 1SatAgents?"
   - Sarah approves
   - Credits added: 1,000

6. **Run Agent**
   - Input form appears
   - Sarah enters:
     - Topic: "AI in healthcare"
     - Tone: Professional
   - Clicks "Run Agent (10 credits)"
   - Loading: "Generating post..." (3 seconds)
   - Output displays: Formatted LinkedIn post

7. **Result Actions**
   - Sarah reads post: "🏥 AI is revolutionizing healthcare in 3 key ways..."
   - Clicks "Copy" button
   - Pastes into LinkedIn
   - Post goes live
   - Returns to 1Sat Agents

8. **Post-Use**
   - Prompt: "Rate this agent?"
   - Sarah gives 5 stars + review: "Saved me 30 minutes!"
   - Credits remaining: 990
   - Sarah bookmarks the agent

**Outcome:**
- Sarah is hooked (instant value)
- Has 990 credits to use across other agents
- Will return daily to create content

### 12.2 Flow 2: Creator Builds & Deploys Agent

**Persona:** Alex (AI Prompt Engineer)

**Goal:** Create and monetize a "Cold Email Personalizer" agent

**Steps:**

1. **Builder Access**
   - Alex clicks "Create Agent" in header
   - Redirected to Agent Builder interface

2. **Setup Phase**
   - Form: Name, Description, Category, Icon
   - Alex enters:
     - Name: "Cold Email Personalizer"
     - Description: "Generate personalized cold emails with company research"
     - Category: Marketing
     - Icon: 📧

3. **Configuration Phase**
   - Choose AI Model: GPT-4
   - Write System Prompt:
```
You're a sales strategist specializing in cold outreach.

TASK: Generate personalized cold email based on:
- Company name
- Recipient role
- Product/service being sold

PROCESS:
1. Research: Summarize company's recent news/achievements
2. Personalize: Connect your product to their specific situation
3. Write: Short email (100 words) with:
   - Personalized opening (mention their company)
   - Value proposition (how you help)
   - Soft CTA (ask for 15-min call)

TONE: Professional but conversational
```
   - Set temperature: 0.7
   - Set max tokens: 500

4. **Input Fields**
   - Add fields:
     1. Company Name (text, required)
     2. Recipient Role (dropdown: CEO, CMO, CTO)
     3. Product Description (textarea, required)

5. **Pricing**
   - Platform suggests: 15 credits (based on GPT-4 costs)
   - Alex accepts

6. **Test Agent**
   - Sample input:
     - Company: "Acme Corp"
     - Role: CMO
     - Product: "Marketing automation tool"
   - Clicks "Test"
   - Output appears (looks good!)

7. **Deploy**
   - Clicks "Deploy to Blockchain"
   - Modal: "This will cost 0.00008 BSV (~$0.01)"
   - React-OnChain builds and deploys
   - Progress: Building → Inscribing → Deployed (60 seconds)
   - Success: Agent is live!

8. **Published**
   - Agent added to marketplace
   - Alex's dashboard shows:
     - Agent: Cold Email Personalizer
     - Status: Active
     - Runs: 0
     - Earnings: 0 credits

9. **First User**
   - Another user runs Alex's agent
   - Alex gets notification: "+13.5 credits earned!"
   - (15 credits × 90% creator share = 13.5 credits)

10. **Scale**
    - After 1 month: 500 runs = 6,750 credits = $67.50
    - After 3 months: 2,000 runs = 27,000 credits = $270
    - Agent listed for sale: $2,700 (10x monthly revenue)

**Outcome:**
- Alex built passive income in 30 minutes
- Agent runs forever on blockchain (no hosting costs)
- Can focus on creating more agents

### 12.3 Flow 3: Investor Buys Profitable Agent

**Persona:** Ivan (Crypto Investor)

**Goal:** Purchase "Cold Email Personalizer" as investment

**Steps:**

1. **Marketplace Browse**
   - Ivan visits 1satmarket.com
   - Filters: Revenue > $50/month
   - Sorts: Highest revenue first

2. **Discovery**
   - Finds "Cold Email Personalizer"
   - Stats:
     - Revenue (30 days): $67
     - Revenue (90 days): $180
     - Total runs: 2,000
     - Rating: 4.9/5
     - Asking price: 0.027 BSV ($2,700)

3. **Due Diligence**
   - Clicks agent to view details
   - Reviews revenue chart (trending up)
   - Sees on-chain verification link
   - Checks BSV explorer (confirms revenue)
   - Clicks "Test Agent" (free preview)
   - Agent works perfectly

4. **Purchase Decision**
   - Calculates: $67/month × 12 = $804/year
   - ROI: $2,700 / $804 = 3.4 years payback
   - Believes he can grow it to $100/month
   - Clicks "Buy Now - 0.027 BSV"

5. **Escrow Process**
   - Modal: "Escrow will hold funds until ordinal transfer"
   - Ivan clicks "Confirm Purchase"
   - HandCash: "Send 0.027 BSV to escrow?"
   - Ivan approves
   - Funds locked in BSV smart contract

6. **Transfer**
   - System initiates ordinal transfer:
     - From: Alex's wallet
     - To: Ivan's wallet
   - Blockchain confirmation (2-3 blocks, ~20 minutes)
   - Escrow releases funds to Alex

7. **Ownership Confirmed**
   - Ivan receives notification: "You now own Cold Email Personalizer!"
   - Agent appears in Ivan's "My Agents" dashboard
   - Future revenue goes to Ivan's wallet

8. **Optimization**
   - Ivan updates agent description (better marketing)
   - Promotes on Twitter: "Check out my AI agent..."
   - Revenue increases to $85/month
   - Payback time reduced to 2.6 years

**Outcome:**
- Alex earned $2,670 (after 1% platform fee)
- Ivan owns passive income asset
- Platform earned $27 marketplace fee

---

## 13. kie.ai Integration

### 13.1 Why kie.ai?

**Problems with Direct API Integration:**
- Need accounts with 10+ services (OpenAI, Anthropic, Runway, etc.)
- 10+ API keys to manage
- 10+ invoices to pay
- Different payment methods (mostly credit cards)
- Complex rate limits across providers

**kie.ai Solution:**
- **Single API:** One endpoint for all AI models
- **Crypto Payments:** Accepts BSV (our native currency)
- **Unified Billing:** One invoice, not 10
- **Better Pricing:** Bulk rates across all models
- **Simplified Integration:** One SDK to learn

### 13.2 kie.ai Service Implementation

```typescript
// server/src/services/kieAIService.ts

import fetch from 'node-fetch';

interface KieAIConfig {
  apiKey: string;
  baseUrl: string;
}

interface TextGenerationRequest {
  model: 'gpt-4' | 'gpt-3.5-turbo' | 'claude-2';
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  maxTokens?: number;
}

interface ImageGenerationRequest {
  model: 'dall-e-3' | 'stable-diffusion-xl';
  prompt: string;
  size?: '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
}

interface VideoGenerationRequest {
  model: 'runway-gen3' | 'pika-labs';
  prompt: string;
  duration?: number; // seconds
  aspectRatio?: '16:9' | '9:16' | '1:1';
}

interface VoiceGenerationRequest {
  model: 'elevenlabs';
  text: string;
  voiceId?: string;
  stability?: number;
  similarityBoost?: number;
}

class KieAIService {
  private apiKey: string;
  private baseUrl: string = 'https://api.kie.ai/v1';

  constructor(config: KieAIConfig) {
    this.apiKey = config.apiKey;
    if (config.baseUrl) {
      this.baseUrl = config.baseUrl;
    }
  }

  /**
   * Generate text using LLM
   */
  async generateText(request: TextGenerationRequest): Promise<{
    text: string;
    tokensUsed: number;
    costUsd: number;
  }> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: request.model,
        messages: request.messages,
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 500
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`kie.ai error: ${error.message}`);
    }

    const data = await response.json();
    
    return {
      text: data.choices[0].message.content,
      tokensUsed: data.usage.total_tokens,
      costUsd: this.calculateTextCost(request.model, data.usage.total_tokens)
    };
  }

  /**
   * Generate image
   */
  async generateImage(request: ImageGenerationRequest): Promise<{
    imageUrl: string;
    costUsd: number;
  }> {
    const response = await fetch(`${this.baseUrl}/images/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: request.model,
        prompt: request.prompt,
        size: request.size || '1024x1024',
        quality: request.quality || 'standard'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`kie.ai error: ${error.message}`);
    }

    const data = await response.json();
    
    return {
      imageUrl: data.data[0].url,
      costUsd: this.calculateImageCost(request.model, request.quality)
    };
  }

  /**
   * Generate video
   */
  async generateVideo(request: VideoGenerationRequest): Promise<{
    videoUrl: string;
    costUsd: number;
  }> {
    const response = await fetch(`${this.baseUrl}/video/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: request.model,
        prompt: request.prompt,
        duration: request.duration || 5,
        aspect_ratio: request.aspectRatio || '16:9'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`kie.ai error: ${error.message}`);
    }

    const data = await response.json();
    
    return {
      videoUrl: data.video_url,
      costUsd: this.calculateVideoCost(request.model, request.duration || 5)
    };
  }

  /**
   * Generate voice/audio
   */
  async generateVoice(request: VoiceGenerationRequest): Promise<{
    audioUrl: string;
    costUsd: number;
  }> {
    const response = await fetch(`${this.baseUrl}/audio/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: request.model,
        text: request.text,
        voice_id: request.voiceId || 'default',
        stability: request.stability || 0.5,
        similarity_boost: request.similarityBoost || 0.75
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`kie.ai error: ${error.message}`);
    }

    const data = await response.json();
    
    return {
      audioUrl: data.audio_url,
      costUsd: this.calculateVoiceCost(request.text.length)
    };
  }

  /**
   * Cost calculation helpers
   */
  private calculateTextCost(model: string, tokens: number): number {
    const pricing = {
      'gpt-4': 0.03 / 1000,           // $0.03 per 1K tokens
      'gpt-3.5-turbo': 0.002 / 1000,  // $0.002 per 1K tokens
      'claude-2': 0.008 / 1000        // $0.008 per 1K tokens
    };
    return (pricing[model] || 0) * tokens;
  }

  private calculateImageCost(model: string, quality?: string): number {
    const pricing = {
      'dall-e-3': quality === 'hd' ? 0.08 : 0.04,
      'stable-diffusion-xl': 0.015
    };
    return pricing[model] || 0;
  }

  private calculateVideoCost(model: string, duration: number): number {
    const pricing = {
      'runway-gen3': 0.50 / 5,  // $0.50 per 5 seconds
      'pika-labs': 0.40 / 5
    };
    const perSecond = pricing[model] || 0;
    return perSecond * duration;
  }

  private calculateVoiceCost(textLength: number): number {
    // ElevenLabs: ~$0.30 per 1K characters
    return (textLength / 1000) * 0.30;
  }

  /**
   * Convert USD cost to credits
   */
  convertToCred

its(usdCost: number): number {
    const CREDIT_VALUE = 0.01; // 1 credit = $0.01
    return Math.ceil(usdCost / CREDIT_VALUE);
  }
}

export default KieAIService;
```

### 13.3 Agent Execution with kie.ai

```typescript
// server/src/services/agentService.ts

import KieAIService from './kieAIService';
import CreditService from './creditService';
import { db } from '../db/client';

interface ExecuteAgentRequest {
  agentId: string;
  userId: string;
  input: Record<string, any>;
}

interface ExecuteAgentResponse {
  runId: string;
  output: any;
  creditsUsed: number;
  executionTimeMs: number;
}

class AgentService {
  private kieAI: KieAIService;

  constructor() {
    this.kieAI = new KieAIService({
      apiKey: process.env.KIE_AI_API_KEY!,
      baseUrl: process.env.KIE_AI_BASE_URL
    });
  }

  async executeAgent(request: ExecuteAgentRequest): Promise<ExecuteAgentResponse> {
    const startTime = Date.now();

    // Get agent config
    const agent = await db.agent.findUnique({
      where: { id: request.agentId }
    });

    if (!agent) {
      throw new Error('Agent not found');
    }

    // Check user credits
    const userBalance = await CreditService.getBalance(request.userId);
    if (userBalance < agent.creditCost) {
      throw new Error(`Insufficient credits. Need ${agent.creditCost}, have ${userBalance}`);
    }

    // Create run record
    const run = await db.agentRun.create({
      data: {
        agentId: request.agentId,
        userId: request.userId,
        input: JSON.stringify(request.input),
        status: 'pending',
        creditsCost: agent.creditCost
      }
    });

    try {
      // Deduct credits upfront
      await CreditService.deductCredits(
        request.userId,
        request.agentId,
        agent.creditCost
      );

      // Execute via kie.ai based on agent type
      let output: any;
      let apiCostUsd: number;

      if (agent.aiModel.startsWith('gpt') || agent.aiModel.startsWith('claude')) {
        // Text generation
        const result = await this.kieAI.generateText({
          model: agent.aiModel as any,
          messages: [
            { role: 'system', content: agent.systemPrompt },
            { role: 'user', content: this.formatInput(request.input) }
          ],
          temperature: agent.temperature || 0.7,
          maxTokens: agent.maxTokens || 500
        });
        
        output = { text: result.text };
        apiCostUsd = result.costUsd;
      } 
      else if (agent.aiModel.startsWith('dall-e') || agent.aiModel.startsWith('stable')) {
        // Image generation
        const result = await this.kieAI.generateImage({
          model: agent.aiModel as any,
          prompt: this.formatInput(request.input)
        });
        
        output = { imageUrl: result.imageUrl };
        apiCostUsd = result.costUsd;
      }
      else if (agent.aiModel.startsWith('runway') || agent.aiModel.startsWith('pika')) {
        // Video generation
        const result = await this.kieAI.generateVideo({
          model: agent.aiModel as any,
          prompt: this.formatInput(request.input)
        });
        
        output = { videoUrl: result.videoUrl };
        apiCostUsd = result.costUsd;
      }
      else {
        throw new Error(`Unsupported AI model: ${agent.aiModel}`);
      }

      const executionTime = Date.now() - startTime;

      // Update run record (success)
      await db.agentRun.update({
        where: { id: run.id },
        data: {
          status: 'success',
          output: JSON.stringify(output),
          executionTimeMs: executionTime,
          apiCostUsd
        }
      });

      // Update agent stats
      await db.agent.update({
        where: { id: request.agentId },
        data: {
          totalRuns: { increment: 1 },
          successRate: { /* calculate new rate */ }
        }
      });

      return {
        runId: run.id,
        output,
        creditsUsed: agent.creditCost,
        executionTimeMs: executionTime
      };

    } catch (error: any) {
      // Update run record (error)
      await db.agentRun.update({
        where: { id: run.id },
        data: {
          status: 'error',
          errorMessage: error.message
        }
      });

      // Refund credits
      await CreditService.refundCredits(
        request.userId,
        request.agentId,
        agent.creditCost
      );

      throw error;
    }
  }

  private formatInput(input: Record<string, any>): string {
    // Convert input object to formatted prompt
    return Object.entries(input)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  }
}

export default new AgentService();
```

---

## 14. Agent Ideas

### 14.1 Tier 1: High-Demand Agents (Build First)

1. **LinkedIn Post Writer**
   - Cost: 10 credits
   - Model: GPT-4
   - Revenue potential: $50-100/month
   
2. **Cold Email Personalizer**
   - Cost: 15 credits
   - Model: GPT-4 + Perplexity
   - Revenue potential: $75-150/month
   
3. **YouTube Title Generator**
   - Cost: 5 credits
   - Model: GPT-4
   - Revenue potential: $30-60/month
   
4. **Product Photo Background Remover**
   - Cost: 25 credits
   - Model: DALL-E (inpainting)
   - Revenue potential: $100-200/month
   
5. **Meeting Notes Summarizer**
   - Cost: 20 credits
   - Model: GPT-4
   - Revenue potential: $60-120/month

### 14.2 Tier 2: Creative Agents

6. **AI Avatar Creator**
   - Cost: 50 credits
   - Model: Stable Diffusion XL
   
7. **YouTube Thumbnail Designer**
   - Cost: 30 credits
   - Model: DALL-E 3
   
8. **Podcast Intro Generator**
   - Cost: 40 credits
   - Model: ElevenLabs
   
9. **Meme Generator (Trending)**
   - Cost: 20 credits
   - Model: GPT-4 + DALL-E
   
10. **Short Video Script Writer**
    - Cost: 15 credits
    - Model: GPT-4

### 14.3 Tier 3: Premium Agents

11. **Market Research Assistant**
    - Cost: 100 credits
    - Model: Perplexity + GPT-4
    
12. **5-Email Campaign Builder**
    - Cost: 50 credits
    - Model: GPT-4
    
13. **Video Generation (5 sec)**
    - Cost: 50 credits
    - Model: Runway Gen-3
    
14. **Voice Clone for Ads**
    - Cost: 30 credits
    - Model: ElevenLabs
    
15. **Academic Paper Summarizer**
    - Cost: 20 credits
    - Model: GPT-4

*(See full list of 40 ideas in previous document)*

---

## 15. Business Model

### 15.1 Revenue Streams

**1. Credit Sales (Primary Revenue)**
```
Starter Package: $1 → $0.95 profit (5% kie.ai cost)
Pro Package: $8 → $7.60 profit
Enterprise: $70 → $66.50 profit

Average user: $15/month purchase
Profit per user: ~$14/month

1,000 users = $14,000/month profit
```

**2. Agent Usage Fees (10% Platform Fee)**
```
Agent costs 10 credits → User pays 10
Creator gets: 9 credits (90%)
Platform gets: 1 credit (10%)

Average user uses 100 credits/month
Platform earns: 10 credits = $0.10/user/month

1,000 active users = $100/month
```

**3. Marketplace Trading (1% Fee)**
```
Agent sells for $2,000
Platform fee: $20

10 sales/month = $200/month
```

**Total Platform Revenue (1,000 Users):**
- Credit sales: $14,000/month
- Usage fees: $100/month
- Marketplace: $200/month
- **Total: $14,300/month ($171,600/year)**

### 15.2 Unit Economics

**Per-User Economics:**
```
Revenue:
- Credit purchase: $15/month
- Total revenue: $15

Costs:
- kie.ai API costs: ~$1/month (covered by credit pricing)
- React-OnChain: $0 (one-time $0.01)
- Hosting: $0 (Replit free tier or $7/month total)
- Support: $0.10/user (automated)
- Total costs: $1.10

Profit: $13.90/user/month
Margin: 93%
```

**Customer Acquisition Cost (CAC):**
```
Organic (Twitter, PH, Reddit): $0
Paid ads: ~$5/user
Word-of-mouth: $0

Blended CAC: $2/user
```

**Lifetime Value (LTV):**
```
Average user lifetime: 18 months
Monthly revenue: $15
LTV: $15 × 18 = $270

LTV/CAC: 270/2 = 135x (excellent!)
```

### 15.3 Growth Projections

**Conservative Scenario:**

| Month | Users | MRR | Agents | Marketplace Sales |
|-------|-------|-----|--------|-------------------|
| 1 | 50 | $750 | 5 | 0 |
| 2 | 100 | $1,500 | 10 | 1 |
| 3 | 200 | $3,000 | 20 | 2 |
| 6 | 500 | $7,500 | 50 | 5 |
| 12 | 1,000 | $15,000 | 100 | 10 |

**Aggressive Scenario (Viral Growth):**

| Month | Users | MRR | Agents | Marketplace Sales |
|-------|-------|-----|--------|-------------------|
| 1 | 100 | $1,500 | 5 | 0 |
| 2 | 300 | $4,500 | 15 | 2 |
| 3 | 1,000 | $15,000 | 50 | 10 |
| 6 | 5,000 | $75,000 | 200 | 50 |
| 12 | 20,000 | $300,000 | 500 | 200 |

---

## 16. Implementation Roadmap

### 16.1 Week 1: MVP Foundation

**Days 1-2: Setup**
- [x] Initialize Replit project
- [x] Set up monorepo structure (client + server)
- [x] Install dependencies (Vite, Express, Prisma, etc.)
- [x] Configure environment variables
- [x] Set up database schema (Prisma)
- [x] Create base React app with Tailwind

**Days 3-4: Credit System**
- [x] Implement credit database schema
- [x] Build CreditService (purchase, deduct, balance)
- [x] Create WalletService (HandCash integration)
- [x] Build Credit UI (balance badge, purchase modal)
- [x] Test credit flow end-to-end

**Days 5-7: First Agent**
- [x] Integrate kie.ai API
- [x] Build AgentTemplate component
- [x] Create LinkedIn Post Writer (hardcoded)
- [x] Test agent execution
- [x] Deploy as React-OnChain ordinal

**Deliverable:** Working MVP with:
- Credit purchase via BSV
- 1 working agent (LinkedIn Post Writer)
- Agent execution with kie.ai
- Deployed on blockchain

### 16.2 Week 2-3: Marketplace & More Agents

**Week 2: Marketplace**
- [x] Agent discovery page (grid view)
- [x] Agent detail page
- [x] Search and filter functionality
- [x] Rating system
- [x] Add 4 more Tier 1 agents

**Week 3: Creator Tools**
- [x] Agent Builder interface (visual)
- [x] System prompt templates library
- [x] Test & preview functionality
- [x] Deploy flow (React-OnChain integration)

**Deliverable:**
- 5 agents live
- Marketplace with discovery
- Agent builder for creators

### 16.3 Week 4-6: Advanced Features

**Week 4: Analytics**
- [x] Creator dashboard (revenue, usage stats)
- [x] Charts (Recharts integration)
- [x] Transaction history
- [x] Agent performance metrics

**Week 5: Marketplace Trading**
- [x] Listing creation UI
- [x] Escrow smart contract (BSV)
- [x] Purchase flow
- [x] Ordinal transfer logic

**Week 6: Polish**
- [x] Mobile responsiveness
- [x] Error handling improvements
- [x] Loading states
- [x] Accessibility audit
- [x] Performance optimization

**Deliverable:**
- Full marketplace with trading
- Creator analytics
- Production-ready platform

### 16.4 Week 7-12: Scale & Growth

**Week 7-8: Agent Chaining**
- [ ] Multi-step workflow builder
- [ ] Input/output mapping
- [ ] Chained execution logic

**Week 9-10: Advanced Agent Types**
- [ ] Video generation agents
- [ ] Voice generation agents
- [ ] Multi-modal agents

**Week 11-12: Growth & Marketing**
- [ ] SEO optimization
- [ ] Social sharing features
- [ ] Referral program
- [ ] Content marketing (blog posts)

**Deliverable:**
- 50+ agents
- 1,000+ users
- $15K MRR

---

## 17. Success Metrics

### 17.1 Launch Metrics (Week 1)

**Activation:**
- 50 wallet connections
- 25 credit purchases
- 100 agent executions
- $50 in credit sales

**Engagement:**
- 5 agents created
- 10 ratings submitted
- 20% return user rate

### 17.2 Growth Metrics (Month 3)

**User Metrics:**
- 200 registered users
- 100 active users (used agent in last 30 days)
- 50 creators (built at least 1 agent)

**Revenue Metrics:**
- $3,000 MRR (credit sales)
- $30 MRR (usage fees)
- $100 (marketplace sales)
- **Total: $3,130 MRR**

**Platform Health:**
- 20 active agents
- 5,000 agent executions
- 4.5+ average agent rating
- 95%+ execution success rate

### 17.3 Success Metrics (Month 12)

**User Metrics:**
- 1,000+ registered users
- 500+ active users
- 200+ creators

**Revenue Metrics:**
- $15,000 MRR (credit sales)
- $150 MRR (usage fees)
- $500 MRR (marketplace sales)
- **Total: $15,650 MRR ($187,800 ARR)**

**Platform Health:**
- 100+ active agents
- 50,000+ agent executions
- 4.7+ average agent rating
- 98%+ execution success rate

### 17.4 KPIs to Track

**User Acquisition:**
- Daily/weekly signups
- Traffic sources (organic, paid, referral)
- Conversion rate (visitor → signup)

**User Engagement:**
- DAU/MAU ratio
- Average credits used per user
- Agents used per session
- Return user rate (7-day, 30-day)

**Creator Success:**
- Agents created per creator
- Average agent revenue
- Top 10% creator earnings

**Platform Health:**
- Agent execution success rate
- Average execution time
- kie.ai API uptime
- React-OnChain deployment success rate

**Financial:**
- MRR growth rate
- CAC payback period
- Gross margin
- Burn rate

---

## 18. Risk Assessment

### 18.1 Technical Risks

**Risk 1: kie.ai Dependency**
- **Probability:** Medium
- **Impact:** High
- **Description:** kie.ai could go down, change pricing, or discontinue service
- **Mitigation:**
  - Build abstraction layer (easy to swap providers)
  - Monitor kie.ai status page
  - Have backup: Direct OpenAI/Anthropic integration
  - Cache kie.ai responses where possible

**Risk 2: React-OnChain Reliability**
- **Probability:** Low
- **Impact:** High
- **Description:** React-OnChain deployment could fail
- **Mitigation:**
  - Thoroughly test with various agent sizes
  - Have manual deployment fallback
  - Contribute to React-OnChain project (improve reliability)
  - Monitor deployment success rate

**Risk 3: BSV Blockchain Congestion**
- **Probability:** Low
- **Impact:** Medium
- **Description:** BSV network could get congested (slow confirmations)
- **Mitigation:**
  - BSV scales to millions of tx/day (unlikely to congest)
  - Queue deployments during high load
  - Use fee estimation to prioritize urgent deploys

**Risk 4: Agent Security**
- **Probability:** Medium
- **Impact:** High
- **Description:** Malicious agents could exploit users
- **Mitigation:**
  - Scan all agent code before deployment
  - Sandbox agent execution (strict CSP)
  - User reporting system
  - Manual review of featured agents

### 18.2 Business Risks

**Risk 5: Low Adoption**
- **Probability:** Medium
- **Impact:** High
- **Description:** Users don't see value, platform doesn't grow
- **Mitigation:**
  - Launch with 5 killer agents (proven use cases)
  - Aggressive marketing (Product Hunt, Twitter, Reddit)
  - Free trial credits (100 credits for first signup)
  - Build in public (share progress on Twitter)

**Risk 6: Competition**
- **Probability:** Medium
- **Impact:** Medium
- **Description:** Glif AI or others add blockchain features
- **Mitigation:**
  - First-mover advantage (launch fast)
  - Network effects (more agents = more users)
  - Focus on best UX
  - Build community loyalty

**Risk 7: Regulatory Issues**
- **Probability:** Low
- **Impact:** High
- **Description:** Crypto payments could face regulation
- **Mitigation:**
  - Non-custodial model (users control wallets)
  - No KYC required (on-chain payments)
  - Legal consultation pre-launch
  - Terms of service clarity

**Risk 8: kie.ai Pricing Changes**
- **Probability:** Medium
- **Impact:** Medium
- **Description:** kie.ai could increase API prices
- **Mitigation:**
  - Monitor kie.ai pricing closely
  - Adjust agent credit costs accordingly
  - Build pricing flexibility into platform
  - Diversify to other API providers

### 18.3 User Experience Risks

**Risk 9: Wallet Friction**
- **Probability:** High
- **Impact:** Medium
- **Description:** Users struggle with wallet setup
- **Mitigation:**
  - Excellent onboarding (video tutorials)
  - Support multiple wallets (HandCash, MoneyButton)
  - Guest mode (browse agents without wallet)
  - Consider fiat on-ramp (future feature)

**Risk 10: Credit Confusion**
- **Probability:** Medium
- **Impact:** Low
- **Description:** Users don't understand credit system
- **Mitigation:**
  - Clear pricing ($1 = 100 credits = $0.01 per credit)
  - Show USD equivalent everywhere
  - Tooltips and FAQs
  - Cost estimator before running agents

---

## Appendix A: Replit Configuration

### replit.nix

```nix
{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.typescript
    pkgs.nodePackages.vite
    pkgs.sqlite
    pkgs.postgresql  # For future migration
  ];
}
```

### .replit

```toml
run = "npm run dev"

[nix]
channel = "stable-22_11"

[deployment]
run = ["npm", "run", "build"]
deploymentTarget = "cloudrun"
```

### package.json (Root)

```json
{
  "name": "1sat-agents",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "concurrently \"npm run dev:client\" \"npm run dev:server\"",
    "dev:client": "cd client && vite",
    "dev:server": "cd server && tsx watch src/index.ts",
    "build": "npm run build:client && npm run build:server",
    "build:client": "cd client && vite build",
    "build:server": "cd server && tsc",
    "start": "node server/dist/index.js",
    "db:migrate": "cd server && prisma migrate dev",
    "db:studio": "cd server && prisma studio"
  },
  "devDependencies": {
    "concurrently": "^8.2.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

## Appendix B: Environment Variables

### .env.example

```bash
# Server
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL="file:./dev.db"
# For PostgreSQL (production):
# DATABASE_URL="postgresql://user:password@host:5432/dbname"

# AI Service (kie.ai)
KIE_AI_API_KEY="your-kie-ai-key"
KIE_AI_BASE_URL="https://api.kie.ai/v1"

# Blockchain (BSV)
BSV_NETWORK="mainnet"  # or "testnet"
WHATS_ON_CHAIN_API_KEY="your-woc-key"

# Wallet (HandCash)
HANDCASH_APP_ID="your-app-id"
HANDCASH_APP_SECRET="your-app-secret"
PLATFORM_WALLET_ADDRESS="1SatAgentsPlatform..."

# React-OnChain
REACT_ONCHAIN_WALLET_PRIVATE_KEY="..."  # For server-side deploys

# Security
JWT_SECRET="your-jwt-secret-here"
SESSION_SECRET="your-session-secret"

# Platform Config
PLATFORM_FEE_PERCENT=10      # % of credits that go to platform
MARKETPLACE_FEE_PERCENT=1    # % of sale price
CREDIT_VALUE_USD=0.01        # 1 credit = $0.01

# Optional
SENTRY_DSN="..."  # Error monitoring
REDIS_URL="..."   # Caching (Phase 2+)
```

---

## Appendix C: Next Steps

### Immediate Actions (This Week)

1. **Set up Replit Project**
   - Create new Replit
   - Copy project structure from PRD
   - Install dependencies

2. **Integrate kie.ai**
   - Sign up for kie.ai account
   - Get API key
   - Test basic API calls

3. **Build First Agent**
   - Create LinkedIn Post Writer
   - Test with kie.ai
   - Deploy via React-OnChain

4. **Launch MVP**
   - 50 users
   - 100 agent runs
   - $50 credit sales

### First Month Goals

- 5 agents live
- 200 users
- $3,000 MRR

### Questions to Answer

1. What should agent credit costs be? (Use kie.ai pricing calculator)
2. Which wallet should be primary? (HandCash vs. MoneyButton)
3. Should we support fiat payments? (Stripe for credits)
4. What's our marketing strategy? (Product Hunt, Twitter ads, etc.)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Nov 6, 2025 | Claude | Initial draft (micro-SaaS tools) |
| 2.0 | Nov 6, 2025 | Claude | Complete pivot to AI agents |

---

## Approval

**Product Owner:** _______________  Date: ___________

**Engineering Lead:** _______________  Date: ___________

**Design Lead:** _______________  Date: ___________

---

**END OF PRD**

**Ready to build? Start with Week 1, Day 1. Let's ship this! 🚀**
