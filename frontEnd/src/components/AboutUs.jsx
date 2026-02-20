import UploadImages from "./UploadImages";

<<<<<<< feature/addAboutUsSection

export default function AboutUs() {
    return (
        <section id="chi-siamo" className="relative py-24 overflow-hidden min-h-[600px] flex items-center">
            <div className="absolute inset-0 z-0">
                <UploadImages publicId={"chisiamo-bg_cgvwwc"} className="w-full h-full object-cover" width={1920} height={1080} alt="" ariaHidden={true}/>
                <div className="absolute inset-0 bg-purple-900/60 backdrop-blur-[2px]"></div>
            </div>


=======
export default function AboutUs() {
    return (
        <section id="aboutUs" className="relative py-24 overflow-hidden min-h-[600px] flex items-center">
            <div className="absolute inset-0 z-0">
                <UploadImages publicId={"chisiamo-bg_cgvwwc"} className="w-full h-full object-cover" width={1920} height={1080}/>
                <div className="absolute inset-0 bg-purple-900/60 backdrop-blur-[2px]"></div>
            </div>

>>>>>>> main
            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 text-left">
                        <span className="text-purple-300 font-bold tracking-widest uppercase text-sm">Storia e Passione</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">Chi Siamo</h2>
                        <div className="w-20 h-1.5 bg-purple-400 mb-8 rounded-full"></div>
<<<<<<< feature/addAboutUsSection
                       
                        <div className="space-y-6 text-stone-100">
                            <p className="text-xl font-semibold text-white leading-tight">
                                Dal 2010, Christian e Barbara trasformano la loro passione per estetica e benessere in un progetto dedicato a chi ama il mondo delle unghie e della bellezza. Da un primo spazio dedicato alla cura della persona nascono oggi un'accademia moderna e corsi professionali di alta qualità, sviluppati con maestri nazionali e internazionali.
                            </p>
                            <p className="leading-relaxed font-medium">
                                Accanto alla formazione, il centro offre trattamenti estetici avanzati e tecnologie innovative per viso e corpo, oltre a servizi di noleggio di macchinari selezionati. Beauty Line Academy è oggi un punto di riferimento per chi desidera trasformare la propria passione per l'estetica in una carriera di successo.
                            </p>
                        </div>
                    </div>
                    <div className="relative flex justify-center">
                         <div className="absolute -inset-4 bg-purple-400/20 blur-2xl rounded-full"></div>
                         <UploadImages publicId={"aboutUs_qccfpk"} alt="Team Beauty Line Academy durante una sessione di formazione professionale" className="relative rounded-2xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-500" width={600} height={600}/>
=======
                        
                        <div className="space-y-6 text-stone-100">
                            <p className="text-xl font-semibold text-white leading-tight">
                                "La bellezza è un'arte che racconta chi sei."
                            </p>
                            <p className="leading-relaxed font-medium">
                                Dal 2010, Christian e Barbara hanno trasformato la loro passione per l'estetica e il benessere in un projeto dedicato a chi ama il mondo delle unghie e della bellezza.
                            </p>
                            <p className="leading-relaxed font-medium">
                                Hanno iniziato con uno spazio incentrato sulla cura della persona e si sono espansi in um'accademia che forma professionisti con corsi di alta qualidade, in collaborazione con maestri nazionali e internazionali.
                            </p>
                            <p className="leading-relaxed font-medium">
                                Oltre alla formazione, offrono trattamenti estetici avanzati e tecnologie innovative per viso e corpo, inclusi servizi di noleggio. L'accademia è um punto di riferimento per chi desidera trasformare a propria passione per l'estetica in uma carreira di successo.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                         <div className="absolute -inset-4 bg-purple-400/20 blur-2xl rounded-full"></div>
                         <UploadImages publicId={"aboutUs_qccfpk"} className="relative rounded-2xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-500" width={600} height={600}/>
>>>>>>> main
                    </div>
                </div>
            </div>
        </section>
    );
}
