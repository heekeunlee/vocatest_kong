import React, { useState, useEffect } from 'react';
import { RefreshCw, Home, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { vocabularyList } from '../data/vocabulary';
import QuizCard from '../components/QuizCard';
import type { VocabularyItem } from '../types';

const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState<VocabularyItem[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [options, setOptions] = useState<VocabularyItem[]>([]);

    useEffect(() => {
        startQuiz();
    }, []);

    const startQuiz = () => {
        // Shuffle questions
        const shuffled = [...vocabularyList].sort(() => 0.5 - Math.random());
        setQuestions(shuffled);
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResult(false);
        generateOptions(shuffled[0], vocabularyList);
    };

    const generateOptions = (correct: VocabularyItem, all: VocabularyItem[]) => {
        // Get 3 random distinct incorrect options
        const incorrect = all.filter(item => item.id !== correct.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
        const opts = [...incorrect, correct].sort(() => 0.5 - Math.random());
        setOptions(opts);
    };

    const handleAnswer = (selectedId: number) => {
        if (selectedId === questions[currentQuestionIndex].id) {
            setScore(score + 1);
        }

        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
            generateOptions(questions[nextIndex], vocabularyList);
        } else {
            setShowResult(true);
        }
    };

    if (questions.length === 0) return <div>Loading...</div>;

    if (showResult) {
        const percentage = Math.round((score / questions.length) * 100);

        return (
            <div className="max-w-xl mx-auto text-center pt-8">
                <div className="glass-panel p-10">
                    <div className="mb-6 flex justify-center">
                        {percentage >= 70 ? (
                            <CheckCircle className="w-20 h-20 text-emerald-500" />
                        ) : (
                            <XCircle className="w-20 h-20 text-amber-500" />
                        )}
                    </div>

                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Quiz Completed!</h2>
                    <p className="text-slate-600 mb-8">You scored</p>

                    <div className="text-6xl font-extrabold text-indigo-600 mb-2">{percentage}%</div>
                    <p className="text-slate-500 mb-8">{score} out of {questions.length} correct</p>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={startQuiz}
                            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Try Again
                        </button>
                        <Link
                            to="/"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                        >
                            <Home className="w-5 h-5" />
                            Go Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <QuizCard
            question={questions[currentQuestionIndex]}
            options={options}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
        />
    );
};

export default Quiz;
