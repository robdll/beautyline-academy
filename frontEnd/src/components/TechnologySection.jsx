import { MACHINE_TYPES } from "../constants/constants";
import UploadImages from "./UploadImages";

export default function TechnologySection() {
  return (
    <section id="tecnologia" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-purple-300 rounded-full opacity-30 blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-purple-50 to-white rounded-3xl p-8 shadow-2xl border border-purple-100">
                <UploadImages publicId={"equipmentPicture_roziae"} width={550} height={550} className="mx-auto"/>
                <div className="text-center mt-4">
                  <p className="text-amber-500 font-semibold">Attrezzature di ultima generazione</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-800 mt-4 mb-6">Tecnologia Estetica</h2>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              Siamo distributori ufficiali di attrezzature estetiche ad alte prestazioni. Offriamo le migliori soluzioni tecnologiche per i professionisti che cercano l'eccellenza nei loro risultati.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center mb-4">
                  <img src="shoppingcart.svg" alt="shoppingcart" className="w-7 h-7"/>
                </div>
                <h4 className="font-semibold text-stone-800 mb-2">Vendita</h4>
                <p className="text-stone-600 text-sm">Acquista attrezzature con condizioni speciali e supporto tecnico completo.</p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center mb-4">
                  <img src="refresh.svg" alt="refresh" className="w-6 h-6"/>
                </div>
                <h4 className="font-semibold text-stone-800 mb-2">Noleggio</h4>
                <p className="text-stone-600 text-sm">Flessibilità per il tuo business con opzioni di noleggio macchinari.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {MACHINE_TYPES.map(tag => (
                <button key={tag.id} className="px-4 py-2 bg-stone-100 rounded-full text-sm text-stone-600 cursor-pointer hover:bg-purple-100 transition-colors">
                  {tag.name}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors cursor-pointer">
                Acquista Attrezzatura
              </button>
              <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-100 transition-colors cursor-pointer">
                Noleggia Macchinario
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
