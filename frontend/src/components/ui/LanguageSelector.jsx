import React from 'react';
import { useLanguage } from '../../i18n';

export default function LanguageSelector({ className = '' }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`inline-flex items-center text-xs tracking-widest font-sans font-medium text-text-secondary ${className}`}>
      <button
        type="button"
        onClick={() => setLanguage('es')}
        className={`px-1.5 py-0.5 transition-colors duration-200 ${
          language === 'es'
            ? 'text-text-primary font-semibold border-b border-text-primary'
            : 'text-text-secondary hover:text-text-primary'
        }`}
        aria-label="Cambiar a español"
      >
        ES
      </button>
      <span className="text-[rgba(92,85,78,0.3)] mx-1 select-none">|</span>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-1.5 py-0.5 transition-colors duration-200 ${
          language === 'en'
            ? 'text-text-primary font-semibold border-b border-text-primary'
            : 'text-text-secondary hover:text-text-primary'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
