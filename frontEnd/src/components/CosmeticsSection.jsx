export default function CosmeticsSection() {
  return (
    <section id="prodotti" className="py-24 bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-800 mt-4 mb-6">Distribuzione Cosmetici</h2>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              La linea <strong className="text-purple-600">Skin Renew</strong> rappresenta il massimo dell'avanzamento nei dermocosmetici. Sviluppata con ingredienti ad alte prestazioni, la nostra linea si rivolge sia ai professionisti nei centri estetici che ai clienti privati per la cura domiciliare.
            </p>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-200 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center">
                  <span className="text-2xl">🧴</span>
                </div>
                <div>
                  <h4 className="font-display text-2xl font-bold text-stone-800">Skin Renew</h4>
                  <p className="text-purple-600 font-medium">Linea Premium di Skincare</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-stone-50 rounded-xl">
                  <p className="text-3xl font-bold text-rose-400">25+</p>
                  <p className="text-stone-600 text-sm">Prodotti nella linea</p>
                </div>
                <div className="text-center p-4 bg-stone-50 rounded-xl">
                  <p className="text-3xl font-bold text-amber-500">100%</p>
                  <p className="text-stone-600 text-sm">Dermatologicamente testati</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {['Chris Nails', 'Skin Renew'].map(tag => (
                <button key={tag} className="px-4 py-2 bg-stone-100 rounded-full text-sm text-stone-600 cursor-pointer hover:bg-purple-100 transition-colors">
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors cursor-pointer">
                Acquista Prodotti
              </button>
              <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-100 transition-colors cursor-pointer">
                Diventa Rivenditore
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-stone-300 rounded-full opacity-20 blur-3xl"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-stone-200">
                <img src="cosmeticsPicture.jpg" alt="Immagine di donna che riceve trucco" />
                <div className="text-center mt-4">
                  <p className="text-stone-600 font-semibold">Qualità professionale per tutti</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
