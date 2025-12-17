'use client';

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Rocket, Code, Users, Award, Calendar } from "lucide-react";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}

const milestones = [
    {
        year: "Dec 15",
        title: "Registration Opens",
        description: "Applications open for all tracks.",
        icon: <Rocket className="w-5 h-5 text-black" />,
    },
    {
        year: "Jan 17",
        title: "Opening Ceremony",
        description: "Kickoff and Problem Statements.",
        icon: <Calendar className="w-5 h-5 text-black" />,
    },
    {
        year: "Jan 17",
        title: "Hacking Starts",
        description: "Build your solutions.",
        icon: <Code className="w-5 h-5 text-black" />,
    },
    {
        year: "Jan 18",
        title: "Submission Deadline",
        description: "Submit your projects.",
        icon: <Award className="w-5 h-5 text-black" />,
    },
    {
        year: "Jan 18",
        title: "Closing Ceremony",
        description: "Winners Announcement.",
        icon: <Award className="w-5 h-5 text-black" />,
    },
];

export const Timeline = () => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className="w-full bg-black font-sans md:px-10"
            ref={containerRef}
            id="timeline"
        >
            <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center text-white font-orbitron">Flight Trajectory</h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto text-center font-inter mb-12">
                    Follow the mission path
                </p>

                <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                    {milestones.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="flex justify-start pt-10 md:pt-40 md:gap-10"
                        >
                            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black flex items-center justify-center">
                                    <div className="h-4 w-4 rounded-full bg-neutral-800 border border-neutral-700 p-2" />
                                </div>
                                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 font-orbitron ">
                                    {item.year}
                                </h3>
                            </div>

                            <div className="relative pl-20 pr-4 md:pl-4 w-full">
                                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 font-orbitron">
                                    {item.year}
                                </h3>
                                <div>
                                    <h4 className="text-2xl font-bold text-gold-500 mb-2 font-orbitron">{item.title}</h4>
                                    <p className="text-gray-300 font-inter text-base mb-4">{item.description}</p>
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold-500">
                                        {item.icon}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    <div
                        style={{
                            height: height + "px",
                        }}
                        className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                    >
                        <motion.div
                            style={{
                                height: heightTransform,
                                opacity: opacityTransform,
                            }}
                            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-gold-500 via-gold-600 to-transparent from-[0%] via-[10%] rounded-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timeline;
