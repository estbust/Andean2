import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n';
import logoWings from '../../assets/logo-wings.svg';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-text-primary text-canvas pt-16 pb-12 border-t border-[rgba(230,216,195,0.15)]">
      <div className="max-w-layout mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-16 border-b border-[rgba(248,242,228,0.12)]">
          
          {/* Col 1: Brand & Logo */}
          <div className="space-y-6">
            <Link to="/" className="inline-block" aria-label="Andean Morphia Jewelry">
              <div className="w-40 text-primary-accent hover:opacity-90 transition-opacity">
                <img
                  src={logoWings}
                  alt="Andean Morphia Jewelry"
                  className="w-full h-auto object-contain brightness-150 filter invert"
                  style={{ filter: 'brightness(0) invert(0.95)' }}
                />
              </div>
            </Link>
            <p className="font-sans text-[13px] font-light leading-relaxed text-[#D2C8BC]">
              {t('footer.desc')}
            </p>
            <div className="inline-flex items-center text-[11px] tracking-[0.15em] uppercase text-primary-accent">
              <span className="w-2 h-2 rounded-full bg-primary-accent mr-2"></span>
              {t('footer.city_country')}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-5">
            <h4 className="font-serif text-lg tracking-wide text-canvas">
              {t('footer.nav_title')}
            </h4>
            <ul className="space-y-3 font-sans text-[13px] font-normal text-[#D2C8BC]">
              <li>
                <Link to="/" className="hover:text-primary-accent transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="hover:text-primary-accent transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="hover:text-primary-accent transition-colors">
                  {t('nav.catalog')}
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-primary-accent transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="space-y-5">
            <h4 className="font-serif text-lg tracking-wide text-canvas">
              {t('footer.contact_title')}
            </h4>
            <ul className="space-y-3 font-sans text-[13px] text-[#D2C8BC] font-light">
              <li>
                <span className="block text-[11px] uppercase tracking-wider text-primary-accent font-semibold mb-0.5">
                  Email
                </span>
                <a
                  href="mailto:andeanmorphiajewelry@gmail.com"
                  className="hover:text-primary-accent transition-colors font-normal"
                >
                  andeanmorphiajewelry@gmail.com
                </a>
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-wider text-primary-accent font-semibold mb-0.5">
                  Atelier
                </span>
                <span>{t('footer.address_val')}</span>
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-wider text-primary-accent font-semibold mb-0.5">
                  {t('footer.hours_label')}
                </span>
                <span>{t('footer.hours_val')}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Social Media */}
          <div className="space-y-5">
            <h4 className="font-serif text-lg tracking-wide text-canvas">
              {t('footer.social_title')}
            </h4>
            <ul className="space-y-3 font-sans text-[13px] text-[#D2C8BC]">
              <li>
                <a
                  href="https://instagram.com/andeanmorphia.jewelry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-primary-accent transition-colors group"
                >
                  <span className="mr-2 group-hover:translate-x-0.5 transition-transform">↗</span>
                  Instagram <span className="text-[11px] text-[#A69C90] ml-1.5">@andeanmorphia.jewelry</span>
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@andeanmorphia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-primary-accent transition-colors group"
                >
                  <span className="mr-2 group-hover:translate-x-0.5 transition-transform">↗</span>
                  TikTok <span className="text-[11px] text-[#A69C90] ml-1.5">@andeanmorphia</span>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/andeanmorphia.jewelry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-primary-accent transition-colors group"
                >
                  <span className="mr-2 group-hover:translate-x-0.5 transition-transform">↗</span>
                  Facebook <span className="text-[11px] text-[#A69C90] ml-1.5">@andeanmorphia.jewelry</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#A69C90] font-light">
          <p>{t('footer.rights')}</p>
          <p className="mt-2 sm:mt-0 font-sans tracking-widest text-[11px] uppercase">
            {t('footer.origin_bar')}
          </p>
        </div>
      </div>
    </footer>
  );
}
