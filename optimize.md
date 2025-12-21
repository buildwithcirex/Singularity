# Optimization Plan

This document outlines suggested optimizations to improve the performance, maintainability, and efficiency of the codebase without altering the visual appearance or functionality.

## 1. `app/page.tsx`

**Current Problem:**
All components (Hero, About, Stats, Timeline, etc.) are imported statically. This means the code for the entire page is downloaded and parsed immediately, increasing the Initial Load Time and Time to Interactive (TTI), even for components that are not visible above the fold.

**Proposed Solution:**
Use `next/dynamic` to lazy load components that are not immediately visible (below the fold). This reduces the initial JavaScript bundle size, speeding up the initial page load.

**Refactored Code:**

```tsx
'use client';

import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Preloader from "@/components/Preloader";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";

// Dynamically import components below the fold
const About = dynamic(() => import("@/components/About"));
const Stats = dynamic(() => import("@/components/Stats"));
const Timeline = dynamic(() => import("@/components/Timeline"));
const Prizes = dynamic(() => import("@/components/Prizes"));
const Sponsors = dynamic(() => import("@/components/Sponsors"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    
    useKeyboardNavigation(() => setIsNavbarOpen(prev => !prev));

    return (
        <main className="flex min-h-screen flex-col">
            <AnimatePresence>
                {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>
            <Navbar isLoading={isLoading} isOpen={isNavbarOpen} setIsOpen={setIsNavbarOpen} />
            <KeyboardShortcuts />
            <Hero />
            <About />
            <Stats />
            <Timeline />
            <Prizes />
            <Sponsors />
            <FAQ />
            <Footer />
        </main>
    );
}
```

## 2. `hooks/use-canvasCursor.ts`

**Current Problem:**
The helper classes `CursorNode`, `Oscillator`, and `Line` are defined *inside* the `useCanvasCursor` hook. This means these classes are redefined every time the hook runs (if the component re-renders), which is inefficient and unnecessary memory allocation.

**Proposed Solution:**
Move the class definitions outside the hook to the module scope. Pass the configuration and state objects (`E` and `pos`) to the `Line` class so it can access them.

**Refactored Code:**

```typescript
import { useEffect } from 'react';

class CursorNode {
    x: number = 0;
    y: number = 0;
    vx: number = 0;
    vy: number = 0;
}

class Oscillator {
    phase: number = 0;
    offset: number = 0;
    frequency: number = 0.001;
    amplitude: number = 1;

    constructor(options: { phase?: number; offset?: number; frequency?: number; amplitude?: number } = {}) {
        this.phase = options.phase || 0;
        this.offset = options.offset || 0;
        this.frequency = options.frequency || 0.001;
        this.amplitude = options.amplitude || 1;
    }

    update() {
        this.phase += this.frequency;
        return this.offset + Math.sin(this.phase) * this.amplitude;
    }
}

interface CursorConfig {
    debug: boolean;
    friction: number;
    trails: number;
    size: number;
    dampening: number;
    tension: number;
}

interface Position {
    x: number;
    y: number;
}

class Line {
    spring: number = 0.1;
    friction: number = 0.5;
    nodes: CursorNode[] = [];

    constructor(options: { spring: number }, private config: CursorConfig, private pos: Position) {
        this.spring = options.spring + 0.1 * Math.random() - 0.02;
        this.friction = config.friction + 0.01 * Math.random() - 0.002;
        for (let n = 0; n < config.size; n++) {
            const t = new CursorNode();
            t.x = pos.x;
            t.y = pos.y;
            this.nodes.push(t);
        }
    }

    update() {
        let spring = this.spring;
        let node = this.nodes[0];
        node.vx += (this.pos.x - node.x) * spring;
        node.vy += (this.pos.y - node.y) * spring;

        for (let i = 0; i < this.nodes.length; i++) {
            node = this.nodes[i];
            if (i > 0) {
                const prev = this.nodes[i - 1];
                node.vx += (prev.x - node.x) * spring;
                node.vy += (prev.y - node.y) * spring;
                node.vx += prev.vx * this.config.dampening;
                node.vy += prev.vy * this.config.dampening;
            }
            node.vx *= this.friction;
            node.vy *= this.friction;
            node.x += node.vx;
            node.y += node.vy;
            spring *= this.config.tension;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        let curr, next;
        let x = this.nodes[0].x;
        let y = this.nodes[0].y;
        ctx.beginPath();
        ctx.moveTo(x, y);
        let i;
        for (i = 1; i < this.nodes.length - 2; i++) {
            curr = this.nodes[i];
            next = this.nodes[i + 1];
            x = 0.5 * (curr.x + next.x);
            y = 0.5 * (curr.y + next.y);
            ctx.quadraticCurveTo(curr.x, curr.y, x, y);
        }
        curr = this.nodes[i];
        next = this.nodes[i + 1];
        ctx.quadraticCurveTo(curr.x, curr.y, next.x, next.y);
        ctx.stroke();
        ctx.closePath();
    }
}

const useCanvasCursor = () => {
    useEffect(() => {
        const pos = { x: 0, y: 0 };
        const E = {
            debug: true,
            friction: 0.5,
            trails: 20,
            size: 50,
            dampening: 0.25,
            tension: 0.98,
        };
        let ctx: CanvasRenderingContext2D | null = null;
        let oscillator: Oscillator;
        let lines: Line[] = [];
        let running = false;
        let frame = 0;

        const onMousemove = (e: MouseEvent | TouchEvent) => {
            function initLines() {
                lines = [];
                for (let i = 0; i < E.trails; i++) {
                    lines.push(new Line({ spring: 0.4 + (i / E.trails) * 0.025 }, E, pos));
                }
            }

            function updatePos(e: MouseEvent | TouchEvent) {
                if ('touches' in e) {
                    pos.x = e.touches[0].pageX;
                    pos.y = e.touches[0].pageY;
                } else {
                    pos.x = (e as MouseEvent).clientX;
                    pos.y = (e as MouseEvent).clientY;
                }
            }

            document.removeEventListener('mousemove', onMousemove as any);
            document.removeEventListener('touchstart', onMousemove as any);
            document.addEventListener('mousemove', updatePos as any);
            document.addEventListener('touchmove', updatePos as any);
            document.addEventListener('touchstart', updatePos as any);

            updatePos(e);
            initLines();
            render();
        };

        const render = () => {
            if (running && ctx) {
                ctx.globalCompositeOperation = 'source-over';
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.globalCompositeOperation = 'lighter';
                ctx.strokeStyle = 'hsla(' + Math.round(oscillator.update()) + ',50%,50%,0.2)';
                ctx.lineWidth = 1;
                for (let i = 0; i < E.trails; i++) {
                    if (lines[i]) {
                        lines[i].update();
                        lines[i].draw(ctx);
                    }
                }
                frame++;
                window.requestAnimationFrame(render);
            }
        };

        const resizeCanvas = () => {
            if (ctx) {
                ctx.canvas.width = window.innerWidth;
                ctx.canvas.height = window.innerHeight;
            }
        };

        const renderCanvas = () => {
            const canvas = document.getElementById('canvas') as HTMLCanvasElement;
            if (!canvas) return;
            ctx = canvas.getContext('2d');
            if (!ctx) return;

            running = true;
            frame = 1;
            oscillator = new Oscillator({
                phase: Math.random() * 2 * Math.PI,
                amplitude: 85,
                frequency: 0.0015,
                offset: 285,
            });

            document.addEventListener('mousemove', onMousemove as any);
            document.addEventListener('touchstart', onMousemove as any);
            document.body.addEventListener('orientationchange', resizeCanvas);
            window.addEventListener('resize', resizeCanvas);
            window.addEventListener('focus', () => {
                if (!running) {
                    running = true;
                    render();
                }
            });
            window.addEventListener('blur', () => {
                running = true;
            });
            resizeCanvas();
        };

        renderCanvas();

        return () => {
            running = false;
            document.removeEventListener('mousemove', onMousemove as any);
            document.removeEventListener('touchstart', onMousemove as any);
            document.body.removeEventListener('orientationchange', resizeCanvas);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);
};

export default useCanvasCursor;
```

