import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, Zap, Play, ShoppingBag, Trash2 } from 'lucide-react';
import { vocabularyList } from '../data/vocabulary';
import { useGame } from '../context/GameContext';

const Home: React.FC = () => {
    const { resetGame } = useGame();

    const handleReset = () => {
        if (window.confirm("⚠️ 정말로 모든 데이터를 초기화하시겠습니까?\n\n코인, 펫, 레벨 진행 상황이 모두 삭제되며 복구할 수 없습니다.")) {
            if (window.confirm("❗ 진짜요? 모든 노력이 사라집니다!")) {
                resetGame();
                alert("초기화 완료. 처음부터 다시 시작합니다!");
                window.location.reload();
            }
        }
    };

    return (
        <div className="space-y-16 pb-12">
            {/* Hero Section */}
            <section className="text-center py-12 px-4 max-w-4xl mx-auto">
                <div className="inline-block px-4 py-1 bg-yellow-400 border-2 border-slate-900 rounded-full font-black text-sm mb-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transform -rotate-2">
                    NEW: 상점 & 코인 업데이트!
                </div>
                {/* Reduced font size: text-4xl md:text-6xl */}
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
                    영어 단어, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 drop-shadow-sm">게임처럼 씹어먹자!</span>
                </h1>
                <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-10">
                    코인을 모으고, 전설의 펫을 잠금 해제하고, 영어의 왕이 되어보세요!
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Link to="/level-select" className="inline-flex items-center justify-center px-8 py-4 border-4 border-slate-900 text-xl font-black rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] active:translate-y-1 active:shadow-none transition-all shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] gap-3">
                        <Play className="w-6 h-6 fill-current" />
                        모험 시작하기
                    </Link>
                    <Link to="/shop" className="inline-flex items-center justify-center px-8 py-4 border-4 border-slate-900 text-xl font-black rounded-xl text-slate-900 bg-white hover:bg-slate-50 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] active:translate-y-1 active:shadow-none transition-all shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] gap-3">
                        <ShoppingBag className="w-6 h-6" />
                        상점 구경하기
                    </Link>
                </div>
            </section>

            {/* Stats / Features Grid */}
            <section className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-2 transition-transform">
                    <div className="w-16 h-16 bg-indigo-100 rounded-xl border-2 border-slate-900 flex items-center justify-center mb-6 text-indigo-600 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                        <BookOpen className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase">총 단어 수</h3>
                    <p className="text-5xl font-black text-indigo-600 mb-2">{vocabularyList.length}</p>
                    <p className="text-slate-600 font-bold">Unit 1부터 12까지<br />핵심 필수 영단어 수록</p>
                </div>

                <div className="bg-white p-8 rounded-2xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-2 transition-transform">
                    <div className="w-16 h-16 bg-emerald-100 rounded-xl border-2 border-slate-900 flex items-center justify-center mb-6 text-emerald-600 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                        <Trophy className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase">보상 획득</h3>
                    <p className="text-slate-600 font-medium">
                        문제를 맞추고 <strong>VocaCoin</strong>을 모으세요. 모은 코인으로 상점에서 멋진 펫을 분양받을 수 있습니다!
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-2 transition-transform">
                    <div className="w-16 h-16 bg-amber-100 rounded-xl border-2 border-slate-900 flex items-center justify-center mb-6 text-amber-600 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                        <Zap className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase">파워 업</h3>
                    <p className="text-slate-600 font-medium">
                        미국식 원어민 발음과 재미있는 인터랙티브 퀴즈로 여러분의 영어 실력을 200% 충전하세요.
                    </p>
                </div>
            </section>

            {/* Reset Button Section */}
            <div className="flex justify-center pt-8 border-t-2 border-slate-100">
                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors text-sm font-bold"
                >
                    <Trash2 className="w-4 h-4" />
                    데이터 초기화 (Reset Progress)
                </button>
            </div>
        </div>
    );
};

export default Home;
