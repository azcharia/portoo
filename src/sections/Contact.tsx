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
      className="relative py-24 lg:py-32 bg-[#010101] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-[#d3e865]/5 blur-3xl" />
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
            <span className="text-[#d3e865] text-sm font-medium tracking-wider uppercase">
              Get In Touch
            </span>
            <h2 className="font-['Bebas_Neue'] text-5xl lg:text-7xl text-white mt-2">
              LET'S <span className="gradient-text">COLLABORATE</span>
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
                    className={`flex items-center gap-4 p-5 rounded-xl bg-[#181818] border border-white/5 hover:border-[#d3e865]/30 transition-all duration-300 group ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#d3e865]/10 flex items-center justify-center group-hover:bg-[#d3e865]/20 transition-colors">
                      <item.icon size={24} className="text-[#d3e865]" />
                    </div>
                    <div>
                      <div className="text-sm text-[#b6b6b6]">{item.label}</div>
                      <div className="text-white font-medium group-hover:text-[#d3e865] transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Ikuti Saya</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`w-12 h-12 rounded-xl bg-[#181818] border border-white/10 flex items-center justify-center text-[#b6b6b6] hover:text-[#d3e865] hover:border-[#d3e865]/30 transition-all duration-300 hover:scale-110 ${
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
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm text-white">Available for freelance projects</span>
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
                    <label className="block text-sm text-[#b6b6b6] mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white placeholder-[#666] focus:border-[#d3e865] focus:outline-none transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#b6b6b6] mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white placeholder-[#666] focus:border-[#d3e865] focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#b6b6b6] mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white placeholder-[#666] focus:border-[#d3e865] focus:outline-none transition-colors"
                    placeholder="Message subject"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#b6b6b6] mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-white/10 text-white placeholder-[#666] focus:border-[#d3e865] focus:outline-none transition-colors resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all ${
                    isSubmitted
                      ? 'bg-green-500 text-white'
                      : 'bg-[#d3e865] text-[#010101] hover:shadow-[0_0_30px_rgba(211,232,101,0.4)]'
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