## 3. `components/Stats.tsx`

**Current Problem:**
The `StatItem` component uses `setInterval` for the counting animation. `setInterval` is not synced with the browser's refresh rate, leading to potential jitter. It also runs on the main thread in a way that might block if many counters run simultaneously.

**Proposed Solution:**
Use `framer-motion`'s `animate` function. It uses `requestAnimationFrame` under the hood, provides smoother easing, and is more declarative.

**Refactored Code:**

```tsx
'use client';

import { useInView, animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

const StatItem = ({ value, label, prefix = '', suffix = '' }: { value: number; label: string; prefix?: string; suffix?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, value, { duration: 2 });
            return controls.stop;
        }
    }, [isInView, value, count]);

    return (
        <div ref={ref} className="flex flex-col items-center p-6">
            <span className="text-5xl md:text-7xl font-orbitron font-bold text-gold-500 mb-2 flex">
                {prefix}<motion.span>{rounded}</motion.span>{suffix}
            </span>
            <span className="text-xl font-inter text-white uppercase tracking-widest">{label}</span>
        </div>
    );
};

// ... Stats component remains the same
```

## 4. `components/ui/starfield-1.tsx`

**Current Problem:**
The `measureViewport` function queries the DOM (`clientWidth`, `clientHeight`) which forces a reflow (layout calculation). Doing this frequently or inside a loop is bad. Also, `colors`, `compSpeed`, and `ratio` are recalculated on every render.

**Proposed Solution:**
1. Use `ResizeObserver` to detect size changes efficiently without manual polling or excessive event listeners.
2. Memoize derived values like `colors` and `compSpeed` using `useMemo`.

**Refactored Code:**

```tsx
// ... imports

const Starfield = ({
    // ... props
}: StarfieldProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // ... state

    // Memoize derived values
    const colors = useMemo(() => ({
        fill: hyperspace ? `rgba(0,0,0,${opacity})` : bgColor,
    }), [hyperspace, opacity, bgColor]);

    const compSpeed = useMemo(() => hyperspace ? speed * warpFactor : speed, [hyperspace, speed, warpFactor]);
    const ratio = useMemo(() => quantity / 2, [quantity]);

    // ... refs

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                sd.current.w = width;
                sd.current.h = height;
                sd.current.x = Math.round(width / 2);
                sd.current.y = Math.round(height / 2);
                sd.current.z = (width + height) / 2;
                sd.current.star.colorRatio = 1 / sd.current.z;
                
                canvas.width = width;
                canvas.height = height;
                
                // Reset cursor/mouse if needed
            }
        });

        observer.observe(canvas.parentElement!);

        return () => observer.disconnect();
    }, []);

    // ... rest of the animation loop
```

## 5. `next.config.ts`

**Current Problem:**
The configuration is minimal. While Next.js defaults are good, explicit configuration for compression and security headers is best practice.

**Proposed Solution:**
Enable `compress` (gzip/brotli) and disable `poweredByHeader` to hide the tech stack (security/size).

**Refactored Code:**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compress: true,
  poweredByHeader: false,
  // Ensure images are optimized if using external domains
  images: {
    domains: [], // Add domains if needed
  },
};

export default nextConfig;
```
