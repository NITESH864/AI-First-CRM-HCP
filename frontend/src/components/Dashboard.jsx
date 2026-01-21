import React, { useEffect, useState } from 'react'; // 1. useEffect और useState जोड़ें
import { useSelector, useDispatch } from 'react-redux';
import { updateField } from '../features/interactionSlice';
import ChatInterface from './ChatInterface';
import axios from 'axios';
import {
    Search,
    Calendar as CalendarIcon,
    Clock,
    Bot,
    Save,
    History // History icon
} from 'lucide-react';

const Dashboard = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.interaction);

    // --- NEW: History State ---
    const [history, setHistory] = useState([]);

    const handleChange = (e) => {
        dispatch(updateField({ field: e.target.name, value: e.target.value }));
    };

    // --- NEW: Fetch History Function ---
    const fetchHistory = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/history');
            setHistory(res.data.reverse()); // सबसे नया ऊपर दिखाने के लिए reverse()
        } catch (error) {
            console.error("Error fetching history:", error);
        }
    };

    // पेज लोड होते ही हिस्ट्री लाएं
    useEffect(() => {
        fetchHistory();
    }, []);

    // --- Database Save Logic ---
    const handleSave = async () => {
        if (!formData.hcpName) {
            alert("Please enter HCP Name before saving.");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/save-interaction', formData);
            alert("✅ " + response.data.message);
            fetchHistory(); // सेव करने के तुरंत बाद लिस्ट रिफ्रेश करें
        } catch (error) {
            console.error("Save Error:", error);
            alert("❌ Failed to save to database.");
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
            {/* LEFT PANEL */}
            <div className="flex-1 flex flex-col h-full overflow-hidden border-r border-gray-200">
                <header className="h-16 bg-white border-b flex items-center justify-between px-8 shrink-0">
                    <h1 className="text-xl font-bold text-slate-800">Log HCP Interaction</h1>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md"
                    >
                        <Save size={18} /> Save Interaction
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto space-y-8">

                        {/* 1. INPUT FORM CARD */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6 border-b pb-2">Interaction Details</h2>

                            <div className="space-y-6">
                                {/* HCP Name & Type */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">HCP Name</label>
                                        <div className="relative">
                                            <input
                                                name="hcpName"
                                                value={formData.hcpName || ''}
                                                onChange={handleChange}
                                                className="w-full border border-slate-300 p-2.5 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                placeholder="Search or select HCP..."
                                            />
                                            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Interaction Type</label>
                                        <select
                                            name="interactionType"
                                            value={formData.interactionType || 'Meeting'}
                                            onChange={handleChange}
                                            className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                        >
                                            <option value="Meeting">Meeting</option>
                                            <option value="Call">Call</option>
                                            <option value="Email">Email</option>
                                            <option value="Conference">Conference</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Date & Time */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Date</label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                name="date"
                                                value={formData.date || ''}
                                                onChange={handleChange}
                                                className="w-full border border-slate-300 p-2.5 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                            <CalendarIcon className="absolute left-3 top-3 text-slate-400" size={18} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Time</label>
                                        <div className="relative">
                                            <input
                                                type="time"
                                                name="time"
                                                value={formData.time || ''}
                                                onChange={handleChange}
                                                className="w-full border border-slate-300 p-2.5 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                            <Clock className="absolute left-3 top-3 text-slate-400" size={18} />
                                        </div>
                                    </div>
                                </div>

                                {/* Topics */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Topics Discussed</label>
                                    <textarea
                                        name="topics"
                                        value={formData.topics || ''}
                                        onChange={handleChange}
                                        className="w-full border border-slate-300 p-3 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                        placeholder="Enter key discussion points..."
                                    ></textarea>
                                </div>

                                {/* Sentiment */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Observed HCP Sentiment</label>
                                    <div className="flex gap-6">
                                        {['Positive', 'Neutral', 'Negative'].map((status) => (
                                            <label key={status} className="flex items-center gap-2 cursor-pointer group">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.sentiment === status ? 'border-blue-600' : 'border-slate-300 group-hover:border-blue-400'}`}>
                                                    {formData.sentiment === status && <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>}
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="sentiment"
                                                    value={status}
                                                    checked={formData.sentiment === status}
                                                    onChange={handleChange}
                                                    className="hidden"
                                                />
                                                <span className={`text-sm font-medium ${formData.sentiment === status ? 'text-blue-700' : 'text-slate-600'}`}>{status}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. NEW HISTORY TABLE CARD */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
                                <History size={18} className="text-slate-500" />
                                <h3 className="font-bold text-slate-700">Recent History (Database)</h3>
                            </div>

                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-500">
                                    <tr>
                                        <th className="p-4">Doctor Name</th>
                                        <th className="p-4">Type</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Sentiment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="p-8 text-center text-slate-400 italic">
                                                No history found. Save your first interaction!
                                            </td>
                                        </tr>
                                    ) : (
                                        history.map((item) => (
                                            <tr key={item.id} className="border-b border-slate-100 last:border-none hover:bg-slate-50 transition-colors">
                                                <td className="p-4 font-bold text-slate-800">{item.hcp_name}</td>
                                                <td className="p-4">
                                                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold border border-blue-100">
                                                        {item.interaction_type}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-slate-500">{item.date}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${item.sentiment === 'Positive' ? 'bg-green-100 text-green-700 border-green-200' :
                                                            item.sentiment === 'Negative' ? 'bg-red-100 text-red-700 border-red-200' :
                                                                'bg-gray-100 text-gray-700 border-gray-200'
                                                        }`}>
                                                        {item.sentiment || 'Neutral'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>

            {/* RIGHT PANEL: AI Assistant */}
            <div className="w-[400px] bg-slate-50 flex flex-col h-full border-l border-slate-200">
                <div className="p-4 bg-white border-b border-slate-200 flex items-center gap-2">
                    <Bot className="text-blue-600" />
                    <div>
                        <h2 className="text-sm font-bold text-slate-800">AI Assistant</h2>
                        <p className="text-xs text-slate-500">Log interaction via chat</p>
                    </div>
                </div>
                <div className="flex-1 overflow-hidden relative">
                    <ChatInterface />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;