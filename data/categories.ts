import { LucideIcon, Monitor, Laptop, Shield, Zap, Gamepad2, Package } from "lucide-react";

export interface CategoryMeta {
    name: string;
    slug: string;
    description: string;
    icon: LucideIcon;
    image: string;
    brands: string[];
    color: string;
}

export const categories: CategoryMeta[] = [
    {
        name: "Laptops",
        slug: "laptops",
        description: "Business, creator & gaming laptops from top brands.",
        icon: Laptop,
        image: "/images/categories/laptops.jpg",
        brands: ["Dell", "HP", "Lenovo", "Asus"],
        color: "from-blue-500/20 to-blue-600/10",
    },
    {
        name: "Desktops",
        slug: "desktops",
        description: "Powerful desktops and all-in-ones for every need.",
        icon: Monitor,
        image: "/images/categories/desktops.jpg",
        brands: ["Dell", "HP", "Custom Build"],
        color: "from-purple-500/20 to-purple-600/10",
    },
    {
        name: "Gaming",
        slug: "gaming",
        description: "High-performance gaming rigs, peripherals & gear.",
        icon: Gamepad2,
        image: "/images/categories/gaming.jpg",
        brands: ["ASUS ROG", "MSI", "Custom Build", "Corsair"],
        color: "from-red-500/20 to-red-600/10",
    },
    {
        name: "CCTV",
        slug: "cctv",
        description: "Surveillance cameras and complete security kits.",
        icon: Shield,
        image: "/images/categories/cctv.jpg",
        brands: ["Hikvision", "CP Plus", "Dahua"],
        color: "from-green-500/20 to-green-600/10",
    },
    {
        name: "UPS & Inverter",
        slug: "ups-inverter",
        description: "Reliable power backup for home and office.",
        icon: Zap,
        image: "/images/categories/ups-inverter.jpg",
        brands: ["APC", "Luminous", "Microtek"],
        color: "from-yellow-500/20 to-yellow-600/10",
    },
    {
        name: "Accessories",
        slug: "accessories",
        description: "Peripherals, storage, networking and more.",
        icon: Package,
        image: "/images/categories/accessories.jpg",
        brands: ["Logitech", "Samsung", "Kingston", "Zebronics", "TP-Link"],
        color: "from-amber-500/20 to-amber-600/10",
    },
];

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
    return categories.find(c => c.slug === slug);
}

export function slugify(name: string): string {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
