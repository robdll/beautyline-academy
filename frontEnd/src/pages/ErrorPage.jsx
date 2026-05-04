export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
            <p className="text-xl text-stone-600 mb-8">Oops! La pagina che stai cercando non esiste.</p>
            <a href="/" className="px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors">
                Torna alla Home
            </a>
        </div>
    );
}
