"use client";

import { motion } from "framer-motion";

export const Mission = () => {
    return (
        <section className="py-24 px-4 bg-black/20 backdrop-blur-sm border-y border-white/5">
            <div className="max-w-4xl mx-auto text-center">
                <motion.p
                    className="font-display text-2xl md:text-3xl lg:text-4xl text-accent-porcelain leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    &quot;Innovative KI-Projekte, die Komplexität in Einfachheit verwandeln.&quot;
                </motion.p>
            </div>
        </section>
    );
};
