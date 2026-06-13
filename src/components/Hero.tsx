import React from 'react';
import heroImg from '../assets/hero.webp';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center bg-surface-container-high overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Frascos de perfume Dior Homme con iluminación cálida y fondo de lujo"
          className="w-full h-full object-cover opacity-80 brightness-25 mix-blend-multiply"
          src={heroImg}
        />
        {/* Superposición de capas tonales */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-margin-mobile md:px-0 max-w-3xl mx-auto flex flex-col items-center gap-6 mt-20">
        <h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary dark:text-on-primary text-balance drop-shadow-sm">
          Usa tu Esencia
        </h2>

        <p className="w-70 h-[2px] bg-gold mx-auto mb-4"></p>
        <p className="font-body-md text-body-lg  text-white max-w-xl mx-auto mb-4 drop-shadow-sm">
          Descubre la confianza silenciosa de la perfumería nicho. Una colección curada de lujo discreto y elegancia táctil.
        </p>
        <button
          onClick={onExploreClick}
          className="bg-primary text-on-primary dark:bg-secondary-fixed dark:text-on-secondary-fixed font-label-lg text-label-lg uppercase tracking-widest px-12 py-4 hover:bg-surface-tint dark:hover:bg-secondary-fixed-dim transition-colors duration-300 border border-primary dark:border-secondary-fixed cursor-pointer"
        >
          Explora la Colección
        </button>
      </div>
    </section>
  );
};
