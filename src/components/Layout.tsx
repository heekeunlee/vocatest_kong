import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { BookOpen, GraduationCap, Home, Menu, X } from 'lucide-react';

const Layout: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
                                <BookOpen className="w-6 h-6" />
                                <span>VocaMaster</span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link
                                to="/"
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors text-sm font-medium ${isActive('/') ? 'text-primary bg-primary/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                            >
                                <Home className="w-4 h-4" />
                                Home
                            </Link>
                            <Link
                                to="/learn"
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors text-sm font-medium ${isActive('/learn') ? 'text-primary bg-primary/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                            >
                                <BookOpen className="w-4 h-4" />
                                Learn
                            </Link>
                            <Link
                                to="/quiz"
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors text-sm font-medium ${isActive('/quiz') ? 'text-primary bg-primary/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                            >
                                <GraduationCap className="w-4 h-4" />
                                Quiz
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-slate-100 bg-white shadow-lg">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'text-primary bg-primary/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/learn"
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/learn') ? 'text-primary bg-primary/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                            >
                                Learn
                            </Link>
                            <Link
                                to="/quiz"
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/quiz') ? 'text-primary bg-primary/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                            >
                                Quiz
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <Outlet />
            </main>

            <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
                <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-slate-500 text-sm">
                    <p>© 2026 VocaMaster. All rights reserved.</p>
                    <p className="mt-1">Heekeun Lee Project</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
