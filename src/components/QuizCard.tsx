import React, { useEffect, useRef, useState } from 'react';
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
    const [showCoinAnim, setShowCoinAnim] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false); // Add state to show playing status

    // Auto-scroll to sentence when feedback appears
    useEffect(() => {
        if (showFeedback && feedbackRef.current) {
            setTimeout(() => {
                feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    }, [showFeedback]);

    const handleSpeak = (text: string, isSentence = false) => {
        if (isPlaying) return; // Prevent overlapping playback

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';

        setIsPlaying(true);

        utterance.onend = () => {
            setIsPlaying(false);
            if (isSentence) {
                onSentencePlay(); // Trigger coin reward AFTER playback finishes
                setShowCoinAnim(true);
                setTimeout(() => setShowCoinAnim(false), 1500); // Reset animation after 1.5s
            }
        };

        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="max-w-xl mx-auto pb-4">
            <div className="mb-4 flex justify-between items-end">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Q. {questionNumber} / {totalQuestions}</span>
                <div className="w-1/3 bg-slate-200 rounded-full h-2">
                    <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="glass-panel p-5 md:p-6 text-center mb-4 relative transition-all duration-300 shadow-sm border-2 border-slate-100">
                <span className="text-xs text-indigo-500 font-bold mb-1 block uppercase tracking-wide">Definition</span>

                <div className="flex items-center justify-center gap-3 mb-5">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">{question.word}</h2>
                    <button
                        onClick={() => handleSpeak(question.word)}
                        className={`p-2 rounded-full transition-colors ${isPlaying ? 'bg-indigo-100 text-indigo-400' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
                        title="Listen"
                        disabled={isPlaying}
                    >
                        <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-2 mb-4">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => !showFeedback && onAnswer(option.id)}
                            disabled={showFeedback}
                            className={`
                                p-3 text-left rounded-lg border-2 transition-all duration-200 font-bold text-base group
                                ${showFeedback
                                    ? option.id === question.id
                                        ? 'bg-emerald-100 border-emerald-500 text-emerald-800 shadow-[0_2px_0_rgba(16,185,129,0.2)] transform -translate-y-[1px]'
                                        : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                                    : 'bg-white border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 active:scale-[0.98]'
                                }
                            `}
                        >
                            <span className={`inline-block w-6 mr-1 font-black ${showFeedback ? 'text-inherit' : 'text-slate-300 group-hover:text-indigo-400'}`}>
                                {String.fromCharCode(65 + options.indexOf(option))}.
                            </span>
                            {option.meaning}
                        </button>
                    ))}
                </div>

                {/* Example Sentence Feedback Area */}
                <div
                    ref={feedbackRef}
                    className={`transition-all duration-500 overflow-hidden ${showFeedback ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                >
                    {question.exampleSentence && (
                        <div className="bg-indigo-50 rounded-lg p-4 text-left border-l-4 border-indigo-500 animate-slide-up relative overflow-visible">
                            <div className="flex items-start gap-3 h-full relative">
                                <div className="relative">
                                    <button
                                        onClick={() => handleSpeak(question.exampleSentence || '', true)}
                                        className={`flex-shrink-0 p-3 rounded-full border-2 transition-all shadow-sm active:scale-95 ${isPlaying ? 'bg-indigo-100 text-indigo-400 border-indigo-200 cursor-wait' : 'bg-white text-indigo-600 border-indigo-100 hover:border-indigo-300'}`}
                                        title="Listen to end for +2 Coins!"
                                        disabled={isPlaying}
                                    >
                                        <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
                                    </button>

                                    {/* Floating Coin Animation */}
                                    {showCoinAnim && (
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce-slow pointer-events-none z-50">
                                            <div className="text-3xl filter drop-shadow-md">💰</div>
                                            <div className="text-xs font-black text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full border border-yellow-300 animate-pulse">+2</div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-wider mb-1 flex items-center gap-1">
                                        Example Sentence
                                        {isPlaying && <span className="text-indigo-400 animate-pulse">Playing...</span>}
                                        {!isPlaying && !showCoinAnim && <span className="text-yellow-600 font-bold bg-yellow-50 px-1 rounded">Listening Reward</span>}
                                    </p>
                                    <p className="text-indigo-900 font-bold text-base mb-1 leading-snug">
                                        "{question.exampleSentence}"
                                    </p>
                                    <p className="text-indigo-500 text-sm font-medium">
                                        {question.exampleTranslation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Manual Next Button */}
                    <div className="mt-4 flex justify-center pb-2">
                        <button
                            onClick={onNext}
                            className="bg-slate-900 text-white text-lg font-black py-3 px-8 rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,0.3)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,0.3)] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 group w-full justify-center"
                        >
                            NEXT QUESTION
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizCard;
