
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-10 w-auto" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="Purely Works Logo"
    >
      <defs>
        <linearGradient id="logo_gradient" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#4f46e5" /> {/* Indigo */}
          <stop offset="50%" stopColor="#9333ea" /> {/* Purple */}
          <stop offset="100%" stopColor="#10b981" /> {/* Emerald Hint */}
        </linearGradient>
      </defs>
      
      {/* Outer Circle Container */}
      <circle 
        cx="50" 
        cy="50" 
        r="42" 
        stroke="url(#logo_gradient)" 
        strokeWidth="4" 
        className="opacity-10"
      />

      {/* Central Graphic: Merging Cloud (AI) and Pulse (Work) */}
      <g stroke="url(#logo_gradient)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {/* Cloud / Brain Top */}
        <path d="M32 52 C 25 52, 22 38, 35 32 C 35 22, 55 22, 60 30 C 72 28, 78 42, 72 52" />
        
        {/* Mountain / Pulse Bottom (The 'W' shape) */}
        <path d="M28 68 L 42 52 L 52 64 L 64 48 L 76 68" />
      </g>
    </svg>
  );
};
