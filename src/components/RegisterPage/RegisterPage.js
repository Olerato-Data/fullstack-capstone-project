/* written by Brian McCarthy */
import React, { useState } from 'react';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, AlertCircle, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setIsLoggedIn, setUserName } = useAppContext();

    const handleRegister = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
            });

            const json = await response.json();
            
            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', json.email);
                setIsLoggedIn(true);
                setUserName(firstName);
                navigate('/app');
            } else if (json.error) {
                setShowerr(json.error);
            }
        } catch (err) {
            setShowerr("Network error. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 p-8 md:p-12 border border-slate-100"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mb-4 border border-blue-100">
                            <UserPlus className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Create Account</h2>
                        <p className="text-slate-500 mt-2 font-medium">Join our community of givers</p>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        id="firstName"
                                        type="text"
                                        className="input-sleek pl-11 h-12 text-sm"
                                        placeholder="John"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        id="lastName"
                                        type="text"
                                        className="input-sleek pl-11 h-12 text-sm"
                                        placeholder="Doe"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    id="email"
                                    type="email"
                                    className="input-sleek pl-11 h-12 text-sm"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value); setShowerr("")}}
                                />
                            </div>
                            {showerr && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-2 text-red-600 text-[11px] font-semibold mt-1 ml-1"
                                >
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    {showerr}
                                </motion.div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-bold text-slate-700 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    id="password"
                                    type="password"
                                    className="input-sleek pl-11 h-12 text-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button 
                            className="btn-primary w-full h-14 text-base font-bold flex items-center justify-center gap-2 group shadow-xl shadow-blue-200 mt-8" 
                            onClick={handleRegister}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Create your account
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <div className="pt-6 text-center">
                            <p className="text-slate-500 text-sm font-medium">
                                Already a member?{' '}
                                <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 transition-colors inline-flex items-center gap-1 group">
                                    Login here
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}

export default RegisterPage;
