import React from 'react';
import { Pill, Activity, Heart, Thermometer, Shield } from 'lucide-react';

const AnimatedBackground = () => {
    return (
        <div className="animated-bg">
            <Pill className="bg-icon" />
            <Activity className="bg-icon" />
            <Heart className="bg-icon" />
            <Thermometer className="bg-icon" />
            <Shield className="bg-icon" />
            <Pill className="bg-icon" style={{ left: '40%', animationDelay: '3s' }} />
            <Heart className="bg-icon" style={{ left: '65%', animationDelay: '7s' }} />
        </div>
    );
};

export default AnimatedBackground;
