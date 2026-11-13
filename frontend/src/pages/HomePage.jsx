import React from 'react';
import HeroSection from '../components/home/HeroSection';
import StorySection from '../components/home/StorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CTASection from '../components/home/CTASection';
import FiligreeDivider from '../components/ui/FiligreeDivider';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      
      <ScrollReveal direction="up" delay={50}>
        <StorySection />
      </ScrollReveal>

      <FiligreeDivider variant="morphia" spacing="py-8 sm:py-12" />

      <ScrollReveal direction="up" delay={80}>
        <FeaturedProducts />
      </ScrollReveal>

      <FiligreeDivider variant="glyph" spacing="py-8 sm:py-12" />

      <ScrollReveal direction="up" delay={80}>
        <CTASection />
      </ScrollReveal>
    </div>
  );
}
