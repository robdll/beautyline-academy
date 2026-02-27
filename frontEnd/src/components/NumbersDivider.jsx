import CountUp from "./CountUp";
import { GraduationCap, School, ChartNoAxesCombined } from "lucide-react";

export default function NumbersDivider() {
    return (
        <section id="numbers" className="py-24 md:py-32 bg-purple-600">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-20">I nostri numeri</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <CountUp end={1000} icon={GraduationCap} title="Formazioni" />
                    <CountUp end={3000} icon={School} title="Corsiste" />
                    <CountUp end={100} icon={ChartNoAxesCombined} title="Crescita Professionale" />
                </div>
            </div>
        </section>
    );
}
