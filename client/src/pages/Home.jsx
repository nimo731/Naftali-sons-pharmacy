import React, { useState, useEffect } from 'react';
import { Shield, Truck, Clock, Pill, ChevronLeft, ChevronRight, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const slides = [
        {
            title: "PREMIUM CARE",
            subtitle: "Personalized Health Solutions",
            description: "Experience the next generation of pharmaceutical care with Naftali & Sons.",
            image: "https://images.unsplash.com/photo-1631549916768-4119b295f926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            color: "rgba(0, 137, 123, 0.05)",
            btnText: "Explore Shop",
            link: "/products"
        },
        {
            title: "SKIN CLINIC",
            subtitle: "Radiance Starts from Within",
            description: "Dermatologist-approved skincare and beauty essentials for every skin type.",
            image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
            color: "rgba(255, 152, 0, 0.05)",
            btnText: "Shop Beauty",
            link: "/products"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="home-overhaul">
            {/* Dynamic Hero Slider */}
            <section className="hero-section">
                <div className="slider-wrapper">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ background: slide.color }}
                        >
                            <div className="container slide-inner">
                                <div className="content-box">
                                    <div className="badge-new">New Collection 2026</div>
                                    <h1 className="hero-title">{slide.subtitle}</h1>
                                    <p className="hero-desc">{slide.description}</p>
                                    <div className="hero-actions">
                                        <Link to={slide.link} className="btn btn-primary btn-lg">
                                            {slide.btnText} <ArrowRight size={20} />
                                        </Link>
                                        <Link to="/about" className="btn btn-outline btn-lg">Our Story</Link>
                                    </div>
                                </div>
                                <div className="image-box">
                                    <div className="image-blob"></div>
                                    <img src={slide.image} alt="Healthcare" className="main-img" />
                                    <div className="floating-card glass">
                                        <Star color="var(--secondary)" fill="var(--secondary)" size={16} />
                                        <span>Trusted by 50k+ Customers</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="slider-controls">
                        <button className="ctrl-btn" onClick={() => setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1)}><ChevronLeft /></button>
                        <div className="dot-indicators">
                            {slides.map((_, i) => (
                                <span key={i} className={`dot ${i === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(i)}></span>
                            ))}
                        </div>
                        <button className="ctrl-btn" onClick={() => setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1)}><ChevronRight /></button>
                    </div>
                </div>
            </section>

            {/* Trust & Value Grid */}
            <section className="value-strip">
                <div className="container strip-inner glass">
                    <ValueItem icon={<Truck />} title="Fast Delivery" desc="Within 2 hours in Nairobi" />
                    <ValueItem icon={<Shield />} title="Secure Checkout" desc="100% Encrypted Payments" />
                    <ValueItem icon={<Pill />} title="Genuine Meds" desc="Sourced from top labs" />
                    <ValueItem icon={<Clock />} title="24/7 Support" desc="Licensed Pharmacists" />
                </div>
            </section>

            {/* Category Showcases */}
            <section className="featured-categories container section-padding">
                <div className="section-header-centered">
                    <span className="sub-title">Shop by Category</span>
                    <h2>Health Essentials for Every Need</h2>
                </div>
                <div className="category-reveal-grid">
                    <CategoryCard
                        title="Prescription Meds"
                        img="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                        link="/upload-prescription"
                    />
                    <CategoryCard
                        title="Beauty & Glow"
                        img="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                        link="/products"
                    />
                    <CategoryCard
                        title="Wellness & Vitamins"
                        img="https://images.unsplash.com/photo-1550573105-342881512f45?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                        link="/products"
                    />
                </div>
            </section>

            {/* Prescription CTA Overhaul */}
            <section className="prescription-cta">
                <div className="container">
                    <div className="cta-card glass overflow-hidden">
                        <div className="cta-content">
                            <h2>Skip the long pharmacy queues</h2>
                            <p>Just upload a photo of your prescription and our experts will handle the rest. We deliver to your doorstep or have it ready for pickup.</p>
                            <div className="cta-steps">
                                <div className="c-step"><span>1</span> Upload Photo</div>
                                <div className="c-step"><span>2</span> Pharmacist Review</div>
                                <div className="c-step"><span>3</span> Express Delivery</div>
                            </div>
                            <Link to="/upload-prescription" className="btn btn-primary btn-lg mt-2">
                                Start My Upload
                            </Link>
                        </div>
                        <div className="cta-visual">
                            <img src="https://images.unsplash.com/photo-1550573105-342881512f45?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Prescription" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ValueItem = ({ icon, title, desc }) => (
    <div className="value-item">
        <div className="vi-icon">{icon}</div>
        <div className="vi-text">
            <h5>{title}</h5>
            <p>{desc}</p>
        </div>
    </div>
);

const CategoryCard = ({ title, img, link }) => (
    <Link to={link} className="cat-reveal-card">
        <div className="card-overlay"></div>
        <img src={img} alt={title} />
        <div className="card-content">
            <h3>{title}</h3>
            <span className="shop-link">Explore Now <ArrowRight size={16} /></span>
        </div>
    </Link>
);

export default Home;
