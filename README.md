# Shara Computers Store

**Live Deployment**: [https://shara-store.vercel.app/](https://shara-store.vercel.app/)

A high-performance, responsive E-Commerce application architected with Next.js 14, Tailwind CSS, and Framer Motion. This project demonstrates advanced client-side rendering techniques, including hardware-accelerated GPU canvas sequencing and heavily parallelized DOM manipulations specifically optimized for mobile environments.

## Architecture & Overview

Shara Computers provides a comprehensive hardware and accessories shopping experience. The platform prioritizes high-fidelity animation and layout consistency while maintaining aggressive performance heuristics.

The core of the application utilizes a Custom Canvas Engine that completely strips scroll-linked animations away from the React Virtual DOM lifecycle, mapping mathematical physics curves directly to raw Javascript hardware handlers.

## Core Implementations

- **Next.js App Router**: Leverages advanced SSR and static generation to maintain ultra-low Time-to-Interactive (TTI).
- **Native Canvas Engine**: Custom scroll-linked frame sequencing mapping 120Hz raw `requestAnimationFrame` loops to dedicated GPU compositor layers via `transform-gpu`. This decouples heavy image painting from the main JavaScript thread to ensure 60fps locked scrolling on low-end mobile devices.
- **Client-Side Cart Management**: A strict LocalStorage-driven cart implementation with zero-backend dependencies, bridging complex multi-state quote arrays directly to a WhatsApp Business integration.
- **Responsive Layout Constraint Enforcement**: Complex CSS container queries and flexbox clamping techniques that guarantee pixel-perfect responsiveness by mathematically suppressing implicit geometric overflows across all viewports.
- **Dynamic Routing**: Implementation of deep `/categories/[brand]/[id]` dynamic slug interpolation for over 200 concurrent products, maintaining strong architectural parity between real-world specs and data schemas.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v3 / Vanilla CSS
- **Animation Engine**: Framer Motion
- **Iconography**: Lucide React
- **Deployment & Edge Computing**: Vercel

## Deployment Specifications

The repository is configured for automated CI/CD deployment via Vercel Edge Networks. All assets and Next.js optimization pipelines execute natively during the cloud container build target. Manual static extraction and builds can be executed via the standard Next.js build binaries on Node.js v18+.

## Maintenance

Designed, developed, and maintained by Rajhavel V S.
