"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer id="contact" className="relative text-white px-6 py-6">
            <div className="glass-panel rounded-2xl">
                {/* Gold gradient top border */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent rounded-t-2xl" />
                <div className="container mx-auto px-6 py-16 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        {/* Brand */}
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                                    <span className="text-white font-black text-sm">S</span>
                                </div>
                                <span className="text-2xl font-black text-white">Shara</span>
                            </div>
                            <p className="text-base font-medium text-white leading-relaxed mb-6">
                                Your trusted technology partner for laptops, gaming PCs, CCTV, networking, and IT services.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-bold mb-4 text-lg uppercase tracking-wider">Products</h3>
                            <ul className="space-y-3">
                                {[
                                    { label: "Laptops", href: "/products/laptops" },
                                    { label: "Gaming PCs", href: "/products/gaming" },
                                    { label: "CCTV Systems", href: "/products/cctv" },
                                    { label: "Networking", href: "/products/accessories" },
                                    { label: "UPS & Power", href: "/products/ups-inverter" },
                                    { label: "Accessories", href: "/products/accessories" },
                                ].map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.href} className="text-base font-semibold text-white hover:text-amber-400 transition-colors">{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-white font-bold mb-4 text-lg uppercase tracking-wider">Services</h3>
                            <ul className="space-y-3">
                                {["Corporate AMC", "Custom PC Builds", "CCTV Installation", "IT Infrastructure", "Repairs & Upgrades", "Software Licensing"].map((item) => (
                                    <li key={item}>
                                        <Link href="/services" className="text-base font-semibold text-white hover:text-amber-400 transition-colors">{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-white font-bold mb-4 text-lg uppercase tracking-wider">Contact</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <MapPin size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                                    <a href="https://maps.app.goo.gl/KVWBNNJMbpLph6abA" target="_blank" rel="noopener noreferrer" className="text-base font-semibold hover:text-amber-400 transition-colors">103, 8th St, Gandhipuram, Coimbatore</a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone size={16} className="text-amber-400 flex-shrink-0" />
                                    <a href="tel:+919842271166" className="text-base font-semibold hover:text-amber-400 transition-colors">+91 98422 71166</a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail size={16} className="text-amber-400 flex-shrink-0" />
                                    <a href="mailto:sharacomputers18@gmail.com" className="text-base font-semibold hover:text-amber-400 transition-colors">sharacomputers18@gmail.com</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-base font-medium text-white">
                            © 2025 Shara Computers. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-base font-semibold text-white hover:text-amber-400 transition-colors">Privacy</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-base font-semibold text-white hover:text-amber-400 transition-colors">Terms</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-base font-semibold text-white hover:text-amber-400 transition-colors">Sitemap</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
