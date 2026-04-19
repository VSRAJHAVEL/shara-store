"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import Navbar from "@/components/Navbar";

export default function ProductsPage() {
    return (
        <main className="min-h-screen pt-28 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="text-amber-400 font-bold text-sm tracking-widest uppercase mb-3 block">Our Products</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Shop by <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300">Category</span>
                    </h1>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        Choose a category to explore top brands and their products.
                    </p>
                </motion.div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, index) => {
                        const Icon = cat.icon;
                        return (
                            <motion.div
                                key={cat.slug}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08, type: "spring", bounce: 0.3 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                            >
                                <Link
                                    href={`/products/${cat.slug}`}
                                    className="relative block h-full min-h-[300px] rounded-2xl overflow-hidden group p-8 flex flex-col justify-end border border-white/5 hover:border-amber-500/30 transition-all duration-500"
                                >
                                    {/* Background Image */}
                                    <div className="absolute inset-0 z-0 bg-[#1a0f00]">
                                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-60 mix-blend-lighten group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#2b1600] via-[#1c0e00]/60 to-transparent group-hover:via-[#1c0e00]/80 transition-colors duration-500" />
                                        <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay pointer-events-none" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col items-start gap-4">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500 shadow-xl backdrop-blur-md`}>
                                            <Icon size={28} className="text-white" />
                                        </div>

                                        <div className="flex-1 w-full">
                                            <h2 className="text-3xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors drop-shadow-lg">
                                                {cat.name}
                                            </h2>
                                            <p className="text-white/80 text-sm mb-4 leading-relaxed line-clamp-2 drop-shadow-md font-medium">
                                                {cat.description}
                                            </p>

                                            {/* Brands preview chips */}
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {cat.brands.slice(0, 3).map(brand => (
                                                    <span
                                                        key={brand}
                                                        className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/40 text-white/90 border border-white/10 backdrop-blur-md"
                                                    >
                                                        {brand}
                                                    </span>
                                                ))}
                                                {cat.brands.length > 3 && (
                                                    <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-400/20 backdrop-blur-md">
                                                        +{cat.brands.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mt-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            Explore Brands <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
