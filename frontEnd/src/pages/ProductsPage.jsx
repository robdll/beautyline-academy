import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-stone-50 pt-32 flex flex-col">
            <Navbar />
            <div className="flex-grow">
                <h1>Prodotti</h1>
            </div>
            <Footer />
        </div>
    );
}
