import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookOpen, Map as MapIcon, ShoppingBag, Coins } from 'lucide-react';
import { useGame } from '../context/GameContext';

const Layout: React.FC = () => {
    const location = useLocation();
    const { coins } = useGame();

    const navItems = [
        { path: '/', name: 'Home', icon: BookOpen },
        { path: '/level-select', name: 'Map', icon: MapIcon },
        { path: '/shop', name: 'Shop', icon: ShoppingBag },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <header className="bg-white border-b-4 border-slate-900 sticky top-0 z-50">
                <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-black text-slate-900 tracking-tighter hover:text-indigo-600 transition-colors">
                        VOCATEST
                    </Link>

                    <div className="flex items-center gap-4">
                        {/* Coin Display */}
                        <div className="flex items-center gap-2 bg-yellow-400 border-2 border-slate-900 rounded-lg px-3 py-1 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transform hover:-translate-y-0.5 transition-transform">
                            <Coins className="w-5 h-5 text-slate-900" />
                            <span className="font-black text-slate-900">{coins}</span>
                        </div>

                        <ul className="flex space-x-2 md:space-x-4">
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center justify-center p-2 rounded-lg border-2 transition-all ${location.pathname === item.path
                                            ? 'bg-indigo-500 border-slate-900 text-white shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]'
                                            : 'border-transparent text-slate-900 hover:bg-slate-100'
                                            }`}
                                        title={item.name}
                                    >
                                        <item.icon className="w-6 h-6" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>

            <footer className="mt-auto py-6 text-center text-slate-500 text-sm font-bold">
                © 2026 Vocatest Adventure
            </footer>
        </div>
    );
};

export default Layout;
