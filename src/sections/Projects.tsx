import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Chatty',
      subtitle: 'AI Companion App',
      description: 'Personal chat application with AI character "Akane" powered by Groq API + Kimi K2 for ultra-fast responses (<1 sec) with 256K context window. Features smart reminders, massive memory system, analytics dashboard, backup & restore, and user profile personalization.',
      image: '/images/chatty.png',
      tags: ['Flutter', 'Groq API', 'Kimi K2', 'Riverpod'],
      features: ['AI Chat', 'Smart Reminders', 'Memory System', 'Analytics Dashboard'],
      github: 'https://github.com/azcharia/chatty',
      demo: '#',
      color: '#EC4899',
    },
    {
      id: 2,
      title: 'Plant Watering Reminder',
      subtitle: 'AI-Powered Plant Care',
      description: 'Offline-first plant care management app with Gemini AI integration for personalized care recommendations. Features health scoring, smart notifications with quiet hours, analytics dashboard, achievement system, and multi-format backup (JSON/CSV) with bilingual support (EN/ID).',
      image: '/images/plantwateringreminder.png',
      tags: ['Flutter', 'Gemini AI', 'Offline-First', 'Riverpod'],
      features: ['AI Recommendations', 'Health Scoring', 'Smart Notifications', 'Multi-format Backup'],
      github: 'https://github.com/azcharia/plant-watering-reminder',
      demo: '#',
      color: '#10B981',
    },
    {
      id: 3,
      title: 'SIPENGO',
      subtitle: 'Village Data Management',
      description: 'Comprehensive census and family data management system for village administration. Features complete CRUD for family cards & residents, family tree visualization, photo documentation with cloud storage, Excel/PDF export, Google Maps integration, and real-time statistics dashboard.',
      image: '/images/sipengo.png',
      tags: ['Flutter', 'Supabase', 'Clean Architecture', 'Riverpod'],
      features: ['Family Tree', 'Cloud Storage', 'Export Excel/PDF', 'Google Maps Integration'],
      github: 'https://github.com/azcharia/sipengo',
      demo: '#',
      color: '#3B82F6',
    },
    {
      id: 4,
      title: 'Shoes Retail',
      subtitle: 'Nike E-Commerce App',
      description: 'Full-featured Nike shoe e-commerce application with product browsing, advanced search & filtering, shopping cart management, and detailed product views with size/color selection. Responsive design with offline support using mock data and modular features-based architecture.',
      image: '/images/shoesretail.png',
      tags: ['Flutter', 'E-Commerce', 'Modular Architecture', 'Offline Support'],
      features: ['Product Browsing', 'Search & Filter', 'Shopping Cart', 'Size/Color Selection'],
      github: 'https://github.com/azcharia/shoes-retail',
      demo: '#',
      color: '#F97316',
    },
  ];

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#1a1b26] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#181818]/50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#00ff41]/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div 
            className={`mb-16 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-[#00ff41] text-sm font-medium tracking-wider uppercase font-mono">
              Portfolio
            </span>
            <h2 className="font-['Bebas_Neue'] text-5xl lg:text-7xl text-white mt-2">
              MY <span className="gradient-text-terminal">PROJECTS</span>
            </h2>
            <p className="text-[#b6b6b6] mt-4 max-w-2xl">
              A selection of projects I've built during my studies and freelance work, showcasing my skills in mobile and web development.
            </p>
          </div>

          {/* Main Project Display */}
          <div 
            className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Project Image */}
            <div className="relative group">
              <div 
                className="relative overflow-hidden rounded-3xl border border-white/10"
                style={{ boxShadow: `0 0 60px ${projects[activeProject].color}20` }}
              >
                <img
                  src={projects[activeProject].image}
                  alt={projects[activeProject].title}
                  className="w-full aspect-[9/16] max-h-[600px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b26] via-transparent to-transparent opacity-60" />
                
                {/* Project Badge */}
                <div 
                  className="absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: `${projects[activeProject].color}20`,
                    color: projects[activeProject].color,
                    border: `1px solid ${projects[activeProject].color}40`
                  }}
                >
                  {projects[activeProject].subtitle}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevProject}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#181818]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-[#00ff41] hover:text-[#1a1b26] transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextProject}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#181818]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-[#00ff41] hover:text-[#1a1b26] transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Project Info */}
            <div className="space-y-6">
              <div>
                <h3 className="font-['Bebas_Neue'] text-4xl lg:text-5xl text-white mb-2">
                  {projects[activeProject].title}
                </h3>
                <p className="text-[#b6b6b6] text-lg leading-relaxed">
                  {projects[activeProject].description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {projects[activeProject].tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Features */}
              <div>
                <h4 className="text-white font-semibold mb-3 font-mono">Fitur Utama:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {projects[activeProject].features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-[#b6b6b6]"
                    >
                      <Star size={14} className="text-[#00ff41]" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <a
                  href={projects[activeProject].demo}
                  className="flex items-center gap-2 px-6 py-3 bg-[#00ff41] text-[#1a1b26] font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,255,65,0.4)] transition-all font-mono"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
                <a
                  href={projects[activeProject].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-full hover:border-[#00ff41] hover:text-[#00ff41] transition-all font-mono"
                >
                  <Github size={18} />
                  Source Code
                </a>
              </div>
            </div>
          </div>

          {/* Project Thumbnails */}
          <div 
            className={`flex justify-center gap-4 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(index)}
                className={`relative w-20 h-28 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  activeProject === index 
                    ? 'border-[#00ff41] scale-110' 
                    : 'border-white/10 opacity-50 hover:opacity-80'
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
