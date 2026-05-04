import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-800 font-body">
      <ScrollRestoration />
      <Navbar />
      <main className="grow pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
