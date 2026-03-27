import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function InteractiveBackground() {
    const canvasRef = useRef(null);
    const { theme } = useAppContext();
    const themeRef = useRef(theme);

    useEffect(() => {
        themeRef.current = theme;
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const PARTICLE_MIN_SIZE = 1;
        const PARTICLE_MAX_SIZE = 2;
        const HOVER_BASE_DISTANCE = 120;
        const HOVER_BASE_DISTANCE_SQ = HOVER_BASE_DISTANCE * HOVER_BASE_DISTANCE;

        let particles = [];
        let mouse = { x: -1000, y: -1000 };
        let width = window.innerWidth;
        let height = window.innerHeight;

        const getParticleCount = (w) => {
            if (w < 768) return 60;
            if (w < 1024) return 90;
            return 120; // 1024+
        };

        let currentParticleCount = getParticleCount(width);

        const setCanvasSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            const newCount = getParticleCount(width);
            if (newCount !== currentParticleCount && particles.length > 0) {
                currentParticleCount = newCount;
                init();
            }
        };

        const createParticle = () => {
            const p = {
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * (PARTICLE_MAX_SIZE - PARTICLE_MIN_SIZE) + PARTICLE_MIN_SIZE,
                // Randomize speed slightly without increasing overall bounds (0.8x to 1.2x of original 0.4 magnitude)
                vx: (Math.random() - 0.5) * 0.4 * (0.8 + Math.random() * 0.4),
                vy: (Math.random() - 0.5) * 0.4 * (0.8 + Math.random() * 0.4),
                // Subtly randomize opacity for depth feeling
                baseOpacity: Math.random() * 0.25 + 0.15, // 0.15 to 0.40 opacity
            };
            p.opacity = p.baseOpacity;

            p.update = () => {
                // Move based on velocity
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Mouse interaction loop optimized to avoid sqrt
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distanceSq = dx * dx + dy * dy;

                if (distanceSq < HOVER_BASE_DISTANCE_SQ) {
                    const distance = Math.sqrt(distanceSq);
                    const force = (HOVER_BASE_DISTANCE - distance) / HOVER_BASE_DISTANCE;
                    const angle = Math.atan2(dy, dx);

                    // Subtle repel
                    p.x -= Math.cos(angle) * force * 0.8;
                    p.y -= Math.sin(angle) * force * 0.8;

                    // Increase brightness slightly
                    p.opacity = Math.min(p.baseOpacity + (force * 0.4), 0.8);
                } else {
                    // Smoothly revert to base opacity
                    if (p.opacity > p.baseOpacity) {
                        p.opacity -= 0.02;
                    }
                }
            };

            p.draw = () => {
                const isDark = themeRef.current === 'dark';
                // Dark Mode: "245, 245, 255" | Light Mode: Pure black "0, 0, 0"
                const COLOR = isDark ? '245, 245, 255' : '0, 0, 0';

                // Dark Mode opacity max 0.8 | Light Mode strictly capped softer
                const drawOpacity = isDark ? p.opacity : (p.opacity * 0.6);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${COLOR}, ${drawOpacity})`;

                if (isDark) {
                    ctx.shadowBlur = p.opacity > p.baseOpacity ? 15 : 0;
                    ctx.shadowColor = `rgba(${COLOR}, ${drawOpacity})`;
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.fill();
            };

            return p;
        };

        const init = () => {
            particles = [];
            for (let i = 0; i < currentParticleCount; i++) {
                particles.push(createParticle());
            }
        };

        setCanvasSize();
        init();

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => setCanvasSize();
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: -1,
                pointerEvents: 'none',
                backgroundColor: 'transparent'
            }}
        />
    );
}
