import React, { useEffect, useRef } from 'react';

const HeartParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      dx: number;
      dy: number;
    }> = [];

    // Create hearts
    for (let i = 0; i < 20; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        opacity: Math.random() * 0.5 + 0.3,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
      });
    }

    const drawHeart = (x: number, y: number, size: number) => {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x - size / 2, y + (topCurveHeight + size) / 2, x, y + (topCurveHeight + size) / 2, x, y + size);
      ctx.bezierCurveTo(x, y + (topCurveHeight + size) / 2, x + size / 2, y + (topCurveHeight + size) / 2, x + size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach((heart) => {
        ctx.fillStyle = `rgba(236, 72, 153, ${heart.opacity})`;
        drawHeart(heart.x, heart.y, heart.size);

        heart.x += heart.dx;
        heart.y += heart.dy;

        if (heart.x < 0 || heart.x > canvas.width) heart.dx *= -1;
        if (heart.y < 0 || heart.y > canvas.height) heart.dy *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default HeartParticles;