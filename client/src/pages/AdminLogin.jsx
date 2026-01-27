import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock } from 'lucide-react';
import './Auth.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/admin');
        } catch (err) {
            setError('Invalid admin credentials');
        }
    };

    return (
        <div className="auth-container admin-portal-bg">
            <form className="auth-form glass animate-fade" onSubmit={handleSubmit}>
                <div className="admin-icon-header">
                    <Lock size={40} color="var(--primary)" />
                </div>
                <h2>Admin Portal</h2>
                <p>Restricted access for authorized personnel only.</p>

                {error && <div className="error-msg">{error}</div>}

                <div className="form-group">
                    <label>Admin ID / Email</label>
                    <input
                        type="email"
                        placeholder="admin@naftali.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Security Key</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full shadow-lg">Authenticate</button>
            </form>
        </div>
    );
};

export default AdminLogin;
