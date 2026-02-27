import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PathsPage() {
    return (
        <div className="min-h-screen bg-stone-50 pt-32 flex flex-col">
            <Navbar />
            <div className="flex-grow">
                <h1>Percorsi</h1>
            </div>
            <Footer />
        </div>
    );
}
