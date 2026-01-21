import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const sendMessageToAI = async (message, history) => {
    try {
        const response = await axios.post(`${API_URL}/chat`, {
            message,
            history: history.map(h =>
                h.role === 'user'
                    ? { type: "human", content: h.content }
                    : { type: "ai", content: h.content }
            )
        });
        return response.data.response;
    } catch (error) {
        console.error("API Error:", error);
        return "Error: Could not connect to backend. Is uvicorn running?";
    }
};