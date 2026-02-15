import { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../constants/constants';
import UploadImages from './UploadImages';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDimensions({ width: 640, height: 960 });
      } else if (w < 1024) {
        setDimensions({ width: 1024, height: 1280 });
      } else {
        setDimensions({ width: 1920, height: 1080 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="relative h-screen min-h-[600px] pt-20 overflow-hidden group">
      <div id="carousel" className="absolute inset-0">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <UploadImages publicId={slide.image} width={dimensions.width} height={dimensions.height} className="w-full h-full object-cover"/>
          </div>
        ))}
      </div>

      <div className="relative z-20 h-full flex items-center justify-center px-6">
        <div className="text-center max-w-4xl animate-fade-in">
          <p className="text-purple-200 font-medium tracking-widest uppercase mb-4 drop-shadow-md">Benvenuto</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">Beauty Line Academy</h1>
          <p className="text-xl md:text-2xl text-stone-100 mb-8 font-light drop-shadow-md">Trasformare la passione in professione attraverso l'eccellenza nell'estetica.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#centroAssistenza" className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold text-lg hover:bg-purple-700 hover:scale-105 transition-all">
              Scopri i Nostri Pilastri
            </a>
            <a href="#contatti" className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-stone-900 hover:scale-105 transition-all">
              Contattaci
            </a>
          </div>
        </div>
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all opacity-0 group-hover:opacity-100 duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <UploadImages publicId={"leftArrow_faao9i"} width={32} height={32}/>
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all opacity-0 group-hover:opacity-100 duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <UploadImages publicId={"rightArrow_xzpqgm"} width={32} height={32}/>
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all shadow-sm ${
              index === currentSlide ? 'bg-purple-600 scale-125' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
