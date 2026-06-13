import React, { useMemo, useState } from 'react';
import { Header } from '../components/Header';
import { CartDrawer } from '../components/CartDrawer';
import { ProductCard } from '../components/ProductCard';
import { CatalogSidebar } from '../components/CatalogSidebar';
import {
  filterProductsByRange,
  getPriceBounds,
  type CategoryFilter,
  type PriceRange,
} from '../lib/catalogFilters';
import { PRODUCTS } from '../data/products';

export const CatalogPage: React.FC = () => {
  const priceBounds = useMemo(() => getPriceBounds(PRODUCTS), []);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [priceRange, setPriceRange] = useState<PriceRange>(priceBounds);

  const filteredProducts = filterProductsByRange(PRODUCTS, categoryFilter, priceRange);

  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface font-body-md antialiased">
      <Header />

      <main className="flex-grow py-12 md:py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="mb-10 md:mb-12">
          <h1 className="font-headline-sm text-headline-lg text-black-500 mb-2">
            Catálogo
          </h1>
          <div className="w-40 h-[2px] bg-secondary-fixed mb-4" />
          <p className="text-on-surface-variant max-w-xl">
            Explora nuestra colección completa de fragancias. Filtra por categoría y precio para
            encontrar tu aroma ideal.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <CatalogSidebar
            products={PRODUCTS}
            categoryFilter={categoryFilter}
            priceRange={priceRange}
            onCategoryChange={setCategoryFilter}
            onPriceRangeChange={setPriceRange}
          />

          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 text-on-surface-variant font-body-md">
                No hay fragancias que coincidan con los filtros seleccionados.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            <p className="text-on-surface-variant text-sm mt-12">
              {filteredProducts.length} de {PRODUCTS.length} fragancias
            </p>
          </div>
        </div>
      </main>

      <CartDrawer />
    </div>
  );
};
