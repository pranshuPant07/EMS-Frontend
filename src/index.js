import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Component/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signup from './Page/Signup';
import Form from './Component/Form';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Form" element={isAuthenticated ? <Form /> : <Navigate to="/" />} />
        </Routes>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
