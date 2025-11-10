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



