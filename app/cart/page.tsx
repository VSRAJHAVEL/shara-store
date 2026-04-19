"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, MessageCircle, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    const handleCheckout = () => {
        // Format message for WhatsApp
        let message = "*New Quote Request from Website*\n\n";
        message += "*Items:*\n";
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} x${item.quantity} - ${item.specs}\n`;
        });
        message += `\n*Estimated Total:* ₹${cartTotal.toLocaleString()}\n\n`;
        message += "I would like to place an order/get a formal quote for these items.";

        const url = `https://wa.me/919842271166?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <main className="min-h-screen pt-28 pb-20 px-4 md:px-8 bg-black">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
                    <ShoppingBag className="text-amber-400" size={32} />
                    Your <span className="text-amber-400">Quote Cart</span>
                </h1>

                {cart.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl"
                    >
                        <ShoppingBag size={64} className="mx-auto text-white/20 mb-6" />
                        <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
                        <p className="text-white/60 mb-8 max-w-md mx-auto">
                            Looks like you haven't added any products to your quote request yet.
                        </p>
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-bold shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-105"
                        >
                            Browse Products <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items List */}
                        <div className="flex-1 space-y-4">
                            <AnimatePresence mode="popLayout">
                                {cart.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex flex-col sm:flex-row items-center gap-6 bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition-colors"
                                    >
                                        {/* Image/Icon Placeholder */}
                                        <div className="w-20 h-20 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                                            <span className="text-3xl font-black text-white/20">
                                                {item.initial || item.name[0]}
                                            </span>
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                                            <p className="text-sm text-white/60">{item.specs}</p>
                                            <p className="text-amber-400 font-bold mt-2">{item.price}</p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-4 bg-black/20 rounded-full px-4 py-2 border border-white/5">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-white font-bold w-6 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-3 text-white/40 hover:text-red-400 transition-colors"
                                            title="Remove Item"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Summary / Checkout Sidebar */}
                        <div className="lg:w-96 flex-shrink-0">
                            <div className="sticky top-32 bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-white mb-6">Quote Summary</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-white/70">
                                        <span>Total Items</span>
                                        <span className="text-white font-medium">{cart.reduce((a, b) => a + b.quantity, 0)}</span>
                                    </div>
                                    <div className="h-px bg-white/10 my-4" />
                                    <div className="flex justify-between items-end">
                                        <span className="text-white">Estimated Total</span>
                                        <span className="text-2xl font-bold text-amber-400">
                                            ₹{cartTotal.toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-white/40 mt-2">
                                        *Final pricing may vary based on customization and bulk orders.
                                    </p>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-600/20 hover:shadow-green-600/30 transition-all flex items-center justify-center gap-2 group"
                                >
                                    <MessageCircle size={20} />
                                    Request Quote on WhatsApp
                                </button>

                                <button
                                    onClick={clearCart}
                                    className="w-full mt-4 py-3 text-white/40 hover:text-white text-sm font-medium transition-colors"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
