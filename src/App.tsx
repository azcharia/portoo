import { useState } from 'react';
import './App.css';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import TerminalSplash from './components/TerminalSplash';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <TerminalSplash onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="relative bg-[#1a1b26] min-h-screen noise-overlay">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
