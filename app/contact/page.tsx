"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

import { useState, useRef } from "react";
import Toast, { ToastRef } from "@/components/ui/Toast";

export default function ContactPage() {
    const toastRef = useRef<ToastRef>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));

        toastRef.current?.show("Message sent successfully! We'll get back to you soon.", "success");
        setIsSubmitting(false);
        (e.target as HTMLFormElement).reset();
    };

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 md:px-8">
            <Toast ref={toastRef} />
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Get in <span className="text-amber-400">Touch</span>
                    </h1>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        Have a project in mind or need technical support? We're here to help.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="text-amber-400" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold mb-1">Visit Us</h3>
                                        <p className="text-white/60">R.R. BUILDING, 103, 8th St<br />Gandhipuram, Coimbatore, TN 641012</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="text-amber-400" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold mb-1">Call Us</h3>
                                        <p className="text-white/60">+91 98422 71166</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-amber-400" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold mb-1">Email Us</h3>
                                        <p className="text-white/60">sharacomputers18@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Business Hours</h2>
                            <div className="space-y-3 text-white/60">
                                <p className="flex justify-between"><span>Monday - Saturday</span> <span>9:30 AM - 8:00 PM</span></p>
                                <p className="flex justify-between"><span>Sunday</span> <span>Closed</span></p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Inquiry Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-fit"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input required type="text" placeholder="Name" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50" />
                                <input required type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50" />
                            </div>
                            <input required type="text" placeholder="Subject" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50" />
                            <textarea required rows={4} placeholder="Your Message" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400/50"></textarea>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} /> Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Google Maps Embed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl h-[400px] relative"
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
