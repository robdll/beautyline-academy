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
          <a href="#pilares" className="text-stone-600 hover:text-purple-400 transition-colors font-medium">Pilares</a>
          <a href="#educacao" className="text-stone-600 hover:text-purple-400 transition-colors font-medium">Educação</a>
          <a href="#tecnologia" className="text-stone-600 hover:text-purple-400 transition-colors font-medium">Tecnologia</a>
          <a href="#cosmeticos" className="text-stone-600 hover:text-purple-400 transition-colors font-medium">Cosméticos</a>
          <a href="#contato" className="px-6 py-2.5 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors">Contato</a>
        </div>

        <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
        </div>
      </div>
    </nav>
  );
}
