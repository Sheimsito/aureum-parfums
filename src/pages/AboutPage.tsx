import React from 'react';
import { Header } from '../components/Header';
import { CartDrawer } from '../components/CartDrawer';
import { Footer } from '../components/Footer';
import { useNavigation } from '../context/NavigationContext';
import heroImg from '../assets/hero.webp';

const values = [
  {
    title: 'Curaduría con criterio',
    description:
      'Seleccionamos cada fragancia por su calidad olfativa, su carácter y su capacidad de contar una historia. No seguimos tendencias: las interpretamos.',
  },
  {
    title: 'Lujo accesible',
    description:
      'Creemos que una buena perfumería no debe ser inalcanzable. Ofrecemos piezas de nicho y diseñador con asesoría honesta y precios transparentes.',
  },
  {
    title: 'Experiencia personal',
    description:
      'Cada cliente es único. Te acompañamos a encontrar el aroma que mejor refleje tu personalidad, tu estilo y el momento que quieres vivir.',
  },
];

export const AboutPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface font-body-md antialiased">
      <Header />

      <main className="flex-grow">
        <section className="relative h-[50vh] min-h-[400px] w-full flex items-end overflow-hidden">
          <img
            alt="Ambiente de perfumería de lujo Aureum Parfums"
            className="absolute inset-0 w-full h-full object-cover brightness-50"
            src={heroImg}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
          <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-12 md:pb-16">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-3 block">
              Nuestra historia
            </span>
            <h1 className="font-headline-sm text-headline-lg text-black-500 mb-3">
              Sobre Nosotros
            </h1>
            <div className="w-40 h-[2px] bg-secondary-fixed" />
          </div>
        </section>

        <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="font-headline-sm text-headline-md text-black-500 mb-6 text-balance">
                Aureum Parfums nace del amor por el arte de perfumar
              </h2>
              <div className="space-y-5 text-on-surface-variant leading-relaxed">
                <p>
                  Somos una casa de perfumería dedicada a reunir las fragancias más
                  extraordinarias del mundo: desde grandes clásicos de diseñador hasta
                  creaciones de nicho que desafían lo convencional.
                </p>
                <p>
                  Nuestro nombre evoca el oro —símbolo de lo valioso, lo duradero y lo
                  auténtico— porque entendemos que un perfume no es un accesorio más: es
                  una extensión de quien eres.
                </p>
                <p>
                  En Aureum Parfums no vendemos botellas. Curamos experiencias olfativas
                  que acompañan tus días, tus noches y tus recuerdos más significativos.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low border border-outline-variant p-8 md:p-10">
              <h3 className="font-label-sm text-label-md uppercase tracking-widest text-black mb-4">
                Nuestra misión
              </h3>
              <div className="w-16 h-px bg-gold mb-6" />
              <p className="text-on-surface-variant leading-relaxed">
                Acercar la alta perfumería a quienes buscan algo más que un aroma
                popular. Queremos que cada persona descubra su firma olfativa con
                confianza, conocimiento y el respaldo de un equipo apasionado por
                este oficio.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-surface-container-low border-y border-outline-variant/60">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-14">
              <h2 className="font-headline-sm text-headline-md text-black-500 mb-3">
                Lo que nos define
              </h2>
              <div className="w-40 h-[2px] bg-secondary-fixed mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {values.map((value) => (
                <article key={value.title} className="text-center md:text-left">
                  <h3 className="font-headline-sm text-[18px] text-black mb-4">
                    {value.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
          <h2 className="font-headline-sm text-headline-md text-black-500 mb-4 text-balance">
            ¿Listo para encontrar tu esencia?
          </h2>
          <p className="text-on-surface-variant max-w-lg mx-auto mb-10">
            Explora nuestro catálogo y descubre fragancias seleccionadas para quienes
            valoran la calidad, la autenticidad y el detalle.
          </p>
          <button
            onClick={() => navigateTo('catalog')}
            className="bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-widest px-12 py-4 hover:bg-surface-tint transition-colors duration-300 cursor-pointer"
          >
            Ver catálogo
          </button>
        </section>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
};
