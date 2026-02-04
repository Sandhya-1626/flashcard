import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Flashcard as FlashcardType } from '../types/game';
import { HelpCircle } from 'lucide-react';

interface FlashcardProps {
    card: FlashcardType;
    onAnswer: (correct: boolean) => void;
    disabled?: boolean;
}

export const Flashcard = ({ card, onAnswer, disabled }: FlashcardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    const handleFlip = () => {
        if (disabled && isFlipped) return;
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="card-container">
            <motion.div
                className={`card-inner ${isFlipped ? 'flipped' : ''}`}
                onClick={handleFlip}
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
            >
                {/* Front */}
                <div className="card-front">
                    <div className="card-difficulty">
                        {'★'.repeat(card.difficulty)}{'☆'.repeat(3 - card.difficulty)}
                    </div>
                    <h2 className="text-xl font-bold mb-4">{card.question}</h2>
                    <p className="text-sm text-gray-400 mt-auto">Click to reveal answer</p>
                </div>

                {/* Back */}
                <div className="card-back">
                    <h3 className="text-lg font-semibold mb-2">Answer</h3>
                    <p className="text-xl mb-6">{card.answer}</p>

                    <div className="flex gap-4 mt-auto w-full">
                        <button
                            className="btn btn-primary flex-1 bg-red-500 hover:bg-red-600 shadow-red-900/20"
                            onClick={(e) => { e.stopPropagation(); onAnswer(false); }}
                            disabled={disabled}
                        >
                            Wrong
                        </button>
                        <button
                            className="btn btn-primary flex-1 bg-green-500 hover:bg-green-600 shadow-green-900/20"
                            onClick={(e) => { e.stopPropagation(); onAnswer(true); }}
                            disabled={disabled}
                        >
                            Correct
                        </button>
                    </div>

                    <button
                        className="mt-4 text-sm text-gray-400 flex items-center gap-1 hover:text-white transition-colors"
                        onClick={(e) => { e.stopPropagation(); setShowExplanation(!showExplanation); }}
                    >
                        <HelpCircle size={16} /> {showExplanation ? 'Hide' : 'Show'} explanation
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {showExplanation && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-6 p-4 glass rounded-xl border-blue-500/30 text-sm"
                    >
                        <p className="text-blue-200">{card.explanation}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
