import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AtelierBar from './AtelierBar';
import Navbar from './Navbar';
import Footer from './Footer';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-text-primary selection:bg-primary-accent selection:text-text-primary">
      <ScrollToTop />
      <AtelierBar />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
