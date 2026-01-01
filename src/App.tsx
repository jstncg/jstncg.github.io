import { useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Writing from './pages/Writing';
import LifeStory from './pages/LifeStory';
import ReadingList from './pages/ReadingList';
import Music from './pages/Music';
import Quotes from './pages/Quotes';
import Thoughts from './pages/Thoughts';
import WritingPiece from './pages/WritingPiece';

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, [pathname]);
  
  return null;
}

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-bg text-text flex flex-col">
        <Navigation />
        <main className="max-w-content mx-auto px-4 md:px-6 flex-1 flex flex-col w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/life" element={<LifeStory />} />
            <Route path="/about/reading" element={<ReadingList />} />
            <Route path="/about/music" element={<Music />} />
            <Route path="/about/quotes" element={<Quotes />} />
            <Route path="/about/thoughts" element={<Thoughts />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/writing/:pieceId" element={<WritingPiece />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </BrowserRouter>
  );
}
