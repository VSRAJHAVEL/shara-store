# Shara Computers Store

![Shara Computers](public/favicon.ico)

A premium, high-performance E-Commerce storefront built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

## Overview
Shara Computers provides a sleek hardware and accessories shopping experience. The architecture revolves around an immersive aesthetic (utilizing hardware-accelerated Canvas scroll sequences) and a modern Request-a-Quote pipeline via a direct WhatsApp integration.

## Key Features
- ⚡ **Next.js App Router**: Server-Side Rendering (SSR) and seamless Static Site Generation (SSG) for instantaneous product navigation.
- 🎨 **Dynamic Canvas Animations**: Immersive frame-by-frame background animations mapped to touch/scroll tracking via Framer Motion's `useScroll` and `requestAnimationFrame`.
- 🛒 **Zero-Backend Cart**: LocalStorage-driven cart management seamlessly integrated into an instant WhatsApp checkout flow.
- 📱 **Fully Responsive**: Mobile-first Tailwind utility architecture with glassmorphism drop-shadows and rich dark/amber themes. 
- 🗄️ **Comprehensive Catalog**: 200+ distinct tech products spanning Desktop PCs, Laptops, Keyboards, CCTV, and Monitors with real world metadata and category/brand dynamic routing (`/products/[category]/[brand]/[id]`).

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Icons**: Lucide React / React Icons
- **Deployment**: Vercel / Render

## Getting Started Locally

First, make sure you have Node.js installed. Then, clone the repository and install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build and Production

To build the optimized static production bundle:

```bash
npm run build
npm start
```

## Contributing
Maintained by Rajhavel V S.
