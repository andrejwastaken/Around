import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import '../App.css';
import Signup from "./Signup";
import {AuthProvider, useAuth} from '../contexts/AuthContext';
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Weather from "./Weather";
import Map from "./Map";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Main />
            </AuthProvider>
        </Router>
    );
}

function Main() {
    const location = useLocation();
    const showHeaderAndFooter = location.pathname === '/';
    const {currentUser, logout} = useAuth();
    return (
        <div>
            {showHeaderAndFooter && <Header loggedIn={!!currentUser} onLogout={logout} />}
            <Routes>
                <Route path="" element={<HomePage />} />
                <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                <Route path="/update-profile" element={<PrivateRoute element={<UpdateProfile />} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
            {showHeaderAndFooter && <Footer />}
        </div>
    );
}

function HomePage() {
    return (
        <div>
            <Weather />
            <Map />
        </div>
    );
}

export default App;
