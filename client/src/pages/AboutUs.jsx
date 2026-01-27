import React from 'react';
import { Target, Users, Award, ShieldCheck } from 'lucide-react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-page animate-fade">
            {/* Header Section */}
            <section className="about-header container">
                <h1>About Naftali & Sons</h1>
                <p className="subtitle">Your health is our legacy. Trusted since 1995.</p>
            </section>

            {/* Story Section */}
            <section className="about-story container">
                <div className="story-image">
                    <img src="https://images.unsplash.com/photo-1579152276503-34e8574c760a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Our Pharmacy" />
                </div>
                <div className="story-text">
                    <h2>Our Story</h2>
                    <p>
                        Naftali & Sons Pharmacy began with a simple mission: to provide personalized, high-quality pharmaceutical care to our community.
                        For over three decades, we have evolved from a small neighborhood shop into a modern health hub, yet our core values remain unchanged.
                    </p>
                    <p>
                        We believe that a pharmacy is more than just a place to pick up prescriptions—it's a critical part of the healthcare ecosystem where patients receive
                        expert advice and compassionate support.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="about-values bg-accent">
                <div className="container">
                    <h2 className="section-title">Our Core Values</h2>
                    <div className="values-grid">
                        <ValueCard
                            icon={<Target size={32} />}
                            title="Patient Focus"
                            description="Every decision we make starts with the well-being of our patients."
                        />
                        <ValueCard
                            icon={<ShieldCheck size={32} />}
                            title="Quality & Trust"
                            description="We adhere to the highest standards of safety and pharmaceutical excellence."
                        />
                        <ValueCard
                            icon={<Award size={32} />}
                            title="Innovation"
                            description="Embracing digital technology to make healthcare more accessible."
                        />
                        <ValueCard
                            icon={<Users size={32} />}
                            title="Community"
                            description="Supporting the health and growth of the people we serve."
                        />
                    </div>
                </div>
            </section>

            {/* Team Section Placeholder */}
            <section className="about-team container">
                <h2 className="section-title">Guided by Professionals</h2>
                <p className="description-center">
                    Our team of licensed pharmacists and healthcare experts are dedicated to ensuring you get the right care at the right time.
                </p>
                <div className="team-grid">
                    {/* Team members can be added here */}
                </div>
            </section>
        </div>
    );
};

const ValueCard = ({ icon, title, description }) => (
    <div className="value-card glass">
        <div className="value-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

export default AboutUs;
