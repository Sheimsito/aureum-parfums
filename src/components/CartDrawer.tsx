import React, { useState, useCallback } from 'react';
import type { CartItem } from '../types';
import { useCart } from '../context/CartContext';
import { ReceiptModal } from './ReceiptModal';
import { CheckoutForm } from './CheckoutForm';
import type { CheckoutFormData } from './CheckoutForm';
import { SuccessToast } from './SuccessToast';

/** Identifies the active step inside the cart drawer. */
type DrawerStep = 'cart' | 'form';

/**
 * Sliding cart drawer anchored to the right side of the screen.
 * Manages a two-step flow: item review → shipping form → receipt modal → success toast.
 */
export const CartDrawer: React.FC = () => {
  const { items, isOpen, setOpen, updateQuantity, removeItem, clearCart } = useCart();

  const [step, setStep] = useState<DrawerStep>('cart');
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptItems, setReceiptItems] = useState<CartItem[]>([]);
  const [showToast, setShowToast] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  /** Advances to the shipping form step. */
  const handleGoToForm = () => {
    setStep('form');
  };

  /**
   * Receives validated form data and opens the receipt modal.
   * The data is available here for future backend integration.
   *
   * @param _data - Validated customer data from CheckoutForm.
   */
  const handleFormSubmit = useCallback((_data: CheckoutFormData) => {
    setReceiptItems([...items]);
    setStep('cart');
    setOpen(false);
    setShowReceipt(true);
  }, [items, setOpen]);

  /**
   * Confirms the purchase: clears the cart and triggers the success toast.
   * Called from ReceiptModal when the user presses "Confirmar".
   */
  const handleConfirmPurchase = useCallback(() => {
    clearCart();
    setShowToast(true);
  }, [clearCart]);

  /** Dismisses the success toast. */
  const handleDismissToast = useCallback(() => {
    setShowToast(false);
  }, []);

  /** Closes the drawer and resets to the cart step. */
  const handleClose = useCallback(() => {
    setOpen(false);
    setStep('cart');
  }, [setOpen]);

  // Derive dynamic header title based on the active step
  const drawerTitle = step === 'form' ? 'Datos de envío' : 'Carrito de Compras';

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-primary/20 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        className={`bg-surface-container-low bg-white/75 fixed right-0 top-0 h-full w-full md:w-96 z-50 border-l border-outline-variant dark:border-on-surface-variant shadow-2xl flex flex-col p-gutter transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex justify-between items-center mb-8 border-b border-outline-variant pb-4">
          <h2 className="font-headline-sm text-headline-sm text-black">
            {drawerTitle}
          </h2>
          <button
            className="text-on-surface hover:text-primary transition-colors flex items-center justify-center p-1 cursor-pointer"
            onClick={handleClose}
            aria-label="Cerrar carrito"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* ── Step: form ─────────────────────────────────────────────────── */}
        {step === 'form' ? (
          <CheckoutForm
            onSubmit={handleFormSubmit}
            onBack={() => setStep('cart')}
          />
        ) : (
          <>
            {/* ── Step: cart ───────────────────────────────────────────── */}
            <div className="flex-grow overflow-y-auto pr-2 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <span className="material-symbols-outlined text-4xl mb-4 text-on-surface-variant/90">
                    shopping_bag
                  </span>
                  <p className="font-body-md text-on-surface-variant">Tu carrito está vacío.</p>
                  <button
                    onClick={handleClose}
                    className="mt-4 border border-secondary-fixed bg-primary text-white dark:text-secondary-fixed font-label-sm text-label-sm uppercase tracking-widest px-6 py-2 hover:bg-black/50 transition-colors duration-300 cursor-pointer"
                  >
                    Seguir explorando
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 items-center">
                    <div className="w-20 h-24 bg-surface-container flex-shrink-0 border border-outline-variant overflow-hidden">
                      <img
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        src={item.product.image}
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-headline-sm text-[16px] text-black mb-1">
                            {item.product.name}
                          </h3>
                          <p className="font-label-sm text-label-sm text-on-surface-variant mb-2 capitalize">
                            {item.product.tags.join(' ')}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-on-surface-variant hover:text-error transition-colors flex items-center cursor-pointer p-0.5"
                          aria-label={`Eliminar ${item.product.name} del carrito`}
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-outline-variant bg-white">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="px-2 py-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                            aria-label="Disminuir cantidad"
                          >
                            -
                          </button>
                          <span className="px-2 font-label-sm text-black select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="px-2 py-1 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                            aria-label="Incrementar cantidad"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-label-lg text-label-lg text-black">
                          ${(item.product.price * item.quantity).toLocaleString('es-CO')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ── Cart footer ──────────────────────────────────────────── */}
            {items.length > 0 && (
              <div className="mt-8 pt-6 border-t border-outline-variant">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-label-lg text-label-lg text-black uppercase tracking-widest">
                    Subtotal
                  </span>
                  <span className="font-headline-sm text-[20px] text-black">
                    ${subtotal.toLocaleString('es-CO')}
                  </span>
                </div>
                <button
                  onClick={handleGoToForm}
                  className="w-full bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-widest py-4 hover:bg-surface-tint transition-colors duration-300 cursor-pointer text-center"
                >
                  Checkout
                </button>
              </div>
            )}
          </>
        )}
      </aside>

      <ReceiptModal
        isOpen={showReceipt}
        items={receiptItems}
        onClose={() => setShowReceipt(false)}
        onConfirm={handleConfirmPurchase}
      />

      <SuccessToast
        isVisible={showToast}
        message="¡Pedido confirmado! Gracias por tu compra en Aureum Parfums."
        onDismiss={handleDismissToast}
      />
    </>
  );
};