import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Star, Play } from 'lucide-react';
import { vocabularyList } from '../data/vocabulary';
import type { LevelStats } from '../types';

const LevelSelect: React.FC = () => {
    const navigate = useNavigate();
    const [levelStats, setLevelStats] = useState<Record<string, LevelStats>>({});

    const units = Array.from(new Set(vocabularyList.map(item => item.category || 'Unit 1')))
        .sort((a, b) => {
            const numA = parseInt(a.replace('Unit ', ''));
            const numB = parseInt(b.replace('Unit ', ''));
            return numA - numB;
        });

    useEffect(() => {
        const savedProgress = localStorage.getItem('vocab_adventure_progress');
        if (savedProgress) {
            setLevelStats(JSON.parse(savedProgress));
        } else {
            const initialStats: Record<string, LevelStats> = {};
            units.forEach((unit, index) => {
                initialStats[unit] = {
                    unlocked: index === 0,
                    stars: 0,
                    highScore: 0
                };
            });
            setLevelStats(initialStats);
            localStorage.setItem('vocab_adventure_progress', JSON.stringify(initialStats));
        }
    }, []);

    const handleLevelClick = (unit: string) => {
        if (levelStats[unit]?.unlocked) {
            navigate(`/quiz?unit=${encodeURIComponent(unit)}`);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-5xl font-black text-center text-slate-900 mb-2 uppercase tracking-tight">
                Adventure Map
            </h1>
            <p className="text-center text-slate-600 font-bold mb-10">Select a level to start your journey!</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {units.map((unit) => {
                    const stats = levelStats[unit] || { unlocked: false, stars: 0, highScore: 0 };

                    return (
                        <div
                            key={unit}
                            onClick={() => handleLevelClick(unit)}
                            className={`
                                relative p-6 rounded-xl border-4 transition-all duration-200
                                flex flex-col items-center justify-between min-h-[180px] cursor-pointer
                                ${stats.unlocked
                                    ? 'bg-white border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] hover:bg-yellow-50'
                                    : 'bg-slate-200 border-slate-400 cursor-not-allowed opacity-70'}
                            `}
                        >
                            {!stats.unlocked && (
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <Lock className="w-12 h-12 text-slate-500" />
                                </div>
                            )}

                            <div className={`text-2xl font-black mb-2 ${stats.unlocked ? 'text-slate-900' : 'text-slate-500'}`}>{unit}</div>

                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-8 h-8 ${star <= stats.stars ? 'text-yellow-400 fill-yellow-400 drop-shadow-md' : 'text-slate-300'}`}
                                    />
                                ))}
                            </div>

                            {stats.unlocked ? (
                                <button className="w-full py-2 bg-indigo-600 text-white border-2 border-slate-900 rounded-lg font-black uppercase tracking-wide hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                                    <Play className="w-4 h-4 fill-current" />
                                    PLAY
                                </button>
                            ) : (
                                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-300">Locked</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LevelSelect;
