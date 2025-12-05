import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import CanvasCursor from "@/components/ui/canvas-cursor";
import Galaxy from "@/components/ui/Galaxy";

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
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${orbitron.variable} ${inter.variable} antialiased bg-black text-white overflow-x-hidden`}
            >
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <Galaxy
                        mouseRepulsion={true}
                        mouseInteraction={true}
                        density={5}
                        glowIntensity={0.3}
                        saturation={0}
                        hueShift={240}
                    />
                </div>
                <CanvasCursor />
                <div className="relative z-10">
                    {children}
                </div>
            </body>
        </html>
    );
}
