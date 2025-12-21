import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
    isLoading?: boolean;
    isOpen?: boolean;
    setIsOpen?: (open: boolean) => void;
}

const Navbar = ({ isLoading = false, isOpen: externalIsOpen, setIsOpen: externalSetIsOpen }: NavbarProps) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
    const setIsOpen = externalSetIsOpen || setInternalIsOpen;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent navbar toggling
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false); // Close desktop navbar
            setIsMobileMenuOpen(false); // Close mobile navbar
        }
    };

    const leftItems = ['About', 'Stats', 'Schedule'];
    const rightItems = ['Prizes', 'Sponsors', 'FAQ'];
    const allItems = [...leftItems, ...rightItems];

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
        <>
            {/* Desktop Navbar */}
            <div className="fixed top-8 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none">
                {!isLoading && (
                    <motion.nav
                        ref={navRef}
                        className="pointer-events-auto bg-black/50 backdrop-blur-2xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden cursor-pointer"
                        initial="closed"
                        animate={isOpen ? "open" : "closed"}
                        variants={containerVariants}
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
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
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            animate={{ scale: isOpen ? 1.2 : 1 }}
                        >
                            <Image src="/logo1.svg" alt="Singularity Logo" fill className="object-contain" />
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

            {/* Mobile Navbar Button */}
            <div className="fixed top-6 right-6 z-50 md:hidden">
                {!isLoading && (
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-white"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                )}
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
                    >
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="flex flex-col items-center gap-8">
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: 'spring' }}
                                className="relative w-20 h-20 mb-8"
                            >
                                <Image src="/logo1.svg" alt="Singularity Logo" fill className="object-contain" />
                            </motion.div>

                            {allItems.map((item, index) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                >
                                    <Link
                                        href={`#${item.toLowerCase()}`}
                                        onClick={(e) => handleScroll(e, `#${item.toLowerCase()}`)}
                                        className="text-2xl font-orbitron font-bold text-white hover:text-gold-500 transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
