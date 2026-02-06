import React, { useState, useEffect } from 'react';
import { RefreshCw, Map as MapIcon, CheckCircle, XCircle, Heart, Star } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { vocabularyList } from '../data/vocabulary';
import QuizCard from '../components/QuizCard';
import FeedbackOverlay from '../components/FeedbackOverlay';
import { playSound } from '../utils/sound';
import type { VocabularyItem, LevelStats } from '../types';
import { useGame, AVAILABLE_PETS } from '../context/GameContext';

const Quiz: React.FC = () => {
    const [searchParams] = useSearchParams();
    const unitParam = searchParams.get('unit');
    const { addCoins, equippedPet } = useGame();
    const currentPet = AVAILABLE_PETS.find(p => p.id === equippedPet);

    const [questions, setQuestions] = useState<VocabularyItem[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [hearts, setHearts] = useState(5);
    const [showResult, setShowResult] = useState(false);
    const [options, setOptions] = useState<VocabularyItem[]>([]);
    const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [sentenceBonusClaimed, setSentenceBonusClaimed] = useState(false); // Track bonus per question

    useEffect(() => {
        startQuiz();
    }, [unitParam]);

    const startQuiz = () => {
        let targetQuestions = [];
        if (unitParam) {
            targetQuestions = vocabularyList.filter(item => item.category === unitParam);
        } else {
            targetQuestions = [...vocabularyList].sort(() => 0.5 - Math.random()).slice(0, 10);
        }

        const shuffled = [...targetQuestions].sort(() => 0.5 - Math.random());

        setQuestions(shuffled);
        setCurrentQuestionIndex(0);
        setScore(0);
        setHearts(5);
        setShowResult(false);
        setGameStatus('playing');
        setFeedback(null);
        setSentenceBonusClaimed(false);

        if (shuffled.length > 0) {
            generateOptions(shuffled[0], vocabularyList);
        }
    };

    const generateOptions = (correct: VocabularyItem, all: VocabularyItem[]) => {
        const incorrect = all.filter(item => item.id !== correct.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
        const opts = [...incorrect, correct].sort(() => 0.5 - Math.random());
        setOptions(opts);
    };

    const onAnswerClick = (selectedId: number) => {
        if (feedback) return; // Prevent double clicks

        const isCorrect = selectedId === questions[currentQuestionIndex].id;

        // 1. Show Feedback & Sound
        setFeedback(isCorrect ? 'correct' : 'wrong');
        playSound(isCorrect ? 'correct' : 'wrong');

        // 2. Update Stats Logic
        if (isCorrect) {
            setScore(prev => prev + 1);
            addCoins(10); // 10 Coins per answer
        } else {
            setHearts(prev => prev - 1);
        }

        // 3. REMOVED AUTO-ADVANCE
        // User must click "Next" to read sentence
    };

    const handleNextClick = () => {
        if (!feedback) return;

        // Determine result based on PREVIOUS state
        const wasCorrect = feedback === 'correct';
        setFeedback(null);
        setSentenceBonusClaimed(false); // Reset bonus for next
        proceedToNext(wasCorrect);
    };

    const handleSentencePlay = () => {
        if (!sentenceBonusClaimed && feedback) {
            addCoins(2); // +2 Bonus Coins
            setSentenceBonusClaimed(true);
            // playSound('coin'); // Optional coin sound
        }
    };

    const proceedToNext = (wasCorrect: boolean) => {
        let estimatedHearts = hearts;
        if (!wasCorrect) estimatedHearts -= 1;

        if (!wasCorrect && estimatedHearts <= 0) {
            finishGame('lost');
            return;
        }

        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
            generateOptions(questions[nextIndex], vocabularyList);
        } else {
            finishGame('won');
        }
    };

    const finishGame = (status: 'won' | 'lost') => {
        setGameStatus(status);
        setShowResult(true);

        if (status === 'won') {
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#ff0000', '#00ff00', '#0000ff']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#ff0000', '#00ff00', '#0000ff']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();
        }
    };

    useEffect(() => {
        if (showResult && gameStatus === 'won' && unitParam) {
            let stars: 0 | 1 | 2 | 3 = 0;
            const finalPercentage = Math.round((score / questions.length) * 100);

            if (finalPercentage === 100) stars = 3;
            else if (finalPercentage >= 80) stars = 2;
            else if (finalPercentage >= 60) stars = 1;

            addCoins(300); // 300 Bonus Coins

            const saved = localStorage.getItem('vocab_adventure_progress');
            let progress: Record<string, LevelStats> = saved ? JSON.parse(saved) : {};

            const currentStats = progress[unitParam] || { unlocked: true, stars: 0, highScore: 0 };
            progress[unitParam] = {
                ...currentStats,
                stars: Math.max(currentStats.stars, stars) as 0 | 1 | 2 | 3,
                highScore: Math.max(currentStats.highScore, score)
            };

            const unitNumber = parseInt(unitParam.replace('Unit ', ''));
            const nextUnit = `Unit ${unitNumber + 1}`;
            if (unitNumber < 12) {
                const nextStats = progress[nextUnit] || { unlocked: false, stars: 0, highScore: 0 };
                progress[nextUnit] = { ...nextStats, unlocked: true };
            }

            localStorage.setItem('vocab_adventure_progress', JSON.stringify(progress));
        }
    }, [showResult, gameStatus]);


    if (questions.length === 0) return <div className="p-10 text-center">Loading Adventure...</div>;

    if (showResult) {
        const percentage = Math.round((score / questions.length) * 100);
        const stars = percentage === 100 ? 3 : percentage >= 80 ? 2 : percentage >= 60 ? 1 : 0;

        return (
            <div className="min-h-[60vh] flex items-center justify-center p-4 bg-[url('https://img.freepik.com/free-vector/blue-sky-with-clouds-background_1017-23092.jpg')] bg-cover bg-center rounded-3xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden relative">
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

                <div className={`relative z-10 p-8 md:p-10 border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] rounded-2xl bg-white ${gameStatus === 'won' ? 'border-emerald-500' : 'border-rose-500'} max-w-xl w-full text-center transition-all animate-bounce-slow`}>
                    <div className="mb-6 flex justify-center relative">
                        {gameStatus === 'won' ? (
                            <div className="relative">
                                <CheckCircle className="w-24 h-24 text-emerald-500" />
                                <div className="absolute -top-4 -right-4 animate-bounce">
                                    <Star className="w-12 h-12 text-yellow-400 fill-yellow-400 drop-shadow-lg" />
                                </div>
                            </div>
                        ) : (
                            <XCircle className="w-24 h-24 text-rose-500" />
                        )}
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-2">
                        {gameStatus === 'won' ? 'LEVEL COMPLETE!' : 'GAME OVER'}
                    </h2>
                    {gameStatus === 'won' && (
                        <div className="flex flex-col items-center gap-4 mb-6">
                            <div className="flex gap-2">
                                {[1, 2, 3].map((s) => (
                                    <Star
                                        key={s}
                                        className={`w-8 h-8 ${s <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`}
                                    />
                                ))}
                            </div>
                            <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold border-2 border-yellow-400 animate-pulse">
                                +300 Coins Bonus!
                            </div>
                        </div>
                    )}
                    <p className="text-slate-600 font-bold mb-8 text-lg">
                        {gameStatus === 'won'
                            ? `Awesome! You mastered ${unitParam || 'this level'}!`
                            : "Don't give up! Look at the new words and try again."}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={startQuiz}
                            className="flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-900 active:translate-y-1 active:shadow-none"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Retry
                        </button>
                        <Link
                            to="/level-select"
                            className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-slate-700 border-2 border-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-1 active:shadow-none"
                        >
                            <MapIcon className="w-5 h-5" />
                            Map
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        // Added overflow-y-auto to manage long content
        // Increased padding-bottom (pb-40) to accommodate bottom toolbars
        <div className="relative h-screen flex flex-col bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100 overflow-hidden">
            {/* Scrollable Main Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-40">
                <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-start">
                    <FeedbackOverlay type={feedback} onComplete={() => { }} />

                    {/* Main Quiz Area */}
                    <div className="flex-1 w-full">
                        {/* Game Header */}
                        <div className="flex items-center justify-between mb-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] border-2 border-slate-900 sticky top-0 z-20">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-500 text-sm uppercase tracking-wide">Level</span>
                                <span className="font-black text-indigo-600 text-xl">{unitParam || 'Quick Play'}</span>
                            </div>

                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map(h => (
                                    <Heart
                                        key={h}
                                        className={`w-6 h-6 transition-all ${h <= hearts ? 'text-rose-500 fill-rose-500 animate-pulse' : 'text-slate-200'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <QuizCard
                            question={questions[currentQuestionIndex]}
                            options={options}
                            onAnswer={onAnswerClick}
                            onNext={handleNextClick}
                            onSentencePlay={handleSentencePlay}
                            questionNumber={currentQuestionIndex + 1}
                            totalQuestions={questions.length}
                            showFeedback={feedback !== null}
                        />
                    </div>

                    {/* Side Panel: Pet (Desktop) */}
                    {equippedPet && equippedPet !== 'none' && (
                        <div className="hidden md:block w-64 md:sticky md:top-4 z-0">
                            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-center transform hover:scale-105 transition-transform cursor-pointer" onClick={() => playSound('click')}>
                                <h3 className="font-black text-slate-900 mb-2 uppercase tracking-wider text-sm md:text-base">Companion</h3>
                                <div className="text-8xl mb-2 animate-bounce-slow filter drop-shadow-lg">
                                    {currentPet?.icon || '🐶'}
                                </div>
                                <p className="font-bold text-indigo-600 text-sm">{currentPet?.name || 'Blocky Dog'}</p>
                                <p className="text-xs text-slate-400 mt-1 font-bold">Cheering for you!</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Pet Bar (Mobile Only) - Fixed at bottom */}
            {equippedPet && equippedPet !== 'none' && (
                <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 animate-slide-up">
                    <div className="bg-white border-4 border-slate-900 rounded-xl p-3 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex items-center justify-between" onClick={() => playSound('click')}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg border-2 border-slate-900 flex items-center justify-center text-3xl">
                                {currentPet?.icon || '🐶'}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-slate-900 text-sm uppercase">Companion</span>
                                <span className="text-xs font-bold text-indigo-600">{currentPet?.name} is cheering!</span>
                            </div>
                        </div>
                        <div className="animate-pulse">
                            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
