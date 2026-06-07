/* written by Brian McCarthy */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import { ArrowLeft, Calendar, Tag, Package, Clock, MessageSquare, User } from 'lucide-react';
import { motion } from 'motion/react';

function DetailsPage() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [gift, setGift] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const authenticationToken = sessionStorage.getItem('auth-token');
        if (!authenticationToken) {
            navigate('/login');
            return;
        }

        const fetchGift = async () => {
            try {
                const url = `${urlConfig.backendUrl}/api/gifts/${productId}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Gift not found');
                }
                const data = await response.json();
                setGift(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGift();
        window.scrollTo(0, 0);

    }, [productId, navigate]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const comments = [
        { author: "John Doe", comment: "I would like this!", time: "2 hours ago" },
        { author: "Jane Smith", comment: "Just DMed you.", time: "4 hours ago" },
        { author: "Alice Johnson", comment: "I will take it if it's still available.", time: "1 day ago" },
        { author: "Mike Brown", comment: "This is a good one!", time: "2 days ago" },
        { author: "Sarah Wilson", comment: "My family can use one. DM me if it is still available. Thank you!", time: "3 days ago" }
    ];

    if (loading) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
    
    if (error || !gift) return (
        <div className="max-w-xl mx-auto mt-20 px-4">
            <div className="bg-red-50 border border-red-200 p-8 rounded-3xl text-center">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-display font-bold text-slate-900">{error || 'Gift not found'}</h2>
                <button onClick={() => navigate('/app')} className="mt-6 btn-secondary">Go Back to Library</button>
            </div>
        </div>
    );

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.button 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors mb-8" 
                onClick={handleBackClick}
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Gifts
            </motion.button>

            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image Section */}
                    <div className="bg-slate-100 aspect-square lg:aspect-auto overflow-hidden">
                        {gift.image ? (
                            <img src={gift.image} alt={gift.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                                <Package className="w-20 h-20 mb-4 opacity-20" />
                                <span className="font-medium">No Image Available</span>
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="p-8 lg:p-12 flex flex-col justify-between">
                        <div>
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase rounded-full border border-blue-100 flex items-center gap-1.5">
                                    <Tag className="w-3.5 h-3.5" />
                                    {gift.category}
                                </span>
                                <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full border flex items-center gap-1.5 ${
                                    gift.condition === 'New' 
                                    ? 'bg-green-50 text-green-700 border-green-100' 
                                    : 'bg-amber-50 text-amber-700 border-amber-100'
                                }`}>
                                    <Clock className="w-3.5 h-3.5" />
                                    {gift.condition}
                                </span>
                            </div>

                            <motion.h1 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl font-display font-bold text-slate-900 sm:text-5xl mb-6"
                            >
                                {gift.name}
                            </motion.h1>

                            <div className="space-y-6">
                                <div className="flex items-center gap-10 text-sm">
                                    <div className="flex flex-col">
                                        <span className="text-slate-400 font-medium">Date Shared</span>
                                        <div className="flex items-center gap-2 text-slate-900 font-semibold mt-1">
                                            <Calendar className="w-4 h-4 text-blue-600" />
                                            {new Date(gift.date_added).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-slate-400 font-medium">Est. Age</span>
                                        <div className="flex items-center gap-2 text-slate-900 font-semibold mt-1">
                                            <Clock className="w-4 h-4 text-blue-600" />
                                            {gift.age_years} Years
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-6">
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">About this gift</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">
                                        {gift.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex gap-4">
                            <button className="flex-grow btn-primary flex items-center justify-center gap-2 h-14">
                                <div className="bg-white/20 p-1 rounded-lg">
                                    <MessageSquare className="w-4 h-4" />
                                </div>
                                Contact Giver
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <section className="mt-16 max-w-3xl">
                <div className="flex items-center gap-2 mb-8">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Community Discussion</h3>
                    <span className="ml-2 bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-xs font-bold">{comments.length}</span>
                </div>
                
                <div className="space-y-4">
                    {comments.map((comment, index) => (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4"
                        >
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex-shrink-0 flex items-center justify-center text-slate-400">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-slate-900 tracking-tight">{comment.author}</span>
                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest leading-none">• {comment.time}</span>
                                </div>
                                <p className="text-slate-600">{comment.comment}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <div className="mt-8 flex gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex-shrink-0 flex items-center justify-center text-blue-600">
                        <User className="w-5 h-5" />
                    </div>
                    <div className="flex-grow">
                        <textarea 
                            placeholder="Add your comment..." 
                            className="w-full bg-white border border-slate-200 rounded-2xl p-4 outline-none focus:border-blue-500 transition-colors min-h-[100px] resize-none"
                        ></textarea>
                        <button className="mt-3 btn-primary text-sm flex items-center gap-2 px-6">
                            Post Comment
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default DetailsPage;
