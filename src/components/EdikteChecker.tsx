'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Match {
    ediktName: string;
    stammbaumName: string;
    similarity: number;
}

interface ApiResponse {
    count: number;
    matches: Match[];
    error?: string;
}

export default function EdikteChecker() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const checkEdikte = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/edikte');
            if (!res.ok) throw new Error('Netzwerk-Antwort war nicht ok.');

            const json: ApiResponse = await res.json();
            if (json.error) {
                setError(json.error);
            } else {
                setData(json);
            }
        } catch (err: any) {
            setError(err.message || 'Ein unbekannter Fehler ist aufgetreten.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                        Edikte Checker
                    </h2>
                    <p className="text-gray-300 mt-3 text-base leading-relaxed max-w-2xl">
                        Dieses Tool automatisiert die Suche nach unbekannten Erben in Österreich. Es überwacht täglich die amtliche Ediktsdatei der Justiz auf unbeanspruchte Verlassenschaften und gleicht diese mit lokalen Stammbaumdaten ab, um potenzielle Erbansprüche frühzeitig zu identifizieren.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30">Python Backend</span>
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30">BeautifulSoup Scraper</span>
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30">Vercel Serverless</span>
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30">Fuzzy Logic Matching</span>
                    </div>
                </div>

                <button
                    onClick={checkEdikte}
                    disabled={loading}
                    className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Prüfe...
                        </span>
                    ) : (
                        'Jetzt Prüfen'
                    )}
                </button>
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-lg mb-4"
                    >
                        <strong>Fehler:</strong> {error}
                    </motion.div>
                )}

                {data && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {data.matches.length > 0 ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-green-400 font-medium mb-4">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    {data.count} Übereinstimmungen gefunden
                                </div>
                                <div className="grid gap-3">
                                    {data.matches.map((match, idx) => (
                                        <div key={idx} className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="text-lg font-semibold text-white">{match.ediktName}</div>
                                                    <div className="text-sm text-gray-400 mt-1">
                                                        &approx; {match.stammbaumName}
                                                    </div>
                                                </div>
                                                <div className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded">
                                                    {Math.round(match.similarity * 100)}% Match
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-400 text-center py-8 bg-white/5 rounded-lg border border-dashed border-gray-600">
                                Keine Übereinstimmungen gefunden. (Aktuell keine relevanten Edikte oder keine Matches im Stammbaum)
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
