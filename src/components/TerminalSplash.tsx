import { useEffect, useState, useRef } from 'react';

interface WeatherData {
  temperature: number;
  windSpeed: number;
  weatherCode: number;
  isDay: boolean;
}

interface RainDrop {
  x: number;
  y: number;
  char: string;
  speed: number;
}

interface Cloud {
  x: number;
  y: number;
  speed: number;
}

interface Wind {
  x: number;
  y: number;
  char: string;
  speed: number;
  opacity: number;
}

const TerminalSplash = ({ onComplete }: { onComplete: () => void }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
  const [clouds, setClouds] = useState<Cloud[]>([]);
  const [windParticles, setWindParticles] = useState<Wind[]>([]);
  const [showLightning, setShowLightning] = useState(false);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isReadyToSwipe, setIsReadyToSwipe] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const cloudAnimationRef = useRef<number | null>(null);
  const windAnimationRef = useRef<number | null>(null);
  const lightningIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Helper functions
  const isRaining = (code: number) => {
    // Rain codes: 51-55 (drizzle), 61-65 (rain), 80-82 (rain showers)
    return [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code);
  };

  const isThunderstorm = (code: number) => {
    // Thunderstorm codes: 95-99
    return [95, 96, 99].includes(code);
  };

  const isCloudy = (code: number) => {
    // Cloudy codes: 1-3 (partly/overcast), 45-48 (fog)
    return [1, 2, 3, 45, 48].includes(code);
  };

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-7.5755&longitude=110.8243&current=temperature_2m,weather_code,wind_speed_10m,is_day&timezone=Asia%2FJakarta'
        );
        const data = await response.json();
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          windSpeed: Math.round(data.current.wind_speed_10m),
          weatherCode: data.current.weather_code,
          isDay: data.current.is_day === 1,
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch weather:', error);
        setWeather({
          temperature: 28,
          windSpeed: 10,
          weatherCode: 0,
          isDay: true,
        });
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Rain animation - only when raining
  useEffect(() => {
    if (!weather) return;
    
    const shouldRain = isRaining(weather.weatherCode) || isThunderstorm(weather.weatherCode);
    
    if (!shouldRain) {
      setRainDrops([]);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const drops: RainDrop[] = [];
    const dropCount = isThunderstorm(weather.weatherCode) ? 80 : 50;
    
    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * 100,
        y: Math.random() * -100,
        char: ['/', '|', '\\'][Math.floor(Math.random() * 3)],
        speed: isThunderstorm(weather.weatherCode) ? 3 + Math.random() * 4 : 2 + Math.random() * 3,
      });
    }
    setRainDrops(drops);

    const animate = () => {
      setRainDrops((prev) =>
        prev.map((drop) => ({
          ...drop,
          y: drop.y > 100 ? -10 : drop.y + drop.speed,
        }))
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [weather]);

  // Lightning animation for thunderstorms
  useEffect(() => {
    if (!weather) return;

    if (isThunderstorm(weather.weatherCode)) {
      const triggerLightning = () => {
        setShowLightning(true);
        setTimeout(() => setShowLightning(false), 150);
      };

      // Random lightning strikes every 3-8 seconds
      const scheduleLightning = () => {
        const delay = 3000 + Math.random() * 5000;
        lightningIntervalRef.current = setTimeout(() => {
          triggerLightning();
          scheduleLightning();
        }, delay);
      };

      scheduleLightning();

      return () => {
        if (lightningIntervalRef.current !== null) {
          clearTimeout(lightningIntervalRef.current);
        }
      };
    } else {
      setShowLightning(false);
    }

    return () => {
      if (wheelTimeoutRef.current !== null) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, [weather]);

  // Cloud animation - more clouds when cloudy/rainy, speed based on wind
  useEffect(() => {
    if (!weather) return;

    const cloudList: Cloud[] = [];
    let cloudCount = 2;
    
    if (isCloudy(weather.weatherCode)) {
      cloudCount = 4;
    } else if (isRaining(weather.weatherCode) || isThunderstorm(weather.weatherCode)) {
      cloudCount = 5;
    }
    
    // Cloud speed based on wind speed (real-time)
    // Wind 0-10 km/h = slow (0.05-0.1)
    // Wind 10-20 km/h = medium (0.1-0.2)
    // Wind 20+ km/h = fast (0.2-0.35)
    const baseCloudSpeed = weather.windSpeed < 10 ? 0.05 : weather.windSpeed < 20 ? 0.1 : 0.2;
    const speedVariation = weather.windSpeed < 10 ? 0.05 : weather.windSpeed < 20 ? 0.1 : 0.15;
    
    for (let i = 0; i < cloudCount; i++) {
      cloudList.push({
        x: Math.random() * 100,
        y: 5 + Math.random() * 25,
        speed: baseCloudSpeed + Math.random() * speedVariation,
      });
    }
    setClouds(cloudList);

    const animate = () => {
      setClouds((prev) =>
        prev.map((cloud) => ({
          ...cloud,
          x: cloud.x > 110 ? -10 : cloud.x + cloud.speed,
        }))
      );
      cloudAnimationRef.current = requestAnimationFrame(animate);
    };

    cloudAnimationRef.current = requestAnimationFrame(animate);

    return () => {
      if (cloudAnimationRef.current !== null) {
        cancelAnimationFrame(cloudAnimationRef.current);
      }
    };
  }, [weather]);

  // Wind animation - stronger during storms
  useEffect(() => {
    if (!weather) return;

    const particles: Wind[] = [];
    let particleCount = 10;
    let baseSpeed = 0.3;
    
    if (isThunderstorm(weather.weatherCode)) {
      particleCount = 25;
      baseSpeed = 0.8;
    } else if (isRaining(weather.weatherCode)) {
      particleCount = 18;
      baseSpeed = 0.5;
    } else if (weather.windSpeed > 20) {
      particleCount = 15;
      baseSpeed = 0.4;
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * 100,
        y: 40 + Math.random() * 40,
        char: ['~', '-', '≈'][Math.floor(Math.random() * 3)],
        speed: baseSpeed + Math.random() * 0.5,
        opacity: 0.2 + Math.random() * 0.4,
      });
    }
    setWindParticles(particles);

    const animate = () => {
      setWindParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: particle.x > 105 ? -5 : particle.x + particle.speed,
        }))
      );
      windAnimationRef.current = requestAnimationFrame(animate);
    };

    windAnimationRef.current = requestAnimationFrame(animate);

    return () => {
      if (windAnimationRef.current !== null) {
        cancelAnimationFrame(windAnimationRef.current);
      }
    };
  }, [weather]);

  const [carPosition, setCarPosition] = useState(0);
  const [wheelFrame, setWheelFrame] = useState(0);
  const [carDirection, setCarDirection] = useState<'left-to-right' | 'right-to-left'>('left-to-right');
  const [carVisible, setCarVisible] = useState(true);
  const [birds, setBirds] = useState<Array<{x: number, y: number, frame: number}>>([]);
  const [roadLines, setRoadLines] = useState<Array<{x: number}>>([]);

  // Animate car moving based on wind speed
  useEffect(() => {
    if (!weather) return;
    
    // Calculate car speed based on wind speed
    const baseSpeed = weather.windSpeed < 10 ? 0.3 : weather.windSpeed < 20 ? 0.5 : 0.8;
    
    const interval = setInterval(() => {
      setCarPosition((prev) => {
        if (carDirection === 'left-to-right') {
          if (prev >= 110) {
            // Car reached end, hide it
            setCarVisible(false);
            // Wait 3 seconds then show from opposite direction
            setTimeout(() => {
              setCarDirection('right-to-left');
              setCarPosition(110);
              setCarVisible(true);
            }, 3000);
            return prev;
          }
          return prev + baseSpeed;
        } else {
          // right-to-left
          if (prev <= -20) {
            // Car reached end, hide it
            setCarVisible(false);
            // Wait 3 seconds then show from opposite direction
            setTimeout(() => {
              setCarDirection('left-to-right');
              setCarPosition(-20);
              setCarVisible(true);
            }, 3000);
            return prev;
          }
          return prev - baseSpeed;
        }
      });
      setWheelFrame((prev) => (prev + 1) % 4);
    }, 100);
    
    return () => clearInterval(interval);
  }, [weather, carDirection]);

  // Animate birds flying
  useEffect(() => {
    const birdsList = [
      { x: 30, y: 15, frame: 0 },
      { x: 60, y: 20, frame: 1 },
      { x: 85, y: 18, frame: 0 },
    ];
    setBirds(birdsList);

    const interval = setInterval(() => {
      setBirds((prev) =>
        prev.map((b) => ({
          x: b.x > 100 ? -5 : b.x + 0.4,
          y: b.y + Math.sin(b.x * 0.05) * 0.3,
          frame: (b.frame + 1) % 2,
        }))
      );
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Animate road lines based on car speed
  useEffect(() => {
    if (!weather) return;
    
    const lines = [
      { x: 0 },
      { x: 20 },
      { x: 40 },
      { x: 60 },
      { x: 80 },
    ];
    setRoadLines(lines);

    const roadSpeed = weather.windSpeed < 10 ? 1.5 : weather.windSpeed < 20 ? 2 : 3;

    const interval = setInterval(() => {
      setRoadLines((prev) =>
        prev.map((line) => ({
          x: line.x <= -20 ? 100 : line.x - roadSpeed,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, [weather]);

  const getCarArt = () => {
    const wheels = ['o', 'O', 'o', '0'];
    const wheel = wheels[wheelFrame];
    
    // Car facing right (left-to-right)
    if (carDirection === 'left-to-right') {
      return `
    ____
  /|_||_\\
 (   _   )
 '-${wheel}---${wheel}-'`;
    }
    
    // Car facing left (right-to-left)
    return `
   ____
  /_||_|\\
 (   _   )
 '-${wheel}---${wheel}-'`;
  };

  const handleSwipe = (progress: number) => {
    setSwipeProgress(progress);
    setIsReadyToSwipe(progress > 0.3);
    if (progress >= 1) {
      onComplete();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const diff = touchStartY - currentY;
    const progress = Math.min(Math.max(diff / 200, 0), 1);
    handleSwipe(progress);
  };

  const handleTouchEnd = () => {
    if (swipeProgress < 1) {
      // Smooth reset if not completed
      const resetAnimation = () => {
        setSwipeProgress((prev) => {
          const newProgress = prev - 0.05;
          if (newProgress <= 0) {
            setSwipeProgress(0);
            setIsReadyToSwipe(false);
            return 0;
          }
          requestAnimationFrame(resetAnimation);
          return newProgress;
        });
      };
      resetAnimation();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      const newProgress = Math.min(swipeProgress + e.deltaY / 500, 1);
      handleSwipe(newProgress);
      
      // Auto reset after stopping scroll
      if (wheelTimeoutRef.current !== null) {
        clearTimeout(wheelTimeoutRef.current);
      }
      wheelTimeoutRef.current = setTimeout(() => {
        if (swipeProgress < 1) {
          const resetAnimation = () => {
            setSwipeProgress((prev) => {
              const newProgress = prev - 0.05;
              if (newProgress <= 0) {
                setSwipeProgress(0);
                setIsReadyToSwipe(false);
                return 0;
              }
              requestAnimationFrame(resetAnimation);
              return newProgress;
            });
          };
          resetAnimation();
        }
      }, 300);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#1a1b26] flex items-center justify-center font-mono text-green-400">
        <div className="text-center">
          <div className="text-2xl mb-4">Loading...</div>
          <div className="animate-pulse">█</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 bg-[#1a1b26] font-mono cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        opacity: 1 - swipeProgress * 0.5,
        transform: `translateY(${swipeProgress * 50}px)`,
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
        overflow: 'hidden',
        overflowX: 'hidden',
      }}
    >
      {/* Lightning Flash Effect */}
      {showLightning && (
        <div className="absolute inset-0 bg-white pointer-events-none z-50 animate-pulse" 
             style={{ opacity: 0.3 }} />
      )}

      {/* Rain Animation */}
      {(isRaining(weather?.weatherCode || 0) || isThunderstorm(weather?.weatherCode || 0)) && rainDrops.length > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {rainDrops.map((drop, i) => (
            <div
              key={i}
              className="absolute text-blue-400 opacity-60"
              style={{
                left: `${drop.x}%`,
                top: `${drop.y}%`,
                fontSize: '14px',
              }}
            >
              {drop.char}
            </div>
          ))}
        </div>
      )}

      {/* Cloud Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {clouds.map((cloud, i) => (
          <div
            key={i}
            className="absolute text-gray-400 opacity-50 text-xs sm:text-sm"
            style={{
              left: `${cloud.x}%`,
              top: `${cloud.y}%`,
            }}
          >
            <pre className="leading-tight whitespace-pre">
{`  .--.
.-(    ).
(___.__)__)`}
            </pre>
          </div>
        ))}
      </div>

      {/* Wind Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {windParticles.map((particle, i) => (
          <div
            key={i}
            className="absolute text-cyan-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              fontSize: '12px',
            }}
          >
            {particle.char}
          </div>
        ))}
      </div>

      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 bg-[#16161e] border-b border-green-500/30 p-3 sm:p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-green-400 text-xs sm:text-sm">
          <div className="flex gap-3 sm:gap-6">
            <span className="hidden sm:inline">┌─[azcharia@portfolio]</span>
            <span className="sm:hidden">azcharia</span>
          </div>
          <div className="flex gap-2 sm:gap-6 flex-wrap justify-end">
            <span className="hidden md:inline">Weather: {
              isThunderstorm(weather?.weatherCode || 0) ? '⚡ Thunderstorm' : 
              isRaining(weather?.weatherCode || 0) ? '🌧️ Rain' : 
              isCloudy(weather?.weatherCode || 0) ? '☁️ Cloudy' : 
              weather?.isDay ? '☀️ Clear' : '🌙 Night'
            }</span>
            <span className="md:hidden">{
              isThunderstorm(weather?.weatherCode || 0) ? '⚡' : 
              isRaining(weather?.weatherCode || 0) ? '🌧️' : 
              isCloudy(weather?.weatherCode || 0) ? '☁️' : 
              weather?.isDay ? '☀️' : '🌙'
            }</span>
            <span>{weather?.temperature}°C</span>
            <span className="hidden sm:inline">Wind: {weather?.windSpeed} km/h</span>
            <span className="hidden lg:inline">Location: Surakarta, ID</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen pt-20 pb-24 px-4 sm:px-6">
        <div className="w-full max-w-7xl">
          <div className="grid lg:grid-cols-[1fr,1.2fr] gap-8 lg:gap-16 items-center">
            {/* Left Side - Village Road Scene */}
            <div className="flex flex-col items-center lg:items-start space-y-4 sm:space-y-6">
              {/* Village Road Scene */}
              <div className="relative w-full max-w-md h-64 sm:h-80">

                {/* Birds */}
                {birds.map((bird, i) => (
                  <div
                    key={i}
                    className="absolute text-gray-600 text-xs transition-all duration-300"
                    style={{
                      left: `${bird.x}%`,
                      top: `${bird.y}%`,
                    }}
                  >
                    <pre className="leading-tight">
                      {bird.frame === 0 ? '^  ^' : 'v  v'}
                    </pre>
                  </div>
                ))}

                {/* Mountains/Hills in background */}
                <div className="absolute bottom-32 left-0 right-0 text-green-800 text-xs opacity-40">
                  <pre className="leading-tight text-center">
{`       /\\        /\\       /\\
      /  \\      /  \\     /  \\
     /    \\    /    \\   /    \\
    /      \\  /      \\ /      \\`}
                  </pre>
                </div>

                {/* Trees */}
                <div className="absolute bottom-24 left-[10%] text-green-600 text-xs">
                  <pre className="leading-tight">
{`   ^
  ^^^
 ^^^^^
   |
   |`}
                  </pre>
                </div>
                <div className="absolute bottom-24 right-[15%] text-green-600 text-xs">
                  <pre className="leading-tight">
{`   ^
  ^^^
 ^^^^^
   |
   |`}
                  </pre>
                </div>

                {/* House */}
                <div className="absolute bottom-20 left-[25%] text-red-400 text-xs">
                  <pre className="leading-tight">
{`   /\\
  /  \\
 /____\\
 |[][]|
 |____|`}
                  </pre>
                </div>

                {/* Car moving on road */}
                {carVisible && (
                  <div
                    className="absolute bottom-12 text-cyan-400 text-sm transition-all duration-100"
                    style={{
                      left: `${carPosition}%`,
                    }}
                  >
                    <pre className="leading-tight whitespace-pre">
                      {getCarArt()}
                    </pre>
                  </div>
                )}

                {/* Road */}
                <div className="absolute bottom-8 left-0 right-0">
                  {/* Road surface */}
                  <div className="text-gray-600 text-xs text-center">
                    <pre className="leading-tight">
{`================================
================================`}
                    </pre>
                  </div>
                  
                  {/* Road lines */}
                  <div className="absolute top-1 left-0 right-0 text-yellow-300 text-xs">
                    {roadLines.map((line, i) => (
                      <span
                        key={i}
                        className="absolute transition-all duration-100"
                        style={{ left: `${line.x}%` }}
                      >
                        ----
                      </span>
                    ))}
                  </div>
                </div>

                {/* Grass/Ground */}
                <div className="absolute bottom-0 left-0 right-0 text-green-700 text-xs opacity-60 text-center">
                  <pre className="leading-tight">
{`"'.,'"'.,'"'.,'"'.,'"'.,'"'.,'"'.,'"'
.,'"'.,'"'.,'"'.,'"'.,'"'.,'"'.,'"'.,"'`}
                  </pre>
                </div>

                {/* Small flowers on grass */}
                <div className="absolute bottom-2 left-[15%] text-red-400 text-xs">@</div>
                <div className="absolute bottom-3 left-[25%] text-yellow-400 text-xs">*</div>
                <div className="absolute bottom-2 right-[20%] text-pink-400 text-xs">@</div>
                <div className="absolute bottom-3 right-[30%] text-purple-400 text-xs">*</div>
                <div className="absolute bottom-2 left-[45%] text-yellow-400 text-xs">@</div>
                <div className="absolute bottom-3 right-[45%] text-red-400 text-xs">*</div>
              </div>
            </div>

            {/* Right Side - Info */}
            <div className="space-y-6 sm:space-y-8 text-green-400">
              {/* Info Box */}
              <div className="text-sm sm:text-base space-y-2 sm:space-y-3 bg-[#16161e] p-4 sm:p-6 rounded-lg border border-green-500/30 shadow-lg shadow-green-500/5">
                <p><span className="text-yellow-400">Role:</span> Android Developer</p>
                <p><span className="text-yellow-400">Location:</span> Surakarta, Indonesia</p>
                <p><span className="text-yellow-400">Status:</span> <span className="text-green-500 animate-pulse">● Available for projects</span></p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6">
                <div className="text-center p-3 sm:p-4 bg-[#16161e] rounded-lg border border-green-500/20 hover:border-green-500/40 transition-colors">
                  <div className="text-2xl sm:text-3xl lg:text-4xl text-cyan-400 font-bold">10+</div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-400 mt-1">Projects</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-[#16161e] rounded-lg border border-green-500/20 hover:border-green-500/40 transition-colors">
                  <div className="text-2xl sm:text-3xl lg:text-4xl text-cyan-400 font-bold">1+</div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-400 mt-1">Years</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-[#16161e] rounded-lg border border-green-500/20 hover:border-green-500/40 transition-colors">
                  <div className="text-2xl sm:text-3xl lg:text-4xl text-cyan-400 font-bold">12+</div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-400 mt-1">Tech Stack</div>
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div>
                <div className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {['Flutter', 'Dart', 'Laravel', 'PHP', 'Python', 'R', 'Azure', 'Gemini API', 'Supabase', 'MySQL'].map((tech) => (
                    <span key={tech} className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs bg-[#16161e] border border-green-500/30 rounded text-green-400 hover:bg-green-500/10 hover:border-green-500/50 transition-all cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Indicator */}
      <div
        className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex flex-col items-center gap-2 text-green-400"
        style={{
          opacity: 1 - swipeProgress,
        }}
      >
        <span className="text-xs sm:text-sm">
          {isReadyToSwipe ? '↓ Release to enter ↓' : '↓ Scroll down to continue ↓'}
        </span>
        <svg 
          className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          style={{
            transform: `translateY(${swipeProgress * 30}px)`,
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#16161e]">
        <div
          className="h-full bg-green-500 transition-all duration-100"
          style={{ width: `${swipeProgress * 100}%` }}
        />
      </div>
    </div>
  );
};

export default TerminalSplash;
