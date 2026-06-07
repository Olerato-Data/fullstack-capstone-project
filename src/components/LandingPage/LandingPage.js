/* written by Brian McCarthy */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Gift, Heart, Share2, Search } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="relative isolate overflow-hidden min-h-[calc(100vh-64px)] flex items-center justify-center">
            {/* Background decorative elements */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-slate-600 ring-1 ring-slate-900/10 hover:ring-slate-900/20">
                            Connecting communities through kindness.{' '}
                            <Link to="/app" className="font-semibold text-blue-600">
                                <span className="absolute inset-0" aria-hidden="true"></span>
                                Read more <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl font-display font-bold tracking-tight text-slate-900 sm:text-6xl"
                    >
                        Spread Joy with <span className="text-blue-600">GiftLink</span>
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 text-lg leading-8 text-slate-600 italic"
                    >
                        "Sharing is the essence of community. It is through giving that we enrich and perpetuate both our lives and the lives of others."
                    </motion.p>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-10 flex items-center justify-center gap-x-6"
                    >
                        <Link
                            to="/app"
                            className="btn-primary flex items-center gap-2 group"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/search" className="text-sm font-semibold leading-6 text-slate-900 flex items-center gap-1 hover:text-blue-600 transition-colors">
                            Find a Gift <Search className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3"
                >
                    {[
                        { icon: Share2, title: 'Easy Sharing', desc: 'Post gifts you no longer need and find new homes for them.' },
                        { icon: Gift, title: 'Find Treasures', desc: 'Discover items your neighbors are giving away for free.' },
                        { icon: Heart, title: 'Build Community', desc: 'Connect with people around you through acts of giving.' }
                    ].map((feature, i) => (
                        <div key={i} className="card-sleek p-8 text-center bg-white/50 backdrop-blur-sm">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white mb-6 shadow-lg shadow-blue-200">
                                <feature.icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <h3 className="text-lg font-display font-semibold leading-7 text-slate-900">{feature.title}</h3>
                            <p className="mt-2 text-base leading-7 text-slate-600">{feature.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
            
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                <div className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
            </div>
        </div>
    );
}
