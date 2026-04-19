"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import ScrollVideoBackground from "@/components/ScrollVideoBackground";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-transparent selection:bg-amber-500/30">

      <div className="relative z-10 flex flex-col gap-0">
        <Hero />

        {/* Teaser: Categories */}
        <section className="py-20 backdrop-blur-sm">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Explore Our <span className="text-amber-400">Categories</span></h2>
            <CategoryGrid />
            <div className="mt-12 text-center">
              <Link href="/products" className="inline-flex items-center gap-2 text-amber-400 font-bold hover:gap-4 transition-all">
                View Full Catalog <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Teaser: Services */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl font-bold text-white">Our <span className="text-amber-400">Services</span></h2>
              <Link href="/services" className="text-white/60 hover:text-white transition-colors">View All Services →</Link>
            </div>
            <Services limit={3} />
          </div>
        </section>

        <FeaturedProducts />

        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-amber-500/10 backdrop-blur-3xl" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Upgrade?
            </motion.h2>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <Link href="/products" className="px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform">
                Browse Products
              </Link>
              <Link href="/contact" className="px-10 py-5 bg-white/10 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-colors backdrop-blur-md">
                Contact Sales
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
