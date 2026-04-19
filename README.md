# Shara Computers Store

🌍 **Live Deployment**: [https://shara-store.vercel.app/](https://shara-store.vercel.app/)

A premium, high-performance E-Commerce storefront built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

## Overview
Shara Computers provides a sleek hardware and accessories shopping experience. The architecture revolves around an immersive aesthetic utilizing hardware-accelerated Canvas scroll sequences running outside the React thread, paired with a modern Request-a-Quote pipeline via direct WhatsApp integration.

## Key Features
- ⚡ **Next.js App Router**: Server-Side Rendering (SSR) and seamless Static Site Generation (SSG) for instantaneous product navigation.
- 🎨 **Dynamic Native Canvas Animations**: Immersive frame-by-frame background animations mapped natively to GPU hardware components via 120hz `requestAnimationFrame` loops, decoupling expensive rendering from the Javascript thread.
- 🛒 **Zero-Backend Cart**: LocalStorage-driven cart management seamlessly integrated into an instant WhatsApp checkout flow.
- 📱 **Fully Responsive**: Mobile-first Tailwind utility architecture with dynamic Flexbox container-clamping to prevent horizontal pixel bleeding, alongside adaptive CSS graphical filters. 
- 🗄️ **Comprehensive Catalog**: 200+ distinct tech products spanning Desktop PCs, Laptops, Keyboards, CCTV, and Monitors with real-world metadata and category/brand dynamic routing (`/products/[category]/[brand]/[id]`).

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment & Edge Processing**: Vercel

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
