"use client";

import { motion } from "framer-motion";

export default function LiquidBackground() {
    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#000000] z-[-10]">
            <div className="absolute inset-0 bg-black/40 z-[1] backdrop-blur-[100px]" />
            
            <motion.div
                className="absolute w-[800px] h-[800px] rounded-full mix-blend-screen filter blur-[80px] opacity-70"
                style={{
                    background: "radial-gradient(circle, rgba(29,78,216,0.8) 0%, rgba(0,0,0,0) 70%)",
                    left: "-10%",
                    top: "-20%",
                }}
                animate={{
                    x: [0, 100, 0, -100, 0],
                    y: [0, 150, 50, -50, 0],
                    scale: [1, 1.2, 1, 0.9, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            <motion.div
                className="absolute w-[900px] h-[900px] rounded-full mix-blend-screen filter blur-[80px] opacity-60"
                style={{
                    background: "radial-gradient(circle, rgba(147,51,234,0.8) 0%, rgba(0,0,0,0) 70%)",
                    right: "-20%",
                    top: "10%",
                }}
                animate={{
                    x: [0, -150, 50, 100, 0],
                    y: [0, 50, -100, 50, 0],
                    scale: [1, 0.8, 1.2, 1, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="absolute w-[700px] h-[700px] rounded-full mix-blend-screen filter blur-[80px] opacity-60"
                style={{
                    background: "radial-gradient(circle, rgba(236,72,153,0.8) 0%, rgba(0,0,0,0) 70%)",
                    left: "20%",
                    bottom: "-20%",
                }}
                animate={{
                    x: [0, 100, -50, -100, 0],
                    y: [0, -150, 100, 50, 0],
                    scale: [1, 1.3, 0.9, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="absolute w-[800px] h-[800px] rounded-full mix-blend-screen filter blur-[80px] opacity-50"
                style={{
                    background: "radial-gradient(circle, rgba(245,158,11,0.6) 0%, rgba(0,0,0,0) 70%)",
                    right: "10%",
                    bottom: "-10%",
                }}
                animate={{
                    x: [0, -100, 100, -50, 0],
                    y: [0, 100, -50, 150, 0],
                    scale: [1, 0.9, 1.2, 0.8, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
}
