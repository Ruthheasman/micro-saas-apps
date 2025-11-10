# MicroSaaS Apps - Micro-SaaS Platform

## Overview

MicroSaaS Apps is a platform for building, deploying, and monetizing micro-SaaS applications on the BSV blockchain. The platform enables users to describe applications in natural language, have AI (Claude) generate production-ready React code, and deploy these apps to the blockchain for less than a penny. Apps are stored as 1Sat ordinals on-chain, providing permanent, censorship-resistant hosting with pay-per-use monetization.

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
- `/test/:appName` - Isolated testing environment for generated apps
- `/app/:id` - Runtime page for deployed apps

**State Management**: 
- TanStack Query (React Query) for server state management, API requests, and caching
- React Context for ephemeral cross-page state (TestAppContext for sharing generated code)
- React hooks for local component state
- No global state management library needed due to server-state-first approach

**Test Environment**: Builder includes a "Test App" feature that allows developers to preview generated apps in isolation at `/test/:appName`. The test page provides:
- Isolated preview of AI-generated code
- Toggle between rendered preview and source code view
- Component refresh without losing context
- Navigation back to builder for iteration

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
3. AI generates production-ready code
4. **Code Validation**: Backend validates syntax using `@babel/parser`
5. **Auto-Retry**: If validation fails, retries up to 3 times with error context
6. Validated code returned to frontend for preview
7. User can test, iterate, or deploy

**Error Detection & Auto-Fix System**:
- **Syntax Validation**: Uses `@babel/parser` with JSX plugins to verify code syntax
- **Import/Export Detection**: Regex checks prevent module syntax (import/export statements)
- **Smart Retry Logic**: Up to 3 generation attempts with error messages included in retry prompts
- **Parser-Based Approach**: Avoids false positives from transform pipeline (e.g., template literal issues)
- **Validation Plugins**: Supports JSX, class properties, optional chaining, nullish coalescing
- **Strict Parsing**: `errorRecovery: false` ensures genuine syntax errors are caught
- **Logging**: All validation attempts and results logged for debugging

**Prompt Engineering**: System prompts emphasize production-ready plain JavaScript code (no TypeScript) with Tailwind CSS styling and native HTML elements. Generated apps are self-contained React components that avoid external library imports.

**Code Generation Constraints**:
- Pure JavaScript only (no TypeScript syntax, type annotations, or interfaces)
- No external component library imports (builds native HTML with Tailwind)
- Must work in browser with Babel JSX transformer
- Pure client-side code (no server dependencies)
- Self-contained and ready for build pipeline
- No import/export statements (validated and rejected automatically)

### Blockchain Integration

**Target Blockchain**: BSV (Bitcoin SV) blockchain using 1Sat ordinals protocol.

**Deployment Strategy**: Apps deployed via React-OnChain CLI tool (`danwag06/react-onchain`), enabling sub-penny deployment costs and permanent on-chain storage. Each app becomes a tradable blockchain asset.

**Build Pipeline Architecture** (Planned Implementation):

*Current State*: AI generates single React components stored as code strings. Components can be previewed in-app but are not yet deployable to blockchain.

*Planned Architecture*:
1. **Server-Side Build Worker**: Background worker runs builds in isolated temp directories
2. **Vite Project Template**: Pre-configured template with Tailwind CSS, committed to repo
3. **Component Injection**: Generated component injected into template's `src/App.jsx`
4. **Build Process**: Runs `npm install` (cached) and `npm run build` to create static files
5. **Blockchain Deployment**: Invokes `npx react-onchain deploy` with build artifacts
6. **Result Tracking**: Stores deployment status, transaction ID, and content URL

*Deployment Workflow*:
1. User clicks "Deploy to Blockchain" in dashboard
2. Backend enqueues deployment job (status: queued)
3. Worker picks job and executes build pipeline
4. On success: Updates app with txId and content URL
5. On failure: Stores error logs for debugging
6. Frontend polls for status updates via React Query

*Database Schema for Deployments*:
- `deployments` table tracks each deployment attempt
- Fields: id, appId, userId, status (queued/building/deploying/succeeded/failed), startedAt, completedAt, txId, contentUrl, costSats, errorLog
- `apps` table extended with: lastDeployedAt, lastDeploymentStatus, lastDeploymentUrl

*Security Considerations*:
- User provides BSV WIF private key per deployment (HTTPS only)
- Keys handled strictly in-memory, never persisted
- Process logs redact all secrets
- Rate limiting on builds and deployments
- Sandboxed build environment

*Technology Choices*:
- Build artifacts stored in `/tmp/build-artifacts/<appId>/<deploymentId>` (filesystem for MVP)
- React-OnChain CLI invoked via child process
- Structured logging for debugging
- Exponential backoff retry for transient failures

**React-OnChain Integration Details**:
- Accepts build directory (e.g., `./dist` from Vite)
- Requires WIF private key for BSV transactions
- Produces deployment manifest with transaction IDs and content URLs
- Supports versioning with on-chain history tracking
- Automatic dependency resolution and reference rewriting
- Smart caching reuses unchanged files across deployments

**Multi-Wallet Support**: Dual-wallet system supporting both Yours Wallet and Babbage Metanet via adapter pattern:
- **Wallet Adapters** (`client/src/lib/walletAdapters.ts`): Polymorphic interface with provider-specific implementations
  - `YoursWalletAdapter`: Browser extension detection via `window.yours`
  - `BabbageWalletAdapter`: Desktop/mobile app detection via `window.CWI` with SDK authentication
- **Detection**: Automatically detects all available wallets on page load
- **Provider Selection**: Users can choose between wallets when multiple are detected
- **Persistence**: Selected wallet preference saved to localStorage
- **Connection States**: Separate tracking for detected vs authenticated state per wallet

**Wallet Integration Flow**:
1. Detection: Check for both `window.yours` (Yours Wallet) and `window.CWI` (Babbage/Metanet)
2. Selection: Auto-select last-used wallet or first detected; user can switch via dropdown
3. Connection: 
   - Yours: Call `window.yours.connect()` to authorize
   - Babbage: Use `@babbage/sdk-ts` with `isAuthenticated()` and `waitForAuthentication()`
4. Validation: Only report connected after successful authentication completes
5. Disconnect: User can explicitly disconnect; clears connected state

**Supported Wallets**:
- **Yours Wallet**: Chrome browser extension for BSV transactions
- **Metanet (Babbage)**: Desktop (macOS/Linux/Windows) and mobile (iOS/Android) BSV wallet using BRC100 protocol

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