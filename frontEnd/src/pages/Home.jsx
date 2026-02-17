import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServiceCenter from '../components/ServiceCenter';
import EducationSection from '../components/EducationSection';
import TechnologySection from '../components/TechnologySection';
import CosmeticsSection from '../components/CosmeticsSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-body">
      <Navbar />
      <main>
        <Hero />
        <ServiceCenter />
        <EducationSection />
        <TechnologySection />
        <CosmeticsSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
