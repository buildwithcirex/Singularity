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
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <main className="flex min-h-screen flex-col">
            <AnimatePresence mode="wait">
                {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>
            <Navbar isLoading={isLoading} />
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
