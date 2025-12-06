import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface NavbarProps {
    isLoading?: boolean;
}

const Navbar = ({ isLoading = false }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent navbar toggling
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false); // Close navbar after clicking a link
        }
    };

    const leftItems = ['About', 'Stats', 'Schedule'];
    const rightItems = ['Prizes', 'Sponsors', 'FAQ'];

    const containerVariants: Variants = {
        closed: {
            width: '100px',
            height: '70px',
            borderRadius: '9999px',
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        open: {
            width: 'auto',
            height: '70px',
            borderRadius: '9999px',
            transition: { type: "spring", stiffness: 300, damping: 30 }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, scale: 0.8, display: 'none' }, // Check display none
        open: {
            opacity: 1,
            scale: 1,
            display: 'block',
            transition: { delay: 0.1, duration: 0.2 }
        }
    };

    return (
        <div className="fixed top-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
            {!isLoading && (
                <motion.nav
                    ref={navRef}
                    className="pointer-events-auto bg-black/50 backdrop-blur-2xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden cursor-pointer"
                    initial="closed"
                    animate={isOpen ? "open" : "closed"}
                    variants={containerVariants}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                className="flex items-center gap-8 px-8 font-inter text-base font-medium"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20, transition: { duration: 0.1 } }}
                            >
                                {leftItems.map((item) => (
                                    <Link
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        onClick={(e) => handleScroll(e, `#${item.toLowerCase()}`)}
                                        className="text-white hover:text-gold-500 transition-colors whitespace-nowrap"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        layoutId="main-logo"
                        className="relative w-12 h-12 shrink-0 mx-2 rounded-full overflow-hidden"
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        animate={{ rotate: isOpen ? 360 : 0 }}
                    >
                        <Image src="/logo.svg" alt="Singularity Logo" fill className="object-contain" />
                    </motion.div>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                className="flex items-center gap-8 px-8 font-inter text-base font-medium"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20, transition: { duration: 0.1 } }}
                            >
                                {rightItems.map((item) => (
                                    <Link
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        onClick={(e) => handleScroll(e, `#${item.toLowerCase()}`)}
                                        className="text-white hover:text-gold-500 transition-colors whitespace-nowrap"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.nav>
            )}
        </div>
    );
};

export default Navbar;
