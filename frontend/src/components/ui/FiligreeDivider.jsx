import React from 'react';

export default function FiligreeDivider({
  variant = 'morphia',
  className = '',
  spacing = 'py-10 lg:py-14',
}) {
  return (
    <div
      role="separator"
      aria-hidden="true"
      className={`w-full max-w-layout mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-center ${spacing} ${className}`}
    >
      <div className="flex items-center justify-center w-full max-w-3xl">
        {/* Left hairline with soft gradient fade */}
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-[rgba(230,216,195,0.7)] to-gold-accent/50" />

        {/* Center Filigree Emblem */}
        <div className="flex items-center justify-center px-4 space-x-2 text-gold-accent select-none">
          <span className="w-1 h-1 rounded-full bg-gold-accent/60" />

          {variant === 'morphia' && (
            <svg
              className="w-7 h-5 text-gold-accent stroke-current fill-none transition-transform duration-500 hover:scale-110"
              viewBox="0 0 64 48"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              {/* Upper wings */}
              <path d="M32 24 C24 8, 6 4, 4 16 C2 24, 16 28, 32 24 Z" />
              <path d="M32 24 C40 8, 58 4, 60 16 C62 24, 48 28, 32 24 Z" />
              {/* Lower wings */}
              <path d="M32 24 C20 28, 10 38, 16 44 C22 48, 30 38, 32 24 Z" />
              <path d="M32 24 C44 28, 54 38, 48 44 C42 48, 34 38, 32 24 Z" />
              {/* Body & antennae */}
              <line x1="32" y1="16" x2="32" y2="36" />
              <path d="M32 18 Q28 10 24 10" />
              <path d="M32 18 Q36 10 40 10" />
            </svg>
          )}

          {variant === 'glyph' && (
            <span className="text-sm font-serif tracking-widest text-gold-accent">
              ✦
            </span>
          )}

          {variant === 'diamond' && (
            <svg
              className="w-4 h-4 text-gold-accent stroke-current fill-none"
              viewBox="0 0 24 24"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <polygon points="12 2 22 12 12 22 2 12" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
          )}

          <span className="w-1 h-1 rounded-full bg-gold-accent/60" />
        </div>

        {/* Right hairline with soft gradient fade */}
        <div className="flex-grow h-px bg-gradient-to-l from-transparent via-[rgba(230,216,195,0.7)] to-gold-accent/50" />
      </div>
    </div>
  );
}
