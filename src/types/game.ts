export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  explanation: string;
  difficulty: number;
}

export type GameMode = '1vsAI' | 'TimeAttack' | 'Survival' | null;

export interface GameState {
  mode: GameMode;
  topic: string;
  score: number;
  aiScore: number;
  accuracy: number;
  streak: number;
  isGameOver: boolean;
  timeLeft: number;
  correctAnswers: number;
  totalAnswered: number;
  weakTopics: string[];
}
