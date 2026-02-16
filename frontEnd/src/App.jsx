import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Products from './pages/Products';
import Courses from './pages/Courses';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/cursos" element={<Courses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
