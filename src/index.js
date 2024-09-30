import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Component/Home'; // Login Page
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signup from './Page/Signup'; // Signup Page
import Form from './Component/Form'; // Form Page

const isAuthenticated = !!localStorage.getItem('authToken');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Form" element={isAuthenticated ? <Form /> : <Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
);
