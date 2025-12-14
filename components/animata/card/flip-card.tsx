import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface FlipCardProps {
    image: string;
    title: string;
    description: string;
    subtitle?: string;
    rotate?: "x" | "y";
}

export default function FlipCard({
    image,
    title,
    description,
    subtitle,
    rotate = "y",
}: FlipCardProps) {
    const hoverTransform = rotate === "x" ? "group-hover:[transform:rotateX(180deg)]" : "group-hover:[transform:rotateY(180deg)]";
    const activeTransform = rotate === "x" ? "[transform:rotateX(180deg)]" : "[transform:rotateY(180deg)]";
    const backFaceTransform = rotate === "x" ? "[transform:rotateX(180deg)]" : "[transform:rotateY(180deg)]";

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className="group h-96 w-72 sm:w-80 [perspective:1000px] cursor-pointer"
            onClick={handleFlip}
        >
            <div
                className={`relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${hoverTransform} ${isFlipped ? activeTransform : ''}`}
            >
                {/* Front Face */}
                <div className="absolute inset-0 h-full w-full rounded-xl bg-black/40 border border-white/10 [backface-visibility:hidden] overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Back Face */}
                <div
                    className={`absolute inset-0 h-full w-full rounded-xl bg-black/90 border border-gold-500/30 px-8 text-center text-slate-200 ${backFaceTransform} [backface-visibility:hidden]`}
                >
                    <div className="flex min-h-full flex-col items-center justify-center">
                        <h3 className="text-2xl font-bold text-white mb-4 font-orbitron">{title}</h3>
                        <p className="text-base text-gray-300 font-inter leading-relaxed">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
