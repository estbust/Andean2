import React from 'react';
import { useLanguage } from '../../i18n';

export default function BrandPillars() {
  const { t } = useLanguage();

  const pillars = [
    {
      id: 'metals',
      title: t('brand_pillars.metals_title'),
      subtitle: t('brand_pillars.metals_subtitle'),
      icon: (
        <svg
          className="w-6 h-6 stroke-current"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
          <path d="M2 9h20" />
          <path d="M10 3l-2 6 4 12 4-12-2-6" />
        </svg>
      ),
    },
    {
      id: 'handmade',
      title: t('brand_pillars.handmade_title'),
      subtitle: t('brand_pillars.handmade_subtitle'),
      icon: (
        <svg
          className="w-6 h-6 stroke-current"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          <path d="M15 5l4 4" />
          <path d="M4 20h7" />
          <path d="M4 20l4-4" />
        </svg>
      ),
    },
    {
      id: 'packaging',
      title: t('brand_pillars.packaging_title'),
      subtitle: t('brand_pillars.packaging_subtitle'),
      icon: (
        <svg
          className="w-6 h-6 stroke-current"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      ),
    },
    {
      id: 'concierge',
      title: t('brand_pillars.concierge_title'),
      subtitle: t('brand_pillars.concierge_subtitle'),
      icon: (
        <svg
          className="w-6 h-6 stroke-current"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" strokeDasharray="2 2" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
          <path d="m6.34 6.34 1.42 1.42M16.24 16.24l1.42 1.42" />
        </svg>
      ),
    },
  ];

  return (
    <section
      aria-label="Pilares de Alta Orfebrería"
      className="bg-[#F4ECE7] border-y border-[rgba(230,216,195,0.7)] transition-colors duration-200"
    >
      <div className="max-w-layout mx-auto px-6 sm:px-12 lg:px-16 py-8 sm:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="flex flex-col items-center text-center group transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-full bg-surface/80 border border-[rgba(230,216,195,0.9)] text-gold-accent flex items-center justify-center mb-3 shadow-[0_2px_8px_rgba(30,27,24,0.04)] group-hover:bg-surface group-hover:scale-105 group-hover:border-gold-accent/50 transition-all duration-300">
                {pillar.icon}
              </div>
              <h3 className="font-serif text-sm sm:text-base text-text-primary font-medium tracking-tight mb-1">
                {pillar.title}
              </h3>
              <p className="font-sans text-[11px] sm:text-xs text-text-secondary font-light leading-relaxed max-w-[200px]">
                {pillar.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
