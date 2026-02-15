import { FOOTER_LINKS } from "../constants/constants";
import UploadImages from "./UploadImages";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <UploadImages publicId={"logoBeauty_rtip32"} width={50} height={50}/>
              <span className="font-display text-xl font-semibold">Beauty Line Academy</span>
            </div>
            <p className="text-stone-400 leading-relaxed max-w-md">
              Trasformiamo vite attraverso la formazione estetica. Il tuo viaggio verso il successo professionale inizia qui.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.facebook.com/beautylineacademy/" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-400 transition-colors">
                <UploadImages publicId={"facebookLogo_dvbiam"} width={25} height={25}/>
              </a>
              <a href="https://www.instagram.com/beautylineacademymonza/" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] transition-colors">
                <UploadImages publicId={"instagramLogo_tjrjdt"} width={25} height={25}/>
              </a>
              <a href="https://www.tiktok.com/@beautylineacademymonza" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-black transition-colors">
                <UploadImages publicId={"tiktokLogo_akws8o"} width={25} height={25}/>
              </a>
              <a href="https://www.youtube.com/channel/UCvFeks3fQ1sFk9ZhxDcPDog" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-400 transition-colors">
                <UploadImages publicId={"youtubeLogo_vg9i8g"} width={25} height={25}/>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Link Rapidi</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((item) => (
                <li key={item.name}>
                    <a 
                        href={item.path} 
                        className="text-stone-400 hover:text-rose-400 transition-colors"
                    >
                    {item.name}
                    </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Orari di Apertura</h4>
            <ul className="space-y-3 text-stone-400">
              <li>Lunedì - Venerdì: 08:00 - 20:00</li>
              <li>Sabato: 09:00 - 17:00</li>
              <li>Domenica: Chiuso</li>
            </ul>
            <div className="mt-6">
              <p className="text-stone-400">P.IVA: 07198540960</p>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-sm">© {new Date().getFullYear()} Beauty Line Academy. Tutti i diritti riservati.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-stone-500 hover:text-stone-300 transition-colors">Informativa sulla Privacy</a>
            <a href="#" className="text-stone-500 hover:text-stone-300 transition-colors">Termini di Utilizzo</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
