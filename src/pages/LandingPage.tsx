import React from 'react';
import { Header } from '../components/Header';
import { CartDrawer } from '../components/CartDrawer';
import { Hero } from '../components/Hero';
import { ProductList } from '../components/ProductList';
import { Editorial } from '../components/Editorial';
import { Footer } from '../components/Footer';
import { CartProvider } from '../context/CartContext';
import type { Product } from '../types';
import creed from '../assets/CREED.webp';
import jpg from '../assets/JPG.webp';
import savauge from '../assets/SAVAUGE.webp';


const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'CREED AVENTUS',
    brand: 'Creed',
    category: 'designer',
    price: 2434900,
    tags: ['frutal', 'amaderado'],
    image: creed,
  },
  {
    id: '2',
    name: "LE MALE ELIXIR",
    brand: 'JPG',
    category: 'designer',
    price: 1599900,
    tags: ['oriental', 'dulce'],
    image: jpg,
  },
  {
    id: '3',
    name: 'SAVAUGE EAU DE PARFUM',
    brand: 'DIOR',
    category: 'designer',
    price: 600000,
    tags: ['amaderado', 'fresco'],
    image: savauge,
    },
  ];

export const LandingPage: React.FC = () => {
  const scrollToCatalog = () => {
    const section = document.getElementById('catalog');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CartProvider initialProducts={INITIAL_PRODUCTS}>
      <div
        id="top"
        className="flex flex-col min-h-screen bg-surface text-on-surface font-body-md antialiased overflow-x-hidden transition-colors duration-300 scroll-mt-20"
      >
        <Header />

        <main className="flex-grow">
          <Hero onExploreClick={scrollToCatalog} />
          <ProductList products={INITIAL_PRODUCTS} />
          <Editorial />
        </main>

        <Footer />

        <CartDrawer />
      </div>
    </CartProvider>
  );
};
