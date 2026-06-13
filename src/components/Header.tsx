import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import type { Page } from '../context/NavigationContext';

const navItems: { label: string; page: Page }[] = [
  { label: 'Inicio', page: 'home' },
  { label: 'Catálogo', page: 'catalog' },
  { label: 'Sobre Nosotros', page: 'about' },
];

const ShoppingBag = ({ className, strokeWidth = 1.25 }: { className?: string; strokeWidth?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width="24"
    height="24"
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const X = ({ className, strokeWidth = 1.25 }: { className?: string; strokeWidth?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width="24"
    height="24"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Menu = ({ className, strokeWidth = 1.25 }: { className?: string; strokeWidth?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width="24"
    height="24"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export function Header() {
  const { count, setOpen, bumpKey } = useCart();
  const { page, navigateTo } = useNavigation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bumping, setBumping] = useState(false);

  useEffect(() => {
    if (bumpKey === 0) return;
    setBumping(true);
    const t = setTimeout(() => setBumping(false), 500);
    return () => clearTimeout(t);
  }, [bumpKey]);

  const handleNavClick = (target: Page) => {
    navigateTo(target);
    setMobileOpen(false);
  };

  const linkClass = (isActive: boolean) =>
    `text-xs uppercase tracking-[0.25em] transition-colors ${
      isActive ? 'text-gold' : 'text-black-500 hover:text-gold'
    }`;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <button
          onClick={() => handleNavClick('home')}
          className="group flex flex-col cursor-pointer"
        >
          <span className="font-serif text-xl tracking-[0.18em] uppercase text-black-500">
            Aureum
          </span>
          <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground -mt-0.5">
            Parfums
          </span>
          <span className="block h-px w-8 bg-gold mt-1 transition-all duration-500 group-hover:w-16" />
        </button>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.page)}
              className={`${linkClass(page === item.page)} cursor-pointer bg-transparent border-none`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open cart"
            className="relative p-2 hover:text-gold transition-colors cursor-pointer text-black-500"
          >
            <ShoppingBag className={`h-5 w-5 ${bumping ? 'animate-cart-bump' : ''}`} strokeWidth={1.25} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-onyx text-[10px] font-medium flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="md:hidden p-2 cursor-pointer text-primary dark:text-on-primary"
          >
            {mobileOpen ? <X className="h-5 w-5" strokeWidth={1.25} /> : <Menu className="h-5 w-5" strokeWidth={1.25} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page)}
                className={`text-sm uppercase tracking-[0.25em] py-1 text-left cursor-pointer bg-transparent border-none ${
                  page === item.page
                    ? 'text-gold'
                    : 'text-foreground/80 hover:text-gold text-primary dark:text-on-primary dark:hover:text-gold'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
