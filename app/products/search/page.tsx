"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, ArrowLeft, ShoppingCart } from "lucide-react";
import { products } from "@/data/products";
import { slugify } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { useRef, useState, Suspense } from "react";
import Toast, { ToastRef } from "@/components/ui/Toast";

function SearchResults() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const rawQ = searchParams.get("q") ?? "";
    const [inputVal, setInputVal] = useState(rawQ);
    const toastRef = useRef<ToastRef>(null);
    const { addToCart } = useCart();

    const q = rawQ.toLowerCase().trim();
    const filtered = q
        ? products.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                (p.specs && p.specs.toLowerCase().includes(q)) ||
                (p.description && p.description.toLowerCase().includes(q))
        )
        : products;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputVal.trim()) router.push(`/products/search?q=${encodeURIComponent(inputVal.trim())}`);
        else router.push("/products/search");
    };

    return (
        <main className="min-h-screen pt-28 pb-20 px-4 md:px-8">
            <Toast ref={toastRef} />
            <div className="max-w-7xl mx-auto">
                {/* Back + Search Bar */}
                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Link href="/products" className="inline-flex items-center gap-2 text-white/50 hover:text-amber-400 text-sm mb-6 transition-colors">
                        <ArrowLeft size={14} /> All Categories
                    </Link>

                    <form onSubmit={handleSearch} className="relative group w-full max-w-2xl">
                        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-500/40 to-amber-500/40 opacity-0 group-focus-within:opacity-100 blur-sm transition-opacity duration-300" />
                        <div className="relative flex items-center bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] rounded-2xl overflow-hidden">
                            <Search size={20} className="absolute left-5 text-amber-400/80 pointer-events-none" />
                            <input
                                type="text"
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value)}
                                placeholder="Search products, brands, categories..."
                                className="flex-1 min-w-0 bg-transparent text-white placeholder-white/40 pl-14 pr-4 py-4 text-base outline-none"
                            />
                            <motion.button
                                type="submit"
                                whileTap={{ scale: 0.95 }}
                                className="m-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-bold text-sm shrink-0"
                            >
                                Search
                            </motion.button>
                        </div>
                    </form>
                </motion.div>

                {/* Results header */}
                <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <h1 className="text-2xl font-bold text-white">
                        {rawQ ? (
                            <><span className="text-amber-400">&ldquo;{rawQ}&rdquo;</span> — {filtered.length} result{filtered.length !== 1 ? "s" : ""}</>
                        ) : (
                            <>All Products <span className="text-white/40 text-lg font-normal">({filtered.length})</span></>
                        )}
                    </h1>
                </motion.div>

                {/* Product grid */}
                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-white/40">
                        <Search size={40} className="mx-auto mb-4 opacity-40" />
                        <p className="text-xl">No products found for &ldquo;{rawQ}&rdquo;</p>
                        <Link href="/products" className="mt-4 inline-block text-amber-400 hover:underline text-sm">Browse all categories →</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        <AnimatePresence>
                            {filtered.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.04, type: "spring" }}
                                    whileHover={{ y: -6, scale: 1.02 }}
                                    className="glass-panel group rounded-2xl overflow-hidden hover:glass-panel-hover transition-all flex flex-col"
                                >
                                    {/* Image area */}
                                    <div className="h-36 flex items-center justify-center bg-white/[0.02] relative overflow-hidden">
                                        {product.badge && (
                                            <span className={`absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full text-xs font-bold text-white
                                                ${product.badgeColor === "blue" ? "bg-blue-500" : product.badgeColor === "green" ? "bg-green-500" : product.badgeColor === "red" ? "bg-red-500" : product.badgeColor === "purple" ? "bg-purple-500" : product.badgeColor === "amber" ? "bg-amber-500" : "bg-gray-600"}`}>
                                                {product.badge}
                                            </span>
                                        )}
                                        <div className="w-16 h-16 rounded-xl flex items-center justify-center border border-amber-500/30 bg-amber-500/10">
                                            <span className="text-2xl font-black text-amber-400">{product.initial}</span>
                                        </div>
                                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                                    </div>

                                    {/* Info */}
                                    <div className="p-4 flex flex-col flex-1">
                                        <span className="text-amber-400/70 text-[10px] font-semibold uppercase tracking-wider mb-1">{product.brand} · {product.category}</span>
                                        <h3 className="text-sm font-bold text-white mb-1 group-hover:text-amber-400 transition-colors line-clamp-2">{product.name}</h3>
                                        <p className="text-white/40 text-xs mb-3 line-clamp-1">{product.specs}</p>
                                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                                            <span className="text-lg font-black text-white">{product.price}</span>
                                            <motion.button
                                                onClick={() => { addToCart(product); toastRef.current?.show(`${product.name} added`, "success"); }}
                                                whileTap={{ scale: 0.9 }}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg text-xs font-bold"
                                            >
                                                <ShoppingCart size={12} /> Add
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </main>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white/40">Searching...</div>}>
            <SearchResults />
        </Suspense>
    );
}
