import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import UploadPrescription from './pages/UploadPrescription';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Navbar />
                    <main style={{ minHeight: '80vh' }}>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/upload-prescription" element={<UploadPrescription />} />
                            <Route path="/contact" element={<Contact />} />

                            {/* Secret Admin Routes */}
                            <Route path="/admin-portal" element={<AdminLogin />} />
                            <Route path="/admin" element={<AdminDashboard />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
