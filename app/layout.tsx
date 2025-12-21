import type { Metadata } from "next";
import { Orbitron, Inter, JetBrains_Mono, Audiowide } from "next/font/google";
import "./globals.css";
import CircleCursor from "@/components/ui/circle-cursor";
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

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
});

const audiowide = Audiowide({
    weight: "400",
    variable: "--font-audiowide",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Singularity Hackathon",
    description: "KC's first 24 hour hackathon. ",
    icons: {
        icon: '/logo.svg',
    },
    metadataBase: new URL('https://www.singularityhack.tech'),
    openGraph: {
        title: "Singularity Hackathon",
        description: "Early bird tickets are out!",
        images: [
            {
                url: '/opengraph.jpg',
                width: 1200,
                height: 630,
                alt: 'Singularity Hackathon',
            }
        ],
        type: 'website',
        url: 'https://www.singularityhack.tech',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Singularity Hackathon",
        description: "Build the Future of the Galaxy",
        images: ['/opengraph.jpg'],
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
                className={`${orbitron.variable} ${inter.variable} ${jetbrainsMono.variable} ${audiowide.variable} antialiased bg-black text-white overflow-x-hidden font-jetbrains-mono`}
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
                <CircleCursor />
                <SmoothScroll />
                <BackgroundMusic />
                <div className="relative z-10">
                    {children}
                </div>
            </body>
        </html>
    );
}
