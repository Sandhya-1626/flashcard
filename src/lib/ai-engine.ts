import type { Flashcard } from '../types/game';

const API_BASE_URL = 'http://localhost:5000/api';

export const generateCardsForTopic = async (topic: string): Promise<Flashcard[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic }),
        });

        if (!response.ok) {
            throw new Error('Failed to connect to AI server');
        }

        const data = await response.json();
        return data.cards;
    } catch (error) {
        console.error('API Error:', error);
        // Fallback to local generation if backend is down
        return [
            {
                id: 'fallback-1',
                question: `[OFFLINE MODE] Define ${topic}`,
                answer: 'Please ensure the backend server is running.',
                explanation: 'The application is currently running in fallback mode because the backend server (port 5000) could not be reached.',
                difficulty: 1
            }
        ];
    }
};
