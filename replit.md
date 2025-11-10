# 1Sat Apps - Micro-SaaS Platform

## Overview

1Sat Apps is a platform for building, deploying, and monetizing micro-SaaS applications on the BSV blockchain. The platform enables users to describe applications in natural language, have AI (Claude) generate production-ready React code, and deploy these apps to the blockchain for less than a penny. Apps are stored as 1Sat ordinals on-chain, providing permanent, censorship-resistant hosting with pay-per-use monetization.

The platform consists of four main products:
- **1Sat Builder**: AI-powered app creation and blockchain deployment interface
- **1Sat Apps**: Discovery marketplace for finding and using deployed apps
- **1Sat Chain**: Visual workflow builder for chaining apps together (planned)
- **User Dashboard**: Analytics and management for created apps

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, built using Vite for fast development and optimized production builds.

**UI Component System**: The application uses shadcn/ui components built on Radix UI primitives, providing accessible, customizable components. The design system follows a "New York" style variant with custom theming through CSS variables defined in Tailwind configuration.

**Routing**: Client-side routing implemented with Wouter, a lightweight alternative to React Router. Routes include:
- `/` - Marketing landing page
- `/builder` - AI-powered app builder interface
- `/discover` - App marketplace/discovery
- `/dashboard` - User dashboard for managing apps

**State Management**: 
- TanStack Query (React Query) for server state management, API requests, and caching
- React hooks for local component state
- No global state management library needed due to server-state-first approach

**Styling**: Tailwind CSS with extensive customization including custom color schemes, shadows, and utility classes for elevation effects (`hover-elevate`, `active-elevate-2`). Supports both light and dark modes through CSS variables.

**Design Philosophy**: Hybrid approach drawing from Linear's minimalism, Vercel's developer clarity, and Material Design principles. Typography uses Inter for UI elements and JetBrains Mono for code/technical content.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**Authentication**: OpenID Connect (OIDC) integration with Replit's authentication system using Passport.js strategy. Session management handled via `express-session` with PostgreSQL storage (`connect-pg-simple`). Sessions persist for 7 days with secure, httpOnly cookies.

**API Structure**: RESTful endpoints under `/api/` prefix:
- `/api/auth/*` - Authentication endpoints (login, logout, user info)
- `/api/generate-app` - AI code generation endpoint
- `/api/apps/*` - App CRUD operations
- `/api/apps/my` - User's apps
- `/api/stats` - User statistics

**Development Server**: In development, Vite middleware is integrated into Express for HMR (Hot Module Replacement) and asset serving. Production builds serve static files from `dist/public`.

**Error Handling**: Centralized error handling with logging middleware. Request/response logging tracks API calls with timing information.

### Data Storage Solutions

**Database**: PostgreSQL via Neon serverless driver (`@neondatabase/serverless`) with WebSocket support for efficient connection pooling.

**ORM**: Drizzle ORM provides type-safe database operations with schema-first approach. Migration files stored in `/migrations` directory.

**Schema Design**:
- `users` - User profiles with OAuth data (id, email, firstName, lastName, profileImageUrl)
- `apps` - Micro-SaaS applications (id, userId, name, description, category, price, code, thumbnail, status, deploymentTxId)
- `appUsage` - Usage tracking for revenue (id, appId, userId, usedAt, amountPaid)
- `sessions` - Express session storage

**Storage Pattern**: Repository pattern implemented through `DatabaseStorage` class in `server/storage.ts`, providing abstraction over direct database access with methods for CRUD operations and aggregations.

### AI Integration

**Provider**: Anthropic Claude API (`@anthropic-ai/sdk`) for code generation.

**Generation Flow**:
1. User provides app description, category, and price
2. Backend sends prompt to Claude requesting complete React component
3. AI generates production-ready code with proper imports and styling
4. Code validated and returned to frontend for preview
5. User can iterate or deploy

