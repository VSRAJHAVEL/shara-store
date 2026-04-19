"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { getCategoryBySlug, slugify } from "@/data/categories";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { use, useRef } from "react";
import Toast, { ToastRef } from "@/components/ui/Toast";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ category: string; brand: string }>;
}

export default function BrandProductsPage({ params }: Props) {
    const { category: categorySlug, brand: brandSlug } = use(params);
    const category = getCategoryBySlug(categorySlug);
    const toastRef = useRef<ToastRef>(null);
    const { addToCart } = useCart();

    if (!category) return notFound();

    // Match products to this category + brand
    const brandProducts = products.filter(p => {
        const pCategorySlug = p.category.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        const pBrandSlug = slugify(p.brand);
        return (pCategorySlug === categorySlug || p.category === category.name) && pBrandSlug === brandSlug;
    });

    if (brandProducts.length === 0) return notFound();

    const brandName = brandProducts[0].brand;

    const handleAddToCart = (product: any) => {
        addToCart(product);
        toastRef.current?.show(`${product.name} added to Quote`, "success");
    };

    return (
        <main className="min-h-screen pt-28 pb-20 px-4 md:px-8">
            <Toast ref={toastRef} />
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <motion.div
                    className="flex items-center gap-2 text-sm text-white/50 mb-10 flex-wrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Link href="/products" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                        <ArrowLeft size={14} /> All Categories
                    </Link>
                    <span>/</span>
                    <Link href={`/products/${categorySlug}`} className="hover:text-amber-400 transition-colors">
                        {category.name}
                    </Link>
                    <span>/</span>
                    <span className="text-white">{brandName}</span>
                </motion.div>

                {/* Header */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center gap-5 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center overflow-hidden p-2">
                            <img
                                src={`/images/brands/${brandSlug}.svg`}
                                alt={brandName}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    const t = e.target as HTMLImageElement;
                                    if (t.src.endsWith('.svg')) t.src = `/images/brands/${brandSlug}.png`;
                                    else if (t.src.endsWith('.png')) t.src = `/images/brands/${brandSlug}.jpg`;
                                    else { t.style.display = 'none'; t.nextElementSibling?.classList.remove('hidden'); }
                                }}
                            />
                            <span className="text-2xl font-black text-amber-400 hidden">{brandName.charAt(0)}</span>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white">{brandName}</h1>
                            <p className="text-white/50">{brandProducts.length} products in {category.name}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {brandProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: index * 0.1, type: "spring", bounce: 0.3 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="glass-panel group rounded-2xl overflow-hidden hover:glass-panel-hover transition-all duration-300 flex flex-col"
                            >
                                <Link href={`/products/${categorySlug}/${brandSlug}/${product.id}`} className="flex flex-col flex-1">
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
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 hidden flex flex-col items-center justify-center z-0">
                                            <span className="text-6xl font-black text-white/5">{product.name[0]}</span>
                                        </div>

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-0 pointer-events-none" />

                                        {product.badge && (
                                            <span className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white shadow-lg backdrop-blur-md
                                                ${product.badgeColor === "blue" ? "bg-blue-500/90 border border-blue-400/20" :
                                                    product.badgeColor === "green" ? "bg-green-500/90 border border-green-400/20" :
                                                        product.badgeColor === "red" ? "bg-red-500/90 border border-red-400/20" :
                                                            product.badgeColor === "purple" ? "bg-purple-500/90 border border-purple-400/20" :
                                                                product.badgeColor === "amber" ? "bg-amber-500/90 border border-amber-400/20" :
                                                                    "bg-gray-600/90"}`}
                                            >
                                                {product.badge}
                                            </span>
                                        )}

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

                                    {/* Details */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{product.name}</h3>
                                        <p className="text-white/50 text-xs mb-1">{product.specs}</p>
                                        {product.description && (
                                            <p className="text-white/40 text-xs mb-4 leading-relaxed">{product.description}</p>
                                        )}
                                        <div className="flex items-center gap-0.5 mb-4">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <Star key={s} size={12} className="text-amber-400 fill-amber-400" />
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                            <span className="text-2xl font-black text-white">{product.price}</span>
                                        </div>
                                    </div>
                                </Link>
                                {/* Add to Quote outside Link */}
                                <div className="px-6 pb-5">
                                    <motion.button
                                        onClick={() => handleAddToCart(product)}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-amber-500/30 transition-all"
                                    >
                                        <ShoppingCart size={15} /> Add to Quote
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
