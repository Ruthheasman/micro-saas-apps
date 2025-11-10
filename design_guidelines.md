# 1Sat MicroSaaS Platform - Design Guidelines

## Design Approach

**Hybrid System-Reference Approach**: Drawing from Linear's clean minimalism, Vercel's developer-focused clarity, and ProductHunt's discovery patterns, combined with Material Design principles for consistency.

**Core Philosophy**: 
- Developer-first aesthetics with approachable, modern interface
- Emphasize trust and transparency for blockchain transactions
- Clear information hierarchy for complex features (AI generation, blockchain deployment)
- Balance technical sophistication with accessibility for non-technical users

---

## Typography System

**Font Stack**:
- Primary: Inter (headings, UI elements) - Via Google Fonts CDN
- Secondary: JetBrains Mono (code snippets, technical data) - Via Google Fonts CDN

**Hierarchy**:
- Hero Headlines: 3xl-4xl, font-bold, tracking-tight
- Section Headers: 2xl-3xl, font-semibold
- Card Titles: lg-xl, font-semibold
- Body Text: base, font-normal, leading-relaxed
- Captions/Metadata: sm-xs, font-medium
- Code/Technical: mono, sm, font-normal

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 24** for consistency
- Component padding: p-4 to p-8
- Section spacing: py-12 to py-24
- Grid gaps: gap-4 to gap-8
- Card spacing: p-6 to p-8

**Grid System**:
- Landing page: max-w-7xl centered container
- App interfaces: Full-width with max-w-screen-2xl for dashboards
- Content sections: max-w-4xl for focused reading
- Cards/Grid layouts: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

---

## Core Pages & Layouts

### 1. Landing Page (Marketing)

**Hero Section** (80vh):
- Large hero image: Abstract blockchain visualization or developer workspace scene
- Centered content over image with backdrop-blur-md on text container
- Headline: "Build & Deploy Micro-SaaS Apps On-Chain" (4xl font)
- Subheadline explaining value proposition (xl font)
- Primary CTA button with backdrop-blur-sm
- Secondary "View Apps" link
- Trust indicator: "Deploy for <$0.01 • 10,000+ Apps On-Chain"

**Features Section** (3-column grid on desktop):
- Icon + Title + Description cards
- Icons from Heroicons (outline style)
- Features: AI Builder, Blockchain Deploy, Pay-Per-Use, Marketplace
- Each card with border, rounded corners, p-6

**How It Works** (Timeline/Steps):
- 4-step visual flow (horizontal on desktop, vertical on mobile)
- Step numbers in circles, connector lines between
- Steps: Describe → AI Generates → Deploy → Earn
- Screenshots or illustrations for each step

**App Showcase** (Featured apps grid):
- 6 app preview cards in 3x2 grid
- Each card: thumbnail, title, price, usage count
- "Browse All Apps" CTA button

**Pricing Transparency**:
- Simple comparison: Traditional Hosting vs 1Sat Apps
- Show cost breakdown ($0.01 deploy, $0 hosting)
- Clear value proposition

**Footer** (3-column layout):
- Column 1: Logo, tagline, social links
- Column 2: Quick links (Docs, Builder, Marketplace, Dashboard)
- Column 3: Newsletter signup, contact info
- Bottom: Copyright, Terms, Privacy links

### 2. AI App Builder Interface

**Layout**: Full-screen split view (40/60 on desktop)

**Left Panel** (Prompt & Config):
- Large textarea for app description (h-32 minimum)
- Category dropdown (Design Tools, Productivity, Media, etc.)
- Price setting slider with live preview ($0.05 - $10.00)
- Template gallery (grid of 6 starter templates with preview images)
- "Generate App" primary button (full width, py-3)

**Right Panel** (Preview & Code):
- Tabbed interface: Preview | Code | Settings
- Preview: Full iframe with mobile/desktop toggle
- Code: Monaco editor with syntax highlighting
- Settings: App name, icon upload, API keys (optional)
- Bottom action bar: Cost estimate, Deploy button

**Generation States**:
- Loading: Animated progress with "AI is building your app..."
- Success: Smooth transition to preview with success notification
- Error: Clear error message with retry option

### 3. Discovery/Marketplace Page

**Header Bar**:
- Search input (full width on mobile, max-w-md on desktop)
- Category pills (horizontal scroll on mobile)
- Sort dropdown (Recent, Popular, Price: Low-High)

**Main Grid** (Responsive):
- grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- gap-6

