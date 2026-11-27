import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n';
import Button from '../ui/Button';

import eleganciaImg from '../../assets/hero/elegancia.webp';
import retrato1Img from '../../assets/hero/retrato1.webp';
import collarOroImg from '../../assets/hero/collar-oro.webp';
import manosImg from '../../assets/hero/manos.webp';
import pendienteImg from '../../assets/hero/pendiente.webp';
import medallonImg from '../../assets/hero/medallon.webp';
import retrato2Img from '../../assets/hero/retrato2.webp';

const SLIDE_DURATION = 5000;
const SWIPE_THRESHOLD = 40;

const HERO_SLIDES = [
  {
    key: 'elegancia',
    src: eleganciaImg,
    to: '/producto/dije-arbol-de-la-vida',
    objectPosition: 'object-center',
  },
  {
    key: 'retrato1',
    src: retrato1Img,
    to: '/catalogo',
    objectPosition: 'object-[48%_40%]',
  },
  {
    key: 'collar_oro',
    src: collarOroImg,
    to: '/catalogo?categoria=dijes',
    objectPosition: 'object-center',
  },
  {
    key: 'manos',
    src: manosImg,
    to: '/catalogo?categoria=anillos',
    objectPosition: 'object-[46%_50%]',
  },
  {
    key: 'pendiente',
    src: pendienteImg,
    to: '/catalogo',
    objectPosition: 'object-[55%_42%]',
  },
  {
    key: 'medallon',
    src: medallonImg,
    to: '/producto/dije-arbol-de-la-vida',
    objectPosition: 'object-[50%_58%] md:object-center',
  },
  {
    key: 'retrato2',
    src: retrato2Img,
    to: '/catalogo',
    objectPosition: 'object-[56%_45%]',
  },
];

