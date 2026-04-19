"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { categories, getCategoryBySlug, slugify } from "@/data/categories";
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import { use } from "react";

interface Props {
    params: Promise<{ category: string }>;
}

export default function BrandsPage({ params }: Props) {
    const { category: categorySlug } = use(params);
    const category = getCategoryBySlug(categorySlug);

    if (!category) return notFound();

    // Get unique brands that actually have products for this category
    const categoryProducts = products.filter(p =>
        p.category.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") === categorySlug
        || p.category === category.name
    );

    const uniqueBrands = Array.from(new Set(categoryProducts.map(p => p.brand)));
    const Icon = category.icon;

    return (
        <main className="min-h-screen pt-28 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <motion.div
                    className="flex items-center gap-2 text-sm text-white/50 mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Link href="/products" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                        <ArrowLeft size={14} /> All Categories
                    </Link>
                    <span>/</span>
                    <span className="text-white">{category.name}</span>
                </motion.div>

                {/* Header */}
                <motion.div
                    className="relative rounded-[2rem] overflow-hidden mb-16 min-h-[320px] flex flex-col items-center justify-center p-8 text-center border border-white/5 bg-[#1a0f00]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="absolute inset-0 z-0">
                        <img src={category.image} alt={category.name} className="w-full h-full object-cover opacity-50 mix-blend-lighten select-none pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#2b1600]/60 via-transparent to-[#1c0e00]/90" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1c0e00]/60 via-transparent to-[#1c0e00]/60" />
                        <div className="absolute inset-0 bg-amber-500/20 mix-blend-overlay" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
                        <motion.div 
                            className={`inline-flex w-20 h-20 rounded-3xl bg-gradient-to-br ${category.color} items-center justify-center mb-6 shadow-2xl backdrop-blur-md`}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                        >
                            <Icon size={32} className="text-amber-400 drop-shadow-md" />
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight drop-shadow-xl">
                            {category.name}
                        </h1>
                        <p className="text-white/80 text-lg md:text-xl font-medium drop-shadow-md">
                            {category.description}
                        </p>
                    </div>
                </motion.div>

                {/* Brand Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {uniqueBrands.map((brand, index) => {
                        const brandProducts = categoryProducts.filter(p => p.brand === brand);
                        const brandSlug = slugify(brand);
                        return (
                            <motion.div
                                key={brand}
                                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: index * 0.1, type: "spring", bounce: 0.3 }}
                                whileHover={{ y: -8, scale: 1.03 }}
                            >
                                <Link
                                    href={`/products/${categorySlug}/${brandSlug}`}
                                    className="glass-panel group rounded-2xl p-8 hover:glass-panel-hover transition-all duration-300 flex flex-col items-center text-center block h-full"
                                >
                                    {/* Brand Logo */}
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-amber-400/50 transition-all duration-300 overflow-hidden p-2">
                                        <img
                                            src={`/images/brands/${brandSlug}.svg`}
                                            alt={brand}
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                const t = e.target as HTMLImageElement;
                                                if (t.src.endsWith('.svg')) t.src = `/images/brands/${brandSlug}.png`;
                                                else if (t.src.endsWith('.png')) t.src = `/images/brands/${brandSlug}.jpg`;
                                                else { t.style.display = 'none'; t.nextElementSibling?.classList.remove('hidden'); }
                                            }}
                                        />
                                        <span className="text-3xl font-black text-amber-400 hidden">
                                            {brand.charAt(0)}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                                        {brand}
                                    </h2>
                                    <p className="text-white/50 text-sm mb-4">
                                        {brandProducts.length} product{brandProducts.length !== 1 ? "s" : ""} available
                                    </p>

                                    <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm group-hover:gap-4 transition-all mt-auto">
                                        View Products <ArrowRight size={14} />
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
