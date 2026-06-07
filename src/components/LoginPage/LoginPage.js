/* written by Brian McCarthy */
import React, { useState, useEffect } from 'react';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorrect, setIncorrect] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setIsLoggedIn, setUserName } = useAppContext();

    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
            navigate('/app')
        }
    }, [navigate])

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Task 10: Fetch with Content-Type and Authorization
            const res = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem('auth-token') || ''
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            });

            const json = await res.json();
            
            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', json.userName);
                sessionStorage.setItem('email', json.userEmail);
                setIsLoggedIn(true);
                setUserName(json.userName);
                navigate('/app');
            } else {
                setIncorrect("Invalid credentials. Please verify your email and password.");
                setTimeout(() => {
                    setIncorrect("");
                }, 5000);
            }
        } catch (err) {
            setIncorrect("A network error occurred. Please check your connection.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 p-8 md:p-12 border border-slate-100"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mb-4 border border-blue-100">
                            <LogIn className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Welcome Back</h2>
                        <p className="text-slate-500 mt-2 font-medium">Please enter your details</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="email"
                                    type="email"
                                    className="input-sleek pl-12 h-14"
                                    placeholder="your-email@example.com"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setIncorrect("") }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label htmlFor="password" className="text-sm font-bold text-slate-700">Password</label>
                                <Link to="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">Forgot password?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="password"
                                    type="password"
                                    className="input-sleek pl-12 h-14"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setIncorrect("") }}
                                    required
                                />
                            </div>
                        </div>

                        {incorrect && (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold leading-relaxed"
                            >
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {incorrect}
                            </motion.div>
                        )}

                        <button 
                            className="btn-primary w-full h-14 text-base font-bold flex items-center justify-center gap-2 group shadow-xl shadow-blue-200" 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Login to your account
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <div className="pt-4 text-center">
                            <p className="text-slate-500 text-sm font-medium">
                                Don't have an account yet?{' '}
                                <Link to="/register" className="text-blue-600 font-bold hover:text-blue-700 transition-colors inline-flex items-center gap-1 group">
                                    Register here
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </p>
                        </div>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}

export default LoginPage;
