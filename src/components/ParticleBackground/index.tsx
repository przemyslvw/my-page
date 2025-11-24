import React, { useEffect, useRef } from 'react';
import styles from './ParticleBackground.module.css';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  canvas: HTMLCanvasElement;

  constructor(x: number, y: number, canvas: HTMLCanvasElement) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.color = `hsl(${Math.random() * 60 + 200}, 100%, 70%)`;
    this.size = Math.random() * 2 + 1;
    this.canvas = canvas;
  }

  update(mouseX: number, mouseY: number) {
    // Mouse interaction
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.hypot(dx, dy);
    const maxDistance = 150;

    if (distance < maxDistance) {
      const angle = Math.atan2(dy, dx);
      const force = (maxDistance - distance) / maxDistance;
      this.vx += Math.cos(angle) * force * 0.1;
      this.vy += Math.sin(angle) * force * 0.1;
    }

    // Apply velocity with damping
    this.vx *= 0.98;
    this.vy *= 0.98;

    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Boundary check with wrap-around
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial resize
    resizeCanvas();

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 10000);
    particlesRef.current = Array.from({ length: particleCount }, () => {
      return new Particle(Math.random() * canvas.width, Math.random() * canvas.height, canvas);
    });

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    // Touch move handler
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosition.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      // Clear with semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.update(mousePosition.current.x, mousePosition.current.y);
        particle.draw(ctx);
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(100, 150, 255, 0.1)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameId.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
};

export default ParticleBackground;
