import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from '../pages/Home';
import Feed from './Feed';
import Profile from './Profile';

const Body = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="/" element={<Feed />} />
                    <Route path="/profile/:id" element={<Profile />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default Body;
