import { useState } from 'react';
import { Landing } from './components/Landing';
import { BattleArena } from './components/BattleArena';
import { Results } from './components/Results';
import type { GameMode, GameState, Flashcard } from './types/game';
import { generateCardsForTopic } from './lib/ai-engine';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

type Screen = 'landing' | 'loading' | 'battle' | 'results';

function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [topic, setTopic] = useState('');
  const [mode, setMode] = useState<GameMode>(null);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [finalState, setFinalState] = useState<GameState | null>(null);

  const handleStartGame = async (selectedTopic: string, selectedMode: GameMode) => {
    setTopic(selectedTopic);
    setMode(selectedMode);
    setScreen('loading');

    try {
      const generatedCards = await generateCardsForTopic(selectedTopic);
      setCards(generatedCards);
      setScreen('battle');
    } catch (error) {
      console.error('Failed to generate cards', error);
      setScreen('landing');
    }
  };

  const handleGameEnd = (state: GameState) => {
    setFinalState(state);
    setScreen('results');
  };

  const resetGame = () => {
    setScreen('battle');
    // In a real app, we might want to re-fetch/reshuffle
  };

  const startFresh = () => {
    setScreen('landing');
    setTopic('');
    setMode(null);
    setCards([]);
    setFinalState(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Landing onStart={handleStartGame} />
          </motion.div>
        )}

        {screen === 'loading' && (
          <motion.div
            key="loading"
            className="flex flex-col items-center justify-center min-h-screen gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-24 h-24">
              <motion.div
                className="absolute inset-0 border-4 border-primary/20 rounded-full"
              />
              <motion.div
                className="absolute inset-0 border-4 border-t-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Generating Arena...</h2>
              <p className="text-gray-400">AI is curating questions for <span className="text-primary">{topic}</span></p>
            </div>
          </motion.div>
        )}

        {screen === 'battle' && (
          <motion.div
            key="battle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BattleArena
              topic={topic}
              mode={mode!}
              cards={cards}
              onEnd={handleGameEnd}
            />
          </motion.div>
        )}

        {screen === 'results' && finalState && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Results
              state={finalState}
              onRestart={resetGame}
              onNewTopic={startFresh}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-8 text-center text-xs text-gray-600">
        AI FLASHCARD BATTLE &copy; 2024 • BUILT BY ANTIGRAVITY
      </footer>
    </div>
  );
}

export default App;
