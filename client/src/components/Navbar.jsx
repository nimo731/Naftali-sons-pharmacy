import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Pill, User, LogOut, Menu, ShoppingBag } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar glass animate-fade">
            <div className="container nav-content">
                <Link to="/" className="nav-logo">
                    <Pill size={32} color="var(--primary)" />
                    <span>Naftali <span>&</span> Sons</span>
                </Link>

                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/products">Shop</Link>
                    <Link to="/upload-prescription">Prescriptions</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                <div className="nav-actions">
                    {user ? (
                        <div className="nav-user">
                            <span className="user-name"><User size={18} /> {user.name.split(' ')[0]}</span>
                            <button onClick={handleLogout} className="btn-logout" title="Logout"><LogOut size={16} /></button>
                        </div>
                    ) : (
                        <div className="nav-auth">
                            <Link to="/login" className="btn-nav-login">Login</Link>
                            <Link to="/register" className="btn btn-primary btn-nav-register">Join Us</Link>
                        </div>
                    )}
                </div>

                <button className="nav-mobile-menu" style={{ display: 'none' }}>
                    <Menu />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
