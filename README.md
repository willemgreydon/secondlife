# Second Life e.V. Website  
Built with Next.js 16, Sanity CMS, ShadCN UI, and TailwindCSS

Digital platform of **Second Life e.V.**, an NGO dedicated to environmental restoration and ocean cleanup through drone technology and AI-driven data collection.

---

## Overview

This repository contains the frontend codebase for the official Second Life e.V. website.  
It is built using the **Next.js App Router** and integrates deeply with **Sanity CMS** for structured content management.  
The interface and visual system are powered by **TailwindCSS** and **ShadCN UI**, following a modular and token-based approach.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| Frontend Framework | [Next.js 16](https://nextjs.org) | App Router, Server Components, Turbopack, SEO |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) | Token-based theme with brand variables |
| UI Components | [shadcn/ui](https://ui.shadcn.com) | Accessible React component library |
| CMS | [Sanity.io](https://www.sanity.io) | Headless content management using GROQ |
| Hosting | [Vercel](https://vercel.com) | Deployment and preview environments |
| Design System | Custom Theme | Brand color `#2BBBE2` defined in globals.css |

---

## Project Structure

src/
├─ app/ # Next.js app router and route layouts
│ ├─ page.tsx # Homepage
│ ├─ missions/ # Mission list & detail pages
│ └─ organisation/ # Organisation subpages (team, campaigns, etc.)
│
├─ components/
│ ├─ site/ # Hero, Navigation, PageBuilder, etc.
│ └─ ui/ # ShadCN base components
│
├─ lib/ # Sanity client, GROQ queries, helpers
├─ styles/ # Global CSS and design tokens
│ └─ globals.css
└─ sanity/ # Sanity schema definitions

---

## Getting Started

### 1. Clone the repository

git clone https://github.com/<your-org>/<your-repo>.git
cd secondlife

### 2. Install dependencies

npm install
# or
yarn install
# or
pnpm install

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add your Sanity credentials:

NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_READ_TOKEN=yourSanityToken

These values can be found in your Sanity project settings.

### 4. Run the development server

npm run dev

Then open http://localhost:3000 in your browser.

---

## Design Tokens and Branding

Defined in `globals.css`:

:root {
  --brand-primary: #2BBBE2;
  --brand-primary-light: #9EE5F5;
  --brand-primary-dark: #107A92;
  --radius: 0.625rem;
}

Light mode uses a softer brand tint,
while dark mode applies the full brand color overlay.

---

## Key Features

### Dynamic Missions
- Overview with categories: Active, Planned, and Archived
- Individual mission detail pages with “Back to Overview” navigation

### Navigation
- Dropdown structure with hover and active state styling
- Active link highlighting based on route

### Hero Section
- Configurable overlay with brand color and opacity
- Adaptive styling for light and dark mode

### Global Features
- Light/Dark theme toggle
- Automatic metadata and SEO titles
- GROQ-based Sanity queries
- Fully responsive and accessible layout
- Ready for Vercel production and preview deployments

---

## Development Notes

- TypeScript is enabled in `strict` mode
- Turbopack handles incremental compilation and hot reloading
- Use `cn()` utility from ShadCN for class composition
- Always include the `sizes` prop in `<Image>` when using `fill`
- Brand colors, radii, and shadows are defined as CSS variables in `globals.css`
- Avoid hard-coded colors — use theme tokens instead

---

## Common Commands

Action: Start local development server
Command: npm run dev

Action: Lint and format code
Command: npm run lint

Action: Build production version
Command: npm run build

Action: Start production server
Command: npm start

Action: Export static site
Command: npm run export

---

## Contributing

Please follow conventional commit messages for clarity:

feat(hero): add gradient overlay option
fix(nav): improve active color contrast
style(globals): refine overlay transparency for light mode

Pull requests require one reviewer approval before merging into `main`.

---

## Deployment on Vercel

Setup
1. Connect this GitHub repository to Vercel.
2. Add environment variables identical to your `.env.local`.
3. Push to any branch to create a preview build.
4. Merge into `main` to deploy production.

Notes
- Vercel automatically detects the Next.js framework and builds using Turbopack.
- Preview URLs are generated for all branches and pull requests.

For detailed instructions, refer to Next.js deployment documentation:
https://nextjs.org/docs/app/building-your-application/deploying

---

## License

© 2025 Second Life e.V.
Licensed under the MIT License.
You may use, modify, and distribute this software responsibly.