export default function HeroSection() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef(null);
  const exitTimerRef = useRef(null);
  const remainingRef = useRef(SLIDE_DURATION);
  const startedAtRef = useRef(Date.now());
  const touchStartRef = useRef(null);

  const goToSlide = useCallback(
    (nextIndex) => {
      const normalized = (nextIndex + HERO_SLIDES.length) % HERO_SLIDES.length;
      if (normalized === activeIndex) return;

      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
      }
      setExitingIndex(activeIndex);
      setActiveIndex(normalized);
      remainingRef.current = SLIDE_DURATION;
      startedAtRef.current = Date.now();

      exitTimerRef.current = setTimeout(() => {
        setExitingIndex(null);
      }, 1050);
    },
    [activeIndex]
  );

  const goToNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      const elapsed = Date.now() - startedAtRef.current;
      remainingRef.current = Math.max(0, remainingRef.current - elapsed);
      return undefined;
    }

    startedAtRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      goToNext();
    }, remainingRef.current);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [activeIndex, isPaused, goToNext]);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current || e.changedTouches.length === 0) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) >= SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    }
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsPaused(false);
    }
  };

  const handleMouseLeave = (e) => {
    if (typeof document !== 'undefined' && e.currentTarget.contains(document.activeElement)) {
      return;
    }
    setIsPaused(false);
  };

  const currentSlide = HERO_SLIDES[activeIndex];
  const captionOverline = t(`hero.slides.${currentSlide.key}.overline`);
  const captionTitle = t(`hero.slides.${currentSlide.key}.title`);
  const captionMeta = t(`hero.slides.${currentSlide.key}.meta`);

  return (
    <section className="relative w-full bg-canvas border-b border-[rgba(230,216,195,0.7)] overflow-hidden">
      <div className="max-w-layout mx-auto">
        <div className="flex flex-col-reverse md:flex-row md:min-h-[580px] lg:min-h-[720px]">
          {/* Left / Content block (Side-by-side from tablet md:) */}
          <div className="w-full md:w-[50%] lg:w-[52%] px-5 pt-6 pb-8 sm:px-10 sm:py-10 md:px-8 md:py-14 lg:px-16 lg:py-20 flex flex-col justify-center bg-canvas">
            <div className="max-w-xl">
              {/* Provenance Badge */}
              <div className="inline-flex items-center space-x-2.5 mb-3 md:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
                <span className="label-caps text-text-secondary">
                  {t('hero.badge')}
                </span>
                <span className="h-px w-8 bg-[rgba(92,85,78,0.25)]" />
              </div>

              {/* Display Headline */}
              <h1 className="font-serif text-[32px] leading-[40px] tracking-[-0.01em] font-normal sm:text-[38px] sm:leading-[46px] lg:text-[56px] lg:leading-[64px] lg:tracking-[-0.02em] text-text-primary mb-3 md:mb-6 text-balance">
                {t('hero.title')}
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-[15px] leading-[24px] tracking-[0.005em] font-light md:text-[17px] md:leading-[28px] md:tracking-[0.01em] text-text-secondary mb-6 md:mb-10 text-balance">
                {t('hero.subtitle')}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0 sm:space-x-5">
                <Button to="/catalogo" variant="primary" className="!py-3.5 sm:!py-4">
                  {t('hero.explore')}
                </Button>
                <Button to="/nosotros" variant="tertiary" className="!py-3.5 sm:!py-4">
                  {t('hero.about')}
                </Button>
              </div>

              {/* Subtle quality footnote */}
              <div className="mt-6 pt-5 md:mt-12 md:pt-8 border-t border-[rgba(230,216,195,0.6)] flex items-center justify-between text-text-secondary">
                <span className="font-sans text-[11px] tracking-widest uppercase font-light">
                  {t('hero.footnote_materials')}
                </span>
                <span className="font-sans text-[11px] tracking-widest uppercase font-light">
                  {t('hero.footnote_edition')}
                </span>
              </div>
            </div>
          </div>

          {/* Right / Cinematic Editorial Carousel Column */}
          <div
            className="w-full md:w-[50%] lg:w-[48%] flex flex-col"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={handleMouseLeave}
            onFocus={() => setIsPaused(true)}
            onBlur={handleBlur}
          >
            {/* Slide Stage */}
            <div
              className="relative w-full md:flex-1 bg-warm/30 overflow-hidden aspect-[5/4] min-h-[260px] sm:aspect-[4/3] sm:min-h-[360px] md:aspect-auto md:min-h-[580px] lg:min-h-[720px] group/hero select-none"
              role="region"
              aria-roledescription="carousel"
              aria-label={t('hero.carousel_label')}
              tabIndex={0}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onKeyDown={handleKeyDown}
            >
              {/* Stacked Slides for Flicker-Free Crossfade + Ken Burns */}
              {HERO_SLIDES.map((slide, index) => {
                const isActive = index === activeIndex;
                const isExiting = index === exitingIndex;
                const shouldAnimate = isActive || isExiting;

                return (
                  <div
                    key={slide.key}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-in-out ${
                      isActive
                        ? 'opacity-100 z-[2]'
                        : isExiting
                        ? 'opacity-0 z-[1] pointer-events-none'
                        : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={slide.src}
                      alt={t(`hero.slides.${slide.key}.alt`)}
                      loading={index === 0 ? 'eager' : undefined}
                      fetchPriority={index === 0 ? 'high' : undefined}
                      decoding={index === 0 ? undefined : 'async'}
                      draggable={false}
                      className={`w-full h-full object-cover ${slide.objectPosition} ${
                        shouldAnimate ? 'hero-ken-burns' : ''
                      }`}
                      style={
                        shouldAnimate
                          ? { animationPlayState: isPaused ? 'paused' : 'running' }
                          : undefined
                      }
                    />
                  </div>
                );
              })}

              {/* Subtle luxury vignette gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-text-primary/25 via-transparent to-text-primary/5 pointer-events-none z-[3]"
                aria-hidden="true"
              />

              {/* Subtle Prev / Next Navigation Buttons (Desktop/Tablet md:) */}
              <button
                type="button"
                onClick={goToPrev}
                aria-label={t('hero.prev_slide')}
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/75 hover:bg-white/95 backdrop-blur-md border border-[rgba(230,216,195,0.75)] hover:border-gold-accent/60 text-text-primary hover:text-gold-accent shadow-card items-center justify-center transition-all duration-300 opacity-0 group-hover/hero:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent/60"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={goToNext}
                aria-label={t('hero.next_slide')}
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/75 hover:bg-white/95 backdrop-blur-md border border-[rgba(230,216,195,0.75)] hover:border-gold-accent/60 text-text-primary hover:text-gold-accent shadow-card items-center justify-center transition-all duration-300 opacity-0 group-hover/hero:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-accent/60"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              {/* Mobile Minimalist Slide Indicators (Unobstructed Image) */}
              <div
                className="flex md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 z-10 items-center gap-0.5 bg-text-primary/25 backdrop-blur-md border border-white/20 rounded-full px-2 py-0.5"
                role="tablist"
                aria-label={t('hero.carousel_label')}
              >
                {HERO_SLIDES.map((slide, index) => {
                  const isCurrent = index === activeIndex;
                  return (
                    <button
                      key={slide.key}
                      type="button"
                      role="tab"
                      aria-selected={isCurrent}
                      aria-label={`${t('hero.go_to_slide')} ${index + 1}`}
                      onClick={() => goToSlide(index)}
                      className="min-w-[24px] min-h-[24px] p-1 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-full"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-300 ${
                          isCurrent
                            ? 'w-5 bg-white shadow-sm'
                            : 'w-1.5 bg-white/55 hover:bg-white/85'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Desktop Coordinated Bottom Bar: Touch Indicators + Dynamic Editorial Caption */}
              <div className="hidden md:flex absolute bottom-6 inset-x-6 z-10 md:flex-col-reverse lg:flex-row items-start lg:items-end justify-between gap-2.5 pointer-events-none">
                {/* Minimalist Slide Indicators */}
                <div
                  className="pointer-events-auto self-start lg:self-end inline-flex items-center gap-0.5 bg-text-primary/25 backdrop-blur-md border border-white/20 rounded-full px-2 py-1"
                  role="tablist"
                  aria-label={t('hero.carousel_label')}
                >
                  {HERO_SLIDES.map((slide, index) => {
                    const isCurrent = index === activeIndex;
                    return (
                      <button
                        key={slide.key}
                        type="button"
                        role="tab"
                        aria-selected={isCurrent}
                        aria-label={`${t('hero.go_to_slide')} ${index + 1}`}
                        onClick={() => goToSlide(index)}
                        className="min-w-[24px] min-h-[24px] p-1.5 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-full"
                      >
                        <span
                          className={`block h-1.5 rounded-full transition-all duration-300 ${
                            isCurrent
                              ? 'w-5 bg-white shadow-sm'
                              : 'w-1.5 bg-white/55 hover:bg-white/85'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Quiet-Luxury Editorial Caption Plaque */}
                <Link
                  to={currentSlide.to}
                  className="pointer-events-auto group w-full lg:w-auto min-w-0 max-w-full lg:max-w-[275px] xl:max-w-[300px] bg-white/85 hover:bg-white/95 backdrop-blur-md border border-[rgba(230,216,195,0.75)] hover:border-gold-accent/60 rounded-md px-5 py-3 shadow-card hover:shadow-sm transition-all duration-300 flex items-center justify-between gap-3.5"
                  aria-label={`${captionOverline}: ${captionTitle} - ${captionMeta}`}
                >
                  <div
                    key={currentSlide.key}
                    className="flex flex-col min-w-0 animate-fadeIn"
                  >
                    <div className="flex items-center gap-1.5 mb-0.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-accent/80 flex-shrink-0" />
                      <span className="label-caps text-[9px] tracking-[0.18em] text-text-secondary uppercase truncate">
                        {captionOverline}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 min-w-0">
                      <span className="font-serif text-[14px] text-text-primary font-normal group-hover:text-gold-accent transition-colors duration-200 truncate min-w-0">
                        {captionTitle}
                      </span>
                      <span className="text-[10px] text-text-secondary/40 font-light select-none flex-shrink-0">
                        ·
                      </span>
                      <span className="font-sans text-[12px] text-text-secondary font-light tracking-wide truncate min-w-0">
                        {captionMeta}
                      </span>
                    </div>
                  </div>

                  <svg
                    className="w-4 h-4 text-text-secondary/60 group-hover:text-gold-accent group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0 ml-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>

              {/* Thin 2px Gold Progress Bar */}
              <div
                className="absolute bottom-0 inset-x-0 h-[2px] bg-white/20 z-20 pointer-events-none overflow-hidden"
                aria-hidden="true"
              >
                <div
                  key={activeIndex}
                  className="h-full bg-gold-accent hero-progress-bar"
                  style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                />
              </div>
            </div>

            {/* Mobile Editorial Ribbon Below Photo (0px Image Obstruction) */}
            <Link
              to={currentSlide.to}
              className="block md:hidden w-full bg-surface/90 hover:bg-surface border-b border-[rgba(230,216,195,0.7)] px-5 py-2.5 transition-colors duration-200 group"
              aria-label={`${captionOverline}: ${captionTitle} - ${captionMeta}`}
            >
              <div
                key={currentSlide.key}
                className="flex items-center justify-between gap-2.5 min-w-0 animate-fadeIn"
              >
                <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-accent/80 flex-shrink-0" />
                  <span className="font-serif text-[13px] text-text-primary font-normal group-hover:text-gold-accent transition-colors duration-200 truncate min-w-0">
                    {captionTitle}
                  </span>
                  <span className="text-[10px] text-text-secondary/40 font-light select-none flex-shrink-0">
                    ·
                  </span>
                  <span className="font-sans text-[11px] text-text-secondary font-light tracking-wide flex-shrink-0">
                    {captionMeta}
                  </span>
                </div>

                <svg
                  className="w-3.5 h-3.5 text-text-secondary/60 group-hover:text-gold-accent group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
