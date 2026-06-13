import React from 'react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
}) => {
  const { addToCart } = useCart();

  return (
    <article className={`frameless-card group flex flex-col ${className}`}>
      {/* Envoltorio de imagen del producto con agregar rápido al pasar el mouse */}
      <div className="frameless-card-image-wrap bg-surface-container-low aspect-[3/4] mb-6 flex items-center justify-center p-8 relative">
        <img
          alt={product.alt}
          className="frameless-card-image w-full h-full object-cover mix-blend-darken shadow-sm"
          src={product.image}
        />
        {/* Capa de acción al pasar el mouse */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex justify-center z-10">
          <button
            onClick={() => addToCart(product)}
            className="bg-surface/90 backdrop-blur-sm border border-secondary-fixed text-primary font-label-sm text-label-sm uppercase tracking-widest px-8 py-3 hover:bg-secondary-fixed transition-colors duration-300 w-full text-center cursor-pointer"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>

      {/* Información del producto */}
      <div className="flex flex-col items-center text-center">
        <span className="font-label-sm text-label-md font-bold  uppercase tracking-widest mb-1">
          {product.brand}
        </span>
        <h4 className="font-headline-sm text-headline-sm mb-2">
          {product.name}
        </h4>
        <p className="font-body-md text-body-md text-secondary font-medium tabular-nums mb-4">
          ${product.price.toLocaleString('es-CO')}
        </p>
        <div className="flex items-center gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="font-label-sm text-[10px] px-2 py-0.5 border border-outline-variant dark:border-on-surface-variant text-on-surface-variant dark:text-on-primary-container uppercase tracking-widest"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
