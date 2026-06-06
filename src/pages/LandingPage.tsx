import React from 'react';
import { Header } from '../components/Header';
import { CartDrawer } from '../components/CartDrawer';
import { Hero } from '../components/Hero';
import { ProductList } from '../components/ProductList';
import { Editorial } from '../components/Editorial';
import { Footer } from '../components/Footer';
import { CartProvider } from '../context/CartContext';
import type { Product } from '../types';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'aureum-no-1',
    name: 'Aureum No. 1',
    brand: 'Aureum Parfums',
    category: 'niche',
    price: 280,
    tags: ['Woody', 'Amber'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0n6ZvqpaSKusd8ygTplgmapK5RaMfimaC82ZWhLHhGeOeVuRS-It4f12-d9saI6CMBpIiYh78rpx-boyiAXJ7ioYq6u13IdEa42T1k6NsQGe3oOwmckC1j6wDO7b_lAMFtjX-pQtG00PMs_DP8fUDcuHETyBE_ooJVTArAYBQ1NNUX7CyyDN5t273Twpr2rQXHr8HecNr_gaHB-afDtL9KYXi_hoInHGH61DuAbFYjvelOJooDBFTXkwfNzQD-yzjzHKWxZAcF7rS',
  },
  {
    id: 'santal-dor',
    name: "Santal d'Or",
    brand: 'Aureum Parfums',
    category: 'designer',
    price: 245,
    tags: ['Sandalwood', 'Spicy'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBP_DS5X4YXBHn4o2M4lmAebO1DVKxyvbeOhJJgjgPhY9AA0uaXU28qLACFZJ_IaT1EGxWSW4NiyQsZoOe1Z5SVsouAFjxUyq0gv0HP_Q-Ip4ryMlKiJwTvdb5yxxmbB_KQgUzfpb6BkDyyk0ZlUOubYmgKxCccYArWHCp1MaN428KocAdXVBfe7y2yPEngY3O0MqfwTQra-LT6u5j24igFuf0TKjhnESxYTfWIL0B2ZTKYgVzuU8CGcXOZY7dfCwsIznSkQWQDQkb1',
  },
  {
    id: 'ivory-oud',
    name: 'Ivory Oud',
    brand: 'Aureum Parfums',
    category: 'niche',
    price: 320,
    tags: ['Oud', 'Floral'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDEyDDwi199qkb5XgqQxsg2X0fm9QVTMouWFzv2XDLdLyFEKBPwB0qkp1i43NmVP9lMu8INr07ERQOFivNPKa0C5ktYOlya1Tq6WZof2_S0a7oVMf1VdTXK5K_1rYBy0Ftu4mEvevBuURyyZIQJ8MhSjxXs3_WYWIhn-w_u21NonqFP8_HO1fT3pJHRF2dSFSOP3H_UcY33PrDubB0QRKEykT4BMC3FcrmIUfRPFaypYQfv1idCSXncrhRj1WNafxCJZLvO4IiY1fOX',
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
