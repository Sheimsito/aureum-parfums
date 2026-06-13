import React, { useState } from 'react';
import type { Product } from '../types';
import {
  CATEGORY_OPTIONS,
  formatPriceLabel,
  getCategoryCounts,
  getPriceBounds,
  getPriceTicks,
  type CategoryFilter,
  type PriceRange,
} from '../lib/catalogFilters';

interface CatalogSidebarProps {
  products: Product[];
  categoryFilter: CategoryFilter;
  priceRange: PriceRange;
  onCategoryChange: (value: CategoryFilter) => void;
  onPriceRangeChange: (range: PriceRange) => void;
}

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  children,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="border-b border-outline-variant/60 pb-6">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between gap-2 py-2 text-left cursor-pointer bg-transparent border-none"
      >
        <span className="font-headline-sm text-[13px] uppercase tracking-[0.12em] text-black">
          {title}
        </span>
        <span
          className={`material-symbols-outlined text-[18px] text-on-surface-variant transition-transform duration-200 ${
            isOpen ? 'rotate-0' : '-rotate-90'
          }`}
        >
          expand_more
        </span>
      </button>
      {isOpen && <div className="pt-4">{children}</div>}
    </section>
  );
};

interface DualRangeSliderProps {
  bounds: PriceRange;
  value: PriceRange;
  onChange: (range: PriceRange) => void;
}

const DualRangeSlider: React.FC<DualRangeSliderProps> = ({ bounds, value, onChange }) => {
  const { min: boundMin, max: boundMax } = bounds;
  const range = boundMax - boundMin || 1;
  const minPercent = ((value.min - boundMin) / range) * 100;
  const maxPercent = ((value.max - boundMin) / range) * 100;
  const ticks = getPriceTicks(boundMin, boundMax);

  const handleMinChange = (nextMin: number) => {
    onChange({ min: Math.min(nextMin, value.max), max: value.max });
  };

  const handleMaxChange = (nextMax: number) => {
    onChange({ min: value.min, max: Math.max(nextMax, value.min) });
  };

  return (
    <div>
      <div className="relative h-6 flex items-center">
        <div className="absolute inset-x-0 h-px bg-black" />
        <div
          className="absolute h-px bg-black"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        <input
          type="range"
          min={boundMin}
          max={boundMax}
          value={value.min}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="catalog-range catalog-range--min absolute w-full pointer-events-none appearance-none bg-transparent"
          aria-label="Precio mínimo"
        />
        <input
          type="range"
          min={boundMin}
          max={boundMax}
          value={value.max}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="catalog-range catalog-range--max absolute w-full pointer-events-none appearance-none bg-transparent"
          aria-label="Precio máximo"
        />
      </div>

      <div className="mt-3 flex justify-between text-[10px] text-on-surface-variant">
        {ticks.map((tick) => (
          <span key={tick}>{formatPriceLabel(tick)}</span>
        ))}
      </div>
    </div>
  );
};

export const CatalogSidebar: React.FC<CatalogSidebarProps> = ({
  products,
  categoryFilter,
  priceRange,
  onCategoryChange,
  onPriceRangeChange,
}) => {
  const bounds = getPriceBounds(products);
  const categoryCounts = getCategoryCounts(products);

  const handleMinInput = (raw: string) => {
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;
    const clamped = Math.max(bounds.min, Math.min(parsed, priceRange.max));
    onPriceRangeChange({ min: clamped, max: priceRange.max });
  };

  const handleMaxInput = (raw: string) => {
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;
    const clamped = Math.min(bounds.max, Math.max(parsed, priceRange.min));
    onPriceRangeChange({ min: priceRange.min, max: clamped });
  };

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="lg:sticky lg:top-28 space-y-6">
        <AccordionSection title="Precio">
          <div className="flex items-center gap-2 mb-5">
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => handleMinInput(e.target.value)}
              className="w-full border border-outline-variant bg-white px-3 py-2 text-sm text-black focus:outline-none focus:border-primary"
              aria-label="Precio mínimo"
            />
            <span className="text-on-surface-variant">–</span>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => handleMaxInput(e.target.value)}
              className="w-full border border-outline-variant bg-white px-3 py-2 text-sm text-black focus:outline-none focus:border-primary"
              aria-label="Precio máximo"
            />
          </div>

          <DualRangeSlider
            bounds={bounds}
            value={priceRange}
            onChange={onPriceRangeChange}
          />
        </AccordionSection>

        <AccordionSection title="Categorías">
          <ul className="max-h-56 overflow-y-auto pr-2 space-y-3 catalog-category-list">
            {CATEGORY_OPTIONS.map((option) => {
              const isActive = categoryFilter === option.value;
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => onCategoryChange(option.value)}
                    className={`w-full text-left text-sm transition-colors cursor-pointer bg-transparent border-none py-0.5 ${
                      isActive
                        ? 'font-semibold text-black'
                        : 'font-normal text-on-surface hover:text-black'
                    }`}
                  >
                    {option.label} ({categoryCounts[option.value]})
                  </button>
                </li>
              );
            })}
          </ul>
        </AccordionSection>
      </div>
    </aside>
  );
};
