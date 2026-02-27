import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function EquipmentPage() {
    return (
        <div className="min-h-screen bg-stone-50 pt-32 flex flex-col">
            <Navbar />
            <div className="flex-grow">
                <h1>Attrezzature</h1>
            </div>
            <Footer />
        </div>
    );
}
