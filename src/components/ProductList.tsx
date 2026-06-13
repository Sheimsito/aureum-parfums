import React from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  onViewFullCatalog?: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onViewFullCatalog }) => {
  return (
    <section
      id="catalog"
      className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto scroll-mt-20"
    >
      <div className="flex flex-col items-center mb-16">
        <h3 className="font-headline-sm text-headline-lg text-black-500 mb-2 text-center">
          Recomendaciones de la Casa
        </h3>
        <div className="w-60 h-[2px] bg-secondary-fixed" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {products.map((product, index) => {
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

      <div className="mt-24 flex justify-center">
        <button
          onClick={onViewFullCatalog}
          className="border border-secondary-fixed text-primary dark:text-secondary-fixed font-label-lg text-label-lg uppercase tracking-widest px-12 py-4 hover:bg-surface-container-high dark:hover:bg-primary-container transition-colors duration-300 inline-flex items-center gap-2 cursor-pointer"
        >
          Ver Catálogo Completo{' '}
          <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
        </button>
      </div>
    </section>
  );
};
