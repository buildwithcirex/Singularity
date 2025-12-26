'use client';

import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Preloader from "@/components/Preloader";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";

// Dynamically import components below the fold
const About = dynamic(() => import("@/components/About"));
const Stats = dynamic(() => import("@/components/Stats"));
const Timeline = dynamic(() => import("@/components/Timeline"));
const Prizes = dynamic(() => import("@/components/Prizes"));
const Sponsors = dynamic(() => import("@/components/Sponsors"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    
    useKeyboardNavigation(() => setIsNavbarOpen(prev => !prev));

    return (
        <main className="flex min-h-screen flex-col">
            <AnimatePresence>
                {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>
            <Navbar isLoading={isLoading} isOpen={isNavbarOpen} setIsOpen={setIsNavbarOpen} />
            <KeyboardShortcuts />
            <Hero />
            <About />
            <Stats />
            <Timeline />
            <Prizes />
            
            <FAQ />
            <Footer />
        </main>
    );
}
