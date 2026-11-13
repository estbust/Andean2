import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n';
import ProductGrid from '../products/ProductGrid';
import Button from '../ui/Button';
import { fetchProducts } from '../../api/client';

export default function FeaturedProducts() {
  const { t } = useLanguage();
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      setLoading(true);
      setError(null);
      try {
        // Fetch featured pieces first
        const featured = await fetchProducts({ featured: true });
        
        // If there are fewer than 3 items, complement with the most premium items from all products
        if (featured.length < 3) {
          const allProducts = await fetchProducts();
          const existingIds = new Set(featured.map(p => p.id));
          // Sort remaining products descending by price
          const remainingSorted = allProducts
            .filter(p => !existingIds.has(p.id))
            .sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          
          const combined = [...featured, ...remainingSorted].slice(0, 3);
          if (isMounted) setFeaturedItems(combined);
        } else {
          if (isMounted) setFeaturedItems(featured.slice(0, 3));
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full bg-canvas py-20 lg:py-28 border-b border-[rgba(230,216,195,0.7)]">
      <div className="max-w-layout mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
              <span className="label-caps text-text-secondary">
                {t('featured.overline')}
              </span>
            </div>
            <h2 className="headline-xl text-text-primary mb-3">
              {t('featured.title')}
            </h2>
            <p className="body-md text-text-secondary">
              {t('featured.subtitle')}
            </p>
          </div>

          <div className="hidden md:block mt-6 md:mt-0">
            <Button to="/catalogo" variant="tertiary" size="sm">
              {t('featured.view_all')}
            </Button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <ProductGrid
          products={featuredItems}
          loading={loading}
          error={error}
          columns={3}
        />

        {/* Mobile View All Button */}
        <div className="mt-10 text-center md:hidden">
          <Button to="/catalogo" variant="primary" className="w-full">
            {t('featured.view_all')}
          </Button>
        </div>

      </div>
    </section>
  );
}
