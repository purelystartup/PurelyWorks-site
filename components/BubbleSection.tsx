"use client";

import React, { useRef, useEffect } from 'react';

const TAGS = [
  { text: "Testing Remote Teams", color: "bg-indigo-500/20 border-indigo-400/30 text-indigo-100" },
  { text: "Fluctuating Needs", color: "bg-blue-500/20 border-blue-400/30 text-blue-100" },
  { text: "Strategic Flexibility", color: "bg-purple-500/20 border-purple-400/30 text-purple-100" },
  { text: "Proving ROI First", color: "bg-emerald-500/20 border-emerald-400/30 text-emerald-100" },
  { text: "Moderate Volume", color: "bg-rose-500/20 border-rose-400/30 text-rose-100" }
];

export const BubbleSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Store current physics state for each item
  const physicsState = useRef(TAGS.map(() => ({
    x: 0,      // Current render position X
    y: 0,      // Current render position Y
    targetX: 0, // Target position X (based on mouse repulsion)
    targetY: 0  // Target position Y (based on mouse repulsion)
  })));

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        // Get item center position relative to viewport
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;

        // Calculate distance to mouse
        const dx = e.clientX - itemCenterX;
        const dy = e.clientY - itemCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const maxDistance = 250; // Radius of influence
        
        if (distance < maxDistance) {
          // Calculate repulsion force (stronger when closer)
          const force = (maxDistance - distance) / maxDistance;
          // Smooth ease-out curve for the force
          const power = Math.pow(force, 2); 
          
          // Push away from mouse
          const repulsionStrength = -80; // Max pixels to move
          physicsState.current[index].targetX = (dx / distance) * power * repulsionStrength;
          physicsState.current[index].targetY = (dy / distance) * power * repulsionStrength;
        } else {
          // Reset to original position
          physicsState.current[index].targetX = 0;
          physicsState.current[index].targetY = 0;
        }
      });
    };

    const handleMouseLeave = () => {
      // Reset all targets to 0
      physicsState.current.forEach(state => {
        state.targetX = 0;
        state.targetY = 0;
      });
    };

    const animate = () => {
      // Lerp (Linear Interpolation) loop for smooth movement
      physicsState.current.forEach((state, index) => {
        const item = itemsRef.current[index];
        if (!item) return;

        // Smoothly move current towards target (ease-out effect)
        const easing = 0.1; // Lower = smoother/slower
        state.x += (state.targetX - state.x) * easing;
        state.y += (state.targetY - state.y) * easing;

        // Apply transform
        item.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (containerRef.current) {
        containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    
    // Start animation loop
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current) {
          containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-slate-900 overflow-hidden relative">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950/30 to-slate-900 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 tracking-tight">
          Perfect For
        </h2>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-5xl mx-auto">
          {TAGS.map((tag, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el; }}
              className={`
                relative group cursor-default
                px-8 py-4 rounded-full border backdrop-blur-md
                transition-colors duration-300
                ${tag.color}
                hover:bg-opacity-30 hover:border-opacity-50
              `}
            >
              <span className="text-lg font-medium tracking-wide">{tag.text}</span>
              
              {/* Subtle Shine Effect on Hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
        
        <p className="mt-16 text-slate-400 text-sm uppercase tracking-widest opacity-60 animate-pulse">
            Go ahead, push us around.
        </p>
      </div>
    </section>
  );
};
