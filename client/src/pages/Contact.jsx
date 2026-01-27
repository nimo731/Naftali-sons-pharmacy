import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page container">
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

                <form className="contact-form glass">
                    <h2>Send a Message</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Your Name</label>
                            <input type="text" placeholder="John Doe" required />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" placeholder="john@example.com" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Subject</label>
                        <input type="text" placeholder="How can we help?" required />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea rows="5" placeholder="Type your message here..." required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
