"use client";

import { motion } from "framer-motion";

export const Hero = () => {
    return (
        <section className="relative min-h-[80vh] flex flex-col justify-center items-center px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="font-sans text-accent-orange tracking-widest uppercase text-sm mb-4 block">
                    Portfolio
                </span>
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                    Philipp Lukas <span className="text-accent-orange">//</span> <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-porcelain to-gray-400">
                        AI Solutions
                    </span>
                </h1>
                <p className="font-sans text-accent-porcelain/60 max-w-xl mx-auto text-lg md:text-xl">
                    Building intelligence, simplifying complexity.
                </p>
            </motion.div>
        </section>
    );
};
