"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const positions = [
    {
        role: "Supervisor of Sample Management",
        company: "Takeda Pharmaceutical",
        period: "May 2022 - Present",
        description: "Leading 10+ FTEs. Driving digitization, standardization, and long-term strategy (5a Plan). Responsible for QMS optimization and leading in audits (FDA, PDMA).",
    },
    {
        role: "Certified Agile Champion",
        company: "Takeda Pharmaceutical",
        period: "May 2020 - May 2022",
        description: "Led global digital transformation projects. Implemented data lake-driven dashboards and shift handover software. Digitized board management and batch records.",
    },
    {
        role: "CAPA & Change Owner",
        company: "Takeda Pharmaceutical",
        period: "Jul 2019 - May 2020",
        description: "Managed deviations and change control activities ensuring product quality and regulatory compliance. Focused on sustainable avoidence of recurrence.",
    },
    {
        role: "Co-Founder",
        company: "Kern Tec GmbH",
        period: "Oct 2017 - Mar 2018",
        description: "Winner of Future Founders Challenge 2018. Entrepreneurship in action.",
    },
    {
        role: "MSc Biotechnology",
        company: "BOKU Vienna",
        period: "Graduated May 2019",
        description: "Specialized in GMP-related qualification and validated filtration systems.",
    },
];

export const Resume = () => {
    return (
        <section className="py-24 px-4 max-w-4xl mx-auto">
            <h2 className="font-display text-3xl mb-12 text-center text-accent-porcelain">
                Experience
            </h2>
            <div className="space-y-6">
                {positions.map((pos, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-orange/30 transition-colors group"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-accent-porcelain group-hover:text-accent-orange transition-colors">
                                {pos.role}
                            </h3>
                            <div className="flex items-center gap-2 text-accent-porcelain/60 text-sm">
                                <Briefcase size={14} />
                                <span>{pos.company}</span>
                                <span className="mx-2">•</span>
                                <Calendar size={14} />
                                <span>{pos.period}</span>
                            </div>
                        </div>
                        <p className="text-accent-porcelain/80 font-sans">{pos.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