**App Cards**:
- Image thumbnail (16:9 aspect ratio, object-cover)
- App name (font-semibold, text-lg)
- Description (2 lines, text-sm, truncate)
- Creator info with avatar
- Metrics row: Price badge, Usage count, Star rating
- "Run App" button (full width)
- Hover state: subtle shadow lift, border accent

**Filters Sidebar** (Desktop only, toggle on mobile):
- Category checkboxes
- Price range slider
- Creator filter
- Rating filter (star icons)

### 4. User Dashboard

**Layout**: Sidebar navigation + main content area

**Sidebar** (w-64):
- User profile section (avatar, name, wallet address truncated)
- Navigation items: Overview, My Apps, Analytics, Settings
- Active state indication
- Wallet connection status indicator

**Overview Tab**:
- Stats cards row (4 cards): Total Apps, Total Revenue, Total Uses, Avg Rating
- Revenue chart (line graph, last 30 days)
- Recent activity list (deployments, earnings)

**My Apps Tab**:
- Table view with columns: App Name, Status, Deployments, Revenue, Actions
- Each row: App thumbnail, stats, action menu (Edit, View Stats, Delete)
- "Create New App" button (sticky at top)

**Analytics Tab**:
- Filter by app dropdown
- Multiple charts: Usage over time, Revenue over time, Geographic distribution
- Detailed metrics table

### 5. App Run Modal

**Modal Overlay** (Backdrop with blur):
- Large modal (max-w-4xl)
- Header: App name, creator, close button
- Main: Embedded iframe (aspect-ratio-16/9 or full height based on app)
- Footer: Usage info, pricing, rating interface
- Payment prompt if needed (wallet connect flow)

---

## Component Library

### Navigation
- **Top Nav**: Sticky header, backdrop-blur, logo left, nav links center, user menu + wallet status right
- **Mobile**: Hamburger menu, slide-in drawer

### Buttons
- **Primary**: py-2.5 px-6, rounded-lg, font-medium, transition-all
- **Secondary**: border variant with hover fill
- **Icon buttons**: p-2, rounded-md
- **State variants**: default, hover (subtle scale/shadow), active, disabled

### Cards
- **Standard**: rounded-xl, border, p-6, shadow-sm, hover:shadow-md transition
- **App cards**: rounded-lg, overflow-hidden, border
- **Stat cards**: p-6, rounded-lg, border-l-4 accent

### Forms
- **Inputs**: px-4 py-2.5, rounded-lg, border, focus:ring-2
- **Labels**: text-sm font-medium, mb-2
- **Textareas**: min-h-32, rounded-lg
- **Selects**: Styled dropdowns with custom icons

### Icons
- **Library**: Heroicons (outline and solid)
- **Usage**: Consistent 20px (h-5 w-5) or 24px (h-6 w-6)
- **Context**: Navigation, feature cards, status indicators

### Modals & Overlays
- **Backdrop**: backdrop-blur-sm with semi-transparent background
- **Content**: Centered, rounded-xl, max-w-lg to max-w-4xl based on content
- **Close**: Top-right close button (icon)

### Data Visualization
- **Charts**: Use Chart.js or Recharts library
- **Style**: Minimal axes, grid lines, smooth curves
- **Tooltips**: Rounded, shadow-lg, detailed info

---

## Images

**Hero Image**: 
- Full-width abstract visualization showing blockchain nodes, code snippets floating, and developer workspace aesthetic
- Modern gradient overlay (dark to transparent) for text readability
- Position: Hero section background, object-cover

**App Thumbnails**:
- Actual screenshots of deployed apps where possible
- For templates: Clean UI mockups showing app functionality
- 16:9 aspect ratio, rounded corners

**Feature Illustrations**:
- Custom illustrations or high-quality photos for each feature section
- Style: Modern, minimal, tech-forward aesthetic

**Empty States**:
- Friendly illustrations for "No apps yet", "No data", etc.
- Keep minimal and encouraging

---

## Special Interactions

- **Wallet Connection**: Prominent connect button when not connected, compact address display when connected
- **Blockchain Transactions**: Clear loading states with transaction progress, success confirmations with transaction IDs
- **AI Generation**: Real-time streaming of generated code (if possible), progressive enhancement of preview
- **Pay-Per-Use**: Clear pricing display before interaction, confirmation modal for transactions

---

## Responsive Breakpoints

- **Mobile** (base): Single column, stacked layouts, full-width components
- **Tablet** (md): 2-column grids, sidebar toggles
- **Desktop** (lg+): 3-4 column grids, persistent sidebars, split views