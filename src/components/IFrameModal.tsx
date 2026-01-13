"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface IFrameModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    url?: string;
    title: string;
}

export const IFrameModal = ({ isOpen, onClose, url, title, children }: IFrameModalProps) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-md z-50"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-4 md:inset-10 z-[51] bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-background/50 flex-shrink-0">
                            <h3 className="font-display font-bold text-accent-porcelain">{title}</h3>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full text-accent-porcelain/60 hover:text-accent-porcelain transition-colors"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 relative bg-background overflow-auto">
                            {children ? (
                                <div className="p-4 md:p-8 text-accent-porcelain min-h-full">
                                    {children}
                                </div>
                            ) : (
                                <>
                                    {!url ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-background text-accent-porcelain/40 flex-col gap-4">
                                            <span className="font-display text-4xl font-bold opacity-20 uppercase tracking-widest">Coming Soon</span>
                                            <p className="text-sm">Interactive demo not yet linked.</p>
                                        </div>
                                    ) : (
                                        <>
                                            {isLoading && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
                                                    <Loader2 className="animate-spin text-accent-orange" size={32} />
                                                </div>
                                            )}
                                            <iframe
                                                src={url}
                                                className={cn("w-full h-full border-0", isLoading ? "opacity-0" : "opacity-100")}
                                                onLoad={() => setIsLoading(false)}
                                                title={title}
                                            />
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