**Prompt Engineering**: System prompts emphasize production-ready code with shadcn/ui components, Tailwind styling, and proper TypeScript types. Generated apps are self-contained React components.

### Blockchain Integration

**Target Blockchain**: BSV (Bitcoin SV) blockchain using 1Sat ordinals protocol.

**Deployment Strategy**: Apps deployed via React-OnChain library (`danwag06/react-onchain`), enabling sub-penny deployment costs and permanent on-chain storage. Each app becomes a tradable blockchain asset.

**Wallet Detection**: Yours Wallet browser extension detection implemented via `useWalletDetection` hook:
- Detects wallet installation by checking for `window.yours` object
- Tracks separate states for wallet detected vs connected
- Provides connect/disconnect functionality with proper state management
- WalletStatus component shows three states: not installed, detected but not connected, and fully connected
- Non-blocking UX - users can use the platform without wallet installed

**Wallet Integration Flow**:
1. Detection: Check for Yours Wallet on page load and window events
2. Connection: User clicks "Connect" to authorize wallet access
3. State tracking: Maintains `isConnected` flag only after successful connection
4. Disconnect: User can explicitly disconnect to reset state

**BSV SDK**: Integration with `@bsv-blockchain/ts-sdk` for blockchain operations (planned/in development).

**Cost Model**: Deployment costs less than $0.01 per app, eliminating traditional hosting fees. Apps remain accessible permanently without recurring costs.

## External Dependencies

### Third-Party Services

**Anthropic Claude API**
- Purpose: AI code generation for micro-SaaS apps
- Configuration: Requires `ANTHROPIC_API_KEY` environment variable
- Usage: Generates React components from natural language descriptions

**Replit Authentication**
- Purpose: User authentication and identity management
- Configuration: Requires `ISSUER_URL`, `REPL_ID`, and `SESSION_SECRET`
- Integration: OpenID Connect with Passport.js

**Neon Database**
- Purpose: Serverless PostgreSQL hosting
- Configuration: Requires `DATABASE_URL` environment variable
- Features: WebSocket-based connections for serverless environments

### Blockchain & Web3

**BSV Blockchain**
- Purpose: Permanent app storage and deployment
- Integration: Via React-OnChain library
- Cost: Sub-penny deployment through 1Sat ordinals

**React-OnChain** (`danwag06/react-onchain`)
- Purpose: Deploy React apps to BSV blockchain
- Features: Permanent hosting, censorship resistance, sub-penny costs
- Status: Core integration for deployment functionality

### UI & Component Libraries

**Radix UI** (Multiple packages)
- Purpose: Accessible, unstyled UI primitives
- Components: Dialogs, dropdowns, tooltips, tabs, forms, and 20+ others
- Integration: Wrapped by shadcn/ui components

**shadcn/ui**
- Configuration: `components.json` with New York style preset
- Structure: Components in `client/src/components/ui/`
- Theming: CSS variables in Tailwind config

### Development Tools

**Vite**
- Purpose: Build tool and dev server
- Plugins: React, runtime error overlay, Replit integration
- Features: Fast HMR, optimized production builds

**TypeScript**
- Configuration: Strict mode, ESNext modules
- Path Aliases: `@/*` for client, `@shared/*` for shared code
- Integration: Full type safety across frontend and backend

### Asset Management

**Google Fonts**
- Fonts: Inter (UI), JetBrains Mono (code), DM Sans, Geist Mono, Architects Daughter, Fira Code
- Loading: Via CDN links in `client/index.html`

**Static Assets**
- Location: `attached_assets/generated_images/` for app thumbnails
- Reference: Imported via Vite's `@assets` alias
- Format: PNG images for hero backgrounds and app previews

### Development Environment

**Replit-Specific**
- Plugins: Cartographer (mapping), Dev Banner (development mode indicator)
- Runtime: Error overlay for better debugging
- Condition: Only loaded in development mode when `REPL_ID` exists