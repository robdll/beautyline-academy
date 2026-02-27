import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthForm from '../components/AuthForm';
import { ScrollRestoration, useSearchParams } from 'react-router-dom';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';

  return (
    <div className="min-h-screen bg-stone-50 pt-32 flex flex-col">
      <ScrollRestoration />
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <AuthForm key={mode} />
      </div>
      <Footer />
    </div>
  );
}
