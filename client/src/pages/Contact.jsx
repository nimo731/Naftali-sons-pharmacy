import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Clock, Send, MessageSquareText } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/messages', formData);
            setStatus({ type: 'success', message: 'Message sent! We\'ll get back to you soon.' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to send message.' });
        }
        setLoading(false);
    };

    return (
        <div className="contact-overhaul section-padding animate-fade">
            <div className="container">
                <div className="contact-card-wrapper glass">
                    <div className="contact-sidebar bg-primary-dark">
                        <h2 className="text-white">Reach Out to Us</h2>
                        <p className="text-white-50">Have questions about your medication or orders? We're here 24/7 to support your needs.</p>

                        <div className="contact-methods">
                            <ContactLink icon={<Phone />} title="Emergency Line" val="+254 700 000000" />
                            <ContactLink icon={<Mail />} title="Support Email" val="help@naftali.com" />
                            <ContactLink icon={<MapPin />} title="Main HQ" val="123 Health Ave, Nairobi" />
                            <ContactLink icon={<Clock />} title="Opening Hours" val="Mon-Sat: 8am - 9pm" />
                        </div>

                        <div className="social-group">
                            {/* Icons could go here */}
                        </div>
                    </div>

                    <div className="contact-main">
                        <div className="form-header">
                            <MessageSquareText size={40} color="var(--primary)" />
                            <h3>Write us a message</h3>
                            <p>Our pharmacists usually respond within 15 minutes.</p>
                        </div>

                        {status.message && <div className={`status-pill ${status.type}`}>{status.message}</div>}

                        <form onSubmit={handleSubmit} className="modern-form">
                            <div className="input-row">
                                <div className="field-group">
                                    <label>Full Name</label>
                                    <input type="text" placeholder="John Doe" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div className="field-group">
                                    <label>Email Address</label>
                                    <input type="email" placeholder="john@example.com" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                            </div>
                            <div className="field-group">
                                <label>Inquiry Subject</label>
                                <input type="text" placeholder="e.g. Prescription Status" required value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                            </div>
                            <div className="field-group">
                                <label>Message Content</label>
                                <textarea rows="4" placeholder="How can we help you today?" required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary w-full shadow-lg h-14" disabled={loading}>
                                {loading ? 'Sending...' : 'Transmit Message'} <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContactLink = ({ icon, title, val }) => (
    <div className="c-link-item">
        <div className="cl-icon">{icon}</div>
        <div className="cl-meta">
            <span>{title}</span>
            <strong>{val}</strong>
        </div>
    </div>
);

export default Contact;
