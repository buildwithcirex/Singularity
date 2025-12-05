import { cn } from "@/lib/utils";

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
    image: string;
    title: string;
    description: string;
    subtitle?: string;
    rotate?: "x" | "y";
    imageClassName?: string;
}

export default function FlipCard({
    image,
    title,
    description,
    subtitle,
    rotate = "y",
    className,
    imageClassName,
    ...props
}: FlipCardProps) {
    const rotationClass = {
        x: ["group-hover:[transform:rotateX(180deg)]", "[transform:rotateX(180deg)]"],
        y: ["group-hover:[transform:rotateY(180deg)]", "[transform:rotateY(180deg)]"],
    };
    const self = rotationClass[rotate];

    return (
        <div className={cn("group h-[500px] w-[500px] max-w-full [perspective:1000px]", className)} {...props}>
            <div
                className={cn(
                    "relative h-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d]",
                    self[0],
                )}
            >
                {/* Front */}
                <div className="absolute h-full w-full [backface-visibility:hidden] bg-black rounded-2xl">
                    <img
                        src={image}
                        alt="image"
                        className={cn("h-full w-full rounded-2xl object-cover", imageClassName)}
                    />
                    <div className="absolute bottom-6 left-6 text-2xl font-bold font-orbitron text-white drop-shadow-lg">{title}</div>
                </div>

                {/* Back */}
                <div
                    className={cn(
                        "absolute h-full w-full rounded-2xl bg-black/90 p-6 text-slate-200 [backface-visibility:hidden] border border-gold-500/30",
                        self[1],
                    )}
                >
                    <div className="flex min-h-full flex-col gap-4 justify-center">
                        <h1 className="text-2xl font-bold font-orbitron text-gold-500">{subtitle}</h1>
                        <p className="mt-2 border-t border-t-white/20 py-4 text-base font-inter font-medium leading-relaxed text-gray-100">
                            {description}{" "}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
