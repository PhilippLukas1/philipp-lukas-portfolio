"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Globe, Rocket } from "lucide-react";
import { useState } from "react";
import { IFrameModal } from "./IFrameModal";

import EdikteChecker from "./EdikteChecker";

const projects = [
    {
        id: 1,
        title: "Edikte Checker",
        description: "Automatisierter Abgleich von Gerichtsedikten mit Stammbaumdaten.",
        icon: <Cpu size={24} />,
        color: "from-blue-400 to-purple-600",
        url: "",
        component: <EdikteChecker />,
    },
    {
        id: 2,
        title: "iRacing AI Livery Designer",
        description: "Generative AI für individuelle Rennwagen-Designs. (In Construction)",
        icon: <Globe size={24} />,
        color: "from-green-400 to-emerald-600",
        url: "",
        isConstruction: true,
    },
    {
        id: 3,
        title: "AI Pope App",
        description: "Spirituelle KI-Begleitung. (In Construction)",
        icon: <Rocket size={24} />,
        color: "from-purple-400 to-pink-600",
        url: "",
        isConstruction: true,
    },
];

export const ProjectGrid = () => {
    const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

    return (
        <section className="py-24 px-4 max-w-7xl mx-auto">
            <h2 className="font-display text-3xl mb-12 text-center text-accent-porcelain">
                Featured Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative h-80 rounded-3xl bg-white/5 border border-white/5 overflow-hidden hover:border-accent-orange/50 transition-all duration-500"
                    >
                        {/* Background Glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-accent-porcelain mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {project.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-accent-porcelain mb-2">{project.title}</h3>
                                <p className="text-accent-porcelain/60">{project.description}</p>
                            </div>

                            <button
                                onClick={() => !project.isConstruction && setSelectedProject(project)}
                                disabled={project.isConstruction}
                                className={`flex items-center gap-2 font-bold uppercase tracking-wider text-sm group/btn transition-colors ${project.isConstruction
                                        ? "text-gray-500 cursor-not-allowed"
                                        : "text-accent-orange hover:text-white"
                                    }`}
                            >
                                {project.isConstruction ? "Coming Soon" : "Launch App"}
                                {!project.isConstruction && (
                                    <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                )}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <IFrameModal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                title={selectedProject?.title || ""}
                url={selectedProject?.url}
            >
                {selectedProject?.component}
            </IFrameModal>
        </section>
    );
};
