"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";

interface ScrollVideoBackgroundProps {
    frameCount: number;
    framePath: (index: number) => string;
    frameStep?: number;
    objectFit?: "cover" | "contain";
    opacity?: number;
}

export default function ScrollVideoBackground({
    frameCount,
    framePath,
    frameStep = 5,
    objectFit = "cover",
    opacity = 0.6,
}: ScrollVideoBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const framesRef = useRef<Map<number, HTMLImageElement>>(new Map());
    const sortedKeysRef = useRef<number[]>([]);
    const lastDrawnRef = useRef<number>(-1);
    const [showLoader, setShowLoader] = useState(true);

    const { scrollYProgress } = useScroll();
    
    // We removed useSpring here because modern trackpads natively supply hardware-accelerated 
    // smooth momentum scrolling. Wrapping native momentum in mathematical spring physics 
    // causes a delayed, trailing effect that users perceive as "lag". 
    // 1:1 mapping feels much more responsive.
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

    // Build list of frame indices to load
    const frameList = useRef<number[]>([]);
    if (frameList.current.length === 0) {
        const list: number[] = [1];
        for (let i = 1 + frameStep; i <= frameCount; i += frameStep) {
            list.push(i);
        }
        if (list[list.length - 1] !== frameCount) list.push(frameCount);
        frameList.current = list;
    }

    // Draw a specific image to canvas
    const drawImage = useCallback((img: HTMLImageElement) => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if (!canvas || !ctx || !img.naturalWidth) return;
        const { width: cw, height: ch } = canvas;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        
        // Scale appropriately for high DPI canvas
        const dpr = window.devicePixelRatio || 1;
        const logicalW = cw / dpr;
        const logicalH = ch / dpr;

        // Apply DPI scaling
        const isMobile = logicalW < 768;
        const effectiveFit = (isMobile && objectFit === "cover") ? "contain" : objectFit;

        // Choose scale math based on objectFit
        const scale = effectiveFit === "contain" 
            ? Math.min(logicalW / iw, logicalH / ih)
            : Math.max(logicalW / iw, logicalH / ih);
            
        const dx = (logicalW - iw * scale) / 2;
        const dy = (logicalH - ih * scale) / 2;

        // Reset transform before clear
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, cw, ch);
        
        // Apply DPI scaling
        ctx.scale(dpr, dpr);
        ctx.drawImage(img, 0, 0, iw, ih, dx, dy, iw * scale, ih * scale);
    }, []);

    // Find and draw the nearest loaded frame
    const drawNearest = useCallback((target: number) => {
        const keys = sortedKeysRef.current;
        if (keys.length === 0) return;

        // Binary search for nearest
        let lo = 0, hi = keys.length - 1;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (keys[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        // Check neighbors
        let bestIdx = keys[lo];
        if (lo > 0 && Math.abs(keys[lo - 1] - target) < Math.abs(keys[lo] - target)) {
            bestIdx = keys[lo - 1];
        }

        if (bestIdx === lastDrawnRef.current) return; // skip redraw
        lastDrawnRef.current = bestIdx;

        const img = framesRef.current.get(bestIdx);
        if (img) drawImage(img);
    }, [drawImage]);

    // Setup canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        ctxRef.current = canvas.getContext("2d", { alpha: false });

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            lastDrawnRef.current = -1; // force redraw
            drawNearest(frameIndex.get());
        };
        window.addEventListener("resize", resize);
        resize();
        return () => window.removeEventListener("resize", resize);
    }, [drawNearest]);

    // Scroll handler — batch drawing to the browser's native paint cycle
    const rafRef = useRef<number>(null);
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            drawNearest(latest);
        }) as any;
    });

    // Load frames ONE AT A TIME sequentially — no server flooding
    useEffect(() => {
        let cancelled = false;
        const list = frameList.current;

        const loadFrame = (idx: number): Promise<boolean> =>
            new Promise((resolve) => {
                const img = new Image();
                img.src = framePath(idx);
                img.onload = () => {
                    if (!cancelled) {
                        framesRef.current.set(idx, img);
                        sortedKeysRef.current = [...framesRef.current.keys()].sort((a, b) => a - b);
                    }
                    resolve(true);
                };
                img.onerror = () => resolve(false);
            });

        const run = async () => {
            // Load FIRST frame immediately — page shows after this
            await loadFrame(list[0]);
            if (cancelled) return;
            drawNearest(1);
            setShowLoader(false);

            // Wait a beat so the page finishes rendering first
            await new Promise((r) => setTimeout(r, 800));

            // Load remaining frames one by one — zero server pressure
            for (let i = 1; i < list.length; i++) {
                if (cancelled) break;
                await loadFrame(list[i]);
                // Tiny pause between each to keep the server happy
                await new Promise((r) => setTimeout(r, 50));
            }
        };

        run();
        return () => { cancelled = true; };
    }, [framePath, drawNearest]);

    return (
        <>
            <div className="fixed inset-0 -z-10 bg-black">
                <canvas ref={canvasRef} className="w-full h-full" style={{ opacity }} />
            </div>

            <AnimatePresence>
                {showLoader && (
                    <motion.div
                        key="loader"
                        className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-black"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px]" />
                        </div>
                        <motion.div
                            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-8 shadow-lg shadow-amber-500/30"
                            animate={{ scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span className="text-white font-black text-3xl">S</span>
                        </motion.div>
                        <motion.p className="text-white text-2xl font-black tracking-widest mb-1"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            SHARA
                        </motion.p>
                        <motion.p className="text-amber-400/60 text-xs tracking-[0.3em] uppercase mb-12"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                            Computers
                        </motion.p>
                        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
