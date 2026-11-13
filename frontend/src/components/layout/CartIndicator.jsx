import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../i18n';
import minimalistLogo from '../../assets/minimalist-logo.svg';

export default function CartIndicator() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 120);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cart Button */}
      <button
        type="button"
        onClick={handleClick}
        className="relative p-2 text-text-primary hover:text-charcoal-hover rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-text-primary"
        aria-label={`${t('nav.cart')} - ${t('nav.coming_soon')}`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {/* Shopping bag icon with 1.5px stroke weight (filigrana style) */}
        <svg
          className="w-5 h-5 stroke-current"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>

        {/* Subtle Morphia Celeste Dot Indicator */}
        <span
          className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-accent ring-2 ring-canvas"
          aria-hidden="true"
        />
      </button>

      {/* Popover / Tooltip */}
      {isOpen && (
        <div
          role="dialog"
          aria-live="polite"
          className="absolute right-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-md border border-[rgba(230,216,195,0.7)] rounded-md shadow-card p-4 z-50 animate-fadeIn text-left pointer-events-auto"
        >
          {/* Header with Morphia Butterfly Icon & Subtle Tag */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[rgba(230,216,195,0.5)]">
            <div className="flex items-center space-x-2">
              <img
                src={minimalistLogo}
                alt=""
                className="w-4 h-auto opacity-70"
                aria-hidden="true"
              />
              <span className="label-caps text-[10px] text-text-secondary tracking-widest">
                {t('nav.cart')}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-[#C9D9E8]/40 text-text-primary text-[9px] uppercase font-sans font-semibold tracking-wider">
              <span className="w-1 h-1 rounded-full bg-[#51606d]" aria-hidden="true" />
              {t('nav.coming_soon')}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-serif text-base text-text-primary font-normal leading-snug mb-1">
            {t('nav.coming_soon')}
          </h4>

          {/* Description */}
          <p className="body-sm text-text-secondary text-xs leading-relaxed">
            {t('nav.cart_coming_soon_desc')}
          </p>
        </div>
      )}
    </div>
  );
}
