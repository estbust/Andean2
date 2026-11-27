import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { useProducts, useCategories } from '../hooks/useProducts';
import ProductGrid from '../components/products/ProductGrid';
import Button from '../components/ui/Button';
import FiligreeDivider from '../components/ui/FiligreeDivider';

const PAGE_SIZE = 9;

export default function CatalogPage() {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  
  const categoryParam = searchParams.get('categoria') || '';

  const { categories } = useCategories();
  const { products, loading, error } = useProducts({
    category: categoryParam || undefined,
  });

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [categoryParam]);

  const handleSelectCategory = (slug) => {
    if (!slug) {
      searchParams.delete('categoria');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ categoria: slug });
    }
  };

  const totalProducts = products ? products.length : 0;
  const visibleProducts = products ? products.slice(0, visibleCount) : [];
  const shownCount = Math.min(visibleCount, totalProducts);
  const hasPagination = !loading && !error && totalProducts > PAGE_SIZE;
  const canShowMore = shownCount < totalProducts;
  const canShowLess = visibleCount > PAGE_SIZE;
  const progressPercent = totalProducts > 0 ? Math.min(100, (shownCount / totalProducts) * 100) : 0;

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, totalProducts));
  };

  const handleViewLess = () => {
    setVisibleCount((prev) => Math.max(PAGE_SIZE, prev - PAGE_SIZE));
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
          products={visibleProducts}
          loading={loading}
          error={error}
          columns={3}
        />

        {/* Progressive Catalog Pagination */}
        {hasPagination && (
          <div className="mt-12 lg:mt-16 flex flex-col items-center gap-6">
            <div className="w-full max-w-xs flex flex-col items-center gap-2.5">
              <p
                id="catalog-progress-label"
                className="font-sans text-xs uppercase tracking-[0.14em] text-text-secondary font-medium text-center"
              >
                {`${t('catalog.showing_prefix')} ${shownCount} ${t('catalog.showing_of')} ${totalProducts} ${t('catalog.showing_suffix')}`}
              </p>
              <div
                role="progressbar"
                aria-labelledby="catalog-progress-label"
                aria-valuenow={shownCount}
                aria-valuemin={0}
                aria-valuemax={totalProducts}
                className="w-full h-[2px] bg-warm/70 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-gold-accent transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              {canShowMore && (
                <Button
                  variant="primary"
                  onClick={handleViewMore}
                  className="w-full sm:w-auto"
                >
                  {t('catalog.view_more')}
                </Button>
              )}
              {canShowLess && (
                <Button
                  variant="tertiary"
                  onClick={handleViewLess}
                  className="w-full sm:w-auto"
                >
                  {t('catalog.view_less')}
                </Button>
              )}
            </div>
          </div>
        )}

        <FiligreeDivider variant="morphia" spacing="py-12 lg:py-16" />

      </div>
    </div>
  );
}
