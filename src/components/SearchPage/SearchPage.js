/* written by Brian McCarthy */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import { Search, Filter, SlidersHorizontal, Package, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [ageRange, setAgeRange] = useState(10);
    const [searchResults, setSearchResults] = useState([]);
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');
    const [loading, setLoading] = useState(false);
    
    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInitialGifts = async () => {
            setLoading(true);
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error; ${response.status}`)
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.log('Fetch error: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialGifts();
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        const baseUrl = `${urlConfig.backendUrl}/api/search?`;
        const queryParams = new URLSearchParams({
            name: searchQuery,
            age_years: ageRange.toString(),
            category: category,
            condition: condition,
        }).toString();

        try {
            const response = await fetch(`${baseUrl}${queryParams}`);
            if (!response.ok) {
                throw new Error('Search failed');
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Failed to fetch search results:', error);
        } finally {
            setLoading(false);
        }
    };

    const goToDetailsPage = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="mb-12">
                <h1 className="text-3xl font-display font-bold text-slate-900 sm:text-4xl text-center">Find Your Treasure</h1>
                <p className="mt-2 text-slate-600 text-center max-w-2xl mx-auto">Use the filters below to refine your search and discover exactly what you're looking for.</p>
            </header>

            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Filter className="w-4 h-4 text-blue-600" />
                            Category
                        </label>
                        <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="input-sleek"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                            Condition
                        </label>
                        <select 
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            className="input-sleek"
                        >
                            <option value="">All Conditions</option>
                            {conditions.map(cond => (
                                <option key={cond} value={cond}>{cond}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex justify-between items-center">
                            <span>Max Age: {ageRange} years</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={ageRange}
                            onChange={e => setAgeRange(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-3"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Enter item name..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="input-sleek pl-12 h-12"
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>
                    <button 
                        onClick={handleSearch}
                        disabled={loading}
                        className="btn-primary px-8 h-12 flex items-center justify-center gap-2 min-w-[140px]"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <Search className="w-4 h-4" />
                                Search
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <h2 className="text-xl font-display font-bold text-slate-900">Search Results</h2>
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                        {searchResults.length} {searchResults.length === 1 ? 'Gift' : 'Gifts'} Found
                    </span>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-48 bg-slate-100 rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <AnimatePresence>
                            {searchResults.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="card-sleek flex flex-col sm:flex-row p-4 gap-6 group hover:border-blue-200"
                                >
                                    <div className="w-full sm:w-48 h-48 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0">
                                        {product.image ? (
                                            <img 
                                                src={product.image} 
                                                alt={product.name} 
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-slate-300">
                                                <Package className="w-10 h-10 mb-2 opacity-20" />
                                                <span className="text-xs">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-between py-2 flex-grow">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                    {product.name}
                                                </h3>
                                                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-md border border-blue-100">
                                                    {product.category}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                                                {product.description || "No description provided."}
                                            </p>
                                        </div>
                                        
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-xs font-semibold text-slate-400 capitalize">
                                                Condition: <span className="text-slate-900">{product.condition}</span>
                                            </span>
                                            <button 
                                                onClick={() => goToDetailsPage(product.id)} 
                                                className="btn-secondary h-9 px-4 text-sm flex items-center gap-2 group/btn border border-slate-200"
                                            >
                                                Details
                                                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {!loading && searchResults.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <div className="mx-auto w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
                            <Search className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-display font-bold text-slate-900">No treasures found</h3>
                        <p className="mt-2 text-slate-500 max-w-sm mx-auto">We couldn't find anything matching your current filters. Try broadening your search!</p>
                    </div>
                )}
            </div>
        </main>
    );
}

export default SearchPage;
