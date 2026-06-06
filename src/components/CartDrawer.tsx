import React from 'react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, setOpen, updateQuantity, removeItem } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      {/* Cart Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Cart Drawer */}
      <aside
        className={`bg-surface-container-low dark:bg-primary-container fixed right-0 top-0 h-full w-full md:w-96 z-50 border-l border-outline-variant dark:border-on-surface-variant shadow-2xl flex flex-col p-gutter transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-outline-variant pb-4">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-primary dark:text-on-primary">
              Shopping Bag
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-primary-container">
              Your curated selection
            </p>
          </div>
          <button
            className="text-on-surface dark:text-on-primary hover:text-primary transition-colors flex items-center justify-center p-1 cursor-pointer"
            onClick={() => setOpen(false)}
            aria-label="Close cart drawer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Item List */}
        <div className="flex-grow overflow-y-auto pr-2 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <span className="material-symbols-outlined text-4xl mb-4 text-on-surface-variant/40">
                shopping_bag
              </span>
              <p className="font-body-md text-on-surface-variant">Your bag is empty.</p>
              <button
                onClick={() => setOpen(false)}
                className="mt-4 border border-secondary-fixed text-primary dark:text-secondary-fixed font-label-sm text-label-sm uppercase tracking-widest px-6 py-2 hover:bg-surface-container-high dark:hover:bg-primary transition-colors duration-300 cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 items-center">
                {/* Product Image */}
                <div className="w-20 h-24 bg-surface-container flex-shrink-0 border border-outline-variant overflow-hidden">
                  <img
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    src={item.product.image}
                  />
                </div>

                {/* Info and Actions */}
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline-sm text-[16px] text-primary dark:text-on-primary mb-1">
                        {item.product.name}
                      </h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-primary-container mb-2 capitalize">
                        {item.product.tags.join(' ')}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-on-surface-variant hover:text-error transition-colors flex items-center cursor-pointer p-0.5"
                      title="Remove product"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-outline-variant bg-surface dark:bg-primary-container">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="px-2 py-1 text-on-surface-variant hover:text-primary dark:hover:text-on-primary transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 font-label-sm text-primary dark:text-on-primary select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="px-2 py-1 text-on-surface-variant hover:text-primary dark:hover:text-on-primary transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-label-lg text-label-lg text-primary dark:text-on-primary">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Subtotal */}
        {items.length > 0 && (
          <div className="mt-8 pt-6 border-t border-outline-variant">
            <div className="flex justify-between items-center mb-6">
              <span className="font-label-lg text-label-lg text-on-surface-variant dark:text-on-primary-container uppercase tracking-widest">
                Subtotal
              </span>
              <span className="font-headline-sm text-[20px] text-primary dark:text-on-primary">
                ${subtotal}
              </span>
            </div>
            <button
              onClick={() => alert('Proceeding to checkout...')}
              className="w-full bg-primary text-on-primary dark:bg-secondary-fixed dark:text-on-secondary-fixed font-label-lg text-label-lg uppercase tracking-widest py-4 hover:bg-surface-tint dark:hover:bg-secondary-fixed-dim transition-colors duration-300 cursor-pointer text-center"
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
