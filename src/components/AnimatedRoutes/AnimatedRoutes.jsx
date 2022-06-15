import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Dashboard from '../../views/Dashboard/Dashboard';
import Login from '../../views/Login/Login';
import Publishers from '../../views/Publishers/Publishers';
import Books from '../../views/Books/Books';
import Rents from '../../views/Rents/Rents';
import Customers from '../../views/Customers/Customers';

import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" exact element={<Login />} />
                <Route path="/dashboard" exact element={<Dashboard />} />
                <Route path="/publishers" exact element={<Publishers />} />
                <Route path="/books" exact element={<Books />} />
                <Route path="/rents" exact element={<Rents />} />
                <Route path="/customers" exact element={<Customers />} />
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;
