Second Life e.V. Website

Built with Next.js 16, Sanity CMS, ShadCN UI, and TailwindCSS

Digital platform of Second Life e.V., an NGO dedicated to environmental restoration and ocean cleanup through drone technology and AI-driven data collection.

Overview

This repository contains the frontend codebase for the official Second Life e.V. website.
It is based on the Next.js App Router architecture with full Sanity CMS integration, ShadCN UI components, and a modular design system defined in globals.css.

Tech Stack
Layer	Technology	Purpose
Frontend Framework	Next.js 16
	App Router, Server Components, Turbopack, SEO
Styling	Tailwind CSS v4
	Token-based theme with brand variables
UI Components	shadcn/ui
	Accessible React components and utilities
CMS	Sanity.io
	Headless content management with GROQ
Hosting	Vercel
	Zero-config deployment, preview URLs
Design System	Custom Theme	Brand color #2BBBE2 and utility variants
Project Structure
src/
├─ app/                # Next.js app router and route layouts
│  ├─ page.tsx         # Homepage
│  ├─ missions/        # Dynamic mission list & detail pages
│  └─ organisation/    # Organisation subpages (team, campaigns, etc.)
│
├─ components/
│  ├─ site/            # Hero, Navigation, PageBuilder, etc.
│  └─ ui/              # ShadCN base components
│
├─ lib/                # Sanity client, GROQ queries, helpers
├─ styles/             # Global CSS and design tokens
│  └─ globals.css
└─ sanity/             # Sanity schema definitions

Getting Started
1. Clone the repository
git clone https://github.com/<your-org>/<your-repo>.git
cd secondlife

2. Install dependencies
npm install
# or
yarn install
# or
pnpm install

3. Environment variables

Create a .env.local file in the root directory and add your Sanity credentials:

NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_READ_TOKEN=yourSanityToken


You can find these values in your Sanity project settings.

4. Run the development server
npm run dev


Visit http://localhost:3000 to preview the site.

Design Tokens & Branding

Defined in globals.css:

:root {
  --brand-primary: #2BBBE2;
  --brand-primary-light: #9EE5F5;
  --brand-primary-dark: #107A92;
  --radius: 0.625rem;
}


Light mode uses a softer brand tint.
Dark mode applies the full brand color overlay and accent tones.

Key Features

Dynamic Mission Overview with sections for active, planned, and archived missions

Individual Mission Detail pages with "Back to Overview" navigation

Hero section with brand overlay and optional gradient mode

Dropdown navigation with active and hover states

Global light/dark theme toggle

Automatic page metadata and titles

Sanity CMS integration using GROQ queries

Vercel-ready build setup with preview environments

Development Notes

TypeScript is enabled in strict mode

Turbopack handles fast incremental updates

Use ShadCN’s cn() utility for class composition

Images must include a sizes prop when using fill

Brand colors and radii are centralized in globals.css

Avoid inline color literals when tokens exist

Common Commands
Action	Command
Start development server	npm run dev
Lint and format code	npm run lint
Build for production	npm run build
Start production server	npm start
Export static site	npm run export
Contributing

Contributions are welcome.
Follow conventional commit style for clarity:

feat(hero): add gradient overlay option
fix(nav): correct active state highlight color
style(globals): refine light mode overlay transparency


Pull requests require one reviewer approval before merging into main.

Deployment on Vercel

Connect your GitHub repository to Vercel.

Set the same environment variables as in .env.local.

Every branch push will trigger an automatic preview build.

Merging to main will deploy to production.

Refer to Next.js deployment documentation
 for additional details.

License

© 2025 Second Life e.V. – MIT License
Use, modify, and distribute responsibly.
