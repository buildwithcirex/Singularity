'use client';

import { ScrollTimeline } from "@/components/ui/scroll-timeline";
import { Rocket, Code, Users, Award, Calendar } from "lucide-react";

const milestones = [
    {
        year: "Dec 15",
        title: "Registration Opens",
        description: "Applications open for all tracks.",
        icon: <Rocket className="w-4 h-4 text-gold-500" />,
    },
    {
        year: "Jan 17",
        title: "Opening Ceremony",
        description: "Kickoff and Problem Statements.",
        icon: <Calendar className="w-4 h-4 text-gold-500" />,
    },
    {
        year: "Jan 17",
        title: "Hacking Starts",
        description: "Build your solutions.",
        icon: <Code className="w-4 h-4 text-gold-500" />,
    },
    {
        year: "Jan 18",
        title: "Submission Deadline",
        description: "Submit your projects.",
        icon: <Award className="w-4 h-4 text-gold-500" />,
    },
    {
        year: "Jan 18",
        title: "Closing Ceremony",
        description: "Winners Announcement.",
        icon: <Award className="w-4 h-4 text-gold-500" />,
    },
];

const Timeline = () => {
    return (
        <section id="schedule" className="py-20 relative z-10">
            <ScrollTimeline
                events={milestones}
                title="Flight Trajectory"
                subtitle="Follow the mission path"
                lineColor="bg-gold-500/30"
                activeColor="bg-gold-500"
                cardVariant="outlined"
                cardEffect="glow"
            />
        </section>
    );
};

export default Timeline;
