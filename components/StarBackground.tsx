'use client';

import React, { useEffect, useRef } from 'react';

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    interface Star {
      update: () => void;
      draw: () => void;
    }

    let animationFrameId: number;
    let stars: Star[] = [];
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const createStar = (): Star => {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      const size = Math.random() * 2;
      const speedX = (Math.random() - 0.5) * 0.2;
      const speedY = (Math.random() - 0.5) * 0.2;
      const brightness = Math.random();

      return {
        update: () => {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
 
          const moveX = (mouseX - centerX) * 0.0005;
          const moveY = (mouseY - centerY) * 0.0005;

          x += speedX + moveX;
          y += speedY + moveY;

          if (x < 0) x = canvas.width;
          if (x > canvas.width) x = 0;
          if (y < 0) y = canvas.height;
          if (y > canvas.height) y = 0;
        },

        draw: () => {
          if (!ctx) return;
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      };
    };

    const initStars = () => {
      stars = [];
      const numberOfStars = 200;
      for (let i = 0; i < numberOfStars; i++) {
        stars.push(createStar());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    globalThis.addEventListener('resize', resizeCanvas);
    globalThis.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    animate();

    return () => {
      globalThis.removeEventListener('resize', resizeCanvas);
      globalThis.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-[#020617]"
    />
  );
}