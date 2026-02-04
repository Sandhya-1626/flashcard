import type { Flashcard } from '../types/game';

const TOPIC_TEMPLATES: Record<string, Flashcard[]> = {
    'python variables': [
        {
            id: '1',
            question: 'What is the correct way to declare a variable in Python?',
            answer: 'name = "Value"',
            explanation: "Python uses dynamic typing, so you don't need to specify the data type. Just use the assignment operator (=).",
            difficulty: 1
        },
        {
            id: '2',
            question: 'Which of these is an invalid variable name in Python?',
            answer: '2nd_name',
            explanation: "Variable names cannot start with a digit. They must start with a letter or an underscore.",
            difficulty: 1
        },
        {
            id: '3',
            question: 'How do you create a constant in Python?',
            answer: 'Use UPPER_CASE names by convention.',
            explanation: "Python doesn't have true constants. By convention, developers use all-caps to indicate a value shouldn't change.",
            difficulty: 2
        }
    ],
    'biology - cell structure': [
        {
            id: 'c1',
            question: 'Which organelle is known as the "Powerhouse of the cell"?',
            answer: 'Mitochondria',
            explanation: "Mitochondria generate most of the cell's supply of ATP, used as a source of chemical energy.",
            difficulty: 1
        },
        {
            id: 'c2',
            question: 'Which organelle contains the genetic material?',
            answer: 'Nucleus',
            explanation: "The nucleus acts as the control center, containing DNA which carries hereditary information.",
            difficulty: 1
        }
    ]
};

export const generateCardsForTopic = async (topic: string): Promise<Flashcard[]> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const normalizedTopic = topic.toLowerCase();

    // Try to find a match or partial match
    for (const [key, cards] of Object.entries(TOPIC_TEMPLATES)) {
        if (normalizedTopic.includes(key) || key.includes(normalizedTopic)) {
            return cards;
        }
    }

    // Fallback / Dynamic simulation
    return [
        {
            id: 'f1',
            question: `Define the core concept of ${topic}.`,
            answer: `This is a fundamental aspect of ${topic} that involves basic principles.`,
            explanation: `In ${topic}, this concept is crucial for understanding more advanced topics.`,
            difficulty: 1
        },
        {
            id: 'f2',
            question: `What are the primary components of ${topic}?`,
            answer: `The main components vary depending on the specific context of ${topic}.`,
            explanation: `Understanding the breakdown of ${topic} helps in categorizing its various functions.`,
            difficulty: 2
        },
        {
            id: 'f3',
            question: `Give a real-world example of ${topic} in action.`,
            answer: `One common example is its application in modern industries or daily life.`,
            explanation: `Seeing ${topic} applied practically makes it easier to retain the information.`,
            difficulty: 2
        }
    ];
};
