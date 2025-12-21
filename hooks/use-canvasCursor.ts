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
