"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, X, Info } from "lucide-react";
import { useState, useEffect, useImperativeHandle, forwardRef } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastRef {
    show: (message: string, type: ToastType) => void;
}

const Toast = forwardRef<ToastRef>((props, ref) => {
    const [toasts, setToasts] = useState<{ id: number; message: string; type: ToastType }[]>([]);
    let toastId = 0;

    useImperativeHandle(ref, () => ({
        show: (message, type) => {
            const id = Date.now();
            setToasts((prev) => [...prev, { id, message, type }]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 3000);
        },
    }));

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const getIcon = (type: ToastType) => {
        switch (type) {
            case "success": return <CheckCircle size={20} className="text-emerald-400" />;
            case "error": return <AlertCircle size={20} className="text-red-400" />;
            default: return <Info size={20} className="text-blue-400" />;
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-2">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        layout
                        className="flex items-center gap-3 px-4 py-3 bg-gray-900/90 border border-amber-500/20 backdrop-blur-md rounded-xl shadow-2xl min-w-[300px]"
                    >
                        {getIcon(toast.type)}
                        <p className="text-sm font-medium text-white flex-1">{toast.message}</p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-white/40 hover:text-white transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
});

Toast.displayName = "Toast";

export default Toast;
