import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, ArrowRight, Zap } from 'lucide-react';
import { vocabularyList } from '../data/vocabulary';

const Home: React.FC = () => {
    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center py-12 px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    Master English <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Vocabulary</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                    Boost your language skills with interactive flashcards and quizzes based on real-world examples.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/learn" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30">
                        Start Learning
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <Link to="/quiz" className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-all shadow-sm hover:shadow-md">
                        Take a Quiz
                    </Link>
                </div>
            </section>

            {/* Stats / Features Grid */}
            <section className="grid md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 card-hover">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Total Words</h3>
                    <p className="text-4xl font-extrabold text-slate-900">{vocabularyList.length}</p>
                    <p className="text-slate-500 mt-2">Essential business & daily words</p>
                </div>

                <div className="glass-panel p-6 card-hover">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 text-emerald-600">
                        <Trophy className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Quiz Mode</h3>
                    <p className="text-slate-600">
                        Challenge yourself with interactive quizzes to test your retention and understanding.
                    </p>
                </div>

                <div className="glass-panel p-6 card-hover">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 text-amber-600">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Smart Learning</h3>
                    <p className="text-slate-600">
                        Learn with context-rich example sentences and clear translations.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
