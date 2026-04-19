"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ShoppingCart, Star } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Toast, { ToastRef } from "@/components/ui/Toast";
import { useRef } from "react";

import { slugify } from "@/data/categories";
import Link from "next/link";

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
    const { addToCart } = useCart();
    const toastRef = useRef<ToastRef>(null);

    // Extract unique categories
    const categories = ["All", ...Array.from(new Set(products.map(p => p.category || "Other")))];

    // Filter products
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.specs.toLowerCase().includes(searchQuery.toLowerCase());

            const price = parseFloat(product.price.replace(/[^0-9.]/g, ""));
            const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

            return matchesCategory && matchesSearch && matchesPrice;
        });
    }, [selectedCategory, searchQuery, priceRange]);

    const handleAddToCart = (product: any) => {
        addToCart(product);
        toastRef.current?.show(`Added ${product.name} to Quote`, "success");
    };

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-black">
            <Toast ref={toastRef} />

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12 text-center">
                <motion.h1
                    className="text-4xl md:text-6xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Product <span className="text-amber-400">Catalog</span>
                </motion.h1>
                <motion.p
                    className="text-white/60 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Browse our premium range of high-performance custom computers, security systems, and accessories.
                </motion.p>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
                    {/* Search (Mobile/Tablet moved here for layout) */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-400/50 transition-colors"
                        />
                    </div>

                    {/* Categories */}
                    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Filter size={18} className="text-amber-400" /> Categories
                        </h3>
                        <div className="space-y-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === category
                                            ? "bg-amber-500 text-white font-bold shadow-lg shadow-amber-500/20"
                                            : "text-white/70 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range (Simplified for now) */}
                    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Price Range</h3>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                            <span>₹{priceRange[0]}</span>
                            <input
                                type="range"
                                min="0"
                                max="500000"
                                step="1000"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                className="flex-1 accent-amber-500 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                            />
                            <span>₹{priceRange[1].toLocaleString()}</span>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <section className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={() => handleAddToCart(product)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20 text-white/50">
                            <p className="text-xl">No products found matching your criteria.</p>
                            <button
                                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); setPriceRange([0, 500000]); }}
                                className="mt-4 text-amber-400 hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

function ProductCard({ product, onAddToCart }: { product: any, onAddToCart: () => void }) {
    const categorySlug = slugify(product.category);
    const brandSlug = slugify(product.brand);
    const detailUrl = `/products/${categorySlug}/${brandSlug}/${product.id}`;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] rounded-2xl overflow-hidden hover:border-amber-400/40 hover:bg-white/[0.12] transition-all duration-300 flex flex-col"
        >
            <Link href={detailUrl} className="block">
                {/* Product Photo Block */}
                <div className="h-48 bg-gradient-to-br from-[#0a0a0a] to-[#111] relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                    <img 
                        src={`/images/products/${product.id}.jpg`} 
                        alt={product.name}
                        className="w-full h-full object-cover mix-blend-lighten opacity-90 group-hover:opacity-100 transition-opacity absolute inset-0 z-0"
                        onError={(e) => {
                            const t = e.target as HTMLImageElement;
                            if (t.src.endsWith('.jpg')) t.src = `/images/products/${product.id}.png`;
                            else if (t.src.endsWith('.png')) t.src = `/images/products/${product.id}.jpeg`;
                            else if (t.src.endsWith('.jpeg')) t.src = `/images/products/${product.id}.webp`;
                            else { t.style.display = 'none'; t.nextElementSibling?.classList.remove('hidden'); }
                        }}
                    />
                    {/* Fallback pattern if image completely fails */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 hidden flex flex-col items-center justify-center z-0">
                        <span className="text-6xl font-black text-white/5">{product.name[0]}</span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-0 pointer-events-none" />

                    {product.badge && (
                        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white z-10 shadow-lg backdrop-blur-md
                            ${product.badgeColor === 'amber' ? 'bg-amber-500/90 border border-amber-400/20' :
                                product.badgeColor === 'blue' ? 'bg-blue-600/90 border border-blue-400/20' :
                                    product.badgeColor === 'green' ? 'bg-emerald-600/90 border border-emerald-400/20' :
                                        product.badgeColor === 'red' ? 'bg-rose-600/90 border border-rose-400/20' : 'bg-gray-600/90'}`}
                        >
                            {product.badge}
                        </span>
                    )}

                    {/* Tiny Floating Brand Logo */}
                    <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center bg-black/60 backdrop-blur-md overflow-hidden p-1.5 shadow-xl z-10 transition-transform group-hover:scale-110">
                        <img
                            src={`/images/brands/${brandSlug}.svg`}
                            alt={product.brand}
                            className="w-full h-full object-contain filter drop-shadow-md"
                            onError={(e) => {
                                const t = e.target as HTMLImageElement;
                                if (t.src.endsWith('.svg')) t.src = `/images/brands/${brandSlug}.png`;
                                else if (t.src.endsWith('.png')) t.src = `/images/brands/${brandSlug}.jpg`;
                                else t.style.display = 'none';
                            }}
                        />
                    </div>
                </div>
            </Link>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <Link href={detailUrl}>
                        <h3 className="text-lg font-bold text-white leading-tight group-hover:text-amber-400 transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                <p className="text-sm text-white/60 mb-4 line-clamp-2 min-h-[40px]">
                    {product.specs}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xl font-bold text-white">
                        {product.price}
                    </span>
                    <button
                        onClick={onAddToCart}
                        className="p-2.5 bg-white/10 hover:bg-amber-500 rounded-full text-white hover:text-white transition-all shadow-lg hover:shadow-amber-500/20 group-active:scale-95"
                        title="Add to Quote"
                    >
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
