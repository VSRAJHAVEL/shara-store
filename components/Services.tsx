"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServicesProps {
    limit?: number;
}

export default function Services({ limit }: ServicesProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const decorRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

    const allServices = [
        {
            title: "Corporate IT Solutions & AMC",
            description: "Annual Maintenance Contracts ensuring your office IT infrastructure never stops.",
            features: ["Scheduled Preventive Maintenance", "On-Site Technical Support", "Priority Service", "Networking & WiFi Management"],
        },
        {
            title: "CCTV & Security Solutions",
            description: "Professional surveillance system deployment for homes and enterprises.",
            features: ["Site Survey & Planning", "Remote Monitoring Setup", "Maintenance & AMC", "Biometric Access Control"],
        },
        {
            title: "Custom PC Builds",
            description: "High-performance workstations for editing, rendering, and gaming enthusiasts.",
            features: ["Component Selection Consultation", "Professional Assembly", "Liquid Cooling Solutions", "Stress Testing & Overclocking"],
        },
        {
            title: "Bulk & Corporate Sales",
            description: "Institutional hardware supply with GST billing and complete setup.",
            features: ["Bulk Laptop Orders", "Office Desktop Deployment", "Software Licensing", "Educational Lab Setup"],
        }
    ];

    const displayedServices = limit ? allServices.slice(0, limit) : allServices;

    return (
        <section ref={sectionRef} className="relative">
            {/* Parallax decorative elements */}
            <motion.div
                className="absolute top-20 right-[-5%] w-40 h-40 border border-amber-500/20 rounded-3xl pointer-events-none"
                style={{ y: bgY, rotate: decorRotate }}
            />
            <motion.div
                className="absolute bottom-20 left-[-3%] w-28 h-28 border border-amber-500/15 rounded-full pointer-events-none"
                style={{ y: bgY, rotate: decorRotate }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedServices.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ y: -5 }}
                        className="group glass-panel rounded-2xl p-8 hover:glass-panel-hover transition-all duration-300 relative overflow-hidden flex flex-col h-full"
                    >
                        {/* Large visible number */}
                        <div className="text-6xl font-black text-amber-500/10 mb-4 leading-none select-none absolute top-4 right-4 group-hover:text-amber-500/20 transition-colors">
                            0{index + 1}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors pr-12 relative z-10">{service.title}</h3>
                        <p className="text-white/70 mb-6 text-sm leading-relaxed relative z-10 flex-grow">{service.description}</p>

                        <ul className="space-y-2 mb-6 relative z-10">
                            {service.features.slice(0, 2).map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-white/50 text-xs">
                                    <div className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                            {(service.features.length > 2) && <li className="text-white/30 text-xs italic">...and more</li>}
                        </ul>

                        <div className="relative z-10 mt-auto pt-4 border-t border-white/5">
                            <Link href="/services" className="flex items-center gap-2 text-amber-400 font-bold text-sm hover:gap-3 transition-all">
                                Learn More <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Gold shimmer sweep */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -skew-x-12 scale-150 pointer-events-none" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
