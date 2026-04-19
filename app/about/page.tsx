"use client";

import { motion } from "framer-motion";
import { Award, Users, ShieldCheck, Zap } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        About <span className="text-amber-400">Shara Computers</span>
                    </h1>
                    <p className="text-white/60 max-w-3xl mx-auto text-lg leading-relaxed">
                        Established in Coimbatore, we are a premier destination for high-performance computing, security solutions, and enterprise IT infrastructure.
                    </p>
                </motion.div>

                {/* Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <motion.div
                        className="glass-panel rounded-3xl p-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                        <p className="text-white/70 leading-relaxed">
                            To empower businesses and individuals with cutting-edge technology that is reliable, scalable, and tailored to their specific needs. We believe in building long-term relationships through exceptional service and technical expertise.
                        </p>
                    </motion.div>

                    <motion.div
                        className="glass-panel rounded-3xl p-8"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
                        <p className="text-white/70 leading-relaxed">
                            To be the most trusted technology partner in the region, known for innovation, quality, and comprehensive support across all IT domains.
                        </p>
                    </motion.div>
                </div>

                {/* Stats / Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { icon: Users, label: "Happy Clients", value: "500+" },
                        { icon: ShieldCheck, label: "Projects Completed", value: "1000+" },
                        { icon: Award, label: "Years Experience", value: "15+" },
                        { icon: Zap, label: "Support", value: "24/7" },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="bg-linear-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-6 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                        >
                            <stat.icon className="mx-auto text-amber-400 mb-3" size={32} />
                            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-white/60">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Google Maps Embed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl h-[400px] relative"
                >
                    <iframe 
                        src="https://maps.google.com/maps?q=11.018886,76.9657543&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(80%) contrast(150%)" }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-3xl" />
                </motion.div>
            </div>
        </main>
    );
}
