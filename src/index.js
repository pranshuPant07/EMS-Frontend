import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Component/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signup from './Page/Signup';
import Form from './Component/Form';

const isAuthenticated = !!localStorage.getItem('token');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' Component={Home} element={isAuthenticated ? <Navigate to="/Home" /> : <Home />} />
            <Route path="/" element={<Form />} />
            <Route path='/Signup' Component={Signup} element={isAuthenticated ? <Navigate to="/Home" /> : <Signup />} />
            <Route path='/Form' Component={props => <Form {...props} />} element={isAuthenticated ? <Home /> : <Navigate to="/Home" />} />
        </Routes>
    </BrowserRouter>
);
