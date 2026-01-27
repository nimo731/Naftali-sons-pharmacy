import React from 'react';
import { Shield, Truck, Clock, Pill } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-content animate-fade">
                    <div className="hero-text">
                        <h1>Naftali & Sons Pharmacy</h1>
                        <p className="subtitle">Quality Health Care, Delivered to Your Doorstep.</p>
                        <p className="description">
                            Upload your prescription and get your medications delivered or ready for pickup in minutes.
                            Trusted by thousands for reliable pharmaceutical services.
                        </p>
                        <div className="hero-btns">
                            <Link to="/upload-prescription" className="btn btn-primary btn-lg">Upload Prescription</Link>
                            <Link to="/products" className="btn btn-outline btn-lg">Browse Products</Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src="https://images.unsplash.com/photo-1586015555751-63bb77f4323a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Pharmacy" />
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services container">
                <h2 className="section-title">Our Services</h2>
                <div className="services-grid">
                    <ServiceCard
                        icon={<Shield size={32} />}
                        title="Quality Assured"
                        description="We only source medications from certified manufacturers."
                    />
                    <ServiceCard
                        icon={<Truck size={32} />}
                        title="Fast Delivery"
                        description="Get your meds delivered to your home or office within 2 hours."
                    />
                    <ServiceCard
                        icon={<Clock size={32} />}
                        title="24/7 Support"
                        description="Our pharmacists are always available for consultation."
                    />
                    <ServiceCard
                        icon={<Pill size={32} />}
                        title="Wide Range"
                        description="Extensive stock of prescription and OTC medications."
                    />
                </div>
            </section>

            {/* Quick Action */}
            <section className="quick-action">
                <div className="container action-box glass">
                    <h2>Need help with your prescription?</h2>
                    <p>Send us a clear photo of your prescription and we'll handle the rest.</p>
                    <Link to="/upload-prescription" className="btn btn-primary">Start Upload</Link>
                </div>
            </section>
        </div>
    );
};

const ServiceCard = ({ icon, title, description }) => (
    <div className="service-card animate-fade">
        <div className="service-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

export default Home;
