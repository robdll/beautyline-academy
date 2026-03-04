import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { MOCK_PRODUCTS } from "../constants/data.constants";
import { ScrollRestoration } from 'react-router-dom';

export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
            <ScrollRestoration />
            <Navbar />
            <header className="py-20 text-center px-4 mt-12 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-200/20 blur-3xl rounded-full -z-10" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-600 mb-6 font-display">
                    I Nostri Prodotti
                </h1>
                <div className="w-24 h-1.5 bg-purple-600 mx-auto mb-8 rounded-full" />
                <p className="text-stone-600 max-w-2xl mx-auto text-lg md:text-xl font-medium">
                    Scopri la nostra selezione esclusiva di prodotti per la cura della pelle, formulati con i migliori ingredienti naturali e professionali.
                </p>
            </header>
            <main className="max-w-7xl mx-auto mb-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {MOCK_PRODUCTS.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            description={product.description}
                            price={product.price}
                            publicId={product.publicId}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
