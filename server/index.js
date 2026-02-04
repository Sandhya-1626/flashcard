const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock AI Flashcard Generation Logic
// In a production app, this would call an LLM API (like OpenAI or Gemini)
const generateFlashcards = (topic) => {
    const normalizedTopic = topic.toLowerCase();

    // High-quality templates for common topics
    const templates = {
        'python': [
            { question: 'What is a PEP 8?', answer: 'Python Enhancement Proposal 8', explanation: 'It is the style guide for Python code, providing conventions for writing clean and readable code.' },
            { question: 'Difference between List and Tuple?', answer: 'Lists are mutable, Tuples are immutable.', explanation: 'Use lists for collections that need to change, and tuples for fixed data structures.' }
        ],
        'javascript': [
            { question: 'What is a Closure?', answer: 'A function with its lexical environment.', explanation: 'Closures allow a function to access variables from an enclosing scope even after it has closed.' },
            { question: 'What is the Event Loop?', answer: 'A mechanism that handles async callbacks.', explanation: 'It allows JS to perform non-blocking I/O operations despite being single-threaded.' }
        ]
    };

    // Find matching template or generate generic ones
    let results = templates[normalizedTopic] || [];

    if (results.length === 0) {
        // Generate dynamic "AI" cards for any topic
        results = [
            {
                question: `Explaint the primary objective of ${topic}.`,
                answer: `The core goal of ${topic} is to solve specific problems in its field.`,
                explanation: `${topic} is fundamental to understanding the broader context of the subject.`
            },
            {
                question: `What are the top 3 challenges in ${topic}?`,
                answer: `Complexity, Scalability, and Implementation costs.`,
                explanation: `Overcoming these requires deep knowledge of ${topic} principles.`
            },
            {
                question: `How does ${topic} impact modern industry?`,
                answer: `It automates workflows and increases efficiency.`,
                explanation: `Most modern sectors rely on the advances made in ${topic} to stay competitive.`
            }
        ];
    }

    return results.map((card, index) => ({
        id: `card-${index}-${Date.now()}`,
        ...card,
        difficulty: Math.floor(Math.random() * 3) + 1
    }));
};

app.post('/api/generate', (req, res) => {
    const { topic } = req.body;

    if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
    }

    console.log(`Generating cards for: ${topic}`);

    // Simulate AI delay
    setTimeout(() => {
        const cards = generateFlashcards(topic);
        res.json({ cards });
    }, 1500);
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'Battle Arena Backend is Online' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
