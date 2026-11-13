import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n';
import Button from '../ui/Button';
import heroPhoto from '../../assets/hero-photo.jpg';

export default function HeroSection() {
  const { t, language } = useLanguage();

  return (
    <section className="relative w-full bg-canvas border-b border-[rgba(230,216,195,0.7)] overflow-hidden">
      <div className="max-w-layout mx-auto">
        <div className="flex flex-col-reverse md:flex-row md:min-h-[580px] lg:min-h-[720px]">
          
          {/* Left / Content block (Side-by-side from tablet md:) */}
          <div className="w-full md:w-[50%] lg:w-[52%] px-6 sm:px-10 md:px-8 lg:px-16 py-10 sm:py-12 md:py-14 lg:py-20 flex flex-col justify-center bg-canvas">
            <div className="max-w-xl">
              
              {/* Provenance Badge */}
              <div className="inline-flex items-center space-x-2.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
                <span className="label-caps text-text-secondary">
                  {t('hero.badge')}
                </span>
                <span className="h-px w-8 bg-[rgba(92,85,78,0.25)]" />
              </div>

              {/* Display Headline */}
              <h1 className="display-hero text-text-primary mb-6 text-balance">
                {t('hero.title')}
              </h1>

              {/* Subtitle */}
              <p className="body-lg text-text-secondary mb-10 text-balance">
                {t('hero.subtitle')}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
                <Button to="/catalogo" variant="primary">
                  {t('hero.explore')}
                </Button>
                <Button to="/nosotros" variant="tertiary">
                  {t('hero.about')}
                </Button>
              </div>

              {/* Subtle quality footnote */}
              <div className="mt-12 pt-8 border-t border-[rgba(230,216,195,0.6)] flex items-center justify-between text-text-secondary">
                <span className="font-sans text-[11px] tracking-widest uppercase font-light">
                  {t('hero.footnote_materials')}
                </span>
                <span className="font-sans text-[11px] tracking-widest uppercase font-light">
                  {t('hero.footnote_edition')}
                </span>
              </div>
            </div>
          </div>

          {/* Right / Hero image (Split layout in tablet & desktop, organic immersive crop in mobile) */}
          <div className="w-full md:w-[50%] lg:w-[48%] relative bg-warm/30 min-h-[380px] sm:min-h-[480px] md:min-h-full">
            <img
              src={heroPhoto}
              alt={language === 'en' ? 'Andean Morphia Jewelry - Atelier in Cuzco, Peru' : 'Andean Morphia Jewelry - Joyería en Cusco, Perú'}
              className="w-full h-full object-cover object-center md:object-top absolute inset-0"
              fetchPriority="high"
            />
            {/* Subtle luxury vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-text-primary/20 via-transparent to-transparent pointer-events-none" />

            {/* Featured piece subtle quiet-luxury caption plaque */}
            <Link
              to="/producto/anillo-de-serpiente"
              className="group absolute bottom-4 right-4 sm:bottom-6 sm:right-6 max-w-[calc(100%-2rem)] sm:max-w-none bg-white/85 hover:bg-white/95 backdrop-blur-md border border-[rgba(230,216,195,0.7)] hover:border-gold-accent/60 rounded-md px-4 py-2.5 sm:px-5 sm:py-3 shadow-card hover:shadow-sm transition-all duration-300 z-10 flex items-center justify-between gap-3.5 sm:gap-4.5"
              aria-label={`${t('hero.featured_piece_label')}: ${t('hero.featured_piece_name')} - ${t('hero.featured_piece_price')}`}
            >
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-accent/80 flex-shrink-0" />
                  <span className="label-caps text-[9px] tracking-[0.18em] text-text-secondary uppercase truncate">
                    {t('hero.featured_piece_label')}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 truncate">
                  <span className="font-serif text-[13px] sm:text-[14px] text-text-primary font-normal group-hover:text-gold-accent transition-colors duration-200 truncate">
                    {t('hero.featured_piece_name')}
                  </span>
                  <span className="text-[10px] text-text-secondary/40 font-light select-none">·</span>
                  <span className="font-sans text-[11px] sm:text-[12px] text-text-secondary font-light tracking-wide flex-shrink-0">
                    {t('hero.featured_piece_price')}
                  </span>
                </div>
              </div>

              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-secondary/60 group-hover:text-gold-accent group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0 ml-1"
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

        </div>
      </div>
    </section>
  );
}
