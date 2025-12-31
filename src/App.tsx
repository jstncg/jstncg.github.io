import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Writing from './pages/Writing';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg text-text">
        <Navigation />
        <main className="max-w-content mx-auto px-4 md:px-6 min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/writing" element={<Writing />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </BrowserRouter>
  );
}

