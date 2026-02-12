import UploadImages from "./UploadImages";

export default function EducationSection() {
  return (
    <section id="istruzione" className="py-24 bg-gradient-to-br from-purple-100 via-white to-pink-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-800 mt-4 mb-6">Formazione Professionale</h2>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              Alla Beauty Line Academy, crediamo che la formazione sia la base per il successo. I nostri corsi sono sviluppati da rinomati professionisti dell'industria della bellezza, garantendo che riceviate la formazione più aggiornata e pertinente sul mercato.
            </p>
            
            <div className="space-y-6 mb-8">
              {[
                { emoji: "💅", title: "Nail Design", desc: "Dal base all'avanzato in tecniche di unghie in gel, acrilico, nail art e molto altro." },
                { emoji: "👁️", title: "Ciglia e Sopracciglia", desc: "Extension ciglia, laminazione, design sopracciglia e micropigmentazione." },
                { emoji: "✨", title: "Trattamenti Viso", desc: "Pulizia del viso, peeling, protocolli anti-età e armonizzazione facciale." }
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{item.emoji}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 text-lg">{item.title}</h4>
                    <p className="text-stone-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors cursor-pointer">
                Acquista Corso
              </button>
              <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-100 transition-colors cursor-pointer">
                Maggiori Informazioni
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-purple-300 rounded-full opacity-30 blur-3xl"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-purple-100">
                <UploadImages publicId={"coursePicture_zd7hnj"} width={600} height={390} className="mx-auto rounded-3xl"/>
                <div className="text-center mt-4">
                  <p className="text-rose-400 font-semibold">Più di 500 professionisti formati</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
