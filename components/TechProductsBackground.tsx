"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Monitor, Laptop, Camera, Printer, Battery, HardDrive,
    Cpu, Shield, Gamepad2, Wifi, Server, Headphones,
    Smartphone, Tv, Router, Mouse
} from "lucide-react";

const ALL_PRODUCTS = [
    { Icon: Monitor, label: "Gaming PCs", color: "#2563eb" },
    { Icon: Laptop, label: "Laptops", color: "#06b6d4" },
    { Icon: Camera, label: "CCTV", color: "#10b981" },
    { Icon: Printer, label: "Printers", color: "#f59e0b" },
    { Icon: Battery, label: "UPS", color: "#8b5cf6" },
    { Icon: HardDrive, label: "Storage", color: "#ec4899" },
    { Icon: Cpu, label: "Components", color: "#14b8a6" },
    { Icon: Shield, label: "Security", color: "#6366f1" },
    { Icon: Gamepad2, label: "Gaming", color: "#f43f5e" },
    { Icon: Wifi, label: "Networking", color: "#0ea5e9" },
    { Icon: Server, label: "Servers", color: "#7c3aed" },
    { Icon: Headphones, label: "Audio", color: "#f97316" },
    { Icon: Smartphone, label: "Mobile", color: "#3b82f6" },
    { Icon: Tv, label: "Displays", color: "#059669" },
    { Icon: Router, label: "Routers", color: "#dc2626" },
    { Icon: Mouse, label: "Peripherals", color: "#6d28d9" },
];

// A single scrolling marquee strip
export function ProductMarquee({
    direction = "left",
    speed = 25,
    iconSize = 48,
    products = ALL_PRODUCTS,
    className = "",
}: {
    direction?: "left" | "right";
    speed?: number;
    iconSize?: number;
    products?: typeof ALL_PRODUCTS;
    className?: string;
}) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className={`h-24 ${className}`} />;

    const doubled = [...products, ...products, ...products];
    const totalWidth = products.length * (iconSize + 80 + 48); // card width + gap

    return (
        <div className={`relative w-full overflow-hidden py-6 ${className}`}>
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex items-center"
                style={{ gap: "48px", width: "fit-content" }}
                animate={{
                    x: direction === "left"
                        ? [0, -totalWidth]
                        : [-totalWidth, 0],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: speed,
                        ease: "linear",
                    },
                }}
            >
                {doubled.map((product, i) => (
                    <motion.div
                        key={`${product.label}-${i}`}
                        className="flex-shrink-0"
                        animate={{
                            y: [0, -8, 0, 8, 0],
                            rotate: [0, 2, 0, -2, 0],
                        }}
                        transition={{
                            duration: 3 + (i % 4),
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: (i % 8) * 0.4,
                        }}
                    >
                        <div
                            className="flex items-center gap-4 px-6 py-4 rounded-2xl border-2 shadow-lg backdrop-blur-sm hover:scale-110 transition-transform duration-300 cursor-default"
                            style={{
                                backgroundColor: `${product.color}15`,
                                borderColor: `${product.color}40`,
                            }}
                        >
                            {/* Glow */}
                            <div
                                className="absolute -inset-2 rounded-2xl blur-xl opacity-20"
                                style={{ backgroundColor: product.color }}
                            />

                            <div
                                className="relative w-14 h-14 rounded-xl flex items-center justify-center shadow-inner"
                                style={{ backgroundColor: `${product.color}20` }}
                            >
                                <product.Icon
                                    size={iconSize}
                                    style={{ color: product.color }}
                                    strokeWidth={2}
                                />
                            </div>
                            <span
                                className="relative font-bold text-base whitespace-nowrap"
                                style={{ color: product.color }}
                            >
                                {product.label}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

// Simple gradient background (no animations behind sections)
export default function TechProductsBackground() {
    return (
        <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#111118] to-[#0a0a0f]" />
        </div>
    );
}
