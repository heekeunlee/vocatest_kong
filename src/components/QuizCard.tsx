import React from 'react';
import type { VocabularyItem } from '../types';

interface QuizCardProps {
    question: VocabularyItem;
    options: VocabularyItem[];
    onAnswer: (selectedId: number) => void;
    questionNumber: number;
    totalQuestions: number;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, options, onAnswer, questionNumber, totalQuestions }) => {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex justify-between items-end">
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Question {questionNumber} of {totalQuestions}</span>
                <div className="w-1/3 bg-slate-200 rounded-full h-2">
                    <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="glass-panel p-8 text-center mb-8">
                <span className="text-sm text-indigo-500 font-semibold mb-2 block">What is the meaning of?</span>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">{question.word}</h2>

                <div className="grid grid-cols-1 gap-3">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => onAnswer(option.id)}
                            className="p-4 text-left rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 text-slate-700 hover:text-indigo-700 font-medium text-lg group"
                        >
                            <span className="inline-block w-6 text-slate-400 group-hover:text-indigo-400 mr-2">
                                {String.fromCharCode(65 + options.indexOf(option))}.
                            </span>
                            {option.meaning}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuizCard;
