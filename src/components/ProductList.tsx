import React, { useState } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
}

type FilterType = 'all' | 'niche' | 'designer' | 'under-200' | '200-600' | 'over-600';

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filterChips: { label: string; value: FilterType }[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Nicho', value: 'niche' },
    { label: 'Diseñador', value: 'designer' },
    { label: 'Menos de $200.000', value: 'under-200' },
    { label: '$200.000- $600.000', value: '200-600' },
    { label: 'Más de $600.000', value: 'over-600' },
  ];

  const filteredProducts = products.filter((product) => {
    switch (activeFilter) {
      case 'niche':
        return product.category === 'niche';
      case 'designer':
        return product.category === 'designer';
      case 'under-200':
        return product.price < 200000;
      case '200-600':
        return product.price >= 200000 && product.price <= 600000;
      case 'over-600':
        return product.price > 600000;
      case 'all':
      default:
        return true;
    }
  });

  return (
    <section
      id="catalog"
      className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto scroll-mt-20"
    >
      <div className="flex flex-col items-center mb-16">
        <h3 className="font-headline-sm text-headline-lg text-black-500  mb-2 text-center">
          Recomendaciones de la Casa
        </h3>
        <div className="w-60 h-[2px] bg-secondary-fixed mb-8" />

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-4">
          {filterChips.map((chip) => {
            const isActive = activeFilter === chip.value;
            return (
              <button
                key={chip.value}
                onClick={() => setActiveFilter(chip.value)}
                className={`px-6 py-2 rounded-full border transition-colors duration-300 font-label-sm text-label-sm uppercase tracking-widest cursor-pointer ${
                  isActive
                    ? 'border-primary bg-primary text-surface dark:bg-secondary-fixed dark:text-on-secondary-fixed dark:border-secondary-fixed'
                    : 'border-secondary-fixed text-on-surface dark:text-on-primary-container hover:bg-surface-container dark:hover:bg-primary-container'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Layout */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-on-surface-variant font-body-md">
          No hay fragancias que coincidan con el filtro seleccionado.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {filteredProducts.map((product, index) => {
            const isAsymmetric = index === 1;
            return (
              <ProductCard
                key={product.id}
                product={product}
                className={isAsymmetric ? 'lg:translate-y-12' : ''}
              />
            );
          })}
        </div>
      )}

      {/* Catalog Button */}
      <div className="mt-24 flex justify-center">
        <button className="border border-secondary-fixed text-primary dark:text-secondary-fixed font-label-lg text-label-lg uppercase tracking-widest px-12 py-4 hover:bg-surface-container-high dark:hover:bg-primary-container transition-colors duration-300 inline-flex items-center gap-2 cursor-pointer">
          Ver Catálogo Completo{' '}
          <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
        </button>
      </div>
    </section>
  );
};
