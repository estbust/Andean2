import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n';

export default function ProductCard({ product }) {
  const { language, t } = useLanguage();

  if (!product) return null;

  const displayName = language === 'en' && product.name_en ? product.name_en : product.name;
  const categoryName = product.category
    ? (language === 'en' && product.category.name_en ? product.category.name_en : product.category.name)
    : (language === 'en' ? 'Fine Jewelry' : 'Joyería Fina');

  // Format price
  const formattedPrice = Number(product.price).toFixed(2);

  return (
    <Link
      to={`/producto/${product.slug}`}
      className="group block bg-surface rounded-md border border-[rgba(230,216,195,0.6)] overflow-hidden shadow-sm hover:shadow-card transition-all duration-300 ease-out focus:outline-none focus:ring-1 focus:ring-text-primary card-shimmer"
    >
      {/* 4:5 Aspect Ratio Image Container */}
      <div className="relative aspect-[4/5] bg-canvas overflow-hidden flex items-center justify-center p-6">
        {product.image ? (
          <img
            src={product.image}
            alt={displayName}
            loading="lazy"
            className="w-full h-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-secondary text-sm">
            Andean Morphia
          </div>
        )}

        {/* Featured Tag if applicable */}
        {product.is_featured && (
          <span className="absolute top-3 left-3 bg-warm/90 backdrop-blur-xs text-text-primary label-caps px-2 py-1 rounded-sm text-[9px] shadow-xs">
            {language === 'en' ? 'Featured' : 'Destacado'}
          </span>
        )}

        {/* Subtle quick view indicator on hover */}
        <div className="absolute inset-x-0 bottom-0 py-2.5 bg-gradient-to-t from-text-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-canvas font-medium">
            {language === 'en' ? 'Discover Details' : 'Ver Detalle'}
          </span>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-5 flex flex-col justify-between space-y-2.5 bg-surface border-t border-[rgba(230,216,195,0.4)]">
        <div>
          <span className="label-caps text-text-secondary block mb-1">
            {categoryName}
          </span>
          <h3 className="headline-sm text-text-primary line-clamp-1 group-hover:text-gold-accent transition-colors duration-200">
            {displayName}
          </h3>
        </div>

        <div className="pt-1 flex items-baseline justify-between">
          <span className="price-sm text-text-primary">
            PEN {formattedPrice}
          </span>
          <span className="font-sans text-[11px] text-text-secondary font-light">
            {language === 'en' ? 'Cuzco, PE' : 'Cusco, PE'}
          </span>
        </div>
      </div>
    </Link>
  );
}
