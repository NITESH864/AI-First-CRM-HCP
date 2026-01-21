import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <Provider store={store}>
            <Dashboard />
        </Provider>
    );
}

// THIS LINE WAS MISSING OR BROKEN 👇
export default App;