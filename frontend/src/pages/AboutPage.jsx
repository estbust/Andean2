import React from 'react';
import { useLanguage } from '../i18n';
import Button from '../components/ui/Button';
import FiligreeDivider from '../components/ui/FiligreeDivider';
import ScrollReveal from '../components/ui/ScrollReveal';
import logoWings from '../assets/logo-wings.svg';
import minimalistLogo from '../assets/minimalist-logo.svg';
import heroPhoto from '../assets/hero-photo.jpg';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-canvas text-text-primary">
      
      {/* 1. About Hero Banner */}
      <section className="relative py-20 lg:py-28 border-b border-[rgba(230,216,195,0.7)] bg-canvas">
        <div className="max-w-layout mx-auto px-6 sm:px-12 lg:px-16 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
              <span className="label-caps text-text-secondary">
                {t('about.hero_overline')}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
            </div>
            <h1 className="display-hero text-text-primary mb-6">
              {t('about.hero_title')}
            </h1>
            <p className="body-lg text-text-secondary max-w-2xl mx-auto font-light">
              {t('about.hero_subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Essence of the Brand (Split editorial rhythm) */}
      <ScrollReveal direction="up" delay={50}>
        <section className="py-20 lg:py-28 border-b border-[rgba(230,216,195,0.7)]">
          <div className="max-w-layout mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left: Text */}
              <div className="lg:col-span-7 space-y-6">
                <span className="label-caps text-text-secondary block">
                  {t('about.essence_overline')}
                </span>
                <h2 className="headline-xl text-text-primary">
                  {t('about.essence_title')}
                </h2>
                <div className="w-12 h-0.5 bg-gold-accent" />
                <p className="body-lg text-text-secondary font-light leading-relaxed">
                  {t('about.essence_p1')}
                </p>
                <p className="body-lg text-text-secondary font-light leading-relaxed">
                  {t('about.essence_p2')}
                </p>
              </div>

              {/* Right: Winged Logo Emblem Frame */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-md bg-warm/50 border border-[rgba(92,85,78,0.15)] rounded-md p-10 lg:p-14 shadow-card text-center relative overflow-hidden card-shimmer">
                  <div className="w-36 h-28 mx-auto mb-6 text-text-primary flex items-center justify-center">
                    <img
                      src={logoWings}
                      alt="Andean Morphia Wings Emblem"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-serif italic text-xl text-text-primary mb-2">
                    Andean Morphia Jewelry
                  </h3>
                  <p className="font-sans text-xs uppercase tracking-widest text-text-secondary">
                    {t('footer.city_country')}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Filigree Divider */}
      <FiligreeDivider variant="morphia" spacing="py-8 sm:py-12" />

      {/* 3. Mission & Vision (2-Column Cards) */}
      <ScrollReveal direction="up" delay={80}>
        <section className="py-20 lg:py-28 bg-warm border-y border-[rgba(92,85,78,0.12)]">
          <div className="max-w-layout mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Mission Card */}
              <div className="bg-surface p-10 lg:p-12 rounded-md border border-[rgba(230,216,195,0.7)] shadow-card flex flex-col justify-between card-shimmer">
                <div>
                  <div className="inline-flex items-center space-x-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-accent" />
                    <span className="label-caps text-text-secondary">
                      {t('about.mission_overline')}
                    </span>
                  </div>
                  <h3 className="headline-lg text-text-primary mb-6">
                    {t('about.mission_title')}
                  </h3>
                  <p className="body-lg text-text-secondary font-light leading-relaxed">
                    {t('about.mission_p')}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[rgba(230,216,195,0.5)] flex items-center space-x-4">
                  <span className="label-caps text-[10px] text-text-secondary px-2.5 py-1 bg-warm rounded-sm">
                    {t('about.mission_tag1')}
                  </span>
                  <span className="label-caps text-[10px] text-text-secondary px-2.5 py-1 bg-warm rounded-sm">
                    {t('about.mission_tag2')}
                  </span>
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-surface p-10 lg:p-12 rounded-md border border-[rgba(230,216,195,0.7)] shadow-card flex flex-col justify-between card-shimmer">
                <div>
                  <div className="inline-flex items-center space-x-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
                    <span className="label-caps text-text-secondary">
                      {t('about.vision_overline')}
                    </span>
                  </div>
                  <h3 className="headline-lg text-text-primary mb-6">
                    {t('about.vision_title')}
                  </h3>
                  <p className="body-lg text-text-secondary font-light leading-relaxed">
                    {t('about.vision_p')}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[rgba(230,216,195,0.5)] flex items-center space-x-4">
                  <span className="label-caps text-[10px] text-text-secondary px-2.5 py-1 bg-warm rounded-sm">
                    {t('about.vision_tag1')}
                  </span>
                  <span className="label-caps text-[10px] text-text-secondary px-2.5 py-1 bg-warm rounded-sm">
                    {t('about.vision_tag2')}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Filigree Divider */}
      <FiligreeDivider variant="glyph" spacing="py-8 sm:py-12" />

      {/* 4. Packaging & Sensory Experience */}
      <ScrollReveal direction="up" delay={80}>
        <section className="py-20 lg:py-28 border-b border-[rgba(230,216,195,0.7)]">
          <div className="max-w-layout mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Image / Atelier photo */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="aspect-[4/5] rounded-md overflow-hidden border border-[rgba(230,216,195,0.7)] shadow-card relative">
                  <img
                    src={heroPhoto}
                    alt="Packaging y Joyería Andean Morphia"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-text-primary/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-surface/90 backdrop-blur-sm rounded-sm border border-[rgba(230,216,195,0.6)] text-center">
                    <p className="font-serif text-sm italic text-text-primary">
                      {t('about.packaging_quote')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Packaging Narrative */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
                <div>
                  <span className="label-caps text-text-secondary block mb-2">
                    {t('about.packaging_overline')}
                  </span>
                  <h2 className="headline-xl text-text-primary mb-4">
                    {t('about.packaging_title')}
                  </h2>
                  <p className="body-lg text-text-secondary font-light">
                    {t('about.packaging_desc')}
                  </p>
                </div>

                {/* Elements grid */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-5 bg-surface rounded-sm border border-[rgba(230,216,195,0.5)] shadow-xs">
                    <div className="w-8 h-8 rounded-full bg-primary-accent flex-shrink-0 flex items-center justify-center text-text-primary mt-1">
                      <span className="text-xs">✦</span>
                    </div>
                    <div>
                      <h4 className="headline-sm text-text-primary mb-1">
                        {t('about.packaging_item1_title')}
                      </h4>
                      <p className="body-sm text-text-secondary font-light">
                        {t('about.packaging_item1_desc')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-5 bg-surface rounded-sm border border-[rgba(230,216,195,0.5)] shadow-xs">
                    <div className="w-8 h-8 rounded-full bg-warm flex-shrink-0 flex items-center justify-center text-text-primary mt-1">
                      <span className="text-xs">❖</span>
                    </div>
                    <div>
                      <h4 className="headline-sm text-text-primary mb-1">
                        {t('about.packaging_item2_title')}
                      </h4>
                      <p className="body-sm text-text-secondary font-light">
                        {t('about.packaging_item2_desc')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Swatches showcase */}
                <div className="pt-2">
                  <span className="label-caps text-text-secondary block mb-3">
                    {t('about.palette_title')}
                  </span>
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-primary-accent border border-black/10 shadow-xs" />
                      <span className="font-sans text-xs text-text-secondary">{t('about.swatch_celeste')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-warm border border-black/10 shadow-xs" />
                      <span className="font-sans text-xs text-text-secondary">{t('about.swatch_beige')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-[#E5E5E5] border border-black/15 shadow-xs" />
                      <span className="font-sans text-xs text-text-secondary">{t('about.swatch_silver')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gold-accent border border-black/10 shadow-xs" />
                      <span className="font-sans text-xs text-text-secondary">{t('about.swatch_gold')}</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Filigree Divider */}
      <FiligreeDivider variant="diamond" spacing="py-8 sm:py-12" />

      {/* 5. Bottom Navigation CTA */}
      <ScrollReveal direction="up" delay={50}>
        <section className="py-16 text-center bg-canvas">
          <div className="max-w-xl mx-auto px-6">
            <div className="w-8 h-8 mx-auto mb-4 text-text-secondary opacity-70">
              <img src={minimalistLogo} alt="" className="w-full h-full object-contain" />
            </div>
            <h3 className="headline-lg text-text-primary mb-4">
              {t('about.cta_title')}
            </h3>
            <Button to="/catalogo" variant="primary">
              {t('about.cta_btn')}
            </Button>
          </div>
        </section>
      </ScrollReveal>

    </div>
  );
}
