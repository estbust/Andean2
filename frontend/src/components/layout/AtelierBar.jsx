import React from 'react';
import { useLanguage } from '../../i18n';

export default function AtelierBar() {
  const { t } = useLanguage();

  return (
    <div
      role="region"
      aria-label="Atelier Announcement"
      className="bg-[#1E1B18] text-[#F8F2E4] border-b border-[#2C2723] py-2 sm:py-2.5 px-4 transition-colors duration-200"
    >
      <div className="max-w-layout mx-auto flex items-center justify-center text-center">
        <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.16em] uppercase font-light flex items-center justify-center gap-2 select-none">
          <span className="text-gold-accent font-normal text-xs animate-pulse" aria-hidden="true">✦</span>
          <span>{t('nav.atelier_bar')}</span>
          <span className="hidden sm:inline text-gold-accent font-normal text-xs animate-pulse" aria-hidden="true">✦</span>
        </p>
      </div>
    </div>
  );
}
