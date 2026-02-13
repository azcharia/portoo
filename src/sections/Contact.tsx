import { useEffect, useRef, useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Instagram,
  CheckCircle
} from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'naufal.putra50@gmail.com', href: 'mailto:naufal.putra50@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+62 812-2985-3525', href: 'https://wa.me/6281229853525' },
    { icon: MapPin, label: 'Location', value: 'Surakarta, Indonesia', href: 'https://maps.google.com/?q=Surakarta,Indonesia' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/azcharia', color: '#333' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/azcharia/', color: '#E4405F' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#1a1b26] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-[#00ff41]/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#181818]/30 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div 
            className={`text-center mb-16 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-[#00ff41] text-sm font-medium tracking-wider uppercase font-mono">
              Get In Touch
            </span>
            <h2 className="font-['Bebas_Neue'] text-5xl lg:text-7xl text-white mt-2">
              LET'S <span className="gradient-text-terminal">COLLABORATE</span>
            </h2>
            <p className="text-[#b6b6b6] mt-4 max-w-2xl mx-auto">
              Have an interesting project idea? Or want to discuss technology? Feel free to reach out to me!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Contact Info */}
            <div 
              className={`space-y-8 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-4 p-5 rounded-xl bg-[#181818] border border-white/5 hover:border-[#00ff41]/30 transition-all duration-300 group ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#00ff41]/10 flex items-center justify-center group-hover:bg-[#00ff41]/20 transition-colors">
                      <item.icon size={24} className="text-[#00ff41]" />
                    </div>
                    <div>
                      <div className="text-sm text-[#b6b6b6] font-mono">{item.label}</div>
                      <div className="text-white font-medium group-hover:text-[#00ff41] transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-white font-semibold mb-4 font-mono">Ikuti Saya</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`w-12 h-12 rounded-xl bg-[#181818] border border-white/10 flex items-center justify-center text-[#b6b6b6] hover:text-[#00ff41] hover:border-[#00ff41]/30 transition-all duration-300 hover:scale-110 ${
                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                      }`}
                      style={{ transitionDelay: `${600 + index * 50}ms` }}
                      title={social.label}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[#181818] border border-white/10">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff41] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff41]"></span>
                </span>
                <span className="text-sm text-white font-mono">Available for freelance projects</span>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div 
              className={`transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-[#b6b6b6] mb-2 font-mono">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white placeholder-[#666] focus:border-[#00ff41] focus:outline-none transition-colors font-mono"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#b6b6b6] mb-2 font-mono">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white placeholder-[#666] focus:border-[#00ff41] focus:outline-none transition-colors font-mono"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#b6b6b6] mb-2 font-mono">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white placeholder-[#666] focus:border-[#00ff41] focus:outline-none transition-colors font-mono"
                    placeholder="Message subject"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#b6b6b6] mb-2 font-mono">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white placeholder-[#666] focus:border-[#00ff41] focus:outline-none transition-colors resize-none font-mono"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all font-mono ${
                    isSubmitted
                      ? 'bg-[#00ff41] text-[#1a1b26]'
                      : 'bg-[#00ff41] text-[#1a1b26] hover:shadow-[0_0_30px_rgba(0,255,65,0.4)]'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle size={20} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
