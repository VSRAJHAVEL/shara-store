"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Server, Shield, Monitor, Cpu, Wrench, Globe,
    CheckCircle2, Phone, ArrowRight, Clock, Users, Award, Headphones,
    Zap, Star
} from "lucide-react";

const services = [
    {
        icon: Monitor,
        title: "Corporate IT Solutions",
        color: "from-blue-500/20 to-blue-600/10",
        accent: "blue",
        description: "End-to-end IT infrastructure setup, AMC services, and networking for offices of all sizes.",
        features: [
            "Annual Maintenance Contracts (AMC)",
            "Network Infrastructure Design",
            "Server Setup & Management",
            "Remote & On-site Support",
        ],
    },
    {
        icon: Cpu,
        title: "Custom PC Builds",
        color: "from-red-500/20 to-red-600/10",
        accent: "amber",
        description: "High-performance workstations for gaming, editing, rendering, and any demanding workflow.",
        features: [
            "Gaming & Streaming Rigs",
            "3D Rendering Workstations",
            "Video Editing Stations",
            "Overclocking & Liquid Cooling",
        ],
    },
    {
        icon: Shield,
        title: "CCTV & Security",
        color: "from-green-500/20 to-green-600/10",
        accent: "green",
        description: "Advanced surveillance systems with remote monitoring, biometrics and mobile access.",
        features: [
            "IP & HD Analog Cameras",
            "Biometric Access Control",
            "Video Door Phones",
            "Remote Monitoring Setup",
        ],
    },
    {
        icon: Server,
        title: "Networking & Servers",
        color: "from-purple-500/20 to-purple-600/10",
        accent: "purple",
        description: "Robust server configurations, firewall setup, VPN, and structured cabling for enterprises.",
        features: [
            "Firewall & VPN Security",
            "Structured Cabling",
            "NAS & Storage Solutions",
            "Wi-Fi Implementation",
        ],
    },
    {
        icon: Wrench,
        title: "Repairs & Upgrades",
        color: "from-orange-500/20 to-orange-600/10",
        accent: "orange",
        description: "Expert chip-level service for laptops, desktops, SSD upgrades and professional data recovery.",
        features: [
            "Laptop Chip-level Repair",
            "Data Recovery Services",
            "Hardware Upgrades (SSD/RAM)",
            "OS Troubleshooting",
        ],
    },
    {
        icon: Globe,
        title: "Software Licensing",
        color: "from-teal-500/20 to-teal-600/10",
        accent: "teal",
        description: "Authorized implementation and support for OS, antivirus, and productivity suites.",
        features: [
            "Microsoft Windows & Office",
            "Antivirus Solutions",
            "Accounting Software",
            "Design Software Licenses",
        ],
    },
];

const stats = [
    { icon: Users, value: "500+", label: "Clients Served" },
    { icon: Award, value: "10+", label: "Years Experience" },
    { icon: Clock, value: "24/7", label: "Support Available" },
    { icon: Headphones, value: "98%", label: "Satisfaction Rate" },
];

const process = [
    { step: "01", title: "Consultation", description: "We assess your requirements through a free consultation call or site visit." },
    { step: "02", title: "Proposal", description: "You receive a detailed scope, timeline, and transparent pricing breakdown." },
    { step: "03", title: "Execution", description: "Our certified engineers implement the solution with minimal disruption." },
    { step: "04", title: "Support", description: "Post-delivery support with AMC options and 24/7 remote assistance." },
];

const accentClass: Record<string, string> = {
    blue: "border-blue-400/40 group-hover:border-blue-400/70 shadow-blue-500/10",
    amber: "border-amber-400/40 group-hover:border-amber-400/70 shadow-amber-500/10",
    green: "border-green-400/40 group-hover:border-green-400/70 shadow-green-500/10",
    purple: "border-purple-400/40 group-hover:border-purple-400/70 shadow-purple-500/10",
    orange: "border-orange-400/40 group-hover:border-orange-400/70 shadow-orange-500/10",
    teal: "border-teal-400/40 group-hover:border-teal-400/70 shadow-teal-500/10",
};

