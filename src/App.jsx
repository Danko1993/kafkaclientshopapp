import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Products from "./components/Products.jsx";
import Category from "./components/Category.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import LoginForm from "./components/LoginForm.jsx";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/all-products" element={<Products />} />
                <Route path="/categories/:categoryId" element={<Category />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
            </Routes>
        </>
    );
}

export default App;
