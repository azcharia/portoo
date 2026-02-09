import { useEffect, useRef, useState } from 'react';
import { 
  Code2, 
  Database, 
  Layout, 
  Smartphone, 
  Cloud, 
  GitBranch,
  Terminal
} from 'lucide-react';

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const skillCategories = [
    {
      title: 'Languages & Frameworks',
      icon: Smartphone,
      skills: [
        { name: 'Flutter', level: 85 },
        { name: 'Dart', level: 85 },
        { name: 'Laravel', level: 75 },
        { name: 'PHP', level: 75 },
        { name: 'Python', level: 70 },
        { name: 'R', level: 65 },
      ],
    },
    {
      title: 'Backend & Databases',
      icon: Database,
      skills: [
        { name: 'API Integration', level: 80 },
        { name: 'Supabase', level: 80 },
        { name: 'MySQL', level: 80 },
        { name: 'REST API', level: 80 },
      ],
    },
    {
      title: 'Cloud & Deployment',
      icon: Cloud,
      skills: [
        { name: 'Microsoft Azure', level: 70 },
        { name: 'Cloud Functions', level: 65 },
        { name: 'Deployment', level: 75 },
      ],
    },
    {
      title: 'AI & Creative Tools',
      icon: Terminal,
      skills: [
        { name: 'Gemini API', level: 75 },
        { name: 'LoRA Model Training', level: 70 },
        { name: 'Adobe Premiere Pro', level: 80 },
        { name: 'Lightroom & Canva', level: 85 },
      ],
    },
  ];

  const techStack = [
    { name: 'Flutter', icon: '📱', color: '#02569B' },
    { name: 'Dart', icon: '🎯', color: '#0175C2' },
    { name: 'Laravel', icon: '🔴', color: '#FF2D20' },
    { name: 'Python', icon: '🐍', color: '#3776AB' },
    { name: 'Azure', icon: '☁️', color: '#0078D4' },
    { name: 'Gemini AI', icon: '🤖', color: '#4285F4' },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#010101] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#d3e865]/5 blur-3xl" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div 
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-[#d3e865] text-sm font-medium tracking-wider uppercase">
              Skills
            </span>
            <h2 className="font-['Bebas_Neue'] text-5xl lg:text-7xl text-white mt-2">
              SKILL <span className="gradient-text">SET</span>
            </h2>
            <p className="text-[#b6b6b6] mt-4 max-w-2xl mx-auto">
              Teknologi dan tools yang telah saya kuasai untuk mengembangkan aplikasi berkualitas tinggi dan solusi inovatif.
            </p>
          </div>

          {/* Tech Stack Icons */}
          <div 
            className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="group flex items-center gap-3 px-6 py-3 rounded-full bg-[#181818] border border-white/10 hover:border-[#d3e865]/50 transition-all duration-300 hover:scale-105"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span className="text-2xl">{tech.icon}</span>
                <span className="text-white font-medium">{tech.name}</span>
              </div>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {skillCategories.map((category, catIndex) => (
              <div
                key={category.title}
                className={`p-6 lg:p-8 rounded-2xl bg-[#181818] border border-white/5 hover:border-[#d3e865]/20 transition-all duration-500 card-glow ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + catIndex * 100}ms` }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#d3e865]/10 flex items-center justify-center">
                    <category.icon size={24} className="text-[#d3e865]" />
                  </div>
                  <h3 className="font-['Bebas_Neue'] text-2xl text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-[#d3e865] text-sm">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div
                          className="skill-bar-fill"
                          style={{
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${500 + catIndex * 100 + skillIndex * 100}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div 
            className={`mt-12 grid sm:grid-cols-3 gap-6 transition-all duration-700 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center p-6 rounded-xl bg-[#181818] border border-white/5">
              <Code2 size={32} className="text-[#d3e865] mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-1">Clean Code</h4>
              <p className="text-sm text-[#b6b6b6]">Mengikuti prinsip SOLID dan best practices</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-[#181818] border border-white/5">
              <GitBranch size={32} className="text-[#d3e865] mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-1">Project Management</h4>
              <p className="text-sm text-[#b6b6b6]">Kepemimpinan tim dan technical writing</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-[#181818] border border-white/5">
              <Cloud size={32} className="text-[#d3e865] mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-1">Cloud Integration</h4>
              <p className="text-sm text-[#b6b6b6]">Azure, Supabase, dan cloud deployment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
