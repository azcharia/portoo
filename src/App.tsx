import { useEffect, useState, useRef } from 'react';
import './App.css';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { ChevronUp } from 'lucide-react';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isReadyToSwipe, setIsReadyToSwipe] = useState(false);
  const [isMouseDragging, setIsMouseDragging] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);
  const mouseDragStartRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
    setSwipeProgress(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.targetTouches[0].clientY;
    const diff = touchStart - currentY;
    const progress = Math.min(Math.max(diff / 100, 0), 1);
    setSwipeProgress(progress);
    setIsReadyToSwipe(progress > 0.3);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientY);
    handleSwipe();
    setSwipeProgress(0);
    setIsReadyToSwipe(false);
  };

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      setShowIntro(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!showIntro) return;
    setIsMouseDragging(true);
    mouseDragStartRef.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDragging || !showIntro) return;

    const diff = mouseDragStartRef.current - e.clientY;
    const progress = Math.min(Math.max(diff / 100, 0), 1);
    setSwipeProgress(progress);
    setIsReadyToSwipe(progress > 0.3);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDragging) return;
    setIsMouseDragging(false);

    const diff = mouseDragStartRef.current - e.clientY;
    if (diff > 50) {
      setShowIntro(false);
    }
    setSwipeProgress(0);
    setIsReadyToSwipe(false);
  };

  const wheelProgressRef = useRef(0);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleWheel = (e: WheelEvent) => {
    if (!showIntro) return;

    if (e.deltaY > 0) {
      wheelProgressRef.current = Math.min(wheelProgressRef.current + e.deltaY / 200, 1);
      setSwipeProgress(wheelProgressRef.current);
      setIsReadyToSwipe(wheelProgressRef.current > 0.3);

      if (wheelProgressRef.current >= 1) {
        setShowIntro(false);
        wheelProgressRef.current = 0;
      }

      // Reset progress after scroll stops
      if (wheelTimeoutRef.current !== null) {
        clearTimeout(wheelTimeoutRef.current);
      }
      wheelTimeoutRef.current = setTimeout(() => {
        wheelProgressRef.current = 0;
        setSwipeProgress(0);
        setIsReadyToSwipe(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (showIntro) {
      window.addEventListener('wheel', handleWheel, { passive: true });
      return () => {
        window.removeEventListener('wheel', handleWheel);
        if (wheelTimeoutRef.current !== null) {
          clearTimeout(wheelTimeoutRef.current);
        }
      };
    }
  }, [showIntro]);

  if (showIntro) {
    return (
      <div 
        ref={introRef}
        className="fixed inset-0 bg-[#010101] flex flex-col items-center justify-center z-50 overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#d3e865]/10 blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#d3e865]/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* Glow Border Effect on Swipe */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: swipeProgress * 0.8,
            boxShadow: `inset 0 -${swipeProgress * 100}px 60px rgba(211, 232, 101, ${swipeProgress * 0.4}), 
                        inset 0 -${swipeProgress * 80}px 40px rgba(211, 232, 101, ${swipeProgress * 0.3})`,
          }}
        />

        {/* Top Glow Effect */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
          style={{
            opacity: swipeProgress * 0.6,
            boxShadow: `0 0 ${swipeProgress * 40}px rgba(211, 232, 101, ${swipeProgress * 0.8})`,
            background: `linear-gradient(90deg, transparent, rgba(211, 232, 101, ${swipeProgress * 0.5}), transparent)`,
          }}
        />

        {/* Side Glow Effects */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
          style={{
            opacity: swipeProgress * 0.6,
            boxShadow: `0 0 ${swipeProgress * 30}px rgba(211, 232, 101, ${swipeProgress * 0.8})`,
          }}
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-1 transition-all duration-300"
          style={{
            opacity: swipeProgress * 0.6,
            boxShadow: `0 0 ${swipeProgress * 30}px rgba(211, 232, 101, ${swipeProgress * 0.8})`,
          }}
        />

        {/* Main content */}
        <div 
          className="relative z-10 text-center space-y-12 flex-1 flex flex-col items-center justify-center transition-all duration-300"
          style={{
            transform: `translateY(${swipeProgress * 30}px)`,
            opacity: 1 - swipeProgress * 0.3,
          }}
        >
          <div>
            <h1 className="font-['Bebas_Neue'] text-7xl sm:text-8xl md:text-9xl text-white tracking-wider animate-pulse-glow">
              Hi, there!
            </h1>
            <p className="text-[#d3e865] text-lg mt-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              Welcome to my portfolio
            </p>
          </div>

          {/* Stats */}
          <div 
            className="flex flex-wrap justify-center gap-8 animate-fade-in-up"
            style={{ animationDelay: '1s' }}
          >
            <div>
              <div className="font-['Bebas_Neue'] text-4xl text-[#d3e865]">10+</div>
              <div className="text-sm text-[#b6b6b6]">Projects Completed</div>
            </div>
            <div>
              <div className="font-['Bebas_Neue'] text-4xl text-[#d3e865]">1+</div>
              <div className="text-sm text-[#b6b6b6]">Years Experience</div>
            </div>
            <div>
              <div className="font-['Bebas_Neue'] text-4xl text-[#d3e865]">12+</div>
              <div className="text-sm text-[#b6b6b6]">Tech Stack</div>
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div 
            className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '1.5s' }}
          >
            <span className="px-3 py-1 rounded-full bg-[#181818] border border-[#d3e865]/30 text-xs text-[#d3e865]">Flutter</span>
            <span className="px-3 py-1 rounded-full bg-[#181818] border border-[#d3e865]/30 text-xs text-[#d3e865]">Dart</span>
            <span className="px-3 py-1 rounded-full bg-[#181818] border border-[#d3e865]/30 text-xs text-[#d3e865]">Laravel</span>
            <span className="px-3 py-1 rounded-full bg-[#181818] border border-[#d3e865]/30 text-xs text-[#d3e865]">PHP</span>
            <span className="px-3 py-1 rounded-full bg-[#181818] border border-[#d3e865]/30 text-xs text-[#d3e865]">Python</span>
            <span className="px-3 py-1 rounded-full bg-[#181818] border border-[#d3e865]/30 text-xs text-[#d3e865]">R</span>
            <span className="px-3 py-1 rounded-full bg-[#181818] border border-[#d3e865]/30 text-xs text-[#d3e865]">Azure</span>
            <span className="px-3 py-1 rounded-full bg-[#181818] border border-[#d3e865]/30 text-xs text-[#d3e865]">Gemini API</span>
            <span className="px-3 py-1 rounded-full bg-[#181818] border border-[#d3e865]/30 text-xs text-[#d3e865]">Supabase</span>
            <span className="px-3 py-1 rounded-full bg-[#181818] border border-[#d3e865]/30 text-xs text-[#d3e865]">MySQL</span>
          </div>
        </div>

        {/* Swipe Up Indicator */}
        <div 
          className="relative z-10 pb-8 animate-fade-in-up transition-all duration-300"
          style={{ 
            animationDelay: '2s',
            opacity: 1 - swipeProgress,
            transform: `translateY(${swipeProgress * 20}px)`,
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[#d3e865] text-sm font-medium">
              {isReadyToSwipe ? 'Release to continue' : 'Swipe up to continue'}
            </span>
            <ChevronUp 
              size={24} 
              className="text-[#d3e865] transition-all duration-300"
              style={{
                animation: isReadyToSwipe ? 'none' : 'bounce 2s infinite',
                transform: `translateY(${swipeProgress * -30}px)`,
              }}
            />
          </div>
        </div>

        {/* Swipe Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#181818] z-20">
          <div 
            className="h-full bg-gradient-to-r from-transparent via-[#d3e865] to-transparent transition-all duration-100"
            style={{ width: `${swipeProgress * 100}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#010101] min-h-screen noise-overlay">
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
