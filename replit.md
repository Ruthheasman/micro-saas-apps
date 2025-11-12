# MicroSaaS Apps - Micro-SaaS Platform

## Overview

MicroSaaS Apps is a hybrid platform for deploying micro-SaaS applications on the BSV blockchain and creating/executing AI agents. It allows users to describe applications in natural language, generate production-ready React code via AI, and deploy them to the blockchain at minimal cost. The platform also features creation, discovery, and execution of specialized AI agents.

The platform's core capabilities include:

**Micro-SaaS Apps Section:**
- AI-powered application builder (1Sat Builder)
- Marketplace for discovering deployed apps (1Sat Apps)
- User dashboard for app management

**AI Agents Section:**
- Marketplace for AI agents
- Interface for building custom agents
- Execution environment for agents
- Credit-based payment system for agent usage

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React 18 and TypeScript using Vite. It utilizes `shadcn/ui` components based on Radix UI for an accessible and customizable UI with a "New York" style theme. Client-side routing is handled by Wouter. State management primarily uses TanStack Query for server state and React Context for ephemeral UI state. Styling is managed with Tailwind CSS, supporting both light and dark modes. A dedicated testing environment allows isolated previews of AI-generated code.

### Backend Architecture

The backend is an Express.js application written in TypeScript. Authentication is managed via OpenID Connect (OIDC) with Replit's system using Passport.js and `express-session` with PostgreSQL storage. The API is RESTful, providing endpoints for micro-SaaS app management, AI agent operations, and user credits. Development uses Vite middleware for HMR, while production serves static files. Centralized error handling and request logging are implemented.

### Data Storage Solutions

PostgreSQL, via Neon's serverless driver, is used for data storage. Drizzle ORM provides type-safe database interactions. Key schemas include `users`, `apps`, `appUsage`, `agents`, `agentRuns`, `creditTransactions`, and `sessions`. A Repository pattern abstracts database access.

### AI Integration

The platform features dual AI integration systems:

**Micro-SaaS App Generation:**
- Anthropic Claude API for AI code generation
- Natural language to React component transformation
- Code validation using `@babel/parser` for syntax correctness
- Auto-retry mechanism for fixing validation failures
- Prompt engineering for production-ready, self-contained React code with Tailwind CSS

**AI Agent System:**
- **OpenRouter Integration**: Provides access to chat LLMs (Claude, GPT-4, Llama) via managed Replit integration
  - Vision model support for multimodal chat with image attachments
  - Image upload with 4MB limit and base64 encoding
  - Inline preview and validation in chat interface
- **kie.ai Integration**: Powers video/image generation models:
  - Veo 3 / Veo 3.1: Text-to-video generation
  - Sora 2 Pro: Advanced video synthesis
  - nano-banana: AI-powered image editing
  - Seedance: Image-to-video animation
- **Agent Executor**: Routes requests to appropriate provider based on model type
- **Credit System**: Transactional credit deduction on successful execution
- **Lazy Loading**: kie.ai client gracefully degrades when API key unavailable
- **Agent Icon Generation**: AI-powered emoji icon generation for agents
  - Uses Claude via OpenRouter for contextual emoji selection
  - Comprehensive validation using emoji-regex library
  - Supports complex emoji with modifiers (skin tones, gender)
  - Per-agent re-roll capability with independent UI state

### Blockchain Integration

The platform targets the BSV (Bitcoin SV) blockchain using the 1Sat ordinals protocol for app deployment. Apps are deployed via the React-OnChain CLI, enabling permanent, low-cost on-chain storage. The planned build pipeline involves a server-side worker injecting generated components into a Vite template, building static files, and then deploying them to the blockchain. The system will support multi-wallet integration, including Yours Wallet and Babbage Metanet, through an adapter pattern.

## External Dependencies

### Third-Party Services

- **Anthropic Claude API**: For AI code generation.
- **Replit Authentication**: For user authentication via OpenID Connect.
- **Neon Database**: Serverless PostgreSQL hosting.

### Blockchain & Web3

- **BSV Blockchain**: For permanent app storage and deployment.
- **React-OnChain**: Library for deploying React apps to BSV blockchain.
- **Yours Wallet / Babbage Metanet**: Supported BSV wallets.

### UI & Component Libraries

- **Radix UI**: Accessible, unstyled UI primitives.
- **shadcn/ui**: Themed UI components built on Radix UI.

### Development Tools

- **Vite**: Build tool and dev server.
- **TypeScript**: For type-safe development.

### Asset Management

- **Google Fonts**: For UI and code typography (Inter, JetBrains Mono, etc.).
- **Static Assets**: Stored locally for app thumbnails and hero images.