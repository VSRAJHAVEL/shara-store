"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileText } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Services", href: "/services" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
            <div className="max-w-7xl mx-auto">
                <div
                    className={`flex items-center justify-between rounded-full px-8 py-4 transition-all duration-500 ${scrolled
                        ? "bg-white/[0.1] backdrop-blur-md border border-white/[0.1] shadow-lg"
                        : "bg-transparent backdrop-blur-sm border border-white/[0.05]"
                        }`}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                            <span className="text-white font-black text-sm">S</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            Shara
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium transition-colors hover:text-amber-400 text-white"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/quote" className="relative p-2 text-white hover:text-amber-400 transition-colors" title="View Quote">
                            <FileText size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <Link
                            href="/quote"
                            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-semibold text-sm shadow-lg shadow-amber-500/20 hover:shadow-xl hover:scale-105 transition-all"
                        >
                            Get Quote
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <div className="flex flex-col gap-1.5">
                            <span className={`block w-6 h-0.5 transition-all bg-white ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`block w-6 h-0.5 transition-all bg-white ${menuOpen ? "opacity-0" : ""}`} />
                            <span className={`block w-6 h-0.5 transition-all bg-white ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                        </div>
                    </button>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 bg-white/[0.08] backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/[0.15] p-6 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <div key={link.name} className="border-b border-white/10 last:border-0">
                                <Link
                                    href={link.href}
                                    className="block py-3 text-white font-medium hover:text-amber-400 transition-colors"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </div>
                        ))}
                        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                            <Link
                                href="/quote"
                                className="flex items-center gap-2 text-white font-medium hover:text-amber-400"
                                onClick={() => setMenuOpen(false)}
                            >
                                <FileText size={20} />
                                <span>Quote Request ({cartCount})</span>
                            </Link>
                        </div>
                        <Link
                            href="/quote"
                            className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-semibold shadow-lg block text-center"
                            onClick={() => setMenuOpen(false)}
                        >
                            Get Quote
                        </Link>
                    </motion.div>
                )}
            </div>
        </nav>
    );
}
