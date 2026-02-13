import { useEffect, useRef, useState } from 'react';
import { GraduationCap, MapPin, Calendar, Mail, User } from 'lucide-react';

const About = () => {
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

  const personalInfo = [
    { icon: User, label: 'Nama', value: 'Naufal Azaria' },
    { icon: Calendar, label: 'Umur', value: '26 Tahun' },
    { icon: MapPin, label: 'Lokasi', value: 'Surakarta, Indonesia' },
    { icon: GraduationCap, label: 'Status', value: 'Information Systems Student' },
    { icon: Mail, label: 'Email', value: 'naufal.putra50@gmail.com' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#1a1b26] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00ff41]/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#00ff41]/5 blur-3xl" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div 
            className={`mb-16 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-[#00ff41] text-sm font-medium tracking-wider uppercase font-mono">
              About Me
            </span>
            <h2 className="font-['Bebas_Neue'] text-5xl lg:text-7xl text-white mt-2">
              WHO <span className="gradient-text-terminal">AM I?</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Content */}
            <div 
              className={`space-y-8 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="space-y-6">
                <p className="text-lg text-[#b6b6b6] leading-relaxed">
                  Saya adalah seorang Information Systems student yang proaktif dan penasaran dengan track record akademik yang kuat serta kepemimpinan organisasi. Perjalanan saya di dunia teknologi dimulai dengan passion untuk membangun solusi inovatif yang menyelesaikan masalah dunia nyata.
                </p>
                <p className="text-lg text-[#b6b6b6] leading-relaxed">
                  Saya memiliki pengalaman hands-on dalam membangun dan mendeploy aplikasi Android dengan fokus pada pembuatan <span className="text-[#00ff41] font-medium">interface yang clean dan user-friendly</span>. Saya juga berpengalaman dengan backend development menggunakan Laravel dan PHP, serta integrasi dengan cloud services seperti <span className="text-[#00ff41] font-medium">Azure dan Supabase</span>.
                </p>
                <p className="text-lg text-[#b6b6b6] leading-relaxed">
                  Saat ini saya aktif mengerjakan berbagai project sambil menyelesaikan studi. Saya selalu terbuka untuk kolaborasi dan peluang baru di bidang teknologi, terutama dalam AI integration dan cloud technologies.
                </p>
              </div>

              {/* Personal Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {personalInfo.map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-4 p-4 rounded-xl bg-[#181818] border border-white/5 hover:border-[#00ff41]/30 transition-all duration-300 group ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#00ff41]/10 flex items-center justify-center group-hover:bg-[#00ff41]/20 transition-colors">
                      <item.icon size={20} className="text-[#00ff41]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#b6b6b6]">{item.label}</div>
                      <div className="text-sm text-white font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Visual */}
            <div 
              className={`relative transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              {/* Main Card */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-[#181818] to-[#0a0a0a] border border-white/10">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#00ff41]/20 blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-[#00ff41]/10 blur-2xl" />

                {/* Content */}
                <div className="relative space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#00ff41] flex items-center justify-center">
                      <GraduationCap size={32} className="text-[#1a1b26]" />
                    </div>
                    <div>
                      <h3 className="font-['Bebas_Neue'] text-2xl text-white">Education</h3>
                      <p className="text-[#b6b6b6]">Information Systems Student</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#1a1b26]/50 border border-white/5">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-white font-medium">Sistem Informasi</span>
                        <span className="text-xs text-[#00ff41] px-2 py-1 rounded-full bg-[#00ff41]/10 font-mono">
                          Sedang Berjalan
                        </span>
                      </div>
                      <p className="text-sm text-[#b6b6b6]">
                        Fokus pada pengembangan sistem, manajemen database, dan pengembangan aplikasi mobile dengan performa akademik yang kuat.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#1a1b26]/50 border border-white/5">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-white font-medium">Pengalaman</span>
                        <span className="text-xs text-[#00ff41] px-2 py-1 rounded-full bg-[#00ff41]/10 font-mono">
                          1+ Tahun
                        </span>
                      </div>
                      <p className="text-sm text-[#b6b6b6]">
                        Pengalaman praktis dalam membangun aplikasi mobile, backend services, dan integrasi AI dengan berbagai teknologi modern.
                      </p>
                    </div>
                  </div>

                  {/* Achievement Tags */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {['Kepemimpinan', 'Prestasi Akademik', 'Aktif Organisasi', 'Problem Solver'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/20 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-12 -right-8 p-6 rounded-2xl bg-[#181818] border border-white/10 shadow-xl">
                <div className="text-center">
                  <div className="font-['Bebas_Neue'] text-4xl text-[#00ff41]">26</div>
                  <div className="text-xs text-[#b6b6b6] font-mono">Years Old</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
