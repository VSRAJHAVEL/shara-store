"use client";

import { useRef } from "react";
import { motion, useScroll, useInView } from "framer-motion";
import { Star } from "lucide-react";
import Toast, { ToastRef } from "./ui/Toast";
import { products } from "@/data/products";
import { slugify } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function FeaturedProducts() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const toastRef = useRef<ToastRef>(null);
    const { addToCart } = useCart();

    // Pick 1 product from each category for variety
    const featuredProducts = [
        products.find(p => p.category === "Laptops"),
        products.find(p => p.category === "Gaming"),
        products.find(p => p.category === "CCTV"),
        products.find(p => p.category === "Desktops"),
    ].filter(Boolean) as typeof products;

    const handleAddToCart = (product: any) => {
        addToCart(product);
        toastRef.current?.show(`Added ${product.name} to Quote Cart`, "success");
    };

    return (
        <section ref={sectionRef} className="py-28 relative overflow-hidden">

            <Toast ref={toastRef} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div>
                        <motion.span
                            className="text-amber-400 font-bold text-sm tracking-wider uppercase mb-3 block"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            Top Picks
                        </motion.span>
                        <div className="overflow-hidden">
                            <motion.h2
                                className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg"
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                            >
                                Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300">Products</span>
                            </motion.h2>
                        </div>
                        <motion.p
                            className="text-white max-w-xl text-base"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            Premium hardware handpicked for performance and reliability.
                        </motion.p>
                    </div>
                    <Link href="/products"
                        className="text-amber-400 font-bold flex items-center gap-2 group"
                    >
                        View All Products
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                            onAddToCart={() => handleAddToCart(product)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProductCard({ product, index, onAddToCart }: { product: any; index: number; onAddToCart: () => void }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                y: 80,
                scale: 0.8,
                rotateY: 15,
            }}
            animate={isInView ? {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateY: 0,
            } : {}}
            transition={{
                duration: 0.7,
                delay: index * 0.15,
                type: "spring",
                bounce: 0.3,
            }}
            whileHover={{
                y: -12,
                scale: 1.03,
                boxShadow: "0 30px 60px rgba(245,158,11,0.2)",
            }}
            className="group glass-panel rounded-2xl overflow-hidden hover:glass-panel-hover transition-all duration-300 cursor-pointer"
        >
            <Link href={`/products/${slugify(product.category)}/${slugify(product.brand)}/${product.id}`} className="block h-full relative group">
                {/* Product Photo Block */}
                <div className="h-52 bg-gradient-to-br from-[#0a0a0a] to-[#111] relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
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
                        <motion.span 
                            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white z-10 shadow-lg backdrop-blur-md
                            ${product.badgeColor === 'amber' ? 'bg-amber-500/90 border border-amber-400/20' :
                                product.badgeColor === 'blue' ? 'bg-blue-600/90 border border-blue-400/20' :
                                    product.badgeColor === 'green' ? 'bg-emerald-600/90 border border-emerald-400/20' :
                                        product.badgeColor === 'red' ? 'bg-rose-600/90 border border-rose-400/20' : 'bg-gray-600/90'}`}
                            initial={{ x: -20, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.3 + index * 0.15, type: "spring" }}
                        >
                            {product.badge}
                        </motion.span>
                    )}

                    {/* Tiny Floating Brand Logo */}
                    <motion.div 
                        className="absolute bottom-3 right-3 w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center bg-black/60 backdrop-blur-md overflow-hidden p-1.5 shadow-xl z-10 transition-transform group-hover:scale-110"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    >
                        <img
                            src={`/images/brands/${slugify(product.brand)}.svg`}
                            alt={product.brand}
                            className="w-full h-full object-contain filter drop-shadow-md"
                            onError={(e) => {
                                const t = e.target as HTMLImageElement;
                                if (t.src.endsWith('.svg')) t.src = `/images/brands/${slugify(product.brand)}.png`;
                                else if (t.src.endsWith('.png')) t.src = `/images/brands/${slugify(product.brand)}.jpg`;
                                else t.style.display = 'none';
                            }}
                        />
                    </motion.div>
                </div>
                {/* Details */}
                <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-sm text-white mb-4 font-medium">{product.specs}</p>
                    <div className="flex items-center justify-between">
                        <motion.span
                            className="text-2xl font-black text-white"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.5 + index * 0.15, type: "spring" }}
                        >
                            {product.price}
                        </motion.span>
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <motion.div
                                    key={s}
                                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                                    transition={{ delay: 0.6 + index * 0.1 + s * 0.05, type: "spring" }}
                                >
                                    <Star size={14} className="text-amber-400 fill-amber-400" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>

            {/* Quote button on hover - Outside Link to prevent navigation when clicking button */}
            <motion.div className="absolute bottom-4 left-4 right-4 flex justify-center pointer-events-none group-hover:pointer-events-auto">
                <motion.button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddToCart(); }}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto"
                >
                    Add to Quote
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
