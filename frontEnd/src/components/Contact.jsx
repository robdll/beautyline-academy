import { useState } from 'react';
import UploadImages from "./UploadImages";

export default function Contact() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });

    setTimeout(() => {
        setStatus({ state: 'success', message: '✓ Messaggio inviato con successo! Ti contatteremo a breve.' });
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            message: ''
        });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contatti" className="py-24 bg-gradient-to-br from-stone-800 via-stone-900 to-stone-800 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-rose-300 font-medium tracking-widest uppercase">Contattaci</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">Mettiti in Contatto</h2>
            <p className="text-lg text-stone-300 mb-8 leading-relaxed">
              Siamo pronti ad aiutarti a trasformare la tua carriera nel settore della bellezza. Contattaci e scopri come possiamo soddisfare le tue esigenze.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-rose-400/20 flex items-center justify-center">
                  <UploadImages publicId={"iconlocation_q2877n"} width={40} height={40}/>
                </div>
                <div>
                  <p className="font-semibold">Indirizzo</p>
                  <a href="https://www.google.com/maps/place/Via+Michelangelo+Buonarroti,+24,+20900+Monza+MB,+It%C3%A1lia/@45.5790895,9.2798606,17z/data=!3m1!4b1!4m6!3m5!1s0x4786b9bc7e7462bd:0x8d45f9702ffa1e0e!8m2!3d45.5790895!4d9.2824355!16s%2Fg%2F11q2xkz74q?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="text-rose-400">Via M. Buonarroti, 24, 20900 Monza MB</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-amber-400/20 flex items-center justify-center">
                  <UploadImages publicId={"iconphone_bttgkh"} width={40} height={40}/>
                </div>
                <div>
                  <p className="font-semibold">Telefono</p>
                  <a href="https://api.whatsapp.com/send/?phone=393382535226&text&type=phone_number&app_absent=0" target="_blank" className="text-rose-400">+39 338 253 5226</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-stone-400/20 flex items-center justify-center">
                  <UploadImages publicId={"iconemail_htjndo"} width={40} height={40}/>
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJfrslbcbDGjGZhpqDWNBkVHBRNpPXVKNWrlQCZvRFRhlnjWHGBsmSNBcHWrpWSBVCqzhLB" target="_blank" className="text-rose-400">info@beautylineprofessional.com</a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-stone-300 mb-2">Nome</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                    placeholder="Il tuo nome"
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-stone-300 mb-2">Cognome</label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                    placeholder="Il tuo cognome"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-stone-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                  placeholder="tua@email.com"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-stone-300 mb-2">Telefono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                  placeholder="+39 000 000 0000"
                />
              </div>
              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-medium text-stone-300 mb-2">Come possiamo aiutarti?</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all resize-none"
                  placeholder="Raccontaci di cosa hai bisogno..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={status.state === 'loading'}
                className="w-full py-4 bg-gradient-to-r from-rose-400 to-purple-400 text-white font-semibold rounded-xl hover:from-rose-500 hover:to-purple-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.state === 'loading' ? (
                   <>
                    <span>Invio in corso...</span>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                     </svg>
                   </>
                ) : (
                    <span>Invia Messaggio</span>
                )}
              </button>
              
              {status.message && (
                <div className={`mt-4 text-center ${status.state === 'success' ? 'text-green-400' : 'text-amber-400'}`}>
                    {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
