import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../i18n';

export default function ProductImageMagnifier({
  src,
  alt = 'Andean Morphia Jewelry',
  badgeText = 'Cusco, Perú',
}) {
  const { t } = useLanguage();
  const containerRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalScale, setModalScale] = useState(1);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOrigin({ x: 50, y: 50 });
  };

  // Close full inspector on Escape
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isModalOpen]);

  // Lock scroll when full inspector modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Main Image Frame with Desktop Goldsmith Loupe & Tap-to-inspect */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
        aria-label={`${alt} - ${t('magnifier.hint')}`}
        className="relative aspect-[4/5] bg-surface rounded-md border border-[rgba(230,216,195,0.7)] overflow-hidden shadow-card flex items-center justify-center p-8 cursor-zoom-in group select-none focus:outline-none focus:ring-1 focus:ring-text-primary"
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            style={{
              transformOrigin: `${origin.x}% ${origin.y}%`,
              transform: isHovered ? 'scale(2.3)' : 'scale(1)',
            }}
            className="w-full h-full object-contain pointer-events-none transition-transform duration-200 ease-out will-change-transform"
          />
        ) : (
          <div className="text-text-secondary font-sans text-sm">Andean Morphia</div>
        )}

        {/* Provenance Watermark Badge */}
        <span className="absolute bottom-4 left-4 bg-warm/80 backdrop-blur-xs text-text-primary label-caps px-2.5 py-1 rounded-sm text-[10px] pointer-events-none z-10">
          {badgeText}
        </span>

        {/* Loupe Status Badge (Visible when hovered) */}
        <div
          className={`absolute top-4 right-4 bg-text-primary/90 text-canvas label-caps px-3 py-1.5 rounded-sm text-[10px] tracking-widest backdrop-blur-sm shadow-sm flex items-center space-x-1.5 transition-all duration-300 pointer-events-none z-10 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <span className="text-gold-accent text-xs">✦</span>
          <span>{t('magnifier.active')}</span>
        </div>

        {/* Hint banner at bottom */}
        <div
          className={`absolute bottom-4 right-4 bg-surface/90 border border-[rgba(230,216,195,0.8)] text-text-secondary px-2.5 py-1 rounded-sm text-[10px] tracking-wider font-sans uppercase backdrop-blur-xs shadow-xs pointer-events-none transition-opacity duration-300 z-10 ${
            isHovered ? 'opacity-0' : 'opacity-90'
          }`}
        >
          <span className="hidden sm:inline">🔍 {t('magnifier.hint')}</span>
          <span className="inline sm:hidden">🔍 {t('magnifier.hint_mobile')}</span>
        </div>
      </div>

      {/* Full-Screen High-Resolution Inspector Modal (Mobile & Collector View) */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 bg-[#1E1B18]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Top Inspector Bar */}
          <div
            className="w-full max-w-layout mx-auto flex items-center justify-between text-canvas z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="label-caps text-gold-accent text-[10px] block mb-0.5">
                {badgeText} • {t('magnifier.inspection_badge')}
              </span>
              <h3 className="font-serif text-lg text-[#F8F2E4] font-normal">
                {alt}
              </h3>
            </div>

            <div className="flex items-center space-x-3">
              {/* Scale toggle 1x / 1.7x */}
              <button
                type="button"
                onClick={() => setModalScale(modalScale === 1 ? 1.7 : 1)}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-sm border border-canvas/30 text-canvas text-[11px] font-sans uppercase tracking-widest hover:bg-canvas/10 transition-colors"
              >
                <span>{modalScale === 1 ? t('magnifier.zoom_in') : t('magnifier.zoom_reset')}</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label={t('magnifier.close')}
                className="w-10 h-10 rounded-full border border-canvas/30 bg-black/40 text-canvas flex items-center justify-center hover:bg-canvas hover:text-text-primary transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 stroke-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Centered High-Res Image View */}
          <div
            className="flex-grow flex items-center justify-center p-4 sm:p-8 overflow-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="relative max-w-3xl max-h-[75vh] flex items-center justify-center transition-transform duration-300 ease-out"
              style={{ transform: `scale(${modalScale})` }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={src}
                alt={alt}
                className="max-h-[75vh] w-auto object-contain rounded-md shadow-2xl"
              />
            </div>
          </div>

          {/* Bottom Inspector Caption */}
          <div
            className="w-full max-w-layout mx-auto text-center text-canvas/70 text-xs font-sans font-light pb-2 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <p>
              {t('magnifier.footer_note')}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
