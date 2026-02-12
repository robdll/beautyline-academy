import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="index.html" className="flex items-center gap-3">
          <img src="/logoBeauty.png" alt="Beauty Line Academy Logo" className="w-16 h-16 object-contain" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-stone-600 hover:text-purple-400 transition-colors font-medium">Chi Siamo</a>
          <a href="#centroAssistenza" className="text-stone-600 hover:text-purple-400 transition-colors font-medium">Corsi</a>
          <a href="#tecnologia" className="text-stone-600 hover:text-purple-400 transition-colors font-medium">Noleggio</a>
          <a href="#prodotti" className="text-stone-600 hover:text-purple-400 transition-colors font-medium">Prodotti</a>
          <a href="#contatti" className="text-stone-600 hover:text-purple-400 transition-colors font-medium">Contatti</a>
          <a href="#" className="px-6 py-2.5 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors">Registrazione</a>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-stone-600 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
              </svg>
          </button>
          {isOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 shadow-lg absolute top-full left-0 right-0 py-4 px-6 flex flex-col gap-4">
            <a href="#" className="text-stone-600 hover:text-purple-600 font-medium">Chi Siamo</a>
            <a href="#centroAssistenza" className="text-stone-600 hover:text-purple-600 font-medium">Corsi</a>
            <a href="#tecnologia" className="text-stone-600 hover:text-purple-600 font-medium">Noleggio</a>
            <a href="#prodotti" className="text-stone-600 hover:text-purple-600 font-medium">Prodotti</a>
            <a href="#contatti" className="text-stone-600 hover:text-purple-600 font-medium">Contatti</a>
            <a href="#" className="px-6 py-2.5 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors text-center w-full">Registrazione</a>
          </div>
        )}
        </div>
      </div>  
    </nav>
  );
}
