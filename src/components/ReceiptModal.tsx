import React from 'react';
import type { CartItem } from '../types';

interface ReceiptModalProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onConfirm?: () => void;
}

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('es-CO')}`;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  items,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const receiptNumber = `AUR-${Date.now().toString().slice(-8)}`;
  const date = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-primary/30 backdrop-blur-sm z-[60] print:hidden"
      />

      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 print:static print:p-0">
        <div
          id="receipt-content"
          className="relative bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-outline-variant print:max-w-none print:shadow-none print:border-none"
        >
          <div className="p-8 print:p-6">
            <div className="text-center border-b border-outline-variant pb-6 mb-6">
              <h2 className="font-headline-sm text-headline-md text-black tracking-[0.15em] uppercase">
                Aureum Parfums
              </h2>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">
                Recibo de compra
              </p>
              <div className="mt-4 flex flex-col gap-1 text-sm text-on-surface-variant">
                <span>Nº {receiptNumber}</span>
                <span>{date}</span>
              </div>
            </div>

            <table className="w-full mb-6 text-sm">
              <thead>
                <tr className="border-b border-outline-variant text-left">
                  <th className="pb-3 font-label-sm uppercase tracking-widest text-on-surface-variant">
                    Artículo
                  </th>
                  <th className="pb-3 font-label-sm uppercase tracking-widest text-on-surface-variant text-center w-16">
                    Cant.
                  </th>
                  <th className="pb-3 font-label-sm uppercase tracking-widest text-on-surface-variant text-right w-24">
                    Precio
                  </th>
                  <th className="pb-3 font-label-sm uppercase tracking-widest text-on-surface-variant text-right w-28">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.product.id} className="border-b border-outline-variant/50">
                    <td className="py-4 pr-2">
                      <p className="font-headline-sm text-[15px] text-black">{item.product.name}</p>
                      <p className="text-xs text-on-surface-variant capitalize">{item.product.brand}</p>
                    </td>
                    <td className="py-4 text-center text-black">{item.quantity}</td>
                    <td className="py-4 text-right text-black whitespace-nowrap">
                      {formatCurrency(item.product.price)}
                    </td>
                    <td className="py-4 text-right text-black font-medium whitespace-nowrap">
                      {formatCurrency(item.product.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t-2 border-primary pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-label-lg text-label-lg uppercase tracking-widest text-black">
                  Total
                </span>
                <span className="font-headline-sm text-[22px] text-black">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <p className="text-center text-xs text-on-surface-variant mb-6 print:mb-0">
              Gracias por su compra en Aureum Parfums
            </p>

            <div className="flex gap-3 print:hidden">
              <button
                onClick={handlePrint}
                className="flex-1 border border-secondary-fixed text-primary font-label-sm text-label-sm uppercase tracking-widest py-3 hover:bg-surface-container transition-colors cursor-pointer"
              >
                Imprimir
              </button>
              <button
                onClick={() => {
                  onConfirm?.();
                  onClose();
                }}
                className="flex-1 bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-widest py-3 hover:bg-surface-tint transition-colors cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors print:hidden p-1 cursor-pointer"
            aria-label="Cerrar recibo"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>
    </>
  );
};
