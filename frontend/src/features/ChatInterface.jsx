import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChatMessage } from '../features/interactionSlice';
import { sendMessageToAI } from '../api';
import { Send, Loader } from 'lucide-react';

const ChatInterface = () => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const chatHistory = useSelector((state) => state.interaction.chatHistory);

    const handleSend = async () => {
        if (!input.trim()) return;

        // 1. Add User Message
        dispatch(addChatMessage({ role: 'user', content: input }));
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        // 2. Send to Backend
        const aiResponse = await sendMessageToAI(currentInput, chatHistory);

        // 3. Add AI Response
        dispatch(addChatMessage({ role: 'assistant', content: aiResponse }));
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col h-full bg-white border-l">
            <div className="p-4 border-b bg-blue-50">
                <h2 className="font-bold text-blue-900 flex items-center gap-2">🤖 AI Assistant</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatHistory.length === 0 && (
                    <p className="text-gray-400 text-sm text-center mt-10">
                        Try: "Log a meeting with Dr. Smith discussing Product X side effects..."
                    </p>
                )}
                {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-blue-100 ml-8' : 'bg-gray-100 mr-8'}`}>
                        <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong>
                        <p className="mt-1 whitespace-pre-wrap">{msg.content}</p>
                    </div>
                ))}
                {isLoading && <div className="text-gray-500 text-sm italic">AI is thinking...</div>}
            </div>

            <div className="p-4 border-t flex gap-2">
                <input
                    className="flex-1 border rounded px-3 py-2"
                    placeholder="Type here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} disabled={isLoading} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    {isLoading ? <Loader className="animate-spin" size={20} /> : <Send size={20} />}
                </button>
            </div>
        </div>
    );
};

export default ChatInterface;