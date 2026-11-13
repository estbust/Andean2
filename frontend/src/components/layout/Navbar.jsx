import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../i18n';
import LanguageSelector from '../ui/LanguageSelector';
import CartIndicator from './CartIndicator';
import mainLogo from '../../assets/main-logo.svg';
import logoAm from '../../assets/logo-am.svg';

export default function Navbar() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/nosotros', label: t('nav.about') },
    { to: '/catalogo', label: t('nav.catalog') },
    { to: '/contacto', label: t('nav.contact') },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[rgba(230,216,195,0.7)] transition-colors duration-200 ${
        mobileMenuOpen
          ? 'bg-[#F8F2E4]'
          : 'bg-canvas/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-layout mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center focus:outline-none"
            aria-label="Andean Morphia Jewelry - Inicio"
          >
            {/* Desktop Logo */}
            <img
              src={mainLogo}
              alt="Andean Morphia Jewelry"
              className="hidden sm:block h-10 lg:h-12 w-auto object-contain text-text-primary"
            />
            {/* Mobile Logo */}
            <img
              src={logoAm}
              alt="Andean Morphia Jewelry"
              className="block sm:hidden h-10 w-auto object-contain text-text-primary"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-sans text-[13px] uppercase tracking-[0.08em] transition-colors duration-200 relative py-1 ${
                    isActive
                      ? 'text-text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Tools: Cart, Language Selector & Mobile Hamburger */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <CartIndicator />

            <div className="hidden sm:block">
              <LanguageSelector />
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-text-primary focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <svg
                className="w-6 h-6 stroke-current transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full inset-x-0 h-[calc(100dvh-100%)] bg-[#F8F2E4] z-50 shadow-drawer overflow-y-auto border-t border-[rgba(230,216,195,0.7)] animate-fadeIn">
          <div className="min-h-full flex flex-col justify-between px-8 py-8">
            <nav className="flex flex-col space-y-6 pt-2" aria-label="Navegación móvil">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `font-serif text-2xl tracking-wide transition-colors ${
                      isActive
                        ? 'text-text-primary font-medium pl-3 border-l-2 border-text-primary'
                        : 'text-text-secondary hover:text-text-primary pl-3'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Mobile Cart Entry */}
              <div className="pl-3 pt-2 select-none">
                <div className="flex items-center justify-between text-text-secondary/70 py-1">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 stroke-current opacity-70"
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
                    <span className="font-serif text-2xl tracking-wide">
                      {t('nav.cart')}
                    </span>
                  </div>
                  <span className="label-caps text-[10px] px-2 py-0.5 rounded-sm bg-[#E6D8C3]/70 text-text-secondary tracking-widest">
                    {t('nav.coming_soon')}
                  </span>
                </div>
                <p className="body-sm text-xs text-text-secondary/60 mt-1 pl-8">
                  {t('nav.cart_coming_soon_desc')}
                </p>
              </div>
            </nav>

            <div className="pt-8 mt-8 border-t border-[rgba(230,216,195,0.5)] flex items-center justify-between">
              <span className="label-caps text-text-secondary">Idioma / Language</span>
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
