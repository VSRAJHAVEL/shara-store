"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";

export default function CategoryGrid() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section id="products" className="py-28 relative overflow-hidden" ref={sectionRef}>
            <div className="container mx-auto px-6 relative z-10">
                <motion.div className="mb-16 text-center">
                    <motion.span
                        className="text-amber-400 font-bold text-sm tracking-wider uppercase mb-3 block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Our Range
                    </motion.span>
                    <div className="overflow-hidden">
                        <motion.h2
                            className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg"
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                        >
                            Product <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300">Categories</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        className="text-white/70 max-w-xl mx-auto text-base"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        Discover our comprehensive range of high-performance technology.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((cat, index) => {
                        const Icon = cat.icon;
                        return (
                            <motion.div
                                key={cat.slug}
                                initial={{ opacity: 0, scale: 0.7, y: 50 }}
                                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.08, type: "spring", bounce: 0.3 }}
                                whileHover={{ y: -8, scale: 1.03, boxShadow: "0 25px 50px rgba(245,158,11,0.15)" }}
                                className="group relative overflow-hidden rounded-2xl cursor-pointer glass-panel hover:glass-panel-hover transition-all duration-300"
                            >
                                <Link href={`/products/${cat.slug}`} className="block h-full relative z-10 p-6 flex flex-col justify-end min-h-[240px]">
                                    {/* Background Image */}
                                    <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl bg-[#1a0f00]">
                                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-60 md:mix-blend-lighten group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#2b1600] via-[#1c0e00]/60 to-transparent group-hover:via-[#1c0e00]/80 transition-colors duration-500" />
                                        <div className="absolute inset-0 bg-amber-500/10 md:mix-blend-overlay pointer-events-none" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col gap-1 mt-auto">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500 mb-2 shadow-lg`}>
                                            <Icon size={20} className="text-white" />
                                        </div>
                                        <h3 className="font-black text-white text-2xl tracking-tight group-hover:text-amber-400 transition-colors duration-300">
                                            {cat.name}
                                        </h3>
                                        <div className="inline-flex items-center gap-1 text-amber-400 text-sm font-bold transition-all opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 duration-500">
                                            Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                                {/* Sweep animation */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
