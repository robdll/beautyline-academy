import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCart } from '../hooks/useCart';
import { useClickOutside } from '../hooks/useClickOutside';
import { ROUTES } from '../constants/routes.constants';
import { X, Menu, ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { isLoggedIn } = useAuthStore();
  const { totalItems } = useCart();

  useClickOutside(menuRef, () => setIsOpen(false), isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center gap-3">
          <img src="logo-bl.png" alt="logo-beauty-line" className="w-20 h-15" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to={ROUTES.COURSES} className="text-stone-600 text-center hover:text-purple-600 transition-colors font-medium">Corsi</Link>
          <Link to="/#chi-siamo" className="text-stone-600 text-center hover:text-purple-600 transition-colors font-medium">Chi Siamo</Link>
          <Link to={ROUTES.EQUIPMENT} className="text-stone-600 text-center hover:text-purple-600 transition-colors font-medium">Noleggio</Link>
          <Link to={ROUTES.PRODUCTS} className="text-stone-600 text-center hover:text-purple-600 transition-colors font-medium">Prodotti</Link>
          <Link to="/#contatti" className="text-stone-600 text-center hover:text-purple-600 transition-colors font-medium">Contatti</Link>

          <div className="flex items-center gap-6 border-l border-stone-200 pl-6">
            <Link to={ROUTES.CART} className="relative p-2 text-stone-600 hover:text-purple-600 transition-colors" aria-label="Carrello">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <Link to={ROUTES.ACCOUNT} className="px-6 py-2.5 bg-purple-600 text-white text-center rounded-full font-medium hover:bg-purple-700 transition-colors">Il mio account</Link>
            ) : (
              <div className="flex items-center gap-4">
                <Link to={`${ROUTES.AUTH}?mode=login`} className="px-6 py-2.5 bg-purple-600 text-white text-center rounded-full font-medium hover:bg-purple-700 transition-colors">Accedi</Link>
                <Link to={`${ROUTES.AUTH}?mode=register`} className="px-6 py-2.5 bg-purple-600 text-white text-center rounded-full font-medium hover:bg-purple-700 transition-colors">Registrati</Link>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center gap-4" ref={menuRef}>
          <Link to={ROUTES.CART} className="relative p-2 text-stone-600 hover:text-purple-600 transition-colors" aria-label="Carrello">
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="text-stone-600 p-2" aria-label={isOpen ? "Chiudi menu" : "Apri menu"}>
            {isOpen ? <X className="w-7 h-7" aria-hidden="true" /> : <Menu className="w-7 h-7" aria-hidden="true" />}
          </button>

          {isOpen && (
            <div className="md:hidden bg-white border-t border-stone-100 shadow-lg absolute top-full left-0 right-0 py-4 px-6 flex flex-col gap-4">
              <Link to={ROUTES.COURSES} onClick={() => setIsOpen(false)} className="text-stone-600 hover:text-purple-600 font-medium">Corsi</Link>
              <Link to="/#chi-siamo" onClick={() => setIsOpen(false)} className="text-stone-600 hover:text-purple-600 font-medium">Chi Siamo</Link>
              <Link to={ROUTES.EQUIPMENT} onClick={() => setIsOpen(false)} className="text-stone-600 hover:text-purple-600 font-medium">Noleggio</Link>
              <Link to={ROUTES.PRODUCTS} onClick={() => setIsOpen(false)} className="text-stone-600 hover:text-purple-600 font-medium">Prodotti</Link>
              <Link to="/#contatti" onClick={() => setIsOpen(false)} className="text-stone-600 hover:text-purple-600 font-medium">Contatti</Link>

              <div className="border-t border-stone-100 pt-4 flex flex-col gap-3">
                {isLoggedIn ? (
                  <>
                    <Link to={ROUTES.ACCOUNT} onClick={() => setIsOpen(false)} className="px-6 py-2.5 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors text-center w-full">Il mio account</Link>
                  </>
                ) : (
                  <>
                    <Link to={`${ROUTES.AUTH}?mode=login`} onClick={() => setIsOpen(false)} className="px-6 py-2.5 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors text-center w-full">Accedi</Link>
                    <Link to={`${ROUTES.AUTH}?mode=register`} onClick={() => setIsOpen(false)} className="px-6 py-2.5 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors text-center w-full">Registrati</Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
