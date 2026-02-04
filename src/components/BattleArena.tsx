import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flashcard } from './Flashcard';
import type { Flashcard as FlashcardType, GameState, GameMode } from '../types/game';
import { Timer, Heart, Brain } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BattleArenaProps {
    topic: string;
    mode: GameMode;
    cards: FlashcardType[];
    onEnd: (finalState: GameState) => void;
}

export const BattleArena = ({ topic, mode, cards: initialCards, onEnd }: BattleArenaProps) => {
    const [cards, setCards] = useState<FlashcardType[]>(initialCards);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [state, setState] = useState<GameState>({
        mode,
        topic,
        score: 0,
        aiScore: 0,
        accuracy: 0,
        streak: 0,
        isGameOver: false,
        timeLeft: mode === 'TimeAttack' ? 60 : 0,
        correctAnswers: 0,
        totalAnswered: 0,
        weakTopics: []
    });

    const currentCard = cards[currentIndex];

    useEffect(() => {
        let timer: number;
        if (mode === 'TimeAttack' && state.timeLeft > 0 && !state.isGameOver) {
            timer = setInterval(() => {
                setState(prev => ({
                    ...prev,
                    timeLeft: prev.timeLeft - 1,
                    isGameOver: prev.timeLeft <= 1 ? true : prev.isGameOver
                }));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [mode, state.timeLeft, state.isGameOver]);

    const handleAnswer = (correct: boolean) => {
        setState(prev => {
            const newScore = correct ? prev.score + (100 * (1 + prev.streak * 0.1)) : prev.score;
            const newAiScore = prev.aiScore + (Math.random() > 0.7 ? 100 : 0); // Simulated AI progress

            const nextState = {
                ...prev,
                score: Math.floor(newScore),
                aiScore: mode === '1vsAI' ? newAiScore : 0,
                streak: correct ? prev.streak + 1 : 0,
                correctAnswers: correct ? prev.correctAnswers + 1 : prev.correctAnswers,
                totalAnswered: prev.totalAnswered + 1,
                accuracy: Math.round(((prev.correctAnswers + (correct ? 1 : 0)) / (prev.totalAnswered + 1)) * 100),
            };

            if (mode === 'Survival' && !correct) {
                nextState.isGameOver = true;
            }

            return nextState;
        });

        if (correct) {
            confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#7c3aed', '#2dd4bf']
            });
        }

        // Move to next card (or loop back for spaced repetition simulation)
        setTimeout(() => {
            if (currentIndex < cards.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                // Simple mock of spaced repetition: reshuffle and continue if game isn't over
                if (mode !== 'TimeAttack') {
                    setCards(prev => [...prev].sort(() => Math.random() - 0.5));
                    setCurrentIndex(0);
                } else {
                    setState(prev => ({ ...prev, isGameOver: true }));
                }
            }
        }, 400);
    };

    useEffect(() => {
        if (state.isGameOver) {
            onEnd(state);
        }
    }, [state.isGameOver, state, onEnd]);

    return (
        <div className="app-container">
            <div className="battle-hud glass">
                <div className="player-score">
                    <span className="text-secondary text-sm font-bold uppercase tracking-wider">YOU</span>
                    <div className="score-value">{state.score.toLocaleString()}</div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    {mode === '1vsAI' && <div className="text-accent font-black italic">VS AI</div>}
                    {mode === 'TimeAttack' && (
                        <div className="flex items-center gap-2 text-2xl font-bold">
                            <Timer className={state.timeLeft < 10 ? 'text-accent animate-pulse' : 'text-primary'} />
                            {state.timeLeft}s
                        </div>
                    )}
                    {mode === 'Survival' && (
                        <div className="flex items-center gap-1">
                            <Heart className="text-accent fill-accent" size={24} />
                            <Heart className="text-accent fill-accent" size={24} />
                            <Heart className="text-accent fill-accent" size={24} />
                        </div>
                    )}
                </div>

                <div className="player-score text-right">
                    <span className="text-secondary text-sm font-bold uppercase tracking-wider">
                        {mode === '1vsAI' ? 'AI BATTLE-BOT' : 'STREAK'}
                    </span>
                    <div className="score-value">
                        {mode === '1vsAI' ? state.aiScore.toLocaleString() : `x${state.streak}`}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-8 px-4">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Brain className="text-primary" /> {topic}
                    </h2>
                    <p className="text-gray-400 text-sm">Card {currentIndex + 1} of {cards.length}</p>
                </div>
                <div className="flex gap-2">
                    <div className="glass px-4 py-2 rounded-full text-sm font-bold">
                        ACCURACY: <span className="text-primary">{state.accuracy}%</span>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                >
                    {currentCard && (
                        <Flashcard
                            card={currentCard}
                            onAnswer={handleAnswer}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
