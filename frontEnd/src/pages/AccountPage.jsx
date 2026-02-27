import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuthStore } from '../store/authStore';
import { ScrollRestoration, Navigate } from 'react-router-dom';
import { LogOut, PencilLine, LoaderCircle } from 'lucide-react';

export default function AccountPage() {
  const { user, isLoggedIn, logout, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isLoggedIn) {
     return <Navigate to="/auth?mode=login" />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const result = await updateUser(formData.name, formData.email);
    
    setIsLoading(false);
    if (result && result.success) {
      setIsEditing(false);
    } else {
      setError(result?.message || "Errore durante l'aggiornamento");
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-32 flex flex-col">
      <ScrollRestoration />
      <Navbar />
      <div className="flex-grow max-w-4xl mx-auto w-full px-6 mb-10">
         <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 z-0 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h1 className="text-4xl font-serif text-stone-900 mb-6 drop-shadow-sm">Il mio account</h1>
              <p className="text-lg text-stone-600 mb-10">Benvenuto, <span className="font-semibold text-purple-600">{user?.name}</span>!</p>
              
              <div className="bg-white rounded-2xl p-8 border border-stone-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] mb-10 relative">
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-stone-100">
                    <h2 className="text-2xl font-serif text-stone-800">Dettagli del profilo</h2>
                    {!isEditing && (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-full hover:bg-purple-100 transition-all border border-purple-100"
                      >
                        <PencilLine className="w-4 h-4" aria-hidden="true" />
                        Modifica
                      </button>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <form onSubmit={handleSave} className="space-y-5 animate-fadeIn">
                      {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-4">
                          {error}
                        </div>
                      )}
                      <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-stone-600 mb-2">Nome e cognome</label>
                            <input 
                              type="text" 
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-white rounded-xl border border-stone-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all shadow-sm" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-stone-600 mb-2">Email</label>
                            <input 
                              type="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-white rounded-xl border border-stone-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all shadow-sm" 
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-2">
                        <button 
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({ name: user?.name || '', email: user?.email || '' });
                          }}
                          className="px-6 py-2.5 bg-white border border-stone-200 text-stone-600 rounded-xl font-medium hover:bg-stone-50 transition-colors"
                        >
                          Annulla
                        </button>
                        <button 
                          type="submit"
                          disabled={isLoading}
                          className="px-8 py-2.5 bg-purple-600 text-white shadow-md shadow-purple-600/20 rounded-xl font-medium hover:bg-purple-700 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
                        >
                          {isLoading ? (
                            <>
                              <LoaderCircle className="w-5 h-5 animate-spin" aria-hidden="true" />
                              Salvataggio...
                            </>
                          ) : 'Salva modifiche'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-8 mt-2">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-stone-400 uppercase tracking-wider">Nome</p>
                          <p className="text-lg text-stone-800 font-medium">{user?.name}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-stone-400 uppercase tracking-wider">Indirizzo Email</p>
                          <p className="text-lg text-stone-800 font-medium">{user?.email}</p>
                        </div>
                    </div>
                  )}
              </div>

              <div className="flex justify-end pt-4 border-t border-stone-100">
                <button 
                  onClick={logout}
                  className="group flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-400 hover:text-white transition-all shadow-sm"
                >
                  <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                  Disconnetti
                </button>
              </div>
            </div>
         </div>
      </div>
      <Footer />
    </div>
  );
}
