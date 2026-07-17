'use client';

import { useEffect, useRef } from 'react';

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let rafId: number;

    const updateGlowPosition = (e: MouseEvent) => {
      // Direct style manipulation using requestAnimationFrame to bypass React state cycles
      // This guarantees absolute zero latency, perfect 120Hz/144Hz tracking
      rafId = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${e.clientX - 450}px, ${e.clientY - 450}px, 0)`;
        glow.style.opacity = '1';
      });
    };

    const handleMouseLeave = () => {
      glow.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      glow.style.opacity = '1';
    };

    window.addEventListener('mousemove', updateGlowPosition, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateGlowPosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 rounded-full z-[9999] opacity-0 transition-opacity duration-500 ease-out"
      style={{
        width: '900px',
        height: '900px',
        // High-end ultra-soft diffuse radial glow fading smoothly to transparent
        background: 'radial-gradient(circle, rgba(255, 106, 42, 0.05) 0%, rgba(255, 106, 42, 0.015) 30%, rgba(255, 106, 42, 0.003) 60%, transparent 80%)',
        willChange: 'transform, opacity',
        transform: 'translate3d(-1000px, -1000px, 0)',
      }}
    />
  );
}
