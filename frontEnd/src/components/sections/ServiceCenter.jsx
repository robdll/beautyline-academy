import { SERVICES } from "../../utils/constants";
import UploadImages from "../common/UploadImages";

export default function ServiceCenter() {

  return (
    <section id="centroAssistenza" className="py-12 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-purple-400 font-bold">I Nostri Pilastri</h2>
          <p className="font-medium tracking-widest text-lg mt-6 text-stone-600 max-w-2xl mx-auto">
            Che tu voglia iniziare da zero o migliorare ciò che già fai, qui trovi percorsi pratici e concreti.
            Dalle basi dell'estetica ai master più avanzati, ti seguiamo passo dopo passo.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const isPlaceholderLink = !service.link || service.link === "#";
            const cardContent = (
              <>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-purple-900/40 transition-colors duration-500 z-10"></div>
                <UploadImages publicId={service.image} width={700} height={780} className="mx-auto" />
                <div className="absolute inset-0 flex items-center justify-center z-20 p-4">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white text-center drop-shadow-md group-hover:scale-105 transition-transform duration-300">
                    {service.title}
                  </h3>
                </div>
              </>
            );
            return isPlaceholderLink ? (
              <button
                key={service.id}
                type="button"
                className="group relative h-80 rounded-3xl overflow-hidden block shadow-lg transform transition-all duration-300 hover:scale-108 text-left"
              >
                {cardContent}
              </button>
            ) : (
              <a
                key={service.id}
                href={service.link}
                className="group relative h-80 rounded-3xl overflow-hidden block shadow-lg transform transition-all duration-300 hover:scale-108"
              >
                {cardContent}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
