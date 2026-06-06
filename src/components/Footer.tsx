import React from 'react';

export const Footer: React.FC = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-container dark:bg-primary w-full py-margin-desktop">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col items-center gap-unit text-center">
        {/* Brand Header */}
        <div className="mb-8 opacity-80 hover:opacity-100 transition-opacity">
          <a
            href="#"
            onClick={scrollToTop}
            className="font-display-lg text-headline-md text-surface-container-lowest tracking-tighter hover:opacity-80 transition-opacity block"
          >
            Aureum Parfums
          </a>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12">
          <a
            className="font-label-sm text-label-sm uppercase tracking-widest text-on-primary-container hover:text-surface transition-colors"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Políticas de Privacidad
          </a>
          <a
            className="font-label-sm text-label-sm uppercase tracking-widest text-on-primary-container hover:text-surface transition-colors"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Terminos de Servicio
          </a>
          <a
            className="font-label-sm text-label-sm uppercase tracking-widest text-on-primary-container hover:text-surface transition-colors"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Envíos &amp; Devoluciones
          </a>
          <a
            className="font-label-sm text-label-sm uppercase tracking-widest text-on-primary-container hover:text-surface transition-colors"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Contacto
          </a>
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-outline-variant/20 mb-8 max-w-md" />

        {/* Copyright */}
        <p className="font-label-sm text-[10px] text-on-primary-container uppercase tracking-widest opacity-60">
          © 2026 Aureum Parfums. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};
