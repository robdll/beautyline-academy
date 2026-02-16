import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-stone-50 text-stone-800 font-body">
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
