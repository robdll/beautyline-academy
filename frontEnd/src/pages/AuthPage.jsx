import AuthForm from '../components/AuthForm';
import { useSearchParams } from 'react-router-dom';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <AuthForm key={mode} />
    </div>
  );
}
