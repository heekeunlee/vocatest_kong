import React, { useEffect, useState } from 'react';

interface FeedbackOverlayProps {
    type: 'correct' | 'wrong' | null;
    onComplete: () => void;
}

const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({ type, onComplete }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (type) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(onComplete, 300); // Wait for exit animation
            }, 1000); // Show for 1 second
            return () => clearTimeout(timer);
        }
    }, [type, onComplete]);

    if (!type && !isVisible) return null;

    const isCorrect = type === 'correct';
    const emojis = isCorrect ? ['🌟', '💎', '🏆', '🦄', '🔥'] : ['🌩️', '💨', '🛡️', '🧟', '🧱'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const text = isCorrect ? 'AWESOME!' : 'OOPS!';
    const colorClass = isCorrect ? 'text-yellow-400 drop-shadow-[0_4px_0_rgba(234,179,8,0.8)]' : 'text-slate-200 drop-shadow-[0_4px_0_rgba(148,163,184,0.8)]';
    const bgClass = isCorrect ? 'bg-emerald-500/90' : 'bg-rose-500/90';

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
        >
            <div className={`absolute inset-0 ${bgClass} backdrop-blur-sm`} />

            <div className="relative z-10 flex flex-col items-center animate-bounce-slow">
                <div className={`text-9xl mb-4 filter drop-shadow-2xl transform transition-transform duration-500 ${isVisible ? 'scale-110 rotate-12' : 'scale-50'}`}>
                    {randomEmoji}
                </div>
                <div className={`text-6xl font-black tracking-tighter ${colorClass} uppercase`}>
                    {text}
                </div>
            </div>
        </div>
    );
};

export default FeedbackOverlay;
