"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";

function AnimatedCounter({ value, suffix = "", delay = 0 }: { value: number; suffix?: string; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const timer = setTimeout(() => {
            let start = 0;
            const duration = 2000;
            const increment = value / (duration / 16);
            const counter = setInterval(() => {
                start += increment;
                if (start >= value) {
                    setCount(value);
                    clearInterval(counter);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(counter);
        }, delay);
        return () => clearTimeout(timer);
    }, [isInView, value, delay]);

    return (
        <span ref={ref}>
            {count}{suffix}
        </span>
    );
}

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const shape1X = useTransform(scrollYProgress, [0, 1], ["-50%", "10%"]);
    const shape2X = useTransform(scrollYProgress, [0, 1], ["50%", "-10%"]);

    const highlights = [
        "Students & Home Users",
        "Professional Gamers",
        "Freelancers & Creators",
        "Offices & Corporates",
    ];

    const stats = [
        { number: 10, suffix: "+", label: "Years Experience" },
        { number: 5000, suffix: "+", label: "Happy Customers" },
        { number: 500, suffix: "+", label: "Products" },
        { number: 24, suffix: "/7", label: "Support" },
    ];

    return (
        <section id="about" ref={sectionRef} className="py-28 relative overflow-hidden">


            {/* Parallax glow shapes */}
            <motion.div
                className="absolute top-10 left-0 w-72 h-72 rounded-full bg-amber-500/10 blur-[80px]"
                style={{ x: shape1X }}
            />
            <motion.div
                className="absolute bottom-10 right-0 w-64 h-64 rounded-full bg-amber-500/10 blur-[80px]"
                style={{ x: shape2X }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left content */}
                    <div className="flex-1">
                        <motion.span
                            className="text-amber-400 font-bold text-sm tracking-wider uppercase mb-3 block"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            About Sharacomputers
                        </motion.span>

                        <div className="overflow-hidden mb-6">
                            <motion.h2
                                className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg"
                                initial={{ y: "100%" }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                            >
                                Your Trusted{" "}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300">
                                    Technology Partner
                                </span>
                            </motion.h2>
                        </div>

                        <motion.p
                            className="text-white text-lg mb-6 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Sharacomputers is a complete IT solutions provider offering product sales, installation, repair, upgrades, and corporate IT maintenance services.
                        </motion.p>

                        <motion.p
                            className="text-white mb-8 text-base"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            From a single laptop purchase to full IT infrastructure deployment — we handle everything professionally.
                        </motion.p>

                        {/* Highlight cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            {highlights.map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: -40, scale: 0.9 }}
                                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + i * 0.15, type: "spring", bounce: 0.3 }}
                                    whileHover={{ scale: 1.05, x: 8, boxShadow: "0 8px 30px rgba(245,158,11,0.2)" }}
                                    className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-xl cursor-pointer transition-all duration-300 hover:border-amber-400/40 hover:bg-white/[0.12]"
                                >
                                    <CheckCircle className="text-amber-400 flex-shrink-0" size={20} />
                                    <span className="text-white font-semibold text-sm">{item}</span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            className="text-amber-400 font-bold flex items-center gap-2 group text-base"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1 }}
                            whileHover={{ x: 8 }}
                        >
                            Learn More About Us <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </motion.button>
                    </div>

                    {/* Right - Animated Stats */}
                    <div className="flex-1 w-full">
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 60, rotateX: 20 }}
                                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.15, duration: 0.7, type: "spring" }}
                                    whileHover={{
                                        y: -8,
                                        scale: 1.03,
                                        boxShadow: "0 20px 40px rgba(245,158,11,0.2)",
                                    }}
                                    className="p-8 rounded-2xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-xl text-center cursor-pointer transition-all duration-300 hover:border-amber-400/40 hover:bg-white/[0.12]"
                                >
                                    <div className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300 mb-2">
                                        <AnimatedCounter value={stat.number} suffix={stat.suffix} delay={300 + i * 200} />
                                    </div>
                                    <motion.div
                                        className="text-white text-sm font-bold uppercase tracking-wide"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.8 + i * 0.1 }}
                                    >
                                        {stat.label}
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
