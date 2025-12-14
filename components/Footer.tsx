import { Twitter, Instagram, Mail } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="py-12 px-6 border-t border-white/10 bg-black relative z-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-2xl font-orbitron font-bold text-white mb-2">Singularity</span>
                    <p className="text-gray-400 font-inter text-sm">Launching the Next Generation of Innovators</p>
                </div>

                <div className="flex items-center gap-6">
                    <Link href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                        <Twitter className="w-6 h-6" />
                    </Link>
                    <Link href="https://www.instagram.com/singularity.hack" className="text-gray-400 hover:text-gold-500 transition-colors">
                        <Instagram className="w-6 h-6" />
                    </Link>
                    <Link href="mailto:singularity@kccemsr.edu.in" className="text-gray-400 hover:text-gold-500 transition-colors">
                        <Mail className="w-6 h-6" />
                    </Link>
                </div>

                <div className="text-gray-500 text-sm font-inter">
                    © 2025 Singularity Hackathon. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
