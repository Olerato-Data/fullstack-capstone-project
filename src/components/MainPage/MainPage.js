/* written by Brian McCarthy */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Tag, ChevronRight, Package, Filter } from 'lucide-react';

function MainPage() {
    const [gifts, setGifts] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGifts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error; ${response.status}`)
                }
                const data = await response.json();
                setGifts(data);
            } catch (error) {
                console.log('Fetch error: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGifts();
    }, []);

    const goToDetailsPage = (productId) => {
        navigate(`/product/${productId}`);
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return "N/A";
        const date = timestamp?.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 sm:text-4xl">Available Gifts</h1>
                    <p className="mt-2 text-slate-600">Discover treasures shared by your local community.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                    <span className="text-sm text-slate-500 font-medium">
                        Showing {gifts.length} items
                    </span>
                </div>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-slate-500 font-medium font-display">Loading treasures...</p>
                </div>
            ) : (
                <>
                    <motion.div 
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    >
                        <AnimatePresence>
                            {gifts.map((gift) => (
                                <motion.div
                                    key={gift.id}
                                    variants={item}
                                    layout
                                    className="card-sleek group"
                                >
                                    <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                                        {gift.image ? (
                                            <img 
                                                src={gift.image} 
                                                alt={gift.name} 
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                                <Package className="w-10 h-10 mb-2 opacity-20" />
                                                <span className="text-xs font-medium">No Image</span>
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                gift.condition === 'New' 
                                                ? 'bg-green-100 text-green-700 border border-green-200' 
                                                : 'bg-amber-100 text-amber-700 border border-amber-200'
                                            }`}>
                                                {gift.condition}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5">
                                        <h3 className="text-lg font-display font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                            {gift.name}
                                        </h3>
                                        
                                        <div className="mt-4 flex flex-col gap-2">
                                            <div className="flex items-center text-xs text-slate-500 gap-1.5">
                                                <Tag className="w-3.5 h-3.5" />
                                                {gift.category || 'General'}
                                            </div>
                                            <div className="flex items-center text-xs text-slate-500 gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                Added: {formatDate(gift.date_added)}
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => goToDetailsPage(gift.id)} 
                                            className="mt-6 w-full btn-primary flex items-center justify-center gap-2 group/btn"
                                        >
                                            View Details
                                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                    
                    {gifts.length === 0 && (
                        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                                <Package className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-display font-bold text-slate-900">No gifts found</h3>
                            <p className="mt-2 text-slate-500 max-w-sm mx-auto">It looks like there aren't any gifts available at the moment. Check back later!</p>
                        </div>
                    )}
                </>
            )}
        </main>
    );
}

export default MainPage;
