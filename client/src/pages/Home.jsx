import React, { useState, useEffect } from 'react';
import { Shield, Truck, Clock, Pill, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const slides = [
        {
            title: "FRESH START DEALS",
            subtitle: "Clear Skin Starts Here",
            description: "Great price. Because Naftali Cares.",
            image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            color: "#fce4ec",
            btnText: "SHOP NOW",
            link: "/products"
        },
        {
            title: "ESSENTIAL CARE",
            subtitle: "Your Family's Health First",
            description: "Trusted medical supplies and supplements delivered to you.",
            image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            color: "#e0f2f1",
            btnText: "BROWSE PRODUCTS",
            link: "/products"
        },
        {
            title: "QUICK PRESCRIPTIONS",
            subtitle: "Skip the Queue",
            description: "Upload your prescription and we'll handle the rest.",
            image: "https://images.unsplash.com/photo-1576091160550-217359f48f4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            color: "#fff9c4",
            btnText: "UPLOAD NOW",
            link: "/upload-prescription"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    return (
        <div className="home">
            {/* Sliding Hero Section */}
            <section className="hero-slider">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundColor: slide.color }}
                    >
                        <div className="container slide-content">
                            <div className="slide-text animate-fade">
                                <span className="slide-label">{slide.title}</span>
                                <h2>{slide.subtitle}</h2>
                                <p>{slide.description}</p>
                                <Link to={slide.link} className="btn btn-primary btn-lg">{slide.btnText}</Link>
                            </div>
                            <div className="slide-image">
                                <img src={slide.image} alt={slide.title} />
                            </div>
                        </div>
                    </div>
                ))}

                <button className="slider-btn prev" onClick={prevSlide}><ChevronLeft size={32} /></button>
                <button className="slider-btn next" onClick={nextSlide}><ChevronRight size={32} /></button>

                <div className="slider-dots">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        ></span>
                    ))}
                </div>
            </section>

            {/* Trust Badges */}
            <section className="trust-badges container">
                <div className="badge-item">
                    <Truck size={24} />
                    <div>
                        <h4>Express Delivery</h4>
                        <p>Same day delivery if ordered by 7 PM</p>
                    </div>
                </div>
                <div className="badge-item">
                    <Shield size={24} />
                    <div>
                        <h4>Quality Assured</h4>
                        <p>100% Genuine products</p>
                    </div>
                </div>
                <div className="badge-item">
                    <Clock size={24} />
                    <div>
                        <h4>24/7 Support</h4>
                        <p>Always here for you</p>
                    </div>
                </div>
                <div className="badge-item">
                    <Pill size={24} />
                    <div>
                        <h4>Wide Range</h4>
                        <p>Over 10,000 products</p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services container">
                <h2 className="section-title">Our Specialized Services</h2>
                <div className="services-grid">
                    <ServiceCard
                        icon={<Shield size={32} />}
                        title="Telemedicine"
                        description="Consult with our partner doctors online."
                    />
                    <ServiceCard
                        icon={<Truck size={32} />}
                        title="Chronic Care"
                        description="Monthly refills delivered automatically."
                    />
                    <ServiceCard
                        icon={<Clock size={32} />}
                        title="Vaccinations"
                        description="In-store vaccination services available."
                    />
                    <ServiceCard
                        icon={<Pill size={32} />}
                        title="Lab Tests"
                        description="Book diagnostic tests through our platform."
                    />
                </div>
            </section>

            {/* Quick Action */}
            <section className="quick-action">
                <div className="container action-box glass">
                    <h2>Submit Your Prescription</h2>
                    <p>Quick, easy and secure. We'll handle the rest.</p>
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
