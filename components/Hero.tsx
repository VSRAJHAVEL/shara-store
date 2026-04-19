"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [query, setQuery] = useState("");

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Animated horizontal gold lines */}
            <motion.div
                className="absolute top-[30%] left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)" }}
                animate={{ opacity: [0.1, 0.5, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
                className="absolute top-[65%] left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)" }}
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />

            {/* Side light bars */}
            <div className="absolute left-0 top-0 bottom-0 w-1 overflow-hidden hidden md:block">
                <motion.div
                    className="h-full w-full bg-gradient-to-b from-transparent via-amber-500 to-transparent"
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1 overflow-hidden hidden md:block">
                <motion.div
                    className="h-full w-full bg-gradient-to-b from-transparent via-amber-400 to-transparent"
                    animate={{ y: ["100%", "-100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Floating gold particles */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        left: `${5 + (i * 53) % 90}%`,
                        top: `${8 + (i * 37) % 84}%`,
                        width: 2 + (i % 3),
                        height: 2 + (i % 3),
                        backgroundColor: "#D4AF37",
                    }}
                    animate={{
                        y: [0, -(20 + i * 5), 0],
                        x: [0, (i % 2 === 0 ? 15 : -15), 0],
                        opacity: [0, 0.7, 0],
                        scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                        duration: 3 + (i % 4),
                        repeat: Infinity,
                        delay: i * 0.4,
                    }}
                />
            ))}

            {/* Main content */}
            <div className="container relative z-10 px-6 text-center">
                <motion.div style={{ y: textY, opacity, scale }}>
                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full border border-white/[0.15] bg-white/[0.08] backdrop-blur-2xl"
                        initial={{ opacity: 0, y: -40, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    >
                        <motion.span
                            className="w-2 h-2 bg-amber-400 rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm text-amber-300 font-semibold tracking-wider uppercase">
                            Premium Technology Partner
                        </span>
                    </motion.div>

                    {/* Title */}
                    <div className="overflow-hidden mb-4">
                        <motion.h1
                            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        >
                            Powering Homes,
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden mb-8">
                        <motion.h1
                            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] drop-shadow-2xl"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300">
                                Gamers &amp; Businesses
                            </span>
                        </motion.h1>
                    </div>

                    <motion.p
                        className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-4 drop-shadow-lg"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        Sales • Custom PCs • Corporate AMC • CCTV • IT Infrastructure
                    </motion.p>

                    <motion.p
                        className="text-white text-base max-w-xl mx-auto mb-10 drop-shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        Premium laptops, custom gaming rigs, CCTV security, networking, and power backup — all under one roof.
                    </motion.p>

                    {/* ── Search Bar ── */}
                    <motion.div
                        className="max-w-2xl mx-auto mb-10"
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 1.1, duration: 0.7, type: "spring" }}
                    >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (query.trim()) router.push(`/products/search?q=${encodeURIComponent(query.trim())}`);
                                else router.push("/products");
                            }}
                            className="relative group"
                        >
                            {/* Glow ring on focus */}
                            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-500/40 via-yellow-400/30 to-amber-500/40 opacity-0 group-focus-within:opacity-100 blur-sm transition-opacity duration-300" />

                            <div className="relative flex items-center bg-white/[0.07] backdrop-blur-xl border border-white/[0.12] rounded-2xl overflow-hidden">
                                {/* Search icon */}
                                <Search size={20} className="absolute left-5 text-amber-400/80 pointer-events-none" />

                                {/* Input */}
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search products, brands, categories..."
                                    className="flex-1 bg-transparent text-white placeholder-white/40 pl-14 pr-4 py-4 text-base outline-none"
                                />

                                {/* Search button */}
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="m-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-shadow shrink-0"
                                >
                                    Search
                                </motion.button>
                            </div>
                        </form>

                        {/* Quick-link chips */}
                        <div className="flex items-center flex-wrap gap-2 mt-3 justify-center">
                            <span className="text-white/40 text-xs">Popular:</span>
                            {["Laptops", "Gaming PCs", "CCTV", "UPS & Inverter", "Accessories"].map((chip) => (
                                <button
                                    key={chip}
                                    onClick={() => router.push(`/products/search?q=${encodeURIComponent(chip)}`)}
                                    className="text-xs px-3 py-1 rounded-full border border-white/[0.12] text-white/60 hover:border-amber-400/50 hover:text-amber-400 transition-all bg-white/[0.04]"
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/products">
                            <motion.button
                                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-bold text-lg shadow-lg shadow-amber-500/30"
                                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 1.2, type: "spring", bounce: 0.5 }}
                                whileHover={{ scale: 1.08, y: -4, boxShadow: "0 20px 40px rgba(212,175,55,0.4)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Explore Products
                            </motion.button>
                        </Link>
                        <Link href="/contact">
                            <motion.button
                                className="px-8 py-4 border-2 border-amber-500/40 text-amber-300 rounded-full font-bold text-lg backdrop-blur-sm bg-black/20 hover:bg-amber-500/20 transition-colors"
                                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 1.4, type: "spring", bounce: 0.5 }}
                                whileHover={{ scale: 1.08, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Corporate Enquiry
                            </motion.button>
                        </Link>
                    </motion.div>

                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <motion.span
                    className="text-xs text-amber-400/70 uppercase tracking-widest font-bold"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Scroll
                </motion.span>
                <motion.div
                    className="w-5 h-8 border-2 border-amber-500/40 rounded-full flex items-start justify-center p-1.5"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className="w-1 h-2 bg-amber-400 rounded-full"
                        animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>


        </section>
    );
}
