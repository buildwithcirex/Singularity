import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import CanvasCursor from "@/components/ui/canvas-cursor";
import Galaxy from "@/components/ui/Galaxy";
import BackgroundMusic from "@/components/BackgroundMusic";
import SmoothScroll from "@/components/ui/smooth-scroll";

const orbitron = Orbitron({
    variable: "--font-orbitron",
    subsets: ["latin"],
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Singularity Hackathon",
    description: "Build the Future of the Galaxy",
    icons: {
        icon: '/logo.svg',
    },
    openGraph: {
        title: "Singularity Hackathon",
        description: "Build the Future of the Galaxy",
        images: ['/thumb.png'],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Singularity Hackathon",
        description: "Build the Future of the Galaxy",
        images: ['/thumb.png'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${orbitron.variable} ${inter.variable} antialiased bg-black text-white overflow-x-hidden`}
            >
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <Galaxy
                        mouseRepulsion={true}
                        mouseInteraction={true}
                        density={0.8}
                        glowIntensity={0.15}
                        saturation={0}
                        hueShift={240}
                    />
                </div>
                <CanvasCursor />
                <SmoothScroll />
                <BackgroundMusic />
                <div className="relative z-10">
                    {children}
                </div>
            </body>
        </html>
    );
}
