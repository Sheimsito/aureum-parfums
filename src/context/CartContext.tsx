import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem } from '../types';

const CART_STORAGE_KEY = 'aureum_cart';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  count: number;
  bumpKey: number;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Reads the persisted cart from LocalStorage.
 * Returns an empty array if nothing is stored or parsing fails.
 */
function loadCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

/**
 * Saves the current cart items to LocalStorage.
 */
function saveCartToStorage(items: CartItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);
  const [isOpen, setOpen] = useState(false);
  const [bumpKey, setBumpKey] = useState(0);

  /** Persist to LocalStorage on every cart change. */
  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  /** Lock body scroll when the drawer is open. */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /**
   * Adds a product to the cart.
   * If the product already exists, increments its quantity by 1.
   */
  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setBumpKey((prev) => prev + 1);
    setOpen(true);
  };

  /**
   * Increments or decrements the quantity of a cart item.
   * Automatically removes the item if quantity reaches zero.
   */
  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /**
   * Removes a product from the cart by its id.
   */
  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  /**
   * Empties the cart and clears LocalStorage.
   */
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, isOpen, setOpen, count, bumpKey, addToCart, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * Hook to consume the CartContext.
 * Must be used inside a CartProvider.
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};