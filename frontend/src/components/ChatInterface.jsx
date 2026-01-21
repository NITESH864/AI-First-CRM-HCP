import React, { useState } from 'react';
import axios from 'axios';
import { Send, Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux'; // 1. Dispatch import करें
import { updateField } from '../features/interactionSlice'; // 2. Action import करें

const ChatInterface = () => {
    const dispatch = useDispatch(); // 3. Hook initialize करें
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { text: "Hello! I can help you log interactions, search HCP history, or get product info. What did you do today?", isUser: false }
    ]);
    const [loading, setLoading] = useState(false);

    // --- स्मार्ट पार्सर (Smart Parser) ---
    // यह फंक्शन मैसेज से डेटा निकालकर फॉर्म भरेगा
    const autoFillForm = (text) => {
        const lowerText = text.toLowerCase();

        // डॉक्टर का नाम पहचानें (जैसे Dr. Nitesh या Dr. Rohit)
        if (lowerText.includes("nitesh")) {
            dispatch(updateField({ field: 'hcpName', value: 'Dr. Nitesh' }));
        } else if (lowerText.includes("rohit")) {
            dispatch(updateField({ field: 'hcpName', value: 'Dr. Rohit' }));
        }

        // सेंटीमेंट (Sentiment) पहचानें
        if (lowerText.includes("positive") || lowerText.includes("great") || lowerText.includes("good")) {
            dispatch(updateField({ field: 'sentiment', value: 'Positive' }));
        } else if (lowerText.includes("negative") || lowerText.includes("bad")) {
            dispatch(updateField({ field: 'sentiment', value: 'Negative' }));
        }

        // टाइप (Type) पहचानें
        if (lowerText.includes("meeting")) {
            dispatch(updateField({ field: 'interactionType', value: 'Meeting' }));
        } else if (lowerText.includes("call")) {
            dispatch(updateField({ field: 'interactionType', value: 'Call' }));
        }

        // आज की तारीख ऑटो-फिल करें
        dispatch(updateField({ field: 'date', value: new Date().toISOString().split('T')[0] }));
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { text: input, isUser: true };
        setMessages(prev => [...prev, userMsg]);

        // मैसेज भेजते ही फॉर्म भरने की कोशिश करें
        autoFillForm(input);

        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/chat', { message: input });
            const botReply = response.data.reply || "Task processed successfully.";
            setMessages(prev => [...prev, { text: botReply, isUser: false }]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { text: "Error: Could not connect to the AI Assistant.", isUser: false }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Messages Area (Old UI) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'}`}>
                            {m.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2 text-slate-500 text-sm">
                            <Loader2 className="animate-spin" size={16} /> Thinking...
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area (Old UI) */}
            <div className="p-4 bg-white border-t border-slate-200">
                <div className="relative">
                    <input
                        className="w-full border border-slate-300 rounded-full py-3 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button onClick={handleSend} className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;