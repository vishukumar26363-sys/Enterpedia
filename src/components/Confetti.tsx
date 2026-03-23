import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Particle[] = [];
    const colors = ['#FF0000', '#FFFF00', '#0000FF', '#00FF00']; // red, yellow, blue, green

    // Create particles bursting from the center
    const createParticles = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const numParticles = 150;

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: centerX,
          y: centerY,
          vx: (Math.random() - 0.5) * 20, // Spread horizontally
          vy: (Math.random() * -15) - 5, // Move upward fast
          size: Math.random() * 8 + 4, // Random size
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          opacity: 1,
          life: 0,
          maxLife: Math.random() * 60 + 60, // Fade out duration
        });
      }
    };

    createParticles();

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Add slight gravity and air resistance
        p.vy += 0.2; // Gravity pulling down eventually, but starts fast upward
        p.vx *= 0.98; // Air resistance horizontally

        p.rotation += p.rotationSpeed;
        p.life++;

        // Fade out
        if (p.life > p.maxLife * 0.7) {
          p.opacity -= 0.05;
        }

        if (p.opacity <= 0) continue; // Skip drawing if fully transparent

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }

      // Remove dead particles
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].opacity <= 0) {
          particles.splice(i, 1);
        }
      }

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default Confetti;
