import React, { useState } from 'react';
import { Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import type { VocabularyItem } from '../types';

interface WordCardProps {
    item: VocabularyItem;
    showMeaning?: boolean; // If true, always show meaning (Learn mode). If false, toggle (Flashcard mode).
}

const WordCard: React.FC<WordCardProps> = ({ item, showMeaning = true }) => {
    const [isExpanded, setIsExpanded] = useState(showMeaning);

    const toggleExpand = () => {
        if (!showMeaning) {
            setIsExpanded(!isExpanded);
        }
    };

    const handleSpeak = (e: React.MouseEvent, text: string) => {
        e.stopPropagation();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div
            className={`glass-panel p-6 mb-4 transition-all duration-300 ${!showMeaning ? 'cursor-pointer hover:shadow-lg' : ''}`}
            onClick={!showMeaning ? toggleExpand : undefined}
        >
            <div className="flex justify-between items-start">
                <div>
                    <span className="inline-block px-2 py-1 text-xs font-semibold tracking-wide text-indigo-500 bg-indigo-50 rounded-full mb-2">
                        {item.category || 'General'}
                    </span>
                    <h3 className="text-3xl font-bold text-slate-800 mb-1">{item.word}</h3>
                    <div className="flex items-center gap-2 text-slate-500 mb-4">
                        <span className="font-mono text-sm">{item.pronunciation}</span>
                        <button
                            className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                            onClick={(e) => handleSpeak(e, item.word)}
                            title="Listen"
                        >
                            <Volume2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                {!showMeaning && (
                    <div className="text-slate-400">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                )}
            </div>

            <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-4 border-t border-slate-100">
                    <p className="text-xl font-semibold text-emerald-600 mb-3">{item.meaning}</p>

                    {item.exampleSentence && (
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 relative group">
                            <div className="flex items-start gap-2">
                                <div className="flex-1">
                                    <p className="text-slate-700 font-medium mb-1 active:text-indigo-600 transition-colors">
                                        "{item.exampleSentence}"
                                    </p>
                                    {item.exampleTranslation && (
                                        <p className="text-slate-500 text-sm">{item.exampleTranslation}</p>
                                    )}
                                </div>
                                <button
                                    className="p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors shadow-sm"
                                    onClick={(e) => handleSpeak(e, item.exampleSentence || '')}
                                    title="Listen to Sentence"
                                >
                                    <Volume2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WordCard;
