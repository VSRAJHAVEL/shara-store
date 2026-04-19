"use client";

import { usePathname } from "next/navigation";
import ScrollVideoBackground from "@/components/ScrollVideoBackground";

export default function GlobalBackground() {
    const pathname = usePathname();
    const isProducts = pathname?.startsWith("/products");
    const isQuote = pathname?.startsWith("/quote");

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {isQuote ? (
                <>
                    <img src="/frames/ezgif-frame-001.jpg" alt="Background" className="w-full h-full object-cover opacity-90 filter blur-sm transition-all duration-1000" />
                </>
            ) : isProducts ? (
                <ScrollVideoBackground
                    key="products-bg"
                    frameCount={192}
                    framePath={(i: number) => `/products-frames/${i.toString().padStart(5, "0")}.jpg`}
                    frameStep={2}
                    objectFit="cover"
                    opacity={0.8}
                />
            ) : (
                <ScrollVideoBackground
                    key="global-bg"
                    frameCount={147}
                    framePath={(i: number) => `/frames/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`}
                    frameStep={2}
                />
            )}
            
            {/* Mobile Contrast Guard - Dims the heavy animations aggressively on small screens to preserve reading contrast */}
            <div className="absolute inset-0 bg-black/40 md:bg-black/0 pointer-events-none transition-colors duration-500 z-10" />
        </div>
    );
}
