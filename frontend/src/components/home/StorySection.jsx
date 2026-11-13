import React from 'react';
import { useLanguage } from '../../i18n';
import Button from '../ui/Button';
import minimalistLogo from '../../assets/minimalist-logo.svg';

export default function StorySection() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-warm text-text-primary py-20 lg:py-28 border-b border-[rgba(92,85,78,0.12)]">
      <div className="max-w-layout mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Decorative Butterfly Monogram Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-10 lg:p-14 bg-canvas/70 rounded-md border border-[rgba(92,85,78,0.15)] shadow-card text-center">
            <div className="w-20 h-16 mb-6 text-text-primary flex items-center justify-center">
              <img
                src={minimalistLogo}
                alt="Morphia Butterfly Emblem"
                className="w-16 h-12 object-contain"
              />
            </div>
            <span className="label-caps text-text-secondary mb-3 tracking-[0.2em]">
              {t('story.badge')}
            </span>
            <h3 className="font-serif italic text-2xl lg:text-3xl text-text-primary max-w-xs leading-snug">
              {t('story.quote')}
            </h3>
            <div className="w-12 h-px bg-gold-accent my-6" />
            <p className="font-sans text-[12px] uppercase tracking-widest text-text-secondary font-light">
              {t('story.location')}
            </p>
          </div>

          {/* Right: Narrative Story Block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2">
              <span className="label-caps text-text-secondary">
                {t('story.overline')}
              </span>
              <span className="h-px w-10 bg-[rgba(92,85,78,0.3)]" />
            </div>

            <h2 className="headline-lg text-text-primary text-balance">
              {t('story.title')}
            </h2>

            <div className="space-y-4 text-text-secondary">
              <p className="body-lg font-light leading-relaxed">
                {t('story.body1')}
              </p>
              <p className="body-lg font-light leading-relaxed">
                {t('story.body2')}
              </p>
            </div>

            <div className="pt-4">
              <Button to="/nosotros" variant="tertiary">
                {t('story.cta')}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
