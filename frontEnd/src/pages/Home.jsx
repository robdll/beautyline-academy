import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServiceCenter from '../components/ServiceCenter';
import EducationSection from '../components/EducationSection';
import TechnologySection from '../components/TechnologySection';
import CosmeticsSection from '../components/CosmeticsSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AboutUs from '../components/AboutUs';
import GoogleReviews from '../components/GoogleReviews';
import NumbersDivider from '../components/NumbersDivider';
import { ScrollRestoration } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-body">
      <ScrollRestoration />
      <Navbar />
      <main>
        <Hero />
        <ServiceCenter />
        <AboutUs />
        <EducationSection />
        <TechnologySection />
        <CosmeticsSection />
        <GoogleReviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
