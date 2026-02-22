import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 4000);
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    };

    const drawStar = (star: Star, time: number) => {
      const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
      const currentOpacity = star.opacity * twinkle;

      // Glow effect
      const gradient = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.size * 3
      );
      gradient.addColorStop(0, `rgba(244, 228, 188, ${currentOpacity})`);
      gradient.addColorStop(0.5, `rgba(196, 160, 82, ${currentOpacity * 0.3})`);
      gradient.addColorStop(1, 'rgba(196, 160, 82, 0)');

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
      ctx.fill();
    };

    const drawConstellationLines = (time: number) => {
      const stars = starsRef.current.slice(0, 20);
      ctx.strokeStyle = 'rgba(196, 160, 82, 0.05)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < stars.length - 1; i++) {
        const distance = Math.sqrt(
          Math.pow(stars[i].x - stars[i + 1].x, 2) +
          Math.pow(stars[i].y - stars[i + 1].y, 2)
        );
        if (distance < 200) {
          const pulse = Math.sin(time * 0.001 + i) * 0.5 + 0.5;
          ctx.strokeStyle = `rgba(196, 160, 82, ${0.03 + pulse * 0.02})`;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[i + 1].x, stars[i + 1].y);
          ctx.stroke();
        }
      }
    };

    const animate = (time: number) => {
      ctx.fillStyle = '#0a0a12';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebula effect
      const nebulaGradient = ctx.createRadialGradient(
        canvas.width * 0.7, canvas.height * 0.3, 0,
        canvas.width * 0.7, canvas.height * 0.3, canvas.width * 0.5
      );
      nebulaGradient.addColorStop(0, 'rgba(88, 28, 135, 0.08)');
      nebulaGradient.addColorStop(0.5, 'rgba(49, 10, 82, 0.04)');
      nebulaGradient.addColorStop(1, 'rgba(10, 10, 18, 0)');
      ctx.fillStyle = nebulaGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nebulaGradient2 = ctx.createRadialGradient(
        canvas.width * 0.2, canvas.height * 0.7, 0,
        canvas.width * 0.2, canvas.height * 0.7, canvas.width * 0.4
      );
      nebulaGradient2.addColorStop(0, 'rgba(139, 105, 20, 0.05)');
      nebulaGradient2.addColorStop(0.5, 'rgba(49, 38, 10, 0.02)');
      nebulaGradient2.addColorStop(1, 'rgba(10, 10, 18, 0)');
      ctx.fillStyle = nebulaGradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawConstellationLines(time);

      starsRef.current.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height + 10) {
          star.y = -10;
          star.x = Math.random() * canvas.width;
        }
        drawStar(star, time);
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
