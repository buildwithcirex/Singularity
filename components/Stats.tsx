'use client';

import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const StatItem = ({ value, label, prefix = '', suffix = '' }: { value: number; label: string; prefix?: string; suffix?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepTime = duration / steps;
            const increment = value / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, stepTime);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <div ref={ref} className="flex flex-col items-center p-6">
            <span className="text-5xl md:text-7xl font-orbitron font-bold text-gold-500 mb-2">
                {prefix}{count}{suffix}
            </span>
            <span className="text-xl font-inter text-white uppercase tracking-widest">{label}</span>
        </div>
    );
};

const Stats = () => {
    return (
        <section id="stats" className="py-20 bg-black/50 backdrop-blur-sm border-y border-white/10 relative z-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatItem value={15000} label="Prize Pool" prefix="₹" suffix="+" />
                    <StatItem value={400} label="Participants" suffix="+" />
                    <StatItem value={120} label="Teams" suffix="+" />
                    <StatItem value={120} label="Projects" suffix="+" />
                </div>
            </div>
        </section>
    );
};

export default Stats;
