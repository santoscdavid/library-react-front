import { useContext } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Dashboard from '../../views/Dashboard/Dashboard';
import Login from '../../views/Login/Login';
import Publishers from '../../views/Publishers/Publishers';
import Books from '../../views/Books/Books';
import Rents from '../../views/Rents/Rents';
import Customers from '../../views/Customers/Customers';
import { toast } from 'react-toastify';

import { AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';

function AnimatedRoutes() {
    const location = useLocation();
    const { isAuth } = useContext(AuthContext);

    function RequireAuth({ children }) {
        if (!isAuth) {
            toast.error('Acesso não autorizado');
            return <Navigate to="/" state={{ from: location }} replace />;
        }

        return children;
    }

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" exact element={<Login />} />
                <Route
                    path="/dashboard"
                    exact
                    element={
                        <RequireAuth>
                            <Dashboard />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/publishers"
                    exact
                    element={
                        <RequireAuth>
                            <Publishers />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/books"
                    exact
                    element={
                        <RequireAuth>
                            <Books />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/rents"
                    exact
                    element={
                        <RequireAuth>
                            <Rents />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/customers"
                    exact
                    element={
                        <RequireAuth>
                            <Customers />
                        </RequireAuth>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;
