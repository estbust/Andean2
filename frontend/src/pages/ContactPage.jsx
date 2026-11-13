import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../i18n';
import ContactForm from '../components/contact/ContactForm';
import logoWings from '../assets/logo-wings.svg';

export default function ContactPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const prefilledMessage = searchParams.get('mensaje') || '';

  return (
    <div className="bg-canvas min-h-screen py-16 lg:py-24">
      <div className="max-w-layout mx-auto px-6 sm:px-12 lg:px-16">

        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="label-caps text-text-secondary block mb-3">
            {t('contact.overline')}
          </span>
          <h1 className="headline-xl text-text-primary mb-4">
            {t('contact.title')}
          </h1>
          <p className="body-md text-text-secondary font-light">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm prefilledMessage={prefilledMessage} />
          </div>

          {/* Right: Atelier & Direct Info */}
          <div className="lg:col-span-5 space-y-8">

            {/* Atelier Info Card */}
            <div className="bg-warm/50 p-8 sm:p-10 rounded-md border border-[rgba(92,85,78,0.12)] shadow-card space-y-6">
              <div className="w-24 h-16 text-text-primary mb-2">
                <img
                  src={logoWings}
                  alt="Andean Morphia"
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="headline-md text-text-primary">
                {t('contact.info_title')}
              </h3>

              <div className="space-y-5 text-sm text-text-primary">
                <div>
                  <span className="label-caps text-text-secondary block mb-1">
                    {t('contact.email_label_card')}
                  </span>
                  <a
                    href="mailto:andeanmorphiajewelry@gmail.com"
                    className="hover:text-gold-accent transition-colors font-medium"
                  >
                    andeanmorphiajewelry@gmail.com
                  </a>
                </div>

                <div>
                  <span className="label-caps text-text-secondary block mb-1">
                    {t('contact.address_label_card')}
                  </span>
                  <p className="font-medium">{t('contact.address_val')}</p>
                  <p className="text-xs text-text-secondary mt-0.5 font-light">
                    {t('contact.address_note')}
                  </p>
                </div>

                <div>
                  <span className="label-caps text-text-secondary block mb-1">
                    {t('contact.hours_label_card')}
                  </span>
                  <p className="font-medium">{t('contact.hours_val')}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(92,85,78,0.15)]">
                <span className="label-caps text-text-secondary block mb-3">
                  {t('contact.social_title')}
                </span>
                <div className="space-y-2 text-xs">
                  <a
                    href="https://instagram.com/andeanmorphia.jewelry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-text-primary hover:text-gold-accent transition-colors font-medium"
                  >
                    <span className="mr-2">↗</span> Instagram: @andeanmorphia.jewelry
                  </a>
                  <a
                    href="https://tiktok.com/@andeanmorphia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-text-primary hover:text-gold-accent transition-colors font-medium"
                  >
                    <span className="mr-2">↗</span> TikTok: @andeanmorphia
                  </a>
                  <a
                    href="https://facebook.com/andeanmorphia.jewelry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-text-primary hover:text-gold-accent transition-colors font-medium"
                  >
                    <span className="mr-2">↗</span> Facebook: @andeanmorphia.jewelry
                  </a>
                </div>
              </div>

            </div>

            {/* Concierge Assurance Note */}
            <div className="p-6 bg-surface rounded-md border border-[rgba(230,216,195,0.7)] shadow-xs">
              <span className="label-caps text-text-secondary block mb-1.5">
                {t('contact.concierge_badge')}
              </span>
              <p className="body-sm text-text-secondary font-light">
                {t('contact.concierge_desc')}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
