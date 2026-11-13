import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import Button from '../ui/Button';
import { sendContactMessage } from '../../api/client';

export default function ContactForm({ prefilledMessage = '' }) {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: prefilledMessage || '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = t('contact.error_name', 'Por favor ingresa tu nombre.');
    }
    if (!formData.email.trim()) {
      errors.email = t('contact.error_email', 'Por favor ingresa tu correo electrónico.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = t('contact.error_email_invalid', 'Ingresa un correo electrónico válido.');
    }
    if (!formData.message.trim()) {
      errors.message = t('contact.error_message', 'Por favor escribe tu mensaje.');
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      await sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || t('contact.error_desc'));
    }
  };

  return (
    <div className="bg-surface p-8 sm:p-10 lg:p-12 rounded-md border border-[rgba(230,216,195,0.7)] shadow-card">
      <h3 className="headline-lg text-text-primary mb-2">
        {t('contact.form_title')}
      </h3>
      <p className="body-sm text-text-secondary mb-8">
        {t('contact.subtitle')}
      </p>

      {status === 'success' ? (
        <div className="p-6 bg-[#F3F7F4] border border-success/40 rounded-sm text-center space-y-4 animate-fadeIn">
          <div className="w-12 h-12 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="headline-sm text-text-primary">
            {t('contact.success_title')}
          </h4>
          <p className="body-md text-text-secondary max-w-md mx-auto">
            {t('contact.success_desc')}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="font-sans text-xs uppercase tracking-wider text-text-primary underline hover:text-gold-accent transition-colors"
            >
              {t('contact.send_another')}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {status === 'error' && (
            <div className="p-4 bg-[#FDF4F4] border border-alert/30 rounded-sm text-alert text-sm">
              <p className="font-medium">{t('contact.error_title')}</p>
              <p className="font-light text-xs mt-1">{errorMessage}</p>
            </div>
          )}

          {/* Name Field */}
          <div>
            <label htmlFor="contact-name" className="block label-caps text-text-secondary mb-2">
              {t('contact.name_label')} <span className="text-alert">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('contact.name_placeholder')}
              className={`w-full px-4 py-3.5 bg-surface text-text-primary border ${
                fieldErrors.name ? 'border-alert' : 'border-[#E6D8C3]'
              } rounded-[3px] font-sans text-sm placeholder:text-text-secondary/60 focus:outline-none focus:border-text-primary transition-colors`}
              disabled={status === 'submitting'}
            />
            {fieldErrors.name && (
              <p className="mt-1.5 text-xs text-alert font-sans">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="contact-email" className="block label-caps text-text-secondary mb-2">
              {t('contact.email_label')} <span className="text-alert">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('contact.email_placeholder')}
              className={`w-full px-4 py-3.5 bg-surface text-text-primary border ${
                fieldErrors.email ? 'border-alert' : 'border-[#E6D8C3]'
              } rounded-[3px] font-sans text-sm placeholder:text-text-secondary/60 focus:outline-none focus:border-text-primary transition-colors`}
              disabled={status === 'submitting'}
            />
            {fieldErrors.email && (
              <p className="mt-1.5 text-xs text-alert font-sans">{fieldErrors.email}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="contact-message" className="block label-caps text-text-secondary mb-2">
              {t('contact.message_label')} <span className="text-alert">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder={t('contact.message_placeholder')}
              className={`w-full px-4 py-3.5 bg-surface text-text-primary border ${
                fieldErrors.message ? 'border-alert' : 'border-[#E6D8C3]'
              } rounded-[3px] font-sans text-sm placeholder:text-text-secondary/60 focus:outline-none focus:border-text-primary transition-colors resize-y`}
              disabled={status === 'submitting'}
            />
            {fieldErrors.message && (
              <p className="mt-1.5 text-xs text-alert font-sans">{fieldErrors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              disabled={status === 'submitting'}
              className="w-full sm:w-auto"
            >
              {status === 'submitting' ? t('contact.sending_btn') : t('contact.send_btn')}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
