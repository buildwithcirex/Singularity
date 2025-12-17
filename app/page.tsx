'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Timeline from "@/components/Timeline";
import Prizes from "@/components/Prizes";
import Sponsors from "@/components/Sponsors";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";

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
            <Sponsors />
            <FAQ />
            <Footer />
        </main>
    );
}
