import React from 'react';
import ProductCard from './ProductCard';
import { useLanguage } from '../../i18n';

export function ProductSkeleton() {
  return (
    <div className="bg-surface rounded-md border border-[rgba(230,216,195,0.5)] overflow-hidden animate-pulse">
      <div className="aspect-[4/5] bg-warm/30 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-warm/50" />
      </div>
      <div className="p-5 space-y-3 bg-surface">
        <div className="h-3 w-1/3 bg-warm/50 rounded" />
        <div className="h-5 w-4/5 bg-warm/50 rounded" />
        <div className="pt-2 flex justify-between">
          <div className="h-4 w-1/4 bg-warm/60 rounded" />
          <div className="h-3 w-1/5 bg-warm/40 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid({
  products = [],
  loading = false,
  error = null,
  columns = 3,
  emptyMessage,
}) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 px-4 bg-surface rounded-md border border-alert/20 max-w-lg mx-auto">
        <p className="headline-sm text-alert mb-2">
          {t('common.error', 'No se pudieron cargar los productos')}
        </p>
        <p className="body-md text-text-secondary">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 px-4 bg-surface/60 rounded-md border border-[rgba(230,216,195,0.5)] max-w-lg mx-auto">
        <div className="w-12 h-12 mx-auto mb-4 text-text-secondary opacity-60 flex items-center justify-center border border-text-secondary rounded-full">
          <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
          </svg>
        </div>
        <h4 className="headline-sm text-text-primary mb-2">
          {emptyMessage || t('catalog.empty_title')}
        </h4>
        <p className="body-sm text-text-secondary">
          {t('catalog.empty_desc')}
        </p>
      </div>
    );
  }

  const gridColsClass = columns === 2
    ? "grid-cols-1 sm:grid-cols-2"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${gridColsClass} gap-6 lg:gap-8`}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id || product.slug}
          product={product}
          priority={index < 4}
        />
      ))}
    </div>
  );
}
