"use client";

import { motion } from "framer-motion";

export const Mission = () => {
    return (
        <section className="py-24 px-4 bg-black/20 backdrop-blur-sm border-y border-white/5">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    className="font-display text-3xl md:text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    &quot;Die Grenzen des Machbaren verschieben und sich dabei stetig weiterentwickeln.&quot;
                </motion.h2>

                <div className="space-y-12 text-gray-300 leading-relaxed font-light">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Mein Name ist Philipp Lukas. Diese Seite ist das Ergebnis meiner Leidenschaft für die Möglichkeiten, die uns moderne künstliche Intelligenz heute bietet. Als Sponsor dieses Projekts geht es mir nicht um Selbstdarstellung, sondern um den Beweis, dass man mit Eigeninitiative und den richtigen Werkzeugen komplexe Ideen in funktionale Realität verwandeln kann.
                    </motion.p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Lernbereitschaft", text: "Jedes Projekt auf dieser Seite, wie der 'Edikte Checker', ist ein Schritt auf einer ständigen Lernreise." },
                            { title: "Praxisbezug", text: "Ich schätze Lösungen, die einen echten Zweck erfüllen – egal wie klein die Nische auch sein mag." },
                            { title: "Transparenz", text: "Die Umsetzung mit Antigravity, Next.js und GitHub zeigt meinen Weg, Technologie effizient und verantwortungsbewusst einzusetzen." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="bg-white/5 p-6 rounded-lg border border-white/10"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                            >
                                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                                <p className="text-sm opacity-80">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        className="text-center italic opacity-80"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        Ich lade Sie ein, meine Projekte auszuprobieren. Sie sind Zeugnisse meiner täglichen Arbeit, die Welt der Daten durch KI ein Stück weit zugänglicher und verständlicher zu machen.
                    </motion.p>
                </div>
            </div>
        </section>
    );
};
