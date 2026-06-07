/* written by Brian McCarthy */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AuthContext';
import { Gift, Search, Home, LogOut, LogIn, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';

export default function Navbar() {
    const { isLoggedIn, userName, setIsLoggedIn } = useAppContext();
    const location = useLocation();

    const handleLogout = () => {
        sessionStorage.clear();
        setIsLoggedIn(false);
    };

    const navLinks = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Gifts', path: '/app', icon: Gift },
        { name: 'Search', path: '/search', icon: Search },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link className="flex items-center gap-2" to="/">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <Gift className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold tracking-tight text-slate-900">
                                Gift<span className="text-blue-600">Link</span>
                            </span>
                        </Link>
                        
                        <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                                            isActive
                                                ? 'border-blue-600 text-slate-900'
                                                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                                        }`}
                                    >
                                        <link.icon className="w-4 h-4 mr-2" />
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-4">
                                <span className="hidden md:block text-sm text-slate-500">
                                    Welcome, <span className="font-semibold text-slate-900">{userName}</span>
                                </span>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </motion.button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <LogIn className="w-4 h-4" />
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-sm shadow-blue-200"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
