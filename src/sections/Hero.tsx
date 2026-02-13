import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Code2, Smartphone, Zap } from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Android Developer';
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a1b26]"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#00ff41]/5 blur-3xl animate-float"
          style={{ animationDelay: '0s' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#00ff41]/5 blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#00ff41]/10 via-transparent to-transparent"
        />
      </div>

      {/* Diagonal Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diagonal" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="40" x2="40" y2="0" stroke="#00ff41" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonal)" />
      </svg>

      {/* Main Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div 
              className="space-y-8"
              style={{
                transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00ff41]/30 bg-[#00ff41]/5 animate-fade-in-up font-mono">
                <Zap size={16} className="text-[#00ff41]" />
                <span className="text-sm text-[#00ff41]">Information Systems Student</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 
                  className="font-['Bebas_Neue'] text-[clamp(3rem,10vw,9rem)] text-white leading-none animate-slide-in-left"
                  style={{ animationDelay: '0.2s' }}
                >
                  HELLO,
                </h1>
                <h1 
                  className="font-['Bebas_Neue'] text-[clamp(3rem,10vw,9rem)] outline-text-terminal leading-none animate-slide-in-left"
                  style={{ animationDelay: '0.4s' }}
                >
                  I'M AN
                </h1>
              </div>

              {/* Typing Effect */}
              <div className="h-16 flex items-center">
                <span className="font-['Bebas_Neue'] text-4xl sm:text-5xl lg:text-6xl gradient-text-terminal">
                  {displayText}
                  <span 
                    className={`inline-block w-1 h-12 bg-[#00ff41] ml-2 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                  />
                </span>
              </div>

              {/* Description */}
              <p 
                className="text-lg text-[#b6b6b6] max-w-lg leading-relaxed animate-fade-in-up"
                style={{ animationDelay: '0.8s' }}
              >
                A proactive and curious Information Systems student with a strong record of academic achievement and organizational leadership. Possesses hands-on experience in building and deploying Android applications with a focus on creating clean, user-friendly interfaces.
              </p>

              {/* CTA Buttons */}
              <div 
                className="flex flex-wrap gap-4 animate-fade-in-up"
                style={{ animationDelay: '1s' }}
              >
                <button
                  onClick={() => scrollToSection('#projects')}
                  className="group relative px-8 py-4 bg-[#00ff41] text-[#1a1b26] font-semibold rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,255,65,0.4)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Lihat Project
                    <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
                  </span>
                </button>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:border-[#00ff41] hover:text-[#00ff41] transition-all"
                >
                  Hubungi Saya
                </button>
              </div>

              {/* Stats */}
              <div 
                className="flex gap-8 pt-8 animate-fade-in-up"
                style={{ animationDelay: '1.2s' }}
              >
                <div>
                  <div className="font-['Bebas_Neue'] text-4xl text-[#00ff41]">10+</div>
                  <div className="text-sm text-[#b6b6b6] font-mono">Projects Completed</div>
                </div>
                <div>
                  <div className="font-['Bebas_Neue'] text-4xl text-[#00ff41]">1+</div>
                  <div className="text-sm text-[#b6b6b6] font-mono">Years Experience</div>
                </div>
                <div>
                  <div className="font-['Bebas_Neue'] text-4xl text-[#00ff41]">12+</div>
                  <div className="text-sm text-[#b6b6b6] font-mono">Tech Stack</div>
                </div>
              </div>
            </div>

            {/* Right Content - Visual */}
            <div 
              className="relative hidden lg:flex items-center justify-center"
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              {/* Central Circle */}
              <div className="relative w-80 h-80 xl:w-96 xl:h-96">
                {/* Rotating Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00ff41]/30 animate-rotate-slow" />
                
                {/* Inner Circle */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#181818] to-[#0a0a0a] flex items-center justify-center">
                  <div className="text-center">
                    <Code2 size={64} className="text-[#00ff41] mx-auto mb-4" />
                    <Smartphone size={48} className="text-white/50 mx-auto" />
                  </div>
                </div>

                {/* Floating Icons */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#181818] border border-[#00ff41]/30 flex items-center justify-center animate-float">
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#181818] border border-[#00ff41]/30 flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                  <span className="text-2xl">📱</span>
                </div>
                <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-16 h-16 rounded-full bg-[#181818] border border-[#00ff41]/30 flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-16 h-16 rounded-full bg-[#181818] border border-[#00ff41]/30 flex items-center justify-center animate-float" style={{ animationDelay: '1.5s' }}>
                  <span className="text-2xl">💡</span>
                </div>
              </div>

              {/* Tech Stack Labels */}
              <div className="absolute top-0 right-0 px-4 py-2 rounded-full bg-[#181818] border border-[#00ff41]/30 text-sm text-[#00ff41] font-mono">
                Android
              </div>
              <div className="absolute bottom-8 left-0 px-4 py-2 rounded-full bg-[#181818] border border-[#00ff41]/30 text-sm text-[#00ff41] font-mono">
                Dart
              </div>
              <div className="absolute top-1/3 -right-8 px-4 py-2 rounded-full bg-[#181818] border border-[#00ff41]/30 text-sm text-[#00ff41] font-mono">
                Supabase
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1b26] to-transparent" />
    </section>
  );
};

export default Hero;
