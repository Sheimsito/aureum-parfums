import React from 'react';
import althair from '../assets/Althair.webp';

export const Editorial: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-black/90 scroll-mt-20">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="md:col-span-5 flex flex-col items-start space-y-6">
            <span className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed uppercase tracking-widest">
              Perfums de Marly: Althair
            </span>
            <h2 className="font-headline-sm text-headline-lg text-primary dark:text-on-primary text-balance">
              Lujo moderno. Refinamiento absoluto. Confianza serena.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-primary-container leading-relaxed">
              Desde la Ilustración hasta el día de hoy,
              la vainilla ha pasado de ser un lujo excepcional a convertirse en la piedra angular de la perfumería moderna.
              En el siglo XVIII, al compás del floreciente comercio mundial,
              este preciado ingrediente fue ganando popularidad en Europa.

              Hoy en día, Parfums de Marly reinventa el encanto clásico de la vainilla,
              combinándola con especias, maderas cremosas y notas ambarinas.
              Sensual y refinada, su estela persistente rinde homenaje a la tradición
              al tiempo que abraza la sofisticación moderna.
            </p>
            <h3 className="font-label-sm text-label-md text-secondary dark:text-secondary-fixed uppercase tracking-widest">Pirámide Olfativa</h3>
            <div className="w-30 h-[1px] bg-gold mx-0 mb-4"></div>
            <ul className="gold-dot-list space-y-3 font-body-md text-on-surface-variant dark:text-on-primary-container text-sm">
              <li><span className="font-body-md text-label-sm text-secondary dark:text-secondary-fixed uppercase tracking-widest">Notas de Salida: </span>Bergamota, Pimienta Negra, Canela</li>
              <li><span className="font-body-md text-label-sm text-secondary dark:text-secondary-fixed uppercase tracking-widest">Notas de Corazón: </span>Vainilla, Praliné, Azahar</li>
              <li><span className="font-body-md text-label-sm text-secondary dark:text-secondary-fixed uppercase tracking-widest">Notas de Fondo: </span>Sándalo, Almizcle, Ambar</li>
            </ul>
            <button className="mt-4 border-b border-primary dark:border-secondary-fixed text-primary dark:text-secondary-fixed font-label-sm text-label-sm uppercase tracking-widest pb-1 hover:text-secondary-fixed hover:border-secondary-fixed dark:hover:text-secondary-fixed-dim dark:hover:border-secondary-fixed-dim transition-colors duration-300 cursor-pointer">
              Historia del perfume
            </button>
          </div>

          {/* Asymmetrical Image Side */}
          <div className="md:col-span-7 relative h-[600px] w-full">
            <div className="absolute inset-0 bg-white/80 border border-white/80 rounded-3xl flex items-center justify-center  overflow-hidden">
              <img
                alt="Althair"
                className="w-full h-full object-cover  transition-transform duration-700 hover:scale-105"
                src={althair}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
