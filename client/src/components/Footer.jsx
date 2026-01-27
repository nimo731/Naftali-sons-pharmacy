import React from 'react';
import { Pill, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <Pill size={32} />
                        <h2>Naftali & Sons</h2>
                    </div>
                    <p>Your trusted neighborhood pharmacy since 1995. Quality care you can count on.</p>
                    <div className="social-links">
                        <Facebook size={20} />
                        <Twitter size={20} />
                        <Instagram size={20} />
                    </div>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/upload-prescription">Prescriptions</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h3>Contact Us</h3>
                    <p><MapPin size={18} /> 123 Pharmacy St, Nairobi, Kenya</p>
                    <p><Phone size={18} /> +254 700 000000</p>
                    <p><Mail size={18} /> info@naftalipharmacy.com</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Naftali & Sons Pharmacy. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
