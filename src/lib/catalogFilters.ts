import type { Product } from '../types';

export type CategoryFilter = 'all' | 'niche' | 'designer';

export interface PriceRange {
  min: number;
  max: number;
}

export const CATEGORY_OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'niche', label: 'Nicho' },
  { value: 'designer', label: 'Diseñador' },
];

export function getPriceBounds(products: { price: number }[]): PriceRange {
  if (products.length === 0) return { min: 0, max: 0 };
  const prices = products.map((p) => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

export function getCategoryCounts(products: Product[]): Record<CategoryFilter, number> {
  const counts: Record<CategoryFilter, number> = {
    all: products.length,
    niche: 0,
    designer: 0,
  };
  for (const product of products) {
    counts[product.category] += 1;
  }
  return counts;
}

export function formatPriceLabel(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `${millions.toFixed(1).replace('.', ',')}M`;
  }
  if (value >= 1_000) {
    const thousands = value / 1_000;
    return `${thousands.toFixed(1).replace('.', ',')}k`;
  }
  return value.toLocaleString('es-CO');
}

export function getPriceTicks(min: number, max: number, count = 5): number[] {
  if (count <= 1 || min === max) return [min];
  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, i) => Math.round(min + step * i));
}

export function filterProductsByRange<T extends { category: string; price: number }>(
  products: T[],
  categoryFilter: CategoryFilter,
  priceRange: PriceRange
): T[] {
  return products.filter((product) => {
    const matchesCategory =
      categoryFilter === 'all' || product.category === categoryFilter;
    const matchesPrice =
      product.price >= priceRange.min && product.price <= priceRange.max;
    return matchesCategory && matchesPrice;
  });
}
