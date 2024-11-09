import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import UserPanel from "./components/UserPanel.jsx";
import Category from "./components/Category.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import LoginForm from "./components/LoginForm.jsx";
import {useAuth} from "./AuthContext.jsx";
import EmployeeNavbar from "./components/EmployeeNavbar.jsx";
import Products from "./components/Products.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Forbiden from "./components/Forbiden.jsx";

function App() {
    const {user}= useAuth();


    return (
        <>

            {user && user.roles.includes("ADMIN")|| user && user.roles.includes("EMPLOYEE")?
                (<EmployeeNavbar/>):
                (<Navbar/>)}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<UserPanel/>} />
                <Route path="/categories/:categoryName" element={<Category />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/forbidden" element={<Forbiden/>} />
                <Route
                    path="/products"
                    element={
                        <ProtectedRoute roles={['EMPLOYEE', 'ADMIN']}>
                            <Products />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </>
    );
}

export default App;
