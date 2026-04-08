import { useEffect, useRef } from "react";

export default function Confetti({ active, accent }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    if (!active) {
      particles.current = [];
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [accent, "#ffffff", "#fcd34d", "#f472b6", "#86efac", "#60a5fa"];

    particles.current = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -20,
      r: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 4 + 2,
      angle: Math.random() * 360,
      spin: Math.random() * 4 - 2,
      wobble: Math.random() * 10,
      wobbleSpeed: Math.random() * 0.05 + 0.02,
      wobbleAngle: Math.random() * Math.PI * 2,
      opacity: 1,
    }));

    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      particles.current = particles.current.filter(p => p.opacity > 0.1);

      particles.current.forEach(p => {
        p.y += p.speed;
        p.wobbleAngle += p.wobbleSpeed;
        p.x += Math.sin(p.wobbleAngle) * p.wobble * 0.3;
        p.angle += p.spin;
        if (p.y > canvas.height * 0.7) p.opacity -= 0.02;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6);
        ctx.restore();
      });

      if (particles.current.length > 0) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active, accent]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}