# 1Sat MicroSaaS Builder Platform - Product Requirements Document

**Version:** 1.0  
**Date:** November 6, 2025  
**Status:** Draft  
**Target Platform:** Replit  
**Tech Stack:** Vite + React + TypeScript + Express + BSV + React-OnChain

---

## Executive Summary

**Product Name:** 1Sat Builder

**Vision:** Democratize micro-SaaS creation by enabling anyone—technical or non-technical—to build, mint, and monetize single-purpose web applications using AI assistance, storing them permanently on the Bitcoin SV blockchain as 1Sat ordinals via React-OnChain.

**One-Liner:** "Build a micro-SaaS app in minutes, own it as a blockchain asset, earn passive income forever."

**Core Innovation:** Leverages React-OnChain for sub-penny deployment costs and permanent hosting, combined with AI-powered app generation, creating a new asset class of tradable micro-businesses.

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Problem Statement](#2-problem-statement)
3. [Solution](#3-solution)
4. [Target Users](#4-target-users)
5. [Core Features](#5-core-features)
6. [Technical Architecture](#6-technical-architecture)
7. [Data Models](#7-data-models)
8. [API Specifications](#8-api-specifications)
9. [User Flows](#9-user-flows)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Success Metrics](#11-success-metrics)
12. [Implementation Roadmap](#12-implementation-roadmap)
13. [Risk Assessment](#13-risk-assessment)
14. [Open Questions](#14-open-questions)

---

## 1. Product Overview

### 1.1 Product Ecosystem

The platform consists of four interconnected products:

1. **1Sat Builder** - AI-powered app creation and minting interface
2. **1Sat Apps** - Discovery page for finding and using apps (pay-per-use)
3. **1Sat Chain** - Node-RED-style workflow builder for chaining apps
4. **1Sat Market** - Marketplace for buying/selling apps as microbusinesses

### 1.2 Key Differentiators

- **Sub-Penny Deployment:** Apps cost <$0.01 to deploy, run forever at $0
- **AI-Powered Creation:** Non-coders can describe apps and have AI build them
- **True Ownership:** Apps stored as 1Sat ordinals on BSV blockchain
- **Tradable Assets:** Apps can be sold as microbusinesses with revenue history
- **React-OnChain Integration:** Production-ready deployment infrastructure

### 1.3 Revenue Model

**Platform Revenue:**
- 2% commission on pay-per-use transactions
- 1% marketplace transaction fee
- Optional: Premium AI features ($5/month for unlimited generations)

**Creator Revenue:**
- Pay-per-use fees (creator sets price, typically $0.05-$1.00 per use)
- One-time app sales in marketplace

---

## 2. Problem Statement

### 2.1 Current Pain Points

**For Non-Technical Users:**
- Creating web apps requires coding skills (barrier to entry)
- Hosting costs $10-50/month (prohibitive for side projects)
- No way to monetize simple tools without complex infrastructure

**For Developers:**
- Prototyping micro-SaaS ideas takes days/weeks
- Traditional hosting has recurring costs
- No clear path to sell apps as assets

**For Both:**
- Apps can be taken down by hosting providers (censorship risk)
- Ownership is unclear (code vs. running app)
- Revenue tracking requires payment processors (fees + complexity)

### 2.2 Market Opportunity

- **Micro-SaaS Market:** $5B+ and growing
- **No-Code Tools Market:** $13.2B by 2025
- **BSV Transaction Volume:** Scaling to millions of transactions/day
- **Target Audience:** 50M+ creators, developers, small businesses

---

## 3. Solution

### 3.1 Core Solution Components

**3.1.1 AI-Driven App Builder**
- User describes app functionality via natural language
- AI (GPT-4/Claude) generates React component code
- Visual preview with live editing
- One-click deployment via React-OnChain

**3.1.2 React-OnChain Integration**
- Complete app stored on BSV blockchain (<50MB)
- Deployment cost: <$0.01
- Permanent hosting with zero recurring fees
- Built-in versioning and dependency management

**3.1.3 Discovery & Monetization**
- Apps published to searchable directory
- Pay-per-use via BSV microtransactions (0.00001 BSV minimum)
- Automatic revenue distribution to creator wallets

**3.1.4 Marketplace**
- Apps listed for sale with revenue metrics
- Smart contract escrow for secure transfers
- Ordinal ownership transfer = full app ownership

### 3.2 Technical Foundation

**Blockchain:** Bitcoin SV (BSV)
- 50MB ordinal capacity (perfect for React apps)
- Low fees (~$0.05 per 50MB inscription)
- High throughput (millions of tx/day)

**Deployment:** React-OnChain
- Handles dependency resolution automatically
- Streaming video support
- Versioning built-in
- Service worker sandboxing

---

## 4. Target Users

### 4.1 Primary Personas

**Persona 1: "Sarah the Side-Hustler"**
- Age: 28
- Background: Marketing manager, non-technical
- Goal: Create simple tools to monetize (e.g., hashtag generator)
- Pain: Can't code, doesn't want to pay for hosting
- Value: AI builds app, pays $0.01 once, earns $50/month

**Persona 2: "Dev the Developer"**
- Age: 32
- Background: Full-stack developer
- Goal: Rapid prototyping and selling micro-SaaS ideas
- Pain: Hosting costs add up, takes time to set up infrastructure
- Value: Deploy in 5 minutes, $0 hosting, sell app for $500+

**Persona 3: "Investor Ivan"**
- Age: 45
- Background: Crypto enthusiast, portfolio diversification
- Goal: Buy profitable micro-SaaS apps as passive income
- Pain: Hard to verify revenue, unclear ownership
- Value: Transparent on-chain revenue, ordinal = proof of ownership

### 4.2 User Journey Stages

1. **Discovery:** User learns about platform via social media/blog
2. **Activation:** Creates first app using AI (free tier)
3. **Engagement:** Mints app for $0.01, publishes to directory
4. **Monetization:** Earns first $1 from pay-per-use
5. **Advocacy:** Shares on Twitter, creates more apps
6. **Power User:** Lists app in marketplace, buys other apps

---

## 5. Core Features

### 5.1 MVP Features (Phase 1 - Month 1-2)

#### 5.1.1 App Builder Interface

**Component: AI Prompt Input**
```typescript
interface AppPrompt {
  description: string;      // "Create a color palette generator"
  category: AppCategory;    // Design, Productivity, Media, etc.
  features?: string[];      // Optional feature list
  monetization: {
    pricePerUse: number;    // In USD (converted to BSV)
    freeTrialUses?: number; // Optional free uses
  };
}
```

**Features:**
- Text area for app description (max 500 chars)
- Category dropdown (10 categories)
- Template gallery (5 starter templates)
- Price setting (min $0.05, max $10.00 per use)

**Component: Code Preview**
- Split-pane view (code left, preview right)
- Syntax highlighting (Monaco Editor)
- Live preview in iframe
- Mobile/desktop toggle

**Component: Customization Panel**
- Visual editor for colors, fonts (simple UI)
- Settings: app name, description, icon
- API key input (optional, for AI/external services)

**Component: Deploy Button**
- Shows estimated cost (<$0.01)
- Wallet connection required (HandCash/MoneyButton)
- Progress indicator (Building → Inscribing → Deployed)
- Success: Shows app URL and ordinal ID

#### 5.1.2 React-OnChain Integration

**Deployment Service:**
```typescript
interface DeploymentConfig {
  buildDir: string;
  wallet: WalletConfig;
  metadata: {
    name: string;
    description: string;
    category: string;
    pricePerUse: number;
    creatorAddress: string;
  };
}

interface DeploymentResult {
  txid: string;
  outpoint: string;
  url: string;
  cost: number; // In BSV
  inscriptionId: string;
  version: string;
}
```

**Implementation:**
```bash
# Install React-OnChain as dependency
npm install react-onchain

# Wrapper service in Express
POST /api/deploy
{
  "projectCode": "...",    // Generated React code
  "metadata": { ... },
  "walletAddress": "..."
}
```

#### 5.1.3 Discovery Page (1Sat Apps)

**Features:**
- Grid view of app cards (name, icon, price, rating)
- Search bar (fuzzy search by name/category)
- Category filter (sidebar)
- Sort by: Recent, Popular, Price
- "Run App" button → Opens in modal iframe

**App Card Component:**
```typescript
interface AppCard {
  id: string;
  name: string;
  description: string;
  icon: string; // Base64 or URL
  category: string;
  pricePerUse: number;
  rating: number; // 1-5 stars
  usageCount: number;
  creatorAddress: string;
  inscriptionId: string;
  deploymentUrl: string; // React-OnChain URL
}
```

**Usage Flow:**
1. User clicks "Run App"
2. Modal opens with iframe loading `deploymentUrl`
3. User interacts with app
4. On submission/use, microtransaction triggered
5. App executes, shows results
6. User can rate app (1-5 stars)

#### 5.1.4 Wallet Integration

**Supported Wallets:**
- HandCash (primary)
- MoneyButton (alternative)

**Wallet Service:**
```typescript
interface WalletService {
  connect(): Promise<WalletConnection>;
  getBalance(): Promise<number>; // In BSV
  sendPayment(to: string, amount: number): Promise<Transaction>;
  signMessage(message: string): Promise<Signature>;
}

interface WalletConnection {
  address: string;
  publicKey: string;
  balance: number;
}
```

### 5.2 Phase 2 Features (Month 3-4)

#### 5.2.1 App Versioning & Updates

**Update Flow:**
1. Creator selects app from "My Apps" dashboard
2. Makes changes in builder
3. Deploys update (React-OnChain handles versioning)
4. Users automatically get latest version
5. Old versions accessible via `?version=1.0.0`

**Version Metadata:**
```typescript
interface AppVersion {
  version: string; // semver (1.0.0)
  inscriptionId: string;
  deployedAt: Date;
  changelog: string;
  deprecated: boolean;
}
```

#### 5.2.2 Marketplace (1Sat Market)

**Features:**
- List app for sale (set asking price)
- Show revenue history (last 30 days, 90 days, all-time)
- Usage stats (total uses, unique users)
- Escrow via BSV smart contract
- Transfer ordinal ownership

**Listing Interface:**
```typescript
interface MarketListing {
  appId: string;
  askingPrice: number; // In BSV
  revenueStats: {
    last30Days: number;
    last90Days: number;
    allTime: number;
  };
  usageStats: {
    totalUses: number;
    uniqueUsers: number;
    averageRating: number;
  };
  includesApiKey: boolean; // If app uses external API
}
```

#### 5.2.3 Workflow Builder (1Sat Chain)

**Node-RED Style Interface:**
- Canvas with drag-drop nodes
- Each node = one app from directory
- Connect nodes to pass data
- Standardized JSON format for input/output
- Save workflow as new ordinal

**Workflow Execution:**
```typescript
interface WorkflowNode {
  id: string;
  appInscriptionId: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  nextNodes: string[];
}

interface Workflow {
  nodes: WorkflowNode[];
  startNode: string;
}
```

### 5.3 Phase 3 Features (Month 5-6)

#### 5.3.1 Advanced AI Features

**Features:**
- Multi-turn conversation with AI (refine app iteratively)
- Visual design suggestions (color palettes, layouts)
- Code optimization recommendations
- Template creation from existing apps

**Premium Tier:**
- $5/month: Unlimited AI generations
- Access to GPT-4 (vs GPT-3.5 free tier)
- Custom template creation

#### 5.3.2 Analytics Dashboard

**Creator Dashboard:**
- Revenue over time (line chart)
- Usage by app (bar chart)
- Geographic distribution of users
- Most popular apps (ranked list)
- Export data as CSV

#### 5.3.3 Social Features

**Features:**
- Follow creators
- Like/favorite apps
- Share app on Twitter/LinkedIn (one-click)
- Creator profiles (portfolio of apps)

---

## 6. Technical Architecture

### 6.1 System Architecture Diagram (Text Representation)

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client (Browser)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │   Builder    │  │  Discovery   │  │    Marketplace     │   │
│  │   (Vite +    │  │   (React)    │  │     (React)        │   │
│  │    React)    │  └──────────────┘  └────────────────────┘   │
│  └──────────────┘                                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Express Backend (Node.js)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │   AI Service │  │ Deployment   │  │  Wallet Service    │   │
│  │   (OpenAI)   │  │  (React-     │  │  (HandCash API)    │   │
│  │              │  │   OnChain)   │  │                    │   │
│  └──────────────┘  └──────────────┘  └────────────────────┘   │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │  Database    │  │  BSV Node    │  │   File Storage     │   │
│  │  (SQLite)    │  │  (WhatsOn    │  │   (Temp for        │   │
│  │              │  │   Chain API) │  │   builds)          │   │
│  └──────────────┘  └──────────────┘  └────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ BSV Network
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Bitcoin SV Blockchain                         │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              1Sat Ordinals (Apps as NFTs)              │    │
│  │    - Complete React apps (<50MB)                       │    │
│  │    - Deployed via React-OnChain                        │    │
│  │    - Permanent storage, zero hosting cost              │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Replit-Specific Tech Stack

**Frontend:**
```json
{
  "framework": "Vite + React",
  "language": "TypeScript",
  "ui": "Tailwind CSS + shadcn/ui",
  "state": "Zustand (lightweight alternative to Redux)",
  "routing": "React Router v6",
  "forms": "React Hook Form + Zod validation",
  "editor": "Monaco Editor (VS Code editor in browser)",
  "charts": "Recharts (for analytics)"
}
```

**Backend:**
```json
{
  "runtime": "Node.js 18+",
  "framework": "Express.js",
  "language": "TypeScript",
  "database": "SQLite (file-based, Replit friendly)",
  "orm": "Prisma",
  "validation": "Zod",
  "auth": "JWT tokens",
  "cors": "cors middleware"
}
```

**External Services:**
```json
{
  "ai": "OpenAI API (GPT-4 for code generation)",
  "blockchain": {
    "network": "Bitcoin SV",
    "deployment": "React-OnChain npm package",
    "queries": "WhatsOnChain API",
    "wallet": "HandCash Connect API"
  },
  "storage": "Temporary: /tmp (cleaned after deploy)"
}
```

**DevOps (Replit):**
```json
{
  "package_manager": "npm",
  "build_tool": "Vite",
  "process_manager": "node (built-in)",
  "env_vars": ".env file (Replit Secrets)",
  "port": "3000 (frontend) + 3001 (backend)",
  "domain": "Replit-provided subdomain"
}
```

### 6.3 Project Structure (Replit Monorepo)

```
1sat-builder/
├── client/                    # Frontend (Vite + React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Builder/
│   │   │   │   ├── PromptInput.tsx
│   │   │   │   ├── CodeEditor.tsx
│   │   │   │   ├── Preview.tsx
│   │   │   │   └── DeployButton.tsx
│   │   │   ├── Discovery/
│   │   │   │   ├── AppCard.tsx
│   │   │   │   ├── AppModal.tsx
│   │   │   │   └── SearchBar.tsx
│   │   │   ├── Marketplace/
│   │   │   │   ├── ListingCard.tsx
│   │   │   │   └── ListingForm.tsx
│   │   │   └── Shared/
│   │   │       ├── WalletConnect.tsx
│   │   │       └── Layout.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Builder.tsx
│   │   │   ├── Discovery.tsx
│   │   │   ├── Marketplace.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── services/
│   │   │   ├── api.ts           # Axios client
│   │   │   ├── wallet.ts        # Wallet integration
│   │   │   └── ai.ts            # AI prompt helpers
│   │   ├── store/
│   │   │   └── useStore.ts      # Zustand state
│   │   ├── types/
│   │   │   └── index.ts         # TypeScript interfaces
│   │   ├── utils/
│   │   │   └── helpers.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   │   └── templates/           # Starter templates
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── server/                    # Backend (Express + TypeScript)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── ai.ts           # AI code generation
│   │   │   ├── deploy.ts       # React-OnChain integration
│   │   │   ├── apps.ts         # CRUD for apps
│   │   │   ├── marketplace.ts  # Listings
│   │   │   └── wallet.ts       # Wallet operations
│   │   ├── services/
│   │   │   ├── aiService.ts
│   │   │   ├── deployService.ts
│   │   │   ├── bsvService.ts
│   │   │   └── walletService.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── validation.ts
│   │   ├── db/
│   │   │   ├── schema.prisma
│   │   │   └── client.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── helpers.ts
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── tsconfig.json
│
├── shared/                    # Shared types
│   └── types.ts
│
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── replit.nix                # Replit config
```

### 6.4 Database Schema (Prisma)

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id              String    @id @default(uuid())
  walletAddress   String    @unique
  publicKey       String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  apps            App[]
  listings        Listing[]
  ratings         Rating[]
}

model App {
  id              String    @id @default(uuid())
  name            String
  description     String
  category        String
  icon            String?   // Base64 or URL
  
  // Blockchain data
  inscriptionId   String    @unique
  outpoint        String    @unique
  deploymentUrl   String    // React-OnChain URL
  txid            String
  
  // Metadata
  pricePerUse     Float     // In USD
  priceInBsv      Float     // Converted to BSV
  creatorAddress  String
  
  // Stats
  totalUses       Int       @default(0)
  totalRevenue    Float     @default(0)
  averageRating   Float     @default(0)
  
  // Code storage (for updates)
  sourceCode      String    // JSON stringified
  
  // Versioning
  currentVersion  String    @default("1.0.0")
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  creator         User      @relation(fields: [creatorAddress], references: [walletAddress])
  versions        Version[]
  listings        Listing[]
  ratings         Rating[]
  usageEvents     Usage[]
}

model Version {
  id              String    @id @default(uuid())
  appId           String
  version         String    // semver
  inscriptionId   String    @unique
  changelog       String?
  deprecated      Boolean   @default(false)
  createdAt       DateTime  @default(now())
  
  app             App       @relation(fields: [appId], references: [id])
}

model Listing {
  id              String    @id @default(uuid())
  appId           String
  sellerId        String
  askingPrice     Float     // In BSV
  status          String    @default("active") // active, sold, cancelled
  
  // Revenue stats
  revenue30d      Float
  revenue90d      Float
  revenueAllTime  Float
  
  includesApiKey  Boolean   @default(false)
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  app             App       @relation(fields: [appId], references: [id])
  seller          User      @relation(fields: [sellerId], references: [id])
}

model Rating {
  id              String    @id @default(uuid())
  appId           String
  userId          String
  rating          Int       // 1-5
  review          String?
  createdAt       DateTime  @default(now())
  
  app             App       @relation(fields: [appId], references: [id])
  user            User      @relation(fields: [userId], references: [id])
  
  @@unique([appId, userId]) // One rating per user per app
}

model Usage {
  id              String    @id @default(uuid())
  appId           String
  userAddress     String
  txid            String    // BSV transaction ID
  amountBsv       Float
  amountUsd       Float
  createdAt       DateTime  @default(now())
  
  app             App       @relation(fields: [appId], references: [id])
}

model Template {
  id              String    @id @default(uuid())
  name            String
  description     String
  category        String
  thumbnail       String
  code            String    // JSON stringified
  createdAt       DateTime  @default(now())
}
```

---

## 7. Data Models

### 7.1 Core TypeScript Interfaces

```typescript
// shared/types.ts

export interface App {
  id: string;
  name: string;
  description: string;
  category: AppCategory;
  icon?: string;
  
  // Blockchain
  inscriptionId: string;
  outpoint: string;
  deploymentUrl: string;
  txid: string;
  
  // Monetization
  pricePerUse: number; // USD
  priceInBsv: number;
  creatorAddress: string;
  
  // Stats
  totalUses: number;
  totalRevenue: number;
  averageRating: number;
  
  currentVersion: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AppCategory = 
  | 'Design'
  | 'Productivity'
  | 'Media'
  | 'Developer Tools'
  | 'Marketing'
  | 'Finance'
  | 'Education'
  | 'Entertainment'
  | 'Utilities'
  | 'Other';

export interface AppPrompt {
  description: string;
  category: AppCategory;
  features?: string[];
  monetization: {
    pricePerUse: number;
    freeTrialUses?: number;
  };
}

export interface GeneratedApp {
  code: string; // React component code
  dependencies: string[]; // npm packages
  estimatedSize: number; // in KB
  preview: string; // HTML string
}

export interface DeploymentRequest {
  projectCode: string;
  metadata: {
    name: string;
    description: string;
    category: string;
    pricePerUse: number;
    creatorAddress: string;
  };
  walletAddress: string;
}

export interface DeploymentResponse {
  success: boolean;
  txid: string;
  outpoint: string;
  url: string;
  cost: number;
  inscriptionId: string;
  version: string;
  error?: string;
}

export interface Wallet {
  address: string;
  publicKey: string;
  balance: number; // BSV
  connected: boolean;
}

export interface UsageEvent {
  appId: string;
  userAddress: string;
  txid: string;
  amountBsv: number;
  amountUsd: number;
  timestamp: Date;
}

export interface MarketListing {
  id: string;
  appId: string;
  app: App;
  sellerId: string;
  askingPrice: number; // BSV
  status: 'active' | 'sold' | 'cancelled';
  revenueStats: {
    last30Days: number;
    last90Days: number;
    allTime: number;
  };
  usageStats: {
    totalUses: number;
    uniqueUsers: number;
    averageRating: number;
  };
  includesApiKey: boolean;
  createdAt: Date;
}
```

---

## 8. API Specifications

### 8.1 API Endpoint Overview

**Base URL:** `https://[replit-url]/api`

**Authentication:** JWT token in `Authorization: Bearer <token>` header

**Response Format:**
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
  };
}
```

### 8.2 Detailed Endpoints

#### 8.2.1 AI Code Generation

**POST /api/ai/generate**

Generate React app code from natural language prompt.

**Request:**
```json
{
  "prompt": {
    "description": "Create a color palette generator that uses AI",
    "category": "Design",
    "features": ["AI suggestions", "Export to PNG"],
    "monetization": {
      "pricePerUse": 0.10
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "code": "import React from 'react'...",
    "dependencies": ["react", "tailwindcss", "axios"],
    "estimatedSize": 145,
    "preview": "<html>...</html>"
  }
}
```

**Error Codes:**
- `AI_GENERATION_FAILED` - AI service error
- `INVALID_PROMPT` - Prompt validation failed
- `RATE_LIMIT_EXCEEDED` - Too many requests

#### 8.2.2 App Deployment

**POST /api/deploy**

Deploy app to blockchain via React-OnChain.

**Request:**
```json
{
  "projectCode": "import React...",
  "metadata": {
    "name": "Color Palette Generator",
    "description": "AI-powered color palettes",
    "category": "Design",
    "pricePerUse": 0.10,
    "creatorAddress": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
  },
  "walletAddress": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "txid": "abc123...",
    "outpoint": "abc123_0",
    "url": "https://app.reactonchain.com/content/abc123_0",
    "cost": 0.00008,
    "inscriptionId": "abc123i0",
    "version": "1.0.0"
  }
}
```

**Error Codes:**
- `DEPLOYMENT_FAILED` - React-OnChain error
- `INSUFFICIENT_FUNDS` - Wallet balance too low
- `INVALID_CODE` - Code validation failed

#### 8.2.3 App Discovery

**GET /api/apps**

Get list of apps with filtering and pagination.

**Query Parameters:**
- `category` (optional) - Filter by category
- `search` (optional) - Search by name/description
- `sort` (optional) - `recent`, `popular`, `price-asc`, `price-desc`
- `page` (default: 1)
- `limit` (default: 20, max: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "apps": [
      {
        "id": "uuid",
        "name": "Color Palette Generator",
        "description": "AI-powered palettes",
        "category": "Design",
        "icon": "data:image/png;base64,...",
        "pricePerUse": 0.10,
        "averageRating": 4.5,
        "totalUses": 1234,
        "deploymentUrl": "https://app.reactonchain.com/...",
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

#### 8.2.4 App Usage/Payment

**POST /api/apps/:id/use**

Record app usage and process payment.

**Request:**
```json
{
  "userAddress": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  "signature": "...", // Signed payment authorization
  "inputs": {
    // App-specific inputs
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "txid": "payment-tx-id",
    "usageId": "uuid",
    "appUrl": "https://app.reactonchain.com/...",
    "result": {
      // App-specific output
    }
  }
}
```

#### 8.2.5 Marketplace Listings

**GET /api/marketplace/listings**

Get marketplace listings.

**POST /api/marketplace/listings**

Create new listing.

**Request:**
```json
{
  "appId": "uuid",
  "askingPrice": 0.05, // BSV
  "includesApiKey": false
}
```

**POST /api/marketplace/listings/:id/purchase**

Purchase an app listing.

**Request:**
```json
{
  "buyerAddress": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  "signature": "..." // Payment authorization
}
```

#### 8.2.6 Wallet Operations

**POST /api/wallet/connect**

Connect wallet and create/fetch user.

**Request:**
```json
{
  "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  "publicKey": "...",
  "signature": "..." // Signed message for auth
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
      "createdAt": "..."
    },
    "token": "jwt-token",
    "balance": 0.05 // BSV
  }
}
```

**GET /api/wallet/balance**

Get current wallet balance.

---

## 9. User Flows

### 9.1 Flow 1: Create & Deploy First App

**Actors:** Sarah (non-technical user), System, AI Service, React-OnChain

**Preconditions:** 
- Sarah has HandCash wallet installed
- Sarah has ~$0.01 in BSV

**Flow:**

1. **Landing Page**
   - Sarah visits 1satbuilder.com
   - Sees hero: "Build Micro-SaaS in Minutes"
   - Clicks "Start Building Free"

2. **Prompt Input**
   - Sarah enters: "Create a hashtag generator for Instagram"
   - Selects category: Marketing
   - Clicks "Generate App"

3. **AI Generation (15-30 seconds)**
   - Loading animation: "AI is building your app..."
   - System calls OpenAI API with prompt
   - Receives React component code
   - Validates code (security scan, size check)
   - Generates preview

4. **Preview & Customize**
   - Split view: Code (left) + Preview (right)
   - Sarah tests in preview: enters "coffee shop" → gets hashtags
   - Sarah sets price: $0.10 per use
   - Sarah adds app name: "Hashtag Hero"

5. **Deploy to Blockchain**
   - Sarah clicks "Deploy App" button
   - Modal: "This will cost $0.008 in BSV. Connect wallet?"
   - Sarah clicks "Connect HandCash"
   - HandCash popup: "Authorize 1Sat Builder?"
   - Sarah approves
   - System shows: "Wallet connected: 0.05 BSV"
   - Sarah clicks "Deploy Now"

6. **Deployment Process (30-60 seconds)**
   - Progress indicator:
     - ✓ Building app...
     - ✓ Inscribing on blockchain...
     - ✓ Deployed!
   - Payment deducted: 0.00008 BSV
   - Success screen:
     - "Your app is live on the blockchain!"
     - App URL: `https://app.reactonchain.com/content/abc123_0`
     - "Publish to discovery page?"

7. **Publish to Directory**
   - Sarah clicks "Yes, Publish"
   - Form: Upload icon, add screenshot (optional)
   - Clicks "Publish"
   - Success: "Hashtag Hero is now live in 1Sat Apps!"

8. **First Revenue**
   - Another user discovers "Hashtag Hero"
   - Uses it, pays $0.10
   - Sarah gets notification: "You earned $0.095!" (5% platform fee)
   - Funds appear in Sarah's wallet

**Postconditions:**
- App deployed as 1Sat ordinal
- App listed in discovery page
- Sarah earned her first revenue

### 9.2 Flow 2: Discover & Use an App

**Actors:** Mike (app user), System, App Creator

**Preconditions:**
- Mike has HandCash wallet
- Mike has ~$1 in BSV

**Flow:**

1. **Discovery**
   - Mike visits 1satapps.com
   - Sees featured apps carousel
   - Searches: "color palette"
   - Finds "AI Palette Picker" - $0.05/use, 4.8 stars

2. **App Details**
   - Clicks app card
   - Modal opens with:
     - Description
     - Screenshots
     - Reviews (5 recent)
     - "Run App" button

3. **Run App**
   - Clicks "Run App"
   - System checks: Mike not connected
   - Prompt: "Connect wallet to use this app"
   - Mike connects HandCash
   - Modal: "This will cost $0.05. Continue?"
   - Mike clicks "Yes"

4. **Payment & Execution**
   - Microtransaction: 0.00005 BSV to creator
   - App loads in iframe
   - Mike uploads image
   - Clicks "Generate Palette"
   - AI analyzes image
   - Shows 5-color palette
   - Mike downloads palette (PNG)

5. **Rating**
   - Prompt: "Rate this app?"
   - Mike gives 5 stars + review: "Super fast!"
   - System records rating

**Postconditions:**
- Creator earned $0.0475 (95% of $0.05)
- Mike's review added to app
- Usage recorded on blockchain

### 9.3 Flow 3: Sell App in Marketplace

**Actors:** Dev (app creator), Investor Ivan (buyer), System

**Preconditions:**
- Dev created "Invoice Generator" 6 months ago
- App has 500 uses, $150 total revenue
- App earns ~$50/month consistently

**Flow:**

1. **Create Listing**
   - Dev visits "My Apps" dashboard
   - Selects "Invoice Generator"
   - Clicks "List for Sale"
   - Form:
     - Asking price: 0.1 BSV (~$5,000)
     - Include API key? No (buyer provides own)
     - Description: "Profitable invoice tool"
   - Revenue stats auto-populated:
     - Last 30 days: $52
     - Last 90 days: $147
     - All-time: $150
   - Clicks "List Now"

2. **Marketplace Discovery**
   - Ivan visits 1satmarket.com
   - Filters: Category = Finance, Revenue > $40/month
   - Finds "Invoice Generator"
   - Sees: $52/month, 500 uses, 4.9 stars
   - Clicks to view details

3. **Due Diligence**
   - Ivan reviews:
     - Revenue chart (last 6 months)
     - Usage trend (growing)
     - On-chain verification link (BSV explorer)
   - Clicks "View Live App" (opens in new tab)
   - Tests the app

4. **Purchase Decision**
   - Ivan clicks "Buy Now - 0.1 BSV"
   - Modal: "Escrow will hold funds until ordinal transfer"
   - Ivan clicks "Confirm Purchase"
   - HandCash popup: "Send 0.1 BSV to escrow?"
   - Ivan approves

5. **Escrow & Transfer**
   - Funds held in BSV smart contract
   - System initiates ordinal transfer:
     - From: Dev's wallet
     - To: Ivan's wallet
   - Transfer confirmed (2-3 blocks, ~20 mins)
   - Escrow releases funds to Dev
   - System updates app ownership

6. **Post-Purchase**
   - Ivan receives:
     - Ordinal in wallet
     - Admin access to app dashboard
     - Future revenue goes to Ivan's wallet
   - Dev receives 0.099 BSV (1% marketplace fee)

**Postconditions:**
- Ordinal ownership transferred
- Future revenue redirected to Ivan
- Dev received payment

---

## 10. Non-Functional Requirements

### 10.1 Performance

**Response Times:**
- AI code generation: <30 seconds (90th percentile)
- App deployment: <60 seconds (React-OnChain)
- Page load: <2 seconds (cached)
- API endpoints: <200ms (excluding AI/blockchain ops)

**Throughput:**
- Support 100 concurrent users (MVP)
- 1,000 concurrent users (Phase 3)
- 10,000 apps in directory

**Scalability:**
- Horizontal: Add more Replit instances
- Database: SQLite → PostgreSQL for production
- Caching: Redis for app metadata

### 10.2 Security

**Code Generation:**
- Static analysis of AI-generated code
- Blacklist dangerous APIs (eval, exec, child_process)
- Size limit: 50MB (ordinal max)
- Timeout: 30 seconds for AI generation

**App Execution:**
- Sandbox: iframes with strict CSP
- No local storage/cookies
- Whitelist external APIs only
- Rate limiting: 10 requests/minute per IP

**Wallet Security:**
- No private keys stored on server
- Client-side signing only
- JWT tokens expire after 24 hours
- HTTPS only (enforced)

**Database:**
- SQL injection prevention (Prisma ORM)
- Encrypted sensitive data (API keys)
- Regular backups

### 10.3 Reliability

**Uptime:**
- 99.5% uptime (MVP)
- 99.9% uptime (Production)

**Error Handling:**
- Graceful degradation (if AI fails, show templates)
- Retry logic for blockchain queries (3 attempts)
- Clear error messages for users

**Monitoring:**
- Log errors to Sentry (optional)
- Track deployment success rate
- Alert on high failure rate (>5%)

### 10.4 Usability

**Accessibility:**
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- High contrast mode

**Responsiveness:**
- Mobile-first design
- Works on tablets, phones, desktop
- Progressive Web App (PWA) capable

**Internationalization:**
- English only (MVP)
- i18n structure for future languages

### 10.5 Compatibility

**Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Wallets:**
- HandCash (primary)
- MoneyButton (secondary)
- Future: MetaMask, WalletConnect (via BSV adapters)

---

## 11. Success Metrics

### 11.1 Launch Metrics (Month 1)

**User Acquisition:**
- 100 registered users (wallet connections)
- 50 apps created
- 10 apps deployed to blockchain

**Engagement:**
- 200 app uses (across all apps)
- 5 reviews/ratings submitted
- 20% return user rate

**Revenue:**
- $20 in pay-per-use revenue (platform + creators)
- $0.50 in minting fees
- 1 app sold in marketplace

### 11.2 Growth Metrics (Month 3)

**User Acquisition:**
- 1,000 registered users
- 500 apps created
- 100 apps deployed

**Engagement:**
- 5,000 app uses
- 50 reviews
- 30% return user rate

**Revenue:**
- $500 in pay-per-use revenue
- $10 in minting fees
- 10 apps sold ($5,000 total GMV)

### 11.3 Success Metrics (Month 6)

**User Acquisition:**
- 5,000 registered users
- 2,000 apps created
- 500 apps deployed

**Engagement:**
- 50,000 app uses
- 500 reviews
- 40% return user rate

**Revenue:**
- $5,000 in pay-per-use revenue
- $50 in minting fees
- 50 apps sold ($50,000 total GMV)

### 11.4 Key Performance Indicators (KPIs)

**Product-Market Fit:**
- Net Promoter Score (NPS): >40
- Creator satisfaction: 4.5/5 stars
- Repeat creation rate: >30%

**Business Health:**
- Monthly Recurring Revenue (MRR): $1,000+ (from platform fees)
- Customer Acquisition Cost (CAC): <$10
- Lifetime Value (LTV): >$50
- LTV/CAC ratio: >5x

**Technical Health:**
- Deployment success rate: >95%
- Average deployment cost: <$0.01
- API uptime: >99.5%

---

## 12. Implementation Roadmap

### 12.1 Phase 1: MVP (Months 1-2)

**Week 1-2: Setup & Foundation**
- [ ] Initialize Replit project (monorepo structure)
- [ ] Set up Vite + React + TypeScript (client)
- [ ] Set up Express + TypeScript (server)
- [ ] Configure Prisma + SQLite
- [ ] Install dependencies (React-OnChain, OpenAI SDK, etc.)
- [ ] Create basic routing (React Router)
- [ ] Set up Tailwind CSS + shadcn/ui

**Week 3-4: Core Builder Interface**
- [ ] Prompt input component
- [ ] AI service integration (OpenAI GPT-4)
- [ ] Code preview (Monaco Editor)
- [ ] Live preview iframe
- [ ] 5 starter templates (hardcoded)

**Week 5-6: React-OnChain Integration**
- [ ] Wallet connection (HandCash API)
- [ ] Deployment service wrapper
- [ ] Progress indicator UI
- [ ] Success/error handling
- [ ] Cost estimation

**Week 7-8: Discovery Page**
- [ ] App grid with cards
- [ ] Search + filter
- [ ] App modal with iframe
- [ ] Usage tracking (DB + BSV tx)
- [ ] Basic rating system

**Deliverable:** Working MVP deployed on Replit
- Users can generate apps with AI
- Users can deploy apps for <$0.01
- Users can discover and use apps
- Payment system functional

### 12.2 Phase 2: Marketplace & Polish (Months 3-4)

**Week 9-10: Marketplace Core**
- [ ] Listing creation UI
- [ ] Listing cards with revenue stats
- [ ] Purchase flow with escrow
- [ ] Ownership transfer logic

**Week 11-12: Dashboard & Analytics**
- [ ] "My Apps" dashboard
- [ ] Revenue charts (Recharts)
- [ ] Usage stats
- [ ] Export to CSV

**Week 13-14: Versioning & Updates**
- [ ] Update flow UI
- [ ] React-OnChain versioning integration
- [ ] Version history view
- [ ] Changelog support

**Week 15-16: Polish & Testing**
- [ ] Mobile responsiveness
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Bug fixes

**Deliverable:** Full-featured platform
- Marketplace live
- Creator dashboard
- App updates supported

### 12.3 Phase 3: Advanced Features (Months 5-6)

**Week 17-18: Workflow Builder**
- [ ] Node-RED-style canvas (React Flow)
- [ ] Node palette (draggable apps)
- [ ] Connection logic
- [ ] Data passing between nodes
- [ ] Workflow execution

**Week 19-20: Premium AI Features**
- [ ] Multi-turn AI conversations
- [ ] Visual design suggestions
- [ ] Code optimization
- [ ] Premium tier gating

**Week 21-22: Social Features**
- [ ] User profiles
- [ ] Follow system
- [ ] Like/favorite apps
- [ ] Social sharing

**Week 23-24: Production Readiness**
- [ ] Migration to PostgreSQL
- [ ] Redis caching
- [ ] CDN setup
- [ ] Monitoring (Sentry)
- [ ] Load testing

**Deliverable:** Production-ready platform
- Workflow chaining
- Premium features
- Social engagement
- Scalable infrastructure

### 12.4 Post-Launch (Months 7-12)

**Continuous Improvement:**
- [ ] A/B testing (pricing, UI)
- [ ] User feedback integration
- [ ] New templates monthly
- [ ] Performance optimization
- [ ] Marketing campaigns

**New Features:**
- [ ] Mobile app (React Native)
- [ ] API for third-party integrations
- [ ] White-label solution for enterprises
- [ ] Multi-chain support (explore other blockchains)

---

## 13. Risk Assessment

### 13.1 Technical Risks

**Risk 1: React-OnChain Reliability**
- **Probability:** Medium
- **Impact:** High
- **Mitigation:** 
  - Thoroughly test React-OnChain with various app sizes
  - Have fallback: manual ordinal inscription
  - Maintain close contact with React-OnChain maintainer
  - Contribute to open-source project

**Risk 2: AI Code Quality**
- **Probability:** High
- **Impact:** Medium
- **Mitigation:**
  - Use GPT-4 (better than GPT-3.5)
  - Fine-tune prompts extensively
  - Static code analysis + security scans
  - Provide curated templates as fallback
  - Human review for featured apps

**Risk 3: BSV Blockchain Congestion**
- **Probability:** Low
- **Impact:** Medium
- **Mitigation:**
  - BSV scales to millions of tx/day
  - Queue deployments if network busy
  - Use fee estimation API
  - Warn users of delays

**Risk 4: 50MB Ordinal Limit**
- **Probability:** Medium
- **Impact:** Low
- **Mitigation:**
  - Tree-shake dependencies aggressively
  - Code-split large apps
  - Compress assets (images, videos)
  - Warn user during generation if approaching limit

### 13.2 Business Risks

**Risk 5: Low Adoption**
- **Probability:** Medium
- **Impact:** High
- **Mitigation:**
  - Aggressive marketing (Product Hunt, Twitter, Reddit)
  - Incentivize early creators (free deployments)
  - Partner with BSV community
  - Create viral templates (meme generators, etc.)

**Risk 6: Competing Platforms**
- **Probability:** Low
- **Impact:** Medium
- **Mitigation:**
  - First-mover advantage
  - Network effects (more apps = more value)
  - Focus on best UX
  - Build community loyalty

**Risk 7: Regulatory Issues**
- **Probability:** Low
- **Impact:** High
- **Mitigation:**
  - No custody of funds (non-custodial wallets)
  - KYC not required (on-chain payments)
  - Terms of service clarity
  - Legal consultation pre-launch

### 13.3 User Experience Risks

**Risk 8: Wallet Friction**
- **Probability:** High
- **Impact:** Medium
- **Mitigation:**
  - Excellent onboarding (video tutorials)
  - Support multiple wallets
  - Consider fiat on-ramp (Moonpay, etc.)
  - Guest mode (free templates, no deploy)

**Risk 9: Poor AI Outputs**
- **Probability:** Medium
- **Impact:** Medium
- **Mitigation:**
  - Allow manual code editing
  - Provide example prompts
  - Iterative refinement (multi-turn)
  - Clear expectations ("simple apps only")

---

## 14. Open Questions

### 14.1 Product Questions

1. **Freemium Model:**
   - Should app creation be always free?
   - Charge for AI generations (e.g., 5 free, then $5/month)?
   - Or charge for premium templates/features?

2. **Revenue Split:**
   - Is 2% platform commission too high/low?
   - Should it be tiered (lower % for high earners)?

3. **Curation:**
   - Should all apps be listed, or curated/moderated?
   - What's the moderation process (automated + manual)?

4. **API Keys:**
   - Should platform provide default API keys for AI services?
   - Or always require users to provide their own?

### 14.2 Technical Questions

1. **Database Migration:**
   - When to migrate from SQLite to PostgreSQL?
   - Can Replit handle PostgreSQL, or need external DB?

2. **Video Streaming:**
   - Do we support video apps in MVP or Phase 2?
   - What's the max video size (within 50MB)?

3. **Wallet Providers:**
   - Should we support MetaMask (BSV bridge)?
   - Or stick with native BSV wallets only?

4. **Testing Strategy:**
   - Unit tests (Jest)?
   - E2E tests (Playwright)?
   - Manual QA only for MVP?

### 14.3 Business Questions

1. **Pricing Strategy:**
   - How to price premium tier?
   - Grandfathering early users?

2. **Marketing Budget:**
   - Bootstrap with organic growth?
   - Or invest in ads (Product Hunt, Twitter)?

3. **Partnership Opportunities:**
   - Integrate with BSV projects (e.g., HandCash, RUN)?
   - White-label for crypto conferences?

---

## Appendix A: Tech Stack Justification

### Why Vite?
- **Fast:** Hot Module Replacement (HMR) is instant
- **Modern:** Built on ESM, future-proof
- **Replit-Friendly:** Works out-of-box, no webpack config
- **React Support:** First-class TypeScript + React support

### Why Express?
- **Simple:** Minimal boilerplate, easy to understand
- **Mature:** Battle-tested, huge ecosystem
- **Flexible:** Middleware architecture fits our needs
- **Replit-Friendly:** Runs natively on Node.js

### Why TypeScript?
- **Type Safety:** Catch errors at compile-time
- **Better DX:** Autocomplete, refactoring tools
- **Maintainable:** Self-documenting code
- **Industry Standard:** Most modern projects use TS

### Why SQLite (MVP)?
- **Replit-Friendly:** File-based, no separate DB server
- **Fast:** For <10k rows, faster than PostgreSQL
- **Simple:** No setup, just works
- **Migration Path:** Prisma makes switching to PostgreSQL easy

### Why Prisma?
- **Type Safety:** Auto-generated TypeScript types
- **Migrations:** Version control for DB schema
- **Multi-DB:** Switch from SQLite → PostgreSQL seamlessly
- **Developer Experience:** Best-in-class ORM

### Why Zustand (State Management)?
- **Lightweight:** 1KB vs Redux's 10KB
- **Simple:** No boilerplate, just hooks
- **TypeScript:** First-class TS support
- **Scalable:** Good for small to medium apps

### Why React-OnChain?
- **Purpose-Built:** Designed exactly for our use case
- **Proven:** Already working in production
- **Open Source:** Can contribute/fork if needed
- **Economics:** Sub-penny deployments are game-changing

---

## Appendix B: Replit Configuration

### replit.nix

```nix
{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.typescript
    pkgs.nodePackages.vite
    pkgs.sqlite
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

### package.json (root)

```json
{
  "name": "1sat-builder",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "concurrently \"npm run dev:client\" \"npm run dev:server\"",
    "dev:client": "cd client && vite",
    "dev:server": "cd server && tsx watch src/index.ts",
    "build": "npm run build:client && npm run build:server",
    "build:client": "cd client && vite build",
    "build:server": "cd server && tsc",
    "start": "node server/dist/index.js"
  },
  "devDependencies": {
    "concurrently": "^8.2.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

## Appendix C: Environment Variables

### .env.example

```bash
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL="file:./dev.db"

# AI Service
OPENAI_API_KEY="sk-..."
AI_MODEL="gpt-4"

# BSV Blockchain
BSV_NETWORK="mainnet" # or "testnet"
WHATS_ON_CHAIN_API_KEY="..."

# Wallet
HANDCASH_APP_ID="..."
HANDCASH_APP_SECRET="..."

# React-OnChain
REACT_ONCHAIN_WALLET_PRIVATE_KEY="..." # For server-side deployments

# Security
JWT_SECRET="your-secret-key"
SESSION_SECRET="your-session-secret"

# Platform Config
PLATFORM_FEE_PERCENT=2
MARKETPLACE_FEE_PERCENT=1

# Optional
SENTRY_DSN="..." # For error monitoring
REDIS_URL="..." # For caching (Phase 2+)
```

---

## Appendix D: Sample Prompts for AI

### Template Prompts

**Color Palette Generator:**
```
Create a React component that generates color palettes. 
Features:
- Input: User can enter a mood (e.g., "calm", "energetic") or upload an image
- Processing: If text, use predefined palettes. If image, analyze dominant colors.
- Output: Display 5 colors in hex format with visual swatches
- UI: Clean design with Tailwind CSS, copy-to-clipboard buttons
- Export: Download palette as PNG
Keep it under 500KB total size.
```

**Text Summarizer:**
```
Create a React component that summarizes articles.
Features:
- Input: Text area for article text (max 10,000 words) or URL
- Processing: Call OpenAI API (user provides key) to summarize
- Output: Bullet-point summary (5-7 points)
- UI: Simple form with Tailwind CSS
- Loading: Show spinner during API call
Keep dependencies minimal. Target size: <300KB.
```

### User-Submitted Prompts (Examples)

**Good Prompts:**
- "Make a hashtag generator for Instagram that uses AI to suggest trending tags"
- "Create a simple invoice generator with PDF export and company branding"
- "Build a meme maker with popular templates and custom text overlay"

**Bad Prompts (too vague):**
- "Make me an app" → Needs specificity
- "Social media tool" → Too broad
- "Something with crypto" → Unclear

---

## Appendix E: Testing Strategy

### Unit Tests (Jest + React Testing Library)

**Components to Test:**
- `PromptInput.tsx` - form validation
- `DeployButton.tsx` - disabled states
- `AppCard.tsx` - rendering with mock data
- `WalletConnect.tsx` - connection flow

**Services to Test:**
- `aiService.ts` - prompt formatting
- `walletService.ts` - balance calculation
- API endpoints - request/response format

### Integration Tests

**Key Flows:**
1. Generate app → Preview → Deploy
2. Search apps → Open modal → Use app
3. Create listing → Purchase → Transfer

### Manual QA Checklist (Pre-Launch)

**Functionality:**
- [ ] Can create app with AI
- [ ] Can customize app code
- [ ] Can deploy to blockchain (<$0.01)
- [ ] Can search and filter apps
- [ ] Can use app with payment
- [ ] Can rate app
- [ ] Can create marketplace listing
- [ ] Can purchase app

**Cross-Browser:**
- [ ] Works on Chrome
- [ ] Works on Firefox
- [ ] Works on Safari
- [ ] Works on Edge

**Mobile:**
- [ ] Responsive on iPhone
- [ ] Responsive on Android
- [ ] Touch interactions work

**Edge Cases:**
- [ ] What if AI fails?
- [ ] What if deployment fails?
- [ ] What if payment fails?
- [ ] What if wallet disconnects mid-flow?

---

## Appendix F: Launch Checklist

### Pre-Launch (Week Before)

- [ ] Final security audit (code review)
- [ ] Load testing (simulate 100 concurrent users)
- [ ] Backup database
- [ ] Set up monitoring (Sentry or equivalent)
- [ ] Create demo video (2-3 minutes)
- [ ] Write Product Hunt description
- [ ] Prepare social media posts
- [ ] Create press kit (logos, screenshots)

### Launch Day

- [ ] Deploy to production (Replit or dedicated server)
- [ ] Test all flows one last time
- [ ] Post on Product Hunt
- [ ] Tweet announcement
- [ ] Post on Reddit (r/bsv, r/SideProject, r/nocode)
- [ ] Email beta testers
- [ ] Monitor error logs
- [ ] Respond to user feedback

### Post-Launch (First Week)

- [ ] Daily bug fixes
- [ ] User support (Discord/email)
- [ ] Gather feedback
- [ ] A/B test pricing
- [ ] Write blog post (technical deep-dive)
- [ ] Create tutorial videos
- [ ] Reach out to influencers

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | Nov 6, 2025 | Claude | Initial draft |
| 1.0 | Nov 6, 2025 | Claude | Complete PRD with all sections |

---

## Approval

**Product Owner:** _______________  Date: ___________

**Engineering Lead:** _______________  Date: ___________

**Design Lead:** _______________  Date: ___________

---

**END OF PRD**
