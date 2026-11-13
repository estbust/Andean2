import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n';
import Button from '../ui/Button';

export default function SizeGuideModal({ isOpen, onClose }) {
  const { t, language } = useLanguage();
  const modalRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const conciergeMessage =
    language === 'en'
      ? encodeURIComponent('Hello, I need assistance with ring sizing')
      : encodeURIComponent('Hola, necesito asesoría con la talla de un anillo');

  if (!isOpen) return null;

  const sizeTableData = [
    { amSize: '12', diameter: '16.5 mm', circ: '51.8 mm', usSize: '6' },
    { amSize: '14', diameter: '17.2 mm', circ: '54.0 mm', usSize: '7' },
    { amSize: '16', diameter: '17.8 mm', circ: '55.9 mm', usSize: '7.5' },
    { amSize: '17', diameter: '18.1 mm', circ: '56.9 mm', usSize: '8' },
    { amSize: '18', diameter: '18.5 mm', circ: '58.1 mm', usSize: '8.5' },
    { amSize: '19', diameter: '18.9 mm', circ: '59.4 mm', usSize: '9' },
    { amSize: '20', diameter: '19.3 mm', circ: '60.6 mm', usSize: '9.5' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-text-primary/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-canvas border border-[rgba(230,216,195,0.8)] rounded-md shadow-drawer overflow-hidden flex flex-col max-h-[90vh] z-10"
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[rgba(230,216,195,0.7)] bg-[#F4ECE7]">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-gold-accent text-xs">✦</span>
              <span className="label-caps text-text-secondary text-[10px]">
                {t('size_guide.modal_subtitle')}
              </span>
            </div>
            <h2 id="size-guide-title" className="headline-md text-text-primary">
              {t('size_guide.modal_title')}
            </h2>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label={t('size_guide.close_btn')}
            className="w-9 h-9 rounded-full bg-surface border border-[rgba(230,216,195,0.8)] text-text-primary flex items-center justify-center hover:bg-warm transition-colors focus:outline-none focus:ring-1 focus:ring-text-primary"
          >
            <svg
              className="w-4 h-4 stroke-current"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6">
          <p className="body-md text-text-secondary font-light">
            {t('size_guide.intro')}
          </p>

          {/* Sizing Measurement Methods (Side-by-side) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-surface rounded-sm border border-[rgba(230,216,195,0.6)] space-y-2">
              <div className="flex items-center space-x-2 text-text-primary">
                <svg
                  className="w-4 h-4 text-gold-accent stroke-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="8" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                </svg>
                <h3 className="font-serif text-sm font-medium">
                  {t('size_guide.method1_title')}
                </h3>
              </div>
              <p className="body-sm text-text-secondary font-light text-xs leading-relaxed">
                {t('size_guide.method1_desc')}
              </p>
            </div>

            <div className="p-4 bg-surface rounded-sm border border-[rgba(230,216,195,0.6)] space-y-2">
              <div className="flex items-center space-x-2 text-text-primary">
                <svg
                  className="w-4 h-4 text-gold-accent stroke-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <h3 className="font-serif text-sm font-medium">
                  {t('size_guide.method2_title')}
                </h3>
              </div>
              <p className="body-sm text-text-secondary font-light text-xs leading-relaxed">
                {t('size_guide.method2_desc')}
              </p>
            </div>
          </div>

          {/* Equivalence Table */}
          <div className="border border-[rgba(230,216,195,0.8)] rounded-sm overflow-hidden bg-surface shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4ECE7] border-b border-[rgba(230,216,195,0.7)] text-text-primary font-sans uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4 font-semibold">{t('size_guide.table_size_col')}</th>
                  <th className="py-3 px-4 font-semibold">{t('size_guide.table_diameter_col')}</th>
                  <th className="py-3 px-4 font-semibold">{t('size_guide.table_circumference_col')}</th>
                  <th className="py-3 px-4 font-semibold">{t('size_guide.table_us_col')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(230,216,195,0.4)] text-text-secondary font-sans font-light">
                {sizeTableData.map((row) => (
                  <tr key={row.amSize} className="hover:bg-warm/30 transition-colors">
                    <td className="py-2.5 px-4 font-medium text-text-primary">{row.amSize}</td>
                    <td className="py-2.5 px-4">{row.diameter}</td>
                    <td className="py-2.5 px-4">{row.circ}</td>
                    <td className="py-2.5 px-4">{row.usSize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Highlight Callout: Adjustable Open-Band Rings */}
          <div className="p-4 sm:p-5 bg-warm/50 rounded-sm border border-gold-accent/40 space-y-2">
            <div className="flex items-center space-x-2 text-text-primary">
              <span className="text-gold-accent text-sm">✦</span>
              <h4 className="font-serif text-sm font-medium">
                {t('size_guide.adjustable_note_title')}
              </h4>
            </div>
            <p className="body-sm text-text-secondary font-light text-xs leading-relaxed">
              {t('size_guide.adjustable_note_desc')}
            </p>
          </div>

          {/* Concierge Assistance Note */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-surface rounded-sm border border-[rgba(230,216,195,0.6)] gap-3 text-center sm:text-left">
            <div>
              <p className="font-serif text-sm text-text-primary font-medium">
                {t('size_guide.concierge_prompt')}
              </p>
              <p className="font-sans text-xs text-text-secondary font-light">
                {t('contact.concierge_desc')}
              </p>
            </div>
            <Link
              to={`/contacto?mensaje=${conciergeMessage}`}
              onClick={onClose}
              className="inline-flex items-center justify-center font-sans uppercase font-semibold text-[10px] tracking-widest px-4 py-2.5 bg-text-primary text-canvas rounded-[3px] hover:bg-charcoal-hover transition-colors whitespace-nowrap btn-shimmer"
            >
              {t('size_guide.concierge_cta')}
            </Link>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 sm:px-8 py-4 border-t border-[rgba(230,216,195,0.7)] bg-[#F4ECE7] flex justify-end">
          <Button onClick={onClose} variant="primary" size="sm">
            {t('size_guide.close_btn')}
          </Button>
        </div>
      </div>
    </div>
  );
}
