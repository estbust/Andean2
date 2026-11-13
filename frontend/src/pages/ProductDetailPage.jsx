import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { fetchProductBySlug, fetchProducts } from '../api/client';
import Button from '../components/ui/Button';
import ProductCard from '../components/products/ProductCard';
import ProductImageMagnifier from '../components/products/ProductImageMagnifier';
import SizeGuideModal from '../components/products/SizeGuideModal';
import FiligreeDivider from '../components/ui/FiligreeDivider';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductBySlug(slug);
        if (isMounted) setProduct(data);

        // Fetch related products (excluding current one)
        const all = await fetchProducts();
        if (isMounted) {
          const others = all.filter((p) => p.slug !== slug);
          // Shuffle or select 3
          const shuffled = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
          setRelatedProducts(shuffled);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError(err.message || 'No se pudo cargar la joya.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-canvas">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-text-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-sans text-xs tracking-widest uppercase text-text-secondary">
            {t('product.loading')}
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-canvas text-center">
        <h2 className="headline-lg text-text-primary mb-3">
          {t('product.not_found')}
        </h2>
        <p className="body-md text-text-secondary mb-8">
          {error || t('product.error')}
        </p>
        <Button to="/catalogo" variant="primary">
          {t('product.back')}
        </Button>
      </div>
    );
  }

  const displayName = language === 'en' && product.name_en ? product.name_en : product.name;
  const displayDescription = language === 'en' && product.description_en ? product.description_en : product.description;
  const categoryName = product.category
    ? (language === 'en' && product.category.name_en ? product.category.name_en : product.category.name)
    : (language === 'en' ? 'Fine Jewelry' : 'Joyería Fina');

  const formattedPrice = Number(product.price).toFixed(2);

  const handleInquire = () => {
    const query = encodeURIComponent(`${t('product.inquire_message')}${displayName} (Ref: ${product.slug})`);
    navigate(`/contacto?mensaje=${query}`);
  };

  return (
    <div className="bg-canvas min-h-screen py-10 lg:py-16">
      <div className="max-w-layout mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link
            to="/catalogo"
            className="inline-flex items-center font-sans text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors group"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
            {t('product.back')}
          </Link>
        </div>

        {/* 2-Column Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-[rgba(230,216,195,0.7)]">
          
          {/* Left: Product Image with Goldsmith Loupe */}
          <div className="lg:col-span-6">
            <ProductImageMagnifier
              src={product.image}
              alt={displayName}
              badgeText={t('footer.city_country')}
            />
          </div>

          {/* Right: Product Details & Purchase Action */}
          <div className="lg:col-span-6 flex flex-col justify-start space-y-6">
            <div>
              <span className="label-caps text-text-secondary block mb-2">
                {categoryName}
              </span>
              <h1 className="headline-xl text-text-primary mb-3">
                {displayName}
              </h1>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-baseline space-x-3">
                  <span className="price-lg text-text-primary">
                    PEN {formattedPrice}
                  </span>
                  <span className="font-sans text-xs text-text-secondary uppercase tracking-wider">
                    {t('product.tax_included')}
                  </span>
                </div>

                {/* Ring Size Guide Interactive Trigger */}
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="inline-flex items-center space-x-1.5 text-xs font-sans uppercase tracking-wider text-text-secondary hover:text-text-primary transition-colors py-1 group focus:outline-none focus:ring-1 focus:ring-text-primary rounded-sm px-1.5"
                  aria-label={t('size_guide.button')}
                >
                  <span className="text-gold-accent group-hover:rotate-12 transition-transform text-sm" aria-hidden="true">📐</span>
                  <span className="underline underline-offset-4 decoration-[rgba(184,125,59,0.5)] group-hover:decoration-text-primary font-medium">
                    {t('size_guide.button')}
                  </span>
                </button>
              </div>
            </div>

            <div className="w-full h-px bg-[rgba(230,216,195,0.7)]" />

            {/* Description */}
            <div className="space-y-4">
              <span className="label-caps text-text-secondary block">
                {t('product.details_title')}
              </span>
              <p className="body-lg text-text-secondary font-light leading-relaxed">
                {displayDescription}
              </p>
            </div>

            {/* Materials & Guarantee Highlights */}
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="p-4 bg-surface rounded-sm border border-[rgba(230,216,195,0.5)]">
                <span className="block label-caps text-text-secondary mb-1">
                  {t('product.craftsmanship_title')}
                </span>
                <span className="font-sans text-xs text-text-primary font-medium">
                  {t('product.materials_val')}
                </span>
              </div>
              <div className="p-4 bg-surface rounded-sm border border-[rgba(230,216,195,0.5)]">
                <span className="block label-caps text-text-secondary mb-1">
                  {t('product.origin_title')}
                </span>
                <span className="font-sans text-xs text-text-primary font-medium">
                  {t('product.origin')}
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <Button
                onClick={handleInquire}
                variant="primary"
                className="w-full py-5 text-sm"
              >
                {t('product.contact_buy')}
              </Button>
            </div>

            {/* Packaging & Presentation Note */}
            <div className="p-5 bg-warm/40 rounded-sm border border-[rgba(92,85,78,0.12)] space-y-2">
              <div className="flex items-center space-x-2 text-text-primary">
                <span className="text-xs text-gold-accent">✦</span>
                <h4 className="font-sans text-xs uppercase tracking-wider font-semibold">
                  {t('product.curated_packaging')}
                </h4>
              </div>
              <p className="body-sm text-text-secondary font-light">
                {t('product.packaging_note')}
              </p>
            </div>

          </div>

        </div>

        {/* Editorial Filigree Divider before related pieces */}
        {relatedProducts.length > 0 && (
          <FiligreeDivider variant="morphia" spacing="py-12 lg:py-16" />
        )}

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <ScrollReveal direction="up" delay={100} className="mt-8">
            <div className="text-center mb-12">
              <span className="label-caps text-text-secondary block mb-2">
                {t('product.complementary_badge')}
              </span>
              <h2 className="headline-lg text-text-primary">
                {t('product.related_title')}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id || p.slug} product={p} />
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Size Guide Modal */}
        <SizeGuideModal
          isOpen={sizeGuideOpen}
          onClose={() => setSizeGuideOpen(false)}
        />

      </div>
    </div>
  );
}
