import React from 'react';
import { useLanguage } from '../../i18n';
import Button from '../ui/Button';
import minimalistLogo from '../../assets/minimalist-logo.svg';

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-canvas py-24 lg:py-32 relative overflow-hidden">
      {/* Delicate background ornament */}
      <div className="max-w-layout mx-auto px-6 sm:px-12 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto border border-[rgba(230,216,195,0.8)] bg-surface/70 backdrop-blur-xs p-10 sm:p-16 lg:p-20 rounded-lg shadow-card">
          
          {/* Subtle Morphia icon */}
          <div className="w-12 h-10 mx-auto mb-6 text-text-primary opacity-80">
            <img
              src={minimalistLogo}
              alt="Morphia Emblem"
              className="w-full h-full object-contain"
            />
          </div>

          <span className="label-caps text-text-secondary block mb-3">
            {t('cta.overline')}
          </span>

          <h2 className="headline-xl text-text-primary mb-6 text-balance">
            {t('cta.title')}
          </h2>

          <p className="body-lg text-text-secondary mb-10 max-w-xl mx-auto font-light">
            {t('cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5">
            <Button to="/catalogo" variant="primary">
              {t('cta.catalog_btn')}
            </Button>
            <Button to="/contacto" variant="tertiary">
              {t('cta.contact_btn')}
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
