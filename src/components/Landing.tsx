import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swords, Timer, Zap, Search } from 'lucide-react';
import type { GameMode } from '../types/game';

interface LandingProps {
    onStart: (topic: string, mode: GameMode) => void;
}

export const Landing = ({ onStart }: LandingProps) => {
    const [topic, setTopic] = useState('');
    const [selectedMode, setSelectedMode] = useState<GameMode>(null);

    const handleStart = () => {
        if (topic.trim() && selectedMode) {
            onStart(topic, selectedMode);
        }
    };

    return (
        <div className="app-container">
            <section className="hero-section">
                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    AI <span className="text-gradient">Flashcard Battle</span>
                </motion.h1>
                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    Level up your learning. Challenge the AI or beat the clock in the ultimate study arena.
                </motion.p>

                <motion.div
                    className="max-w-xl mx-auto mb-12 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="relative">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            className="input-field pl-16 pr-6"
                            placeholder="Enter study topic (e.g. DBMS Normalization, Python Basics...)"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                </motion.div>

                <div className="modes-grid">
                    {[
                        { id: '1vsAI' as GameMode, title: '1 vs AI', icon: <Swords />, desc: 'Go head-to-head against the AI. Fast answers earn more points.' },
                        { id: 'TimeAttack' as GameMode, title: 'Time Attack', icon: <Timer />, desc: 'Answer as many as you can in 60 seconds. Speed is life.' },
                        { id: 'Survival' as GameMode, title: 'Survival', icon: <Zap />, desc: "One mistake and it's over. How long can you last?" }
                    ].map((mode) => (
                        <motion.div
                            key={mode.id}
                            className={`glass-card mode-card cursor-pointer border-2 ${selectedMode === mode.id ? 'border-purple-500 bg-purple-500/10' : 'border-transparent'}`}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedMode(mode.id)}
                        >
                            <div className="mode-icon">{mode.icon}</div>
                            <h3>{mode.title}</h3>
                            <p>{mode.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <button
                        className="btn btn-primary px-12 py-4 text-lg"
                        disabled={!topic || !selectedMode}
                        onClick={handleStart}
                    >
                        Enter Arena
                    </button>
                </motion.div>
            </section>
        </div>
    );
};
