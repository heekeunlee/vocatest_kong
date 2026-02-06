import React, { useEffect, useRef } from 'react';
import type { VocabularyItem } from '../types';
import { Volume2, ArrowRight } from 'lucide-react';

interface QuizCardProps {
    question: VocabularyItem;
    options: VocabularyItem[];
    onAnswer: (selectedId: number) => void;
    onNext: () => void;
    onSentencePlay: () => void;
    questionNumber: number;
    totalQuestions: number;
    showFeedback: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({
    question,
    options,
    onAnswer,
    onNext,
    onSentencePlay,
    questionNumber,
    totalQuestions,
    showFeedback
}) => {
    const feedbackRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to sentence when feedback appears
    useEffect(() => {
        if (showFeedback && feedbackRef.current) {
            setTimeout(() => {
                feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }, [showFeedback]);

    const handleSpeak = (text: string, isSentence = false) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);

        if (isSentence) {
            onSentencePlay(); // Trigger coin reward
        }
    };

    return (
        <div className="max-w-2xl mx-auto pb-4">
            <div className="mb-6 flex justify-between items-end">
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Question {questionNumber} of {totalQuestions}</span>
                <div className="w-1/3 bg-slate-200 rounded-full h-2">
                    <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="glass-panel p-6 md:p-8 text-center mb-4 relative transition-all duration-300">
                <span className="text-sm text-indigo-500 font-semibold mb-2 block">What is the meaning of?</span>

                <div className="flex items-center justify-center gap-3 mb-6">
                    <h2 className="text-4xl font-bold text-slate-900">{question.word}</h2>
                    <button
                        onClick={() => handleSpeak(question.word)}
                        className="p-2 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
                        title="Listen"
                    >
                        <Volume2 className="w-6 h-6" />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-3 mb-6">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => !showFeedback && onAnswer(option.id)}
                            disabled={showFeedback}
                            className={`
                                p-4 text-left rounded-xl border transition-all duration-200 font-medium text-lg leading-snug group
                                ${showFeedback
                                    ? option.id === question.id
                                        ? 'bg-emerald-100 border-emerald-500 text-emerald-800 shadow-[0_4px_0_rgba(16,185,129,0.2)] transform -translate-y-1'
                                        : 'bg-slate-50 border-slate-200 text-slate-400 opacity-70'
                                    : 'bg-white border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 active:scale-[0.98]'
                                }
                            `}
                        >
                            <span className={`inline-block w-6 mr-2 font-mono ${showFeedback ? 'text-inherit' : 'text-slate-400 group-hover:text-indigo-400'}`}>
                                {String.fromCharCode(65 + options.indexOf(option))}.
                            </span>
                            {option.meaning}
                        </button>
                    ))}
                </div>

                {/* Example Sentence Feedback Area */}
                <div
                    ref={feedbackRef}
                    className={`transition-all duration-500 overflow-hidden ${showFeedback ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                >
                    {question.exampleSentence && (
                        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-5 text-left border-2 border-indigo-100 animate-slide-up shadow-sm">
                            <div className="flex items-start gap-4 h-full">
                                <button
                                    onClick={() => handleSpeak(question.exampleSentence || '', true)}
                                    className="flex-shrink-0 p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all shadow-[2px_2px_0_rgba(79,70,229,0.3)] hover:shadow-none hover:translate-y-[2px] active:scale-95 animate-pulse-slow"
                                    title="Listen for +2 Coins!"
                                >
                                    <Volume2 className="w-5 h-5" />
                                </button>
                                <div className="flex-1">
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wide mb-1 flex items-center gap-1">
                                        Example Sentence <span className="text-yellow-500">💰+2</span>
                                    </p>
                                    <p className="text-slate-800 font-bold text-lg mb-1 leading-snug">
                                        "{question.exampleSentence}"
                                    </p>
                                    <p className="text-slate-500 text-sm font-medium">
                                        {question.exampleTranslation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Manual Next Button */}
                    <div className="mt-6 flex justify-center pb-2">
                        <button
                            onClick={onNext}
                            className="bg-slate-900 text-white text-xl font-black py-4 px-12 rounded-2xl shadow-[6px_6px_0px_0px_rgba(15,23,42,0.3)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,0.3)] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 group"
                        >
                            NEXT QUESTION
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizCard;
