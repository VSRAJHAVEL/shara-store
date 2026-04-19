"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hidden, setHidden] = useState(false);
    const [clicking, setClicking] = useState(false);
    const [linkHover, setLinkHover] = useState(false);

    useEffect(() => {
        const addEventListeners = () => {
            document.addEventListener("mousemove", mMove);
            document.addEventListener("mouseenter", mEnter);
            document.addEventListener("mouseleave", mLeave);
            document.addEventListener("mousedown", mDown);
            document.addEventListener("mouseup", mUp);
        };

        const removeEventListeners = () => {
            document.removeEventListener("mousemove", mMove);
            document.removeEventListener("mouseenter", mEnter);
            document.removeEventListener("mouseleave", mLeave);
            document.removeEventListener("mousedown", mDown);
            document.removeEventListener("mouseup", mUp);
        };

        const mMove = (el: MouseEvent) => {
            setPosition({ x: el.clientX, y: el.clientY });

            // Check if hovering over clickable element
            const target = el.target as HTMLElement;
            const isClickable = target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("clickable");
            setLinkHover(!!isClickable);
        };

        const mEnter = () => setHidden(false);
        const mLeave = () => setHidden(true);
        const mDown = () => setClicking(true);
        const mUp = () => setClicking(false);

        addEventListeners();
        return () => removeEventListeners();
    }, []);

    return (
        <div className="pointer-events-none fixed z-[9999] inset-0 overflow-hidden">
            <motion.div
                className="fixed top-0 left-0 bg-amber-500 rounded-full"
                animate={{
                    x: position.x - (linkHover ? 24 : 8),
                    y: position.y - (linkHover ? 24 : 8),
                    width: linkHover ? 48 : 16,
                    height: linkHover ? 48 : 16,
                    opacity: hidden ? 0 : (linkHover ? 0.3 : 0.6),
                    scale: clicking ? 0.8 : 1
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
            />
            <motion.div
                className="fixed top-0 left-0 border-2 border-amber-500 rounded-full"
                animate={{
                    x: position.x - 20,
                    y: position.y - 20,
                    width: 40,
                    height: 40,
                    opacity: hidden || linkHover ? 0 : 0.4,
                }}
                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 20,
                    mass: 0.8
                }}
            />
        </div>
    );
}
