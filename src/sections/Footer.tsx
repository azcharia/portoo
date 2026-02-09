import { Heart, ArrowUp, Code2 } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigasi: [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Skills', href: '#skills' },
      { name: 'Projects', href: '#projects' },
    ],
    sosial: [
      { name: 'GitHub', href: 'https://github.com/azcharia' },
      { name: 'Instagram', href: 'https://www.instagram.com/azcharia/' },
    ],
    kontak: [
      { name: 'naufal.putra50@gmail.com', href: 'mailto:naufal.putra50@gmail.com' },
      { name: '+62 812-2985-3525', href: 'tel:+6281229853525' },
      { name: 'Surakarta, Indonesia', href: '#' },
    ],
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#010101] border-t border-white/5">
      {/* Large CTA Text */}
      <div className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="font-['Bebas_Neue'] text-[15vw] lg:text-[20vw] text-white/[0.02] whitespace-nowrap select-none">
            GET IN TOUCH
          </h2>
        </div>

        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="font-['Bebas_Neue'] text-4xl lg:text-6xl text-white mb-4">
              READY TO JOIN{' '}
              <span className="gradient-text">MY TEAM?</span>
            </h3>
            <p className="text-[#b6b6b6] max-w-xl mx-auto mb-8">
              I'm always open to new opportunities, interesting collaborations, 
              or just chatting about technology.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#d3e865] text-[#010101] font-semibold rounded-full hover:shadow-[0_0_30px_rgba(211,232,101,0.4)] transition-all"
            >
              Start Conversation
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full px-6 lg:px-12 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#d3e865] flex items-center justify-center">
                  <Code2 size={24} className="text-[#010101]" />
                </div>
                <span className="font-['Bebas_Neue'] text-2xl text-white tracking-wider">
                  PORTFOLIO
                </span>
              </div>
              <p className="text-sm text-[#b6b6b6] leading-relaxed">
                Information Systems student passionate about building innovative mobile applications with Flutter and exploring AI integration.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-white font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                {footerLinks.navigasi.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-[#b6b6b6] hover:text-[#d3e865] transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-white font-semibold mb-4">Social</h4>
              <ul className="space-y-2">
                {footerLinks.sosial.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-[#b6b6b6] hover:text-[#d3e865] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                {footerLinks.kontak.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-[#b6b6b6] hover:text-[#d3e865] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-6 lg:px-12 py-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[#b6b6b6]">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
            <span>using Flutter, Laravel & React</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-sm text-[#b6b6b6]">
              © {currentYear} Naufal Azaria. All rights reserved.
            </span>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-[#b6b6b6] hover:bg-[#d3e865] hover:text-[#010101] hover:border-[#d3e865] transition-all"
              title="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
