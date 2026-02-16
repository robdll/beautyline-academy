import MainLayout from '../components/layout/MainLayout';
import Hero from '../components/sections/Hero';
import ServiceCenter from '../components/sections/ServiceCenter';
import EducationSection from '../components/sections/EducationSection';
import TechnologySection from '../components/sections/TechnologySection';
import CosmeticsSection from '../components/sections/CosmeticsSection';
import Contact from '../components/sections/Contact';

function Home() {
    return (
        <MainLayout>
            <Hero />
            <ServiceCenter />
            <EducationSection />
            <TechnologySection />
            <CosmeticsSection />
            <Contact />
        </MainLayout>
    );
}

export default Home;