const iconBgClass: Record<string, string> = {
    blue: "bg-blue-500/10 group-hover:bg-blue-500/20",
    amber: "bg-amber-500/10 group-hover:bg-amber-500/20",
    green: "bg-green-500/10 group-hover:bg-green-500/20",
    purple: "bg-purple-500/10 group-hover:bg-purple-500/20",
    orange: "bg-orange-500/10 group-hover:bg-orange-500/20",
    teal: "bg-teal-500/10 group-hover:bg-teal-500/20",
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen pb-20">

            {/* ── HERO ─────────────────────────────────────────────────── */}
            <section className="relative pt-36 pb-24 px-4 md:px-8 text-center overflow-hidden">
                {/* Decorative rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[600px] h-[600px] rounded-full border border-amber-500/[0.06] absolute" />
                    <div className="w-[900px] h-[900px] rounded-full border border-amber-500/[0.04] absolute" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-sm font-semibold mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Zap size={14} /> Technology you can trust
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300">Services</span>
                    </motion.h1>

                    <motion.p
                        className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        From custom gaming builds to enterprise IT infrastructure, CCTV, and power backup — everything your business and home needs under one roof.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link href="/contact">
                            <motion.button
                                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-bold text-base shadow-lg shadow-amber-500/30"
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Get a Free Quote
                            </motion.button>
                        </Link>
                        <Link href="tel:+919876543210">
                            <motion.button
                                className="flex items-center gap-2 px-8 py-4 border border-white/20 text-white rounded-full font-bold text-base backdrop-blur-sm hover:border-amber-400/50 transition-colors"
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Phone size={16} /> Call Us Now
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ── STATS ────────────────────────────────────────────────── */}
            <section className="px-4 md:px-8 mb-20">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            className="glass-panel rounded-2xl p-6 flex flex-col items-center text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-3">
                                <s.icon size={22} className="text-amber-400" />
                            </div>
                            <span className="text-3xl font-black text-white mb-1">{s.value}</span>
                            <span className="text-white/50 text-xs">{s.label}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── SERVICE CARDS ─────────────────────────────────────────── */}
            <section className="px-4 md:px-8 mb-24">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-amber-400 font-bold text-sm tracking-widest uppercase">What We Do</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">
                            Complete <span className="text-amber-400">Technology</span> Solutions
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                className={`group glass-panel rounded-2xl p-8 flex flex-col border hover:shadow-xl transition-all duration-300 ${accentClass[service.accent]}`}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, type: "spring", bounce: 0.3 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                            >
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${iconBgClass[service.accent]}`}>
                                    <service.icon size={28} className="text-amber-400" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-white/55 text-sm leading-relaxed mb-6">
                                    {service.description}
                                </p>

                                <ul className="space-y-2.5 mb-8 flex-grow">
                                    {service.features.map((feat, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-white/75">
                                            <CheckCircle2 size={15} className="text-amber-400 mt-0.5 shrink-0" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/contact"
                                    className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 bg-white/5 text-white font-semibold text-sm hover:bg-amber-500 hover:border-amber-500 transition-all duration-300 group/btn"
                                >
                                    Enquire Now
                                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW WE WORK ───────────────────────────────────────────── */}
            <section className="px-4 md:px-8 mb-24">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="text-center mb-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-amber-400 font-bold text-sm tracking-widest uppercase">Our Process</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                            How We <span className="text-amber-400">Work</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
                        {/* Connector line (desktop only) */}
                        <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

                        {process.map((step, i) => (
                            <motion.div
                                key={step.step}
                                className="glass-panel rounded-2xl p-6 text-center relative"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12 }}
                            >
                                <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-4 relative z-10">
                                    <span className="text-amber-400 font-black text-lg">{step.step}</span>
                                </div>
                                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-white/50 text-xs leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIAL STRIP ─────────────────────────────────────── */}
            <section className="px-4 md:px-8 mb-24">
                <div className="max-w-5xl mx-auto">
                    <div className="glass-panel rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-amber-400 fill-amber-400" />)}
                            </div>
                            <blockquote className="text-white text-lg md:text-xl font-medium leading-relaxed mb-4">
                                &ldquo;Shara Computers has been our IT partner for over 5 years. The AMC service is flawless — quick response, skilled engineers and honest pricing. Highly recommend!&rdquo;
                            </blockquote>
                            <p className="text-amber-400 font-semibold">Rajesh Sharma</p>
                            <p className="text-white/40 text-sm">MD, Sharma Textiles Pvt. Ltd.</p>
                        </div>
                        <div className="shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center text-4xl font-black text-amber-400">
                            R
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA BANNER ───────────────────────────────────────────── */}
            <section className="px-4 md:px-8">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="glass-panel rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Background glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-yellow-400/10 to-amber-500/5 pointer-events-none" />

                        <div className="relative z-10">
                            <span className="text-amber-400 font-bold text-sm tracking-widest uppercase block mb-3">Ready to get started?</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                                Let&apos;s Build Your <span className="text-amber-400">IT Infrastructure</span>
                            </h2>
                            <p className="text-white/55 max-w-xl mx-auto mb-8">
                                Contact us today for a free consultation. Our engineers will assess your needs and provide a customized solution.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/contact">
                                    <motion.button
                                        className="px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-bold text-base shadow-xl shadow-amber-500/30"
                                        whileHover={{ scale: 1.06, y: -4 }}
                                        whileTap={{ scale: 0.96 }}
                                    >
                                        Request a Free Quote
                                    </motion.button>
                                </Link>
                                <Link href="/products">
                                    <motion.button
                                        className="flex items-center gap-2 px-10 py-4 border border-white/20 text-white rounded-full font-bold text-base hover:border-amber-400/50 transition-colors"
                                        whileHover={{ scale: 1.06, y: -4 }}
                                        whileTap={{ scale: 0.96 }}
                                    >
                                        Browse Products <ArrowRight size={16} />
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
