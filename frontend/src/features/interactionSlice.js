import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    hcpName: '',
    date: new Date().toISOString().split('T')[0],
    interactionType: 'Meeting',
    topics: '',
    sentiment: 'Neutral',
    chatHistory: []
};

const interactionSlice = createSlice({
    name: 'interaction',
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        addChatMessage: (state, action) => {
            state.chatHistory.push(action.payload);
        },
    },
});

export const { updateField, addChatMessage } = interactionSlice.actions;
export default interactionSlice.reducer;