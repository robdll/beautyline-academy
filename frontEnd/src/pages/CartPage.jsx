import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartCard from "../components/CartCard";
import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../utils/format";
import { ROUTES } from "../constants/routes.constants";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { ScrollRestoration } from 'react-router-dom';

export default function CartPage() {
  const { items, totalPrice } = useCart();
  const shipping = 0;
  const total = totalPrice + shipping;

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <ScrollRestoration />
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <Link to={ROUTES.HOME} className="p-2 hover:bg-white rounded-full transition-colors text-stone-600">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-4xl font-serif text-stone-900">Il Tuo Carrello</h1>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-stone-100 max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-purple-400" />
              </div>
              <h2 className="text-2xl font-serif text-stone-900 mb-4">Il tuo carrello è vuoto</h2>
              <p className="text-stone-600 mb-8">Sembra che tu non abbia ordinato nulla ancora. Scopri i nostri eccellenti prodotti!</p>
              <Link
                to="/"
                className="inline-block px-8 py-4 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
              >
                Torna allo shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                  <CartCard key={item.id} item={item} />
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 sticky top-32">
                  <h2 className="text-2xl font-serif text-stone-900 mb-6">Riepilogo Ordine</h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotale</span>
                      <span className="font-medium text-stone-900">{formatCurrency(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Spedizione</span>
                      <span className="font-medium text-green-600 italic">Gratuita</span>
                    </div>
                    <div className="border-t border-stone-100 pt-4 flex justify-between">
                      <span className="text-lg font-bold text-stone-900">Totale</span>
                      <span className="text-2xl font-bold text-purple-600">{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-stone-900 text-white rounded-full font-bold hover:bg-stone-800 hover:scale-105 transition-all shadow-xl mb-4">
                    Procedi al checkout
                  </button>
                  <p className="text-[11px] text-stone-400 text-center uppercase tracking-widest font-bold">
                    Pagamento sicuro al 100%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
