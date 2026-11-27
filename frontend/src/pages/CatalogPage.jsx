import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { useProducts, useCategories } from '../hooks/useProducts';
import ProductGrid from '../components/products/ProductGrid';
import FiligreeDivider from '../components/ui/FiligreeDivider';

export default function CatalogPage() {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const categoryParam = searchParams.get('categoria') || '';

  const { categories } = useCategories();
  const { products, loading, error } = useProducts({
    category: categoryParam || undefined,
  });

  const handleSelectCategory = (slug) => {
    if (!slug) {
      searchParams.delete('categoria');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ categoria: slug });
    }
  };

  return (
    <div className="bg-canvas min-h-screen py-16 lg:py-24">
      <div className="max-w-layout mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="label-caps text-text-secondary block mb-3">
            {t('catalog.overline')}
          </span>
          <h1 className="headline-xl text-text-primary mb-4">
            {t('catalog.title')}
          </h1>
          <p className="body-md text-text-secondary font-light">
            {t('catalog.subtitle')}
          </p>
        </div>

        {/* Filter Bar & Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-10 border-b border-[rgba(230,216,195,0.7)] gap-6">
          
          {/* Categories Pill Filter */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleSelectCategory('')}
              className={`px-4 py-2 rounded-btn font-sans text-xs uppercase tracking-wider transition-all duration-200 ${
                !categoryParam
                  ? 'bg-text-primary text-canvas shadow-xs font-semibold'
                  : 'bg-surface text-text-secondary border border-[rgba(230,216,195,0.7)] hover:text-text-primary hover:border-text-primary'
              }`}
            >
              {t('catalog.all')}
            </button>

            {categories.map((cat) => {
              const isActive = categoryParam === cat.slug;
              const catName = language === 'en' && cat.name_en ? cat.name_en : cat.name;
              return (
                <button
                  key={cat.id || cat.slug}
                  type="button"
                  onClick={() => handleSelectCategory(cat.slug)}
                  className={`px-4 py-2 rounded-btn font-sans text-xs uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-text-primary text-canvas shadow-xs font-semibold'
                      : 'bg-surface text-text-secondary border border-[rgba(230,216,195,0.7)] hover:text-text-primary hover:border-text-primary'
                  }`}
                >
                  {catName}
                </button>
              );
            })}
          </div>

          {/* Product counter */}
          <div className="text-right">
            <span className="font-sans text-xs text-text-secondary tracking-wider uppercase font-light">
              {!loading && products ? `${products.length} ${t('catalog.items_count')}` : t('common.loading')}
            </span>
          </div>

        </div>

        {/* Product Grid */}
        <ProductGrid
          products={products}
          loading={loading}
          error={error}
          columns={3}
        />

        <FiligreeDivider variant="morphia" spacing="py-12 lg:py-16" />

      </div>
    </div>
  );
}
