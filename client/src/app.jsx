import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/home';
import Layout from './components/JSX/layout';
import Sell_Rent from './pages/sellRent';
import Search from './pages/searchBuy';
import SignUp from './pages/userSignUp';
import PropertyListing from './pages/propertyListing';
import ContactUsPage from './pages/contactUs';
import ScrollToTop from './components/JSX/scrollToTop';
import './components/styles/global-Styles.css';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const storedLoggedIn = localStorage.getItem('isLoggedIn');
        const storedUsername = localStorage.getItem('username');
        const storedUserId = localStorage.getItem('userId');

        if (storedLoggedIn) {
            setIsLoggedIn(JSON.parse(storedLoggedIn));
        }

        if (storedUsername) {
            setUsername(storedUsername);
        }

        if (storedUserId) {
            setUserId(storedUserId);
        }

    }, []);

    const handleLogin = (username, userId) => {
        setIsLoggedIn(true);
        setUsername(username);
        setUserId(userId);
        // Store state in localStorage
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('username', username);
        localStorage.setItem('userId', userId);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername("");
        setUserId("");
        // Clear localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
    };

    return (
        <Router>
            <ScrollToTop />
            <Layout isLoggedIn={isLoggedIn} username={username} userId={userId} onLogin={handleLogin} onLogout={handleLogout}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Buy" element={<Search />} />
                    <Route path="/Listing" element={<PropertyListing />} />
                    <Route path="/ContactUs" element={<ContactUsPage />} />

                    {!isLoggedIn ? (
                        <>
                            <Route path="/SignUp" element={<SignUp />} />
                            <Route path="/Sell" element={<SignUp />} />
                            <Route path="/Rent" element={<SignUp />} />
                        </>
                    ) : (
                        <>
                            <Route path="/SignUp" element={<Home />} />
                            <Route path="/Sell" element={<Sell_Rent Upload_Type='sale' />} />
                            <Route path="/Rent" element={<Sell_Rent Upload_Type='rent' />} />
                        </>
                    )}
                </Routes>
            </Layout>
        </Router>
    );
}
