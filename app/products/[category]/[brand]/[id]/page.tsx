"use client";

import { use, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowLeft, ShoppingCart, Star, CheckCircle2,
    Tag, Cpu, Package, Phone
} from "lucide-react";
import { products } from "@/data/products";
import { getCategoryBySlug, slugify } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import Toast, { ToastRef } from "@/components/ui/Toast";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ category: string; brand: string; id: string }>;
}

const badgeBg: Record<string, string> = {
    blue: "bg-blue-500", green: "bg-green-500", red: "bg-red-500",
    purple: "bg-purple-500", amber: "bg-amber-500", gray: "bg-gray-600",
};

// ── Smart spec label detector ─────────────────────────────────────────────
function getSpecLabel(spec: string, index: number, category: string): string {
    // Pattern-based detection (works across all categories)
    if (/\bcore\b.*i\d|\bryzen\b|\bceleron|\bpentium|\bxeon|\bi\d-\d/i.test(spec)) return "Processor";
    if (/rtx\s*\d|gtx\s*\d|radeon rx|\barcA/i.test(spec)) return "GPU";
    if (/\d+gb\s*(ddr|ram|lpddr)/i.test(spec) || (/\d+gb\b/i.test(spec) && !/ssd|nvme|nand|hdd|emmc|ufs/i.test(spec) && !/\d+gb\s*\+/i.test(spec) && index <= 2)) return "RAM";
    if (/\d+gb\s*(ssd|nvme|emmc|ufs)|nvme|m\.2|\d+tb(\s|$)|\d+gb\s*ssd/i.test(spec)) return "Storage";
    if (/\d+['"″]\s*(fhd|hd|qhd|uhd|4k|ips|oled|amoled)|fhd|qhd|oled|amoled|retina|\d+hz.*display|display|screen|\d{2}\.\d"|\d"\s*fhd/i.test(spec)) return "Display";
    if (/\d+va\b/i.test(spec)) return "Capacity";
    if (/\d+\s*w\b(?!.*fi|.*ifi)/i.test(spec)) return "Power Output";
    if (/hr.*backup|backup.*hr|\d+\s*hr\b/i.test(spec)) return "Backup Time";
    if (/\d+mp\b/i.test(spec)) return "Resolution";
    if (/\d+\s*ch\b/i.test(spec)) return "Channels";
    if (/\bnvr\b|\bdvr\b/i.test(spec)) return "Recorder";
    if (/night\s*vision|ir\s*\d/i.test(spec)) return "Night Vision";
    if (/wifi|wi-fi|bluetooth|wireless|2\.4g|5ghz/i.test(spec)) return "Connectivity";
    if (/\d+\s*dpi\b/i.test(spec)) return "DPI";
    if (/usb-?c|type-?c|thunderbolt/i.test(spec)) return "Interface";
    if (/\d+mhz|ddr\d-\d+/i.test(spec)) return "Memory Speed";
    if (/\d+\s*mb\/s|\d+\s*gbps|\d+\s*mb read/i.test(spec)) return "Read Speed";
    if (/rgba?|rgb|backlit|led|rms\b|\d+w.*audio/i.test(spec)) return "Lighting / Audio";
    if (/ip\d{2}/i.test(spec)) return "Weather Rating";
    if (/poe/i.test(spec)) return "Power";
    if (/pcie|pci express/i.test(spec)) return "Interface";
    if (/xmp|expo|ecc/i.test(spec)) return "Profile";
    if (/dual\s*band|tri\s*band|ax\d{3,}|ac\d{3,}/i.test(spec)) return "Wi-Fi Standard";
    if (/antenna/i.test(spec)) return "Antennas";
    if (/oled\s*smart|smart.*key|smartkey/i.test(spec)) return "Smart Feature";
    if (/cherry|gateron|optical|switch/i.test(spec)) return "Switch Type";
    if (/\d+\s*tb\b|\d+\s*gb\b/i.test(spec)) return "Capacity";

    // Category-specific fallback labels
    const catLabels: Record<string, string[]> = {
        "Laptops": ["Processor", "RAM", "Storage", "Display"],
        "Desktops": ["Processor", "RAM", "Storage", "Feature"],
        "Gaming": ["Processor", "GPU", "RAM", "Storage"],
        "CCTV": ["Resolution", "Channels", "Storage", "Feature"],
        "UPS & Inverter": ["Capacity", "Power Output", "Backup Time", "Feature"],
        "Accessories": ["Feature", "Performance", "Connectivity", "Interface"],
    };
    const labels = catLabels[category] ?? [];
    return labels[index] ?? `Detail ${index + 1}`;
}

export default function ProductDetailPage({ params }: Props) {
    const { category: categorySlug, brand: brandSlug, id } = use(params);
    const toastRef = useRef<ToastRef>(null);
    const { addToCart } = useCart();

    // ── Fix: use category.name for matching, not slugify(p.category) ──────
    const category = getCategoryBySlug(categorySlug);
    if (!category) return notFound();

    const product = products.find(
        (p) =>
            String(p.id) === id &&
            p.category === category.name &&          // match by name, not by re-slugifying
            slugify(p.brand) === brandSlug
    );
    if (!product) return notFound();

    const specParts = product.specs.split("•").map((s) => s.trim()).filter(Boolean);

    const related = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <main className="min-h-screen pt-28 pb-24 px-4 md:px-8">
            <Toast ref={toastRef} />
            <div className="max-w-6xl mx-auto">

                {/* ── Breadcrumb ── */}
                <motion.nav
                    className="flex items-center gap-2 text-sm text-white/40 mb-10 flex-wrap"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                >
                    <Link href="/products" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                        <ArrowLeft size={13} /> Categories
                    </Link>
                    <span>/</span>
                    <Link href={`/products/${categorySlug}`} className="hover:text-amber-400 transition-colors">{category.name}</Link>
                    <span>/</span>
                    <Link href={`/products/${categorySlug}/${brandSlug}`} className="hover:text-amber-400 transition-colors">{product.brand}</Link>
                    <span>/</span>
                    <span className="text-white/80 truncate max-w-[200px]">{product.name}</span>
                </motion.nav>

                {/* ── Main grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

                    {/* Product visual */}
                    <motion.div
                        className="glass-panel rounded-3xl flex items-center justify-center min-h-[450px] relative overflow-hidden group"
                        initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", bounce: 0.3 }}
                    >
                        <div className="absolute inset-0 bg-[#050505] z-0" />
                        
                        <img 
                            src={`/images/products/${product.id}.jpg`} 
                            alt={product.name}
                            className="w-full h-full object-contain p-6 md:p-12 md:mix-blend-lighten opacity-95 group-hover:scale-105 transition-transform duration-700 z-0"
                            onError={(e) => {
                                const t = e.target as HTMLImageElement;
                                if (t.src.endsWith('.jpg')) t.src = `/images/products/${product.id}.png`;
                                else if (t.src.endsWith('.png')) t.src = `/images/products/${product.id}.jpeg`;
                                else if (t.src.endsWith('.jpeg')) t.src = `/images/products/${product.id}.webp`;
                                else { t.style.display = 'none'; t.nextElementSibling?.classList.remove('hidden'); }
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 hidden flex flex-col items-center justify-center z-0">
                            <span className="text-8xl font-black text-white/5">{product.name[0]}</span>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent z-10 pointer-events-none" />
                        
                        {product.badge && (
                            <span className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-white shadow-xl backdrop-blur-md z-20 ${badgeBg[product.badgeColor] ?? "bg-gray-600"} bg-opacity-90 border border-white/20`}>
                                {product.badge}
                            </span>
                        )}

                        {/* Detail Page Floating Brand Logo */}
                        <div className="absolute bottom-6 right-6 w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center bg-black/60 backdrop-blur-xl overflow-hidden p-2 shadow-2xl z-20">
                            <img src={`/images/brands/${brandSlug}.svg`} alt={product.brand} className="w-full h-full object-contain filter drop-shadow-lg" onError={(e) => {
                                const t = e.target as HTMLImageElement;
                                if (t.src.endsWith('.svg')) t.src = `/images/brands/${brandSlug}.png`;
                                else if (t.src.endsWith('.png')) t.src = `/images/brands/${brandSlug}.jpg`;
                                else t.style.display = 'none';
                            }} />
                        </div>
                    </motion.div>

                    {/* Details */}
                    <motion.div
                        className="flex flex-col gap-4"
                        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", bounce: 0.3, delay: 0.1 }}
                    >
                        <div className="flex items-center gap-2">
                            <Tag size={13} className="text-amber-400" />
                            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">{product.category}</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{product.name}</h1>

                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={15} className="text-amber-400 fill-amber-400" />)}
                            <span className="text-white/40 text-sm ml-2">5.0 (verified)</span>
                        </div>

                        {product.description && (
                            <p className="text-white/65 leading-relaxed text-base border-l-2 border-amber-500/40 pl-4">
                                {product.description}
                            </p>
                        )}

                        <div className="glass-panel rounded-2xl p-5 flex items-center justify-between">
                            <div>
                                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Price</p>
                                <span className="text-4xl font-black text-white">{product.price}</span>
                            </div>
                            <span className="text-xs text-white/40 italic">Incl. GST</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <motion.button
                                onClick={() => { addToCart(product); toastRef.current?.show(`${product.name} added to Quote`, "success"); }}
                                whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.96 }}
                                className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl font-bold shadow-lg shadow-amber-500/30"
                            >
                                <ShoppingCart size={18} /> Add to Quote
                            </motion.button>
                            <Link href="/contact" className="flex-1">
                                <motion.button
                                    whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.96 }}
                                    className="w-full flex items-center justify-center gap-2 py-4 border border-white/20 text-white rounded-2xl font-bold hover:border-amber-400/50 transition-colors"
                                >
                                    <Phone size={16} /> Enquire
                                </motion.button>
                            </Link>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {["Free Delivery", "1-Year Warranty", "Expert Support", "GST Invoice"].map((t) => (
                                <div key={t} className="flex items-center gap-1.5 text-xs text-white/50">
                                    <CheckCircle2 size={12} className="text-amber-400" />{t}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ── Specifications ── */}
                <motion.section
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Cpu size={20} className="text-amber-400" />
                        <h2 className="text-2xl font-bold text-white">Specifications</h2>
                    </div>
                    <div className="glass-panel rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
                        {specParts.map((spec, i) => (
                            <div
                                key={i}
                                className={`flex items-center justify-between gap-6 px-6 py-4 ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}
                            >
                                <span className="text-amber-400/80 text-sm font-semibold min-w-[130px]">
                                    {getSpecLabel(spec, i, product.category)}
                                </span>
                                <span className="text-white text-sm font-medium text-right">{spec}</span>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* ── Related products ── */}
                {related.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Package size={20} className="text-amber-400" />
                            <h2 className="text-2xl font-bold text-white">Related Products</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {related.map((p, i) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                                    whileHover={{ y: -5, scale: 1.03 }}
                                >
                                    <Link
                                        href={`/products/${categorySlug}/${slugify(p.brand)}/${p.id}`}
                                        className="glass-panel group block rounded-2xl p-5 hover:glass-panel-hover transition-all"
                                    >
                                        <div className="w-full h-32 rounded-xl bg-[#0a0a0a] border border-white/10 mb-4 overflow-hidden relative">
                                            <img 
                                                src={`/images/products/${p.id}.jpg`} 
                                                alt={p.name}
                                                className="w-full h-full object-cover md:mix-blend-lighten opacity-80 group-hover:opacity-100 transition-opacity"
                                                onError={(e) => {
                                                    const t = e.target as HTMLImageElement;
                                                    if (t.src.endsWith('.jpg')) t.src = `/images/products/${p.id}.png`;
                                                    else if (t.src.endsWith('.png')) t.src = `/images/products/${p.id}.jpeg`;
                                                    else if (t.src.endsWith('.jpeg')) t.src = `/images/products/${p.id}.webp`;
                                                    else { t.style.display = 'none'; t.nextElementSibling?.classList.remove('hidden'); }
                                                }}
                                            />
                                            <div className="absolute inset-0 hidden flex items-center justify-center">
                                                <span className="text-3xl font-black text-white/10">{p.name[0]}</span>
                                            </div>
                                        </div>
                                        <h4 className="text-sm font-bold text-white mb-1 group-hover:text-amber-400 transition-colors line-clamp-2">{p.name}</h4>
                                        <p className="text-amber-400 font-black text-base">{p.price}</p>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

            </div>
        </main>
    );
}
