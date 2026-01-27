import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/messages', formData);
            setStatus({ type: 'success', message: 'Message sent! We\'ll get back to you soon.' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        }
        setLoading(false);
    };

    return (
        <div className="contact-page container animate-fade">
            <div className="contact-header">
                <h1>Get in Touch</h1>
                <p>We're here to help with your health and medication needs.</p>
            </div>

            <div className="contact-grid">
                <div className="contact-info">
                    <div className="info-card glass">
                        <div className="info-icon"><Phone color="white" /></div>
                        <div>
                            <h3>Call Us</h3>
                            <p>+254 700 000000</p>
                            <p>+254 711 000000</p>
                        </div>
                    </div>

                    <div className="info-card glass">
                        <div className="info-icon"><Mail color="white" /></div>
                        <div>
                            <h3>Email</h3>
                            <p>info@naftalipharmacy.com</p>
                            <p>support@naftalipharmacy.com</p>
                        </div>
                    </div>

                    <div className="info-card glass">
                        <div className="info-icon"><MapPin color="white" /></div>
                        <div>
                            <h3>Location</h3>
                            <p>Main Branch: 123 Health Ave, Nairobi</p>
                            <p>Westlands: 45 Cure Rd, Nairobi</p>
                        </div>
                    </div>

                    <div className="info-card glass">
                        <div className="info-icon"><Clock color="white" /></div>
                        <div>
                            <h3>Working Hours</h3>
                            <p>Mon - Sat: 8:00 AM - 9:00 PM</p>
                            <p>Sun: 10:00 AM - 4:00 PM</p>
                        </div>
                    </div>
                </div>

                <form className="contact-form glass" onSubmit={handleSubmit}>
                    <h2>Send a Message</h2>
                    {status.message && (
                        <div className={`status-msg ${status.type}`}>
                            {status.message}
                        </div>
                    )}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="How can we help?"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea
                            rows="5"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Type your message here..."
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
