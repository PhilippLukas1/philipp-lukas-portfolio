"use client";

import { motion } from "framer-motion";

export const Background = () => {
    return (
        <div className="absolute inset-0 overflow-hidden -z-10 bg-background">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-accent-orange)_0%,_transparent_60%)] opacity-[0.03] blur-3xl scale-150" />

            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-accent-porcelain opacity-10 blur-xl"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        x: [
                            Math.random() * 100 + "%",
                            Math.random() * 100 + "%",
                            Math.random() * 100 + "%",
                        ],
                        y: [
                            Math.random() * 100 + "%",
                            Math.random() * 100 + "%",
                            Math.random() * 100 + "%",
                        ],
                    }}
                    transition={{
                        duration: Math.random() * 20 + 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: Math.random() * 300 + 100 + "px",
                        height: Math.random() * 300 + 100 + "px",
                    }}
                />
            ))}
        </div>
    );
};
