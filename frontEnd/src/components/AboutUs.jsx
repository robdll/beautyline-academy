import UploadImages from "./UploadImages";

export default function AboutUs() {
    return (
        <section id="aboutUs" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center ">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="bg-purple-600 rounded-3xl p-7 shadow-2xl border border-stone-200">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Chi Siamo</h2>
                        <div className="w-24 h-1 bg-gradient-to-r mb-6 from-purple-200 to-purple-400 mx-auto mt-2 rounded-full"></div>
                        <p className="text-white mb-6 leading-relaxed">
                            La bellezza è un arte che racconta chi sei.
                        </p>
                        <p className="text-white mb-6 leading-relaxed">
                            Siamo Christian e Barbara, e dal 2010 trasformiamo la passione per la bellezza e il benessere in un progetto dedicato a chi ama il mondo dell’estetica. Con il nostro primo negozio, abbiamo creato un luogo dove prendersi cura delle persone è una vera forma d’arte.
                        </p>
                        <p className="text-white mb-6 leading-relaxed">
                            Negli anni, abbiamo ampliato la nostra visione, aprendo un’accademia per formare professionisti nel settore Nails e Beauty. Collaboriamo con i migliori master nazionali e internazionali per offrire corsi di alta qualità, garantendo competenze solide per una carriera di successo.
                        </p>
                        <p className="text-white mb-6 leading-relaxed">
                            Oltre alla formazione, proponiamo trattamenti estetici avanzati e tecnologie innovative per viso e corpo, disponibili anche a noleggio per le professioniste. La nostra accademia è un punto di riferimento per chi vuole trasformare la passione per l’estetica in una professione.                        </p>
                        <p className="text-white mb-6 leading-relaxed">
                            Con la stessa passione di sempre, continuiamo a innovare e a supportare chi desidera crescere in questo settore unico e affascinante.                        </p>
                    </div>
                    <div>
                        <UploadImages publicId={"aboutUs_qccfpk"} className="rounded-lg mx-auto" width={400} height={400}/>
                    </div>
                </div>
            </div>
        </section>
    );
}