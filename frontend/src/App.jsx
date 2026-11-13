import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './i18n';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import Button from './components/ui/Button';

function NotFoundPage() {
  const { language } = useLanguage();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center bg-canvas">
      <span className="label-caps text-text-secondary mb-3">ERROR 404</span>
      <h1 className="headline-xl text-text-primary mb-4">
        {language === 'en' ? 'Page Not Found' : 'Página no encontrada'}
      </h1>
      <p className="body-md text-text-secondary max-w-md mb-8 font-light">
        {language === 'en'
          ? 'The piece or page you are looking for has been moved or does not exist.'
          : 'La pieza o página que buscas ha sido trasladada o no se encuentra disponible.'}
      </p>
      <Button to="/" variant="primary">
        {language === 'en' ? 'Back to Home' : 'Volver al Inicio'}
      </Button>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/catalogo" element={<CatalogPage />} />
            <Route path="/producto/:slug" element={<ProductDetailPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
}
