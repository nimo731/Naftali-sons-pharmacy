import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Pill, User, ShoppingBag, Upload, LogOut, Menu } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar glass">
            <div className="container nav-content">
                <Link to="/" className="nav-logo">
                    <Pill size={32} color="var(--primary)" />
                    <span>Naftali <span>&</span> Sons</span>
                </Link>

                <div className="nav-links">
                    <Link to="/products">Products</Link>
                    <Link to="/upload-prescription">Upload</Link>
                    <Link to="/contact">Contact</Link>

                    {user ? (
                        <div className="nav-user">
                            {user.role === 'admin' && <Link to="/admin">Dashboard</Link>}
                            <span className="user-name"><User size={18} /> {user.name}</span>
                            <button onClick={handleLogout} className="btn-logout"><LogOut size={18} /></button>
                        </div>
                    ) : (
                        <div className="nav-auth">
                            <Link to="/login" className="btn btn-outline">Login</Link>
                            <Link to="/register" className="btn btn-primary">Register</Link>
                        </div>
                    )}
                </div>

                <button className="nav-mobile-menu">
                    <Menu />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
