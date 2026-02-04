import { motion } from 'framer-motion';
import type { GameState } from '../types/game';
import { Trophy, ArrowLeft, RotateCcw, Target, Zap, AlertTriangle } from 'lucide-react';

interface ResultsProps {
    state: GameState;
    onRestart: () => void;
    onNewTopic: () => void;
}

export const Results = ({ state, onRestart, onNewTopic }: ResultsProps) => {
    const isWinner = state.score >= state.aiScore;

    return (
        <div className="app-container flex flex-col items-center justify-center py-12">
            <motion.div
                className="glass-card max-w-2xl w-full p-12 text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <div className="mb-8 flex justify-center">
                    <motion.div
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center text-primary"
                    >
                        <Trophy size={48} />
                    </motion.div>
                </div>

                <h1 className="text-4xl font-bold mb-2">
                    {state.mode === '1vsAI' ? (isWinner ? 'Victory!' : 'Defeat!') : 'Session Complete!'}
                </h1>
                <p className="text-gray-400 mb-8">Summary for {state.topic}</p>

                <div className="grid grid-cols-2 gap-4 mb-12">
                    <div className="glass p-6 rounded-2xl">
                        <div className="text-sm text-gray-400 flex items-center justify-center gap-2 mb-1">
                            <Zap size={16} className="text-primary" /> FINAL SCORE
                        </div>
                        <div className="text-3xl font-bold">{state.score}</div>
                    </div>
                    <div className="glass p-6 rounded-2xl">
                        <div className="text-sm text-gray-400 flex items-center justify-center gap-2 mb-1">
                            <Target size={16} className="text-secondary" /> ACCURACY
                        </div>
                        <div className="text-3xl font-bold">{state.accuracy}%</div>
                    </div>
                </div>

                <div className="text-left mb-12">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-accent" /> Insights
                    </h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-sm text-gray-200">
                                {state.accuracy > 80
                                    ? "Outstanding! You've mastered most of the concepts in this topic."
                                    : "Good effort! Try focusing on the detailed explanations to bridge the knowledge gap."}
                            </p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-xs text-gray-400 uppercase font-black mb-2">Suggested Revision</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30">Core Concepts</span>
                                <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full border border-secondary/30">Edge Cases</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="btn btn-primary flex-1 py-4" onClick={onRestart}>
                        <RotateCcw size={18} /> Rematch
                    </button>
                    <button className="btn btn-secondary flex-1 py-4" onClick={onNewTopic}>
                        <ArrowLeft size={18} /> New Topic
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
