'use client';
import React, { useRef, useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export interface CosmicBackgroundProps {
  starCount?: number;
  className?: string;
}

const CosmicBackground: React.FC<CosmicBackgroundProps> = ({
  starCount = 100,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      
      // Reinitialize stars on resize
      initStars();
    };

    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          speed: Math.random() * 0.0003 + 0.0001,
        });
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      
      // Clear with gradient background
      const isDark = document.documentElement.classList.contains('dark');
      
      if (isDark) {
        const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
        gradient.addColorStop(0, 'hsl(220, 15%, 5%)');
        gradient.addColorStop(0.5, 'hsl(220, 15%, 4%)');
        gradient.addColorStop(1, 'hsl(220, 15%, 3%)');
        ctx.fillStyle = gradient;
      } else {
        const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
        gradient.addColorStop(0, 'hsl(220, 20%, 97%)');
        gradient.addColorStop(0.5, 'hsl(220, 20%, 96%)');
        gradient.addColorStop(1, 'hsl(220, 20%, 94%)');
        ctx.fillStyle = gradient;
      }
      
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw and animate stars
      for (const star of starsRef.current) {
        // Subtle twinkling
        star.opacity = Math.sin(currentTime * star.speed) * 0.3 + 0.4;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        
        if (isDark) {
          ctx.fillStyle = `rgba(180, 190, 220, ${star.opacity * 0.6})`;
        } else {
          ctx.fillStyle = `rgba(80, 90, 140, ${star.opacity * 0.3})`;
        }
        
        ctx.fill();
      }

      // Draw subtle nebula effect
      if (isDark) {
        const nebulaGradient = ctx.createRadialGradient(
          window.innerWidth * 0.3,
          window.innerHeight * 0.4,
          0,
          window.innerWidth * 0.3,
          window.innerHeight * 0.4,
          window.innerWidth * 0.5
        );
        nebulaGradient.addColorStop(0, 'rgba(82, 39, 255, 0.03)');
        nebulaGradient.addColorStop(0.5, 'rgba(82, 39, 255, 0.01)');
        nebulaGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = nebulaGradient;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        
        // Second nebula
        const nebulaGradient2 = ctx.createRadialGradient(
          window.innerWidth * 0.7,
          window.innerHeight * 0.6,
          0,
          window.innerWidth * 0.7,
          window.innerHeight * 0.6,
          window.innerWidth * 0.4
        );
        nebulaGradient2.addColorStop(0, 'rgba(39, 82, 255, 0.02)');
        nebulaGradient2.addColorStop(0.5, 'rgba(39, 82, 255, 0.005)');
        nebulaGradient2.addColorStop(1, 'transparent');
        ctx.fillStyle = nebulaGradient2;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }

      lastTime = currentTime;
      animationId = requestAnimationFrame(animate);
    };

    animate(performance.now());

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [starCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};

export default CosmicBackground;
