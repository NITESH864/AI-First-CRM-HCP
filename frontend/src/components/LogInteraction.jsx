import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField } from '../features/interactionSlice';
import ChatInterface from './ChatInterface';

const LogInteraction = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.interaction);

    const handleChange = (e) => {
        dispatch(updateField({ field: e.target.name, value: e.target.value }));
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
            {/* Left Side: Form */}
            <div className="w-2/3 p-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Log HCP Interaction</h1>

                <div className="bg-white p-6 rounded-lg shadow-sm space-y-6 border">
                    {/* HCP Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">HCP Name</label>
                        <input name="hcpName" value={formData.hcpName} onChange={handleChange}
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Search or select HCP..." />
                    </div>

                    {/* Date & Type */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Interaction Type</label>
                            <select name="interactionType" value={formData.interactionType} onChange={handleChange} className="w-full border p-2 rounded">
                                <option>Meeting</option><option>Call</option><option>Email</option>
                            </select>
                        </div>
                    </div>

                    {/* Sentiment */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Observed Sentiment</label>
                        <div className="flex gap-4">
                            {['Positive', 'Neutral', 'Negative'].map((status) => (
                                <label key={status} className="flex items-center cursor-pointer">
                                    <input type="radio" name="sentiment" value={status}
                                        checked={formData.sentiment === status} onChange={handleChange}
                                        className="mr-2 text-blue-600" />
                                    {status}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Topics Discussed</label>
                        <textarea name="topics" value={formData.topics} onChange={handleChange}
                            className="w-full border p-2 rounded h-24" placeholder="Enter key discussion points..."></textarea>
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium transition-colors">
                        Log Interaction
                    </button>
                </div>
            </div>

            {/* Right Side: AI Chat */}
            <div className="w-1/3 h-full">
                <ChatInterface />
            </div>
        </div>
    );
};

export default LogInteraction;