"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const TOTAL_FRAMES = 147;
function getFrameSrc(index: number): string {
    const num = String(index).padStart(3, "0");
    return `/frames/ezgif-frame-${num}.jpg`;
}

export default function ScrollVideo() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef(0);
    const rafRef = useRef<number>(0);
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    // Preload all images
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFrameSrc(i);
            img.onload = () => {
                loadedCount++;
                setProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
                if (loadedCount === TOTAL_FRAMES) {
                    imagesRef.current = images;
                    setLoaded(true);
                    drawFrame(0);
                }
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === TOTAL_FRAMES) {
                    imagesRef.current = images;
                    setLoaded(true);
                    drawFrame(0);
                }
            };
            images.push(img);
        }

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const img = imagesRef.current[frameIndex];
        if (!img || !img.complete) return;

        const imgW = img.naturalWidth;
        const imgH = img.naturalHeight;

        // Set canvas to window size for crisp full-screen rendering
        const dpr = window.devicePixelRatio || 1;
        const dispW = window.innerWidth;
        const dispH = window.innerHeight;

        if (canvas.width !== dispW * dpr || canvas.height !== dispH * dpr) {
            canvas.width = dispW * dpr;
            canvas.height = dispH * dpr;
            canvas.style.width = dispW + "px";
            canvas.style.height = dispH + "px";
            ctx.scale(dpr, dpr);
        }

        ctx.clearRect(0, 0, dispW, dispH);

        // Full size cover-fit — no cropping
        const imgAspect = imgW / imgH;
        const canAspect = dispW / dispH;

        let drawW: number, drawH: number;
        if (canAspect > imgAspect) {
            drawW = dispW;
            drawH = dispW / imgAspect;
        } else {
            drawH = dispH;
            drawW = dispH * imgAspect;
        }

        const drawX = (dispW - drawW) / 2;
        const drawY = (dispH - drawH) / 2;

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }, []);

    // Handle scroll
    useEffect(() => {
        if (!loaded) return;

        const handleScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollTop = window.scrollY;
                const scrollFraction = Math.min(scrollTop / scrollHeight, 1);
                const frameIndex = Math.min(
                    Math.floor(scrollFraction * (TOTAL_FRAMES - 1)),
                    TOTAL_FRAMES - 1
                );

                if (frameIndex !== currentFrameRef.current) {
                    currentFrameRef.current = frameIndex;
                    drawFrame(frameIndex);
                }
            });
        };

        drawFrame(0);

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [loaded, drawFrame]);

    // Handle resize — recalculate canvas dimensions
    useEffect(() => {
        const handleResize = () => {
            if (!loaded) return;
            const canvas = canvasRef.current;
            if (canvas) {
                // Reset canvas so drawFrame recalculates dimensions
                canvas.width = 0;
                canvas.height = 0;
            }
            drawFrame(currentFrameRef.current);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [loaded, drawFrame]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 w-full h-full z-0"
            style={{ pointerEvents: "none" }}
        >
            {/* Loading indicator */}
            {!loaded && (
                <div className="absolute inset-0 bg-gray-950 flex flex-col items-center justify-center z-50">
                    <div className="mb-4">
                        <div className="w-16 h-16 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin" />
                    </div>
                    <div className="text-amber-400 font-bold text-lg mb-2">Loading Experience</div>
                    <div className="w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-200"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="text-amber-500/60 text-sm mt-2 font-medium">{progress}%</div>
                </div>
            )}

            {/* Canvas — full clarity, high contrast */}
            <canvas
                ref={canvasRef}
                style={{
                    filter: "brightness(0.9) contrast(1.1) saturate(1.15)",
                }}
            />

            {/* Bottom-right corner cover — hides watermark completely */}
            <div
                className="absolute bottom-0 right-0 z-10 w-48 h-24"
                style={{
                    background: "linear-gradient(135deg, transparent 0%, transparent 30%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.85) 100%)",
                }}
            />
            <div className="absolute bottom-3 right-4 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30 shadow-lg">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow">
                    <span className="text-white font-black text-xs">S</span>
                </div>
                <span className="text-white text-sm font-bold tracking-wide">Shara Computers</span>
            </div>
        </div>
    );
}
