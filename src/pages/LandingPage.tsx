import React from 'react';
import { Header } from '../components/Header';
import { CartDrawer } from '../components/CartDrawer';
import { Hero } from '../components/Hero';
import { ProductList } from '../components/ProductList';
import { Editorial } from '../components/Editorial';
import { Footer } from '../components/Footer';
import { PRODUCTS } from '../data/products';
import { useNavigation } from '../context/NavigationContext';

export const LandingPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  const scrollToCatalog = () => {
    const section = document.getElementById('catalog');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="top"
      className="flex flex-col min-h-screen bg-surface text-on-surface font-body-md antialiased overflow-x-hidden transition-colors duration-300 scroll-mt-20"
    >
      <Header />

      <main className="flex-grow">
        <Hero onExploreClick={scrollToCatalog} />
        <ProductList products={PRODUCTS} onViewFullCatalog={() => navigateTo('catalog')} />
        <Editorial />
      </main>

      <Footer />

      <CartDrawer />
    </div>
  );
};
