import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Component/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Page/Signup';
import Form from './Component/Form';
import ProtectedRoute from './Component/ProtectedRoute';
import jwtDecode from 'jwt-decode';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem('authToken');
        return token ? !isTokenExpired(token) : false;
    });

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token && !isTokenExpired(token)) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 < Date.now(); // Compare expiration time with current time
        } catch (error) {
            return true; // If there's an error decoding the token, consider it expired
        }
    };

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    return (
        <Routes>
            {/* Public Route */}
            <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated} redirectPath="/Form"><Home setIsAuthenticated={setIsAuthenticated} /></ProtectedRoute>} />
            
            {/* Public Route */}
            <Route path="/Signup" element={<Signup />} />

            {/* Protected Route */}
            <Route 
                path="/Form" 
                element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <Form />
                    </ProtectedRoute>
                } 
            />
        </Routes>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
