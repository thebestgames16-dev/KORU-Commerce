import React, { useEffect, useState } from 'react';
import Cursor from './components/Cursor';
import SmoothScroll from './components/SmoothScroll';
import HeroCanvas from './components/HeroCanvas';
import ServiceCard from './components/ServiceCard';
import AnimatedCounter from './components/AnimatedCounter';
import { Download, MonitorSmartphone, Search, PenTool, LayoutTemplate, Share2, Rocket, ArrowRight, Menu, X, Check, Star, MessageSquare } from 'lucide-react';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const LogoSvg = () => (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5L89.5 27.5V72.5L50 95L10.5 72.5V27.5L50 5Z" stroke="#C8A84B" strokeWidth="4"/>
      <path d="M40 35V65M40 50L60 35M40 50L60 65" stroke="#C8A84B" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  );

  return (
    <>
      <Cursor />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-[32px] backdrop-blur-[10px] bg-[#060606]/80 border-b border-[#C8A84B]/10' : 'py-[32px] bg-transparent'}`}>
        <div className="container mx-auto px-[64px] max-w-7xl flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 relative z-50">
            <LogoSvg />
            <span className="font-bebas text-[20px] tracking-[2px] text-white hidden sm:block">KORU COMMERCE</span>
          </a>
          
          <div className="hidden md:flex items-center gap-[40px]">
            <a href="#leistungen" className="font-dm-sans text-[13px] font-medium tracking-[2px] uppercase text-white/70 hover:text-white transition-colors">Leistungen</a>
            <a href="#projekte" className="font-dm-sans text-[13px] font-medium tracking-[2px] uppercase text-white/70 hover:text-white transition-colors">Projekte</a>
            <a href="#ueber-uns" className="font-dm-sans text-[13px] font-medium tracking-[2px] uppercase text-white/70 hover:text-white transition-colors">Über uns</a>
            <a href="#kontakt" className="font-dm-sans text-[13px] font-medium tracking-[2px] uppercase text-white/70 hover:text-white transition-colors">Kontakt</a>
          </div>
          
          <div className="hidden md:block">
            <a href="#kontakt" className="px-[24px] py-[12px] border border-[#C8A84B] text-[#C8A84B] font-dm-sans text-[12px] uppercase tracking-[1px] hover:bg-[#C8A84B] hover:text-[#060606] transition-all duration-300">
              Projekt starten
            </a>
          </div>

          <button className="md:hidden relative z-50 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#060606] z-40 flex flex-col items-center justify-center transition-all duration-500 origin-top ${mobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}>
        <div className="flex flex-col items-center gap-8">
          <a href="#leistungen" onClick={() => setMobileMenuOpen(false)} className="font-bebas text-5xl hover:text-[#C8A84B] transition-colors text-white">Leistungen</a>
          <a href="#projekte" onClick={() => setMobileMenuOpen(false)} className="font-bebas text-5xl hover:text-[#C8A84B] transition-colors text-white">Projekte</a>
          <a href="#ueber-uns" onClick={() => setMobileMenuOpen(false)} className="font-bebas text-5xl hover:text-[#C8A84B] transition-colors text-white">Über uns</a>
          <a href="#kontakt" onClick={() => setMobileMenuOpen(false)} className="font-bebas text-5xl hover:text-[#C8A84B] transition-colors text-white">Kontakt</a>
        </div>
      </div>

      <SmoothScroll>
        
        {/* HEAD: React fragment wrapping content */}
        
        {/* HERO SECTION */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_80%_20%,#1a1a1a_0%,#060606_60%)]">
          <HeroCanvas />
          <div className="relative z-10 text-center px-[64px] max-w-[800px] mx-auto pointer-events-none mt-20">
            <div className="mb-[24px] reveal-on-scroll">
              <span className="text-[#C8A84B] font-dm-mono text-[12px] tracking-[6px] uppercase block">WEB DESIGN · REUTLINGEN</span>
            </div>
            
            <h1 className="font-bebas text-[96px] sm:text-[96px] leading-[0.9] uppercase mb-[32px] reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
              <span className="block text-white">Wir bauen<br/>Websites</span>
              <span className="block text-transparent" style={{ WebkitTextStroke: '1px #C8A84B' }}>die verkaufen.</span>
            </h1>
            
            <p className="font-cormorant italic text-[22px] text-gray-300 max-w-[500px] mx-auto mb-[48px] leading-[1.4] reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
              KORU Commerce verwandelt deine Online-Präsenz in deinen stärksten Vertriebsmitarbeiter.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-[24px] reveal-on-scroll pointer-events-auto" style={{ transitionDelay: '300ms' }}>
              <a href="#kontakt" className="px-[40px] py-[18px] bg-[#C8A84B] text-[#060606] font-bold text-[14px] uppercase tracking-[2px] border-none hover:bg-white transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center gap-2">
                Projekt starten <ArrowRight size={18} />
              </a>
              <a href="#projekte" className="px-[40px] py-[18px] border border-white/20 text-white font-normal text-[14px] uppercase tracking-normal bg-transparent hover:border-[#C8A84B] hover:text-[#C8A84B] transition-all duration-300 w-full sm:w-auto text-center">
                Unsere Arbeit &darr;
              </a>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 reveal-on-scroll" style={{ transitionDelay: '500ms' }}>
            <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#C8A84B] to-transparent relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1/2 bg-[#C8A84B] animate-[slideDown_1.5s_infinite]"></div>
            </div>
          </div>
          <style>{`
            @keyframes slideDown {
              0% { transform: translateY(-100%); opacity: 0; }
              50% { opacity: 1; }
              100% { transform: translateY(200%); opacity: 0; }
            }
          `}</style>
        </section>

        {/* TRUST BAND (TICKER) */}
        <div className="bg-[#111111] py-[20px] border-y border-[#333333] overflow-hidden">
          <div className="ticker-track">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center whitespace-nowrap px-4 text-[#C8A84B] uppercase tracking-[4px] font-dm-sans text-[14px]">
                ✦ WEBDESIGN ✦ SEO ✦ BRANDING ✦ STRATEGIE ✦ CONVERSION
              </div>
            ))}
          </div>
        </div>

        {/* LEISTUNGEN */}
        <section id="leistungen" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="mb-20 text-center reveal-on-scroll">
            <h2 className="font-bebas text-6xl md:text-8xl tracking-tight mb-4 text-white">Unsere <span className="text-[#333333] italic ml-2">Leistungen</span></h2>
            <div className="h-[1px] w-24 bg-[#C8A84B] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard 
              title="Webdesign & Entwicklung"
              description="Individuelle High-Performance Websites, die Marken erlebbar machen und Nutzer fesseln."
              icon={<MonitorSmartphone />}
            />
            <ServiceCard 
              title="SEO & Sichtbarkeit"
              description="Datengetriebene Optimierung, damit du bei Google ganz oben stehst und lokal dominierst."
              icon={<Search />}
            />
            <ServiceCard 
              title="Branding & Logo"
              description="Auszug aus der Masse mit einem Brand-Design, das exakt den Kern deines Unternehmens trifft."
              icon={<PenTool />}
            />
            <ServiceCard 
              title="Digitale Strategie"
              description="Wir analysieren, planen und setzen Strategien um, die deinen Umsatz langfristig steigern."
              icon={<LayoutTemplate />}
            />
            <ServiceCard 
              title="Conversion Optimierung"
              description="Vom Besucher zum Kunden: Mit A/B-Tests und UX-Verfeinerung maximieren wir deine Abschlussrate."
              icon={<Rocket />}
            />
            <ServiceCard 
              title="Social Media & Content"
              description="Wir erstellen zielgruppengerechten Content, der Vertrauen aufbaut und Communitys wachsen lässt."
              icon={<Share2 />}
            />
          </div>
        </section>

        {/* ÜBER KORU COMMERCE */}
        <section id="ueber-uns" className="py-32 bg-[#111111] relative overflow-hidden">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              
              <div className="flex-1 w-full relative reveal-on-scroll">
                <div className="absolute inset-0 translate-x-4 translate-y-4 border border-[#C8A84B] z-0"></div>
                <div className="relative z-10 w-full aspect-[4/5] bg-[#1a1a1a] overflow-hidden grayscale hover:grayscale-0 transition duration-700 pointer-events-auto group">
                   <img src="https://raw.githubusercontent.com/thebestgames16-dev/KORU-Commerce/main/IMG_6198.webp" alt="Agency Office" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity transform group-hover:scale-105 duration-700" referrerPolicy="no-referrer" />
                   <div className="absolute bottom-6 left-6 right-6 p-6 bg-[#060606]/90 backdrop-blur border-l-4 border-[#C8A84B]">
                     <h4 className="font-bebas text-3xl mb-1 text-white">Abdulazeez Ali</h4>
                     <p className="font-dm-mono text-sm text-[#C8A84B] uppercase tracking-wider">Inhaber & Gründer</p>
                   </div>
                </div>
              </div>
              
              <div className="flex-1">
                <h2 className="font-bebas text-6xl md:text-8xl tracking-tight mb-8 reveal-on-scroll">The KORU <br/> <span className="text-[#C8A84B]">Difference</span></h2>
                
                <p className="font-cormorant text-2xl font-light text-gray-300 leading-relaxed mb-10 reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
                  Wir sind nicht die typische Agentur von nebenan. KORU Commerce steht für kompromisslose Ästhetik und eiskalte Performance. Wir helfen regionalen Unternehmen im Raum Baden-Württemberg, sich online unverwechselbar zu positionieren.
                </p>
                
                <div className="space-y-6 mb-16 reveal-on-scroll" style={{ transitionDelay: "200ms" }}>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#C8A84B]/10 flex items-center justify-center text-[#C8A84B]">
                      <Check size={18} />
                    </div>
                    <span className="font-dm-sans text-lg text-white font-medium">Bespoke Design (Keine Templates)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#C8A84B]/10 flex items-center justify-center text-[#C8A84B]">
                      <Check size={18} />
                    </div>
                    <span className="font-dm-sans text-lg text-white font-medium">Umsatzfokussierte Strategien</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#C8A84B]/10 flex items-center justify-center text-[#C8A84B]">
                      <Check size={18} />
                    </div>
                    <span className="font-dm-sans text-lg text-white font-medium">Transparente Kommunikation</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-8 py-8 border-t border-[#333333] reveal-on-scroll" style={{ transitionDelay: "300ms" }}>
                  <div className="flex flex-col gap-1">
                    <div className="font-bebas text-[24px] text-[#C8A84B]"><AnimatedCounter end={50} suffix="+" /></div>
                    <div className="font-dm-mono text-[10px] text-[#888888] uppercase tracking-[1px]">Projekte</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-bebas text-[24px] text-[#C8A84B]"><AnimatedCounter end={98} suffix="%" /></div>
                    <div className="font-dm-mono text-[10px] text-[#888888] uppercase tracking-[1px]">Zufriedenheit</div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-bebas text-[24px] text-[#C8A84B]"><AnimatedCounter end={5} suffix=" J." /></div>
                    <div className="font-dm-mono text-[10px] text-[#888888] uppercase tracking-[1px]">Erfahrung</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* PROZESS */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
           <div className="mb-20 text-center reveal-on-scroll">
            <h2 className="font-bebas text-6xl md:text-8xl tracking-tight mb-4 text-white">Unser <span className="text-[#333333] italic ml-2">Prozess</span></h2>
            <div className="h-[1px] w-24 bg-[#C8A84B] mx-auto"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[60px] left-8 right-8 h-[1px] bg-[#333333] z-0"></div>

            {[{
              num: "01",
              title: "Discovery Call",
              desc: "Wir lernen uns kennen, analysieren deinen Status Quo und definieren die exakten Ziele für dein Wachstum."
            },{
              num: "02",
              title: "Konzept & Design",
              desc: "Wir kreieren ein visionäres Figma-Layout, das deine Marke perfekt in Szene setzt und User führt."
            },{
              num: "03",
              title: "Entwicklung",
              desc: "Pixel-perfekte Umsetzung mit modernstem Tech-Stack. Schnell, sicher, responsive und suchmaschinenoptimiert."
            },{
              num: "04",
              title: "Launch & Wachstum",
              desc: "Wir bringen das Projekt live. Doch hier fängt es erst an: Mit SEO & Wartung sorgen wir für stete Skalierung."
            }].map((step, idx) => (
              <div key={idx} className="flex-1 relative z-10 perspective-container reveal-on-scroll group" style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="mb-8 relative w-[120px] h-[120px] mx-auto md:mx-0 preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
                   {/* Front Face */}
                   <div className="backface-hidden absolute inset-0 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-[#111111] fill-current stroke-[#333333] stroke-1">
                        <path d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z" />
                      </svg>
                      <span className="absolute font-bebas text-4xl text-[#C8A84B]">{step.num}</span>
                   </div>
                   {/* Back Face */}
                   <div className="backface-hidden absolute inset-0 flex items-center justify-center [transform:rotateY(180deg)]">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-[#C8A84B]/10 fill-current stroke-[#C8A84B] stroke-2">
                        <path d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z" />
                      </svg>
                      <span className="absolute font-bebas text-4xl text-[#C8A84B]"><Check size={32} /></span>
                   </div>
                </div>
                
                <h4 className="font-bebas text-2xl mb-4 text-center md:text-left text-white">{step.title}</h4>
                <p className="font-dm-sans text-sm text-gray-400 leading-relaxed text-center md:text-left">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* REFERENZEN / PROJEKTE */}
        <section id="projekte" className="py-32 bg-[#0a0a0a]">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 reveal-on-scroll">
              <div>
                <h2 className="font-bebas text-6xl md:text-8xl tracking-tight mb-4 text-white">Ausgewählte <br/><span className="text-[#333333] italic">Arbeiten</span></h2>
              </div>
            </div>

            <div className="w-full border border-[#333333] bg-[#111111] p-16 md:p-32 text-center reveal-on-scroll relative overflow-hidden group pointer-events-auto">
              <div className="absolute inset-0 bg-gradient-to-b from-[#C8A84B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="absolute top-[-50%] left-[50%] -translate-x-1/2 w-64 h-64 bg-[#C8A84B]/10 rounded-full blur-[80px]"></div>

              <h3 className="font-bebas text-5xl md:text-6xl text-white mb-6 relative z-10 leading-[0.9] uppercase">Unsere ersten Projekte<br/>entstehen gerade.</h3>
              <p className="font-cormorant text-2xl md:text-4xl text-[#C8A84B] italic relative z-10 mb-12">Sei dabei von Anfang an.</p>
              
              <div className="relative z-10">
                <a href="#kontakt" className="inline-flex items-center gap-4 px-[40px] py-[18px] bg-[#C8A84B] text-[#060606] font-bold text-[14px] uppercase tracking-[2px] border-none hover:bg-white transition-all duration-300">
                  Projekt starten <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { text: "KORU hat unsere Vision nicht nur umgesetzt, sondern auf ein Level gehoben, das wir uns nicht vorstellen konnten. Die Conversion-Rate ist um 45% gestiegen.", name: "Markus D.", role: "CEO, TechFlow GmbH" },
              { text: "Die Kombination aus technischer Perfektion und diesem unglaublich guten, cleanen Design ist in der Region Stuttgart einzigartig. Absolute Empfehlung.", name: "Sarah W.", role: "Gründerin, Maison Studio" },
              { text: "Endlich eine Agentur, die nicht nur schöne Bilder malt, sondern echten messbaren Umsatz bringt. Die Kommunikation mit Abdulazeez war immer on point.", name: "Jonas K.", role: "Inhaber, KFZ-Leitner" }
            ].map((testi, idx) => (
              <div key={idx} className="reveal-on-scroll relative pt-12" style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="absolute top-0 left-0 text-[#C8A84B]/20 font-serif text-[120px] leading-none select-none">"</div>
                <div className="flex gap-1 mb-6 mt-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-[#C8A84B] text-[#C8A84B]" />)}
                </div>
                <p className="font-cormorant text-xl text-gray-300 mb-8 italic">"{testi.text}"</p>
                <div className="border-t border-[#333333] pt-6 uppercase">
                  <h5 className="font-dm-sans font-bold text-white text-sm tracking-wider mb-1">{testi.name}</h5>
                  <p className="font-dm-mono text-xs text-[#C8A84B] tracking-widest">{testi.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* KONTAKT CTA Sektion */}
        <section id="kontakt" className="py-32 relative bg-[#050505] overflow-hidden">
          {/* Subtle animated background (CSS driven) */}
          <div className="absolute inset-0 z-0 opacity-20">
             <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#C8A84B] mix-blend-screen filter blur-[120px] animate-[pulse_10s_ease-in-out_infinite]"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#E8C96B] mix-blend-screen filter blur-[120px] animate-[pulse_15s_ease-in-out_infinite]"></div>
          </div>
          
          <div className="container mx-auto px-6 max-w-5xl relative z-10 pointer-events-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 item-center">
              <div className="reveal-on-scroll">
                <h2 className="font-bebas text-[10vw] md:text-8xl leading-[0.8] mb-8 text-white">
                  Bereit <br/><span className="text-[#C8A84B]">durchzustarten?</span>
                </h2>
                <p className="font-dm-sans text-gray-400 text-lg mb-10 leading-relaxed max-w-sm">
                  Lass uns dein nächstes Projekt besprechen. Ob komplettes Re-Design, SEO-Strategie oder Conversion-Optimierung.
                </p>
                
                <a href="#" className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-dm-sans font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(37,211,102,0.3)]">
                  <MessageSquare size={20} /> Via WhatsApp chatten
                </a>
              </div>
              
              <div className="bg-[#111111] p-8 md:p-12 border border-[#333333] reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                <form className="flex flex-col gap-6">
                   <div className="flex flex-col gap-2">
                     <label className="font-dm-mono text-xs uppercase tracking-widest text-[#888888]">Name</label>
                     <input type="text" className="bg-transparent border-b border-[#333333] py-2 text-white focus:outline-none focus:border-[#C8A84B] transition-colors font-dm-sans placeholder-[#333333]" placeholder="Max Mustermann" />
                   </div>
                   <div className="flex flex-col gap-2">
                     <label className="font-dm-mono text-xs uppercase tracking-widest text-[#888888]">E-Mail</label>
                     <input type="email" className="bg-transparent border-b border-[#333333] py-2 text-white focus:outline-none focus:border-[#C8A84B] transition-colors font-dm-sans placeholder-[#333333]" placeholder="max@firma.de" />
                   </div>
                   <div className="flex flex-col gap-2">
                     <label className="font-dm-mono text-xs uppercase tracking-widest text-[#888888]">Nachricht</label>
                     <textarea rows={3} className="bg-transparent border-b border-[#333333] py-2 text-white focus:outline-none focus:border-[#C8A84B] transition-colors font-dm-sans resize-none placeholder-[#333333]" placeholder="Hi KORU Team, wir brauchen..."></textarea>
                   </div>
                   <button type="button" className="mt-4 px-8 py-4 bg-white text-[#060606] font-dm-sans font-medium uppercase tracking-wider hover:bg-[#C8A84B] transition-colors duration-300">
                     Anfrage Senden
                   </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#060606] border-t border-[#111111] py-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
              <div>
                <a href="#" className="flex items-center gap-3 mb-6">
                  <LogoSvg />
                  <span className="font-bebas text-3xl tracking-wider text-white">KORU Commerce</span>
                </a>
                <p className="font-dm-sans text-[#888888] text-sm max-w-xs">
                  Die Web Design & Digital Agentur in Reutlingen für messbares Wachstum und exzellentes Design.
                </p>
              </div>
              
              <div className="flex gap-16">
                <div className="flex flex-col gap-4 pointer-events-auto">
                  <h6 className="font-dm-mono text-xs uppercase tracking-widest text-white mb-2">Menü</h6>
                  <a href="#leistungen" className="font-dm-sans text-sm text-[#888888] hover:text-[#C8A84B] transition-colors">Leistungen</a>
                  <a href="#projekte" className="font-dm-sans text-sm text-[#888888] hover:text-[#C8A84B] transition-colors">Projekte</a>
                  <a href="#ueber-uns" className="font-dm-sans text-sm text-[#888888] hover:text-[#C8A84B] transition-colors">Über uns</a>
                </div>
                
                <div className="flex flex-col gap-4 pointer-events-auto">
                  <h6 className="font-dm-mono text-xs uppercase tracking-widest text-white mb-2">Social</h6>
                  <a href="#" className="font-dm-sans text-sm text-[#888888] hover:text-[#C8A84B] transition-colors">LinkedIn</a>
                  <a href="#" className="font-dm-sans text-sm text-[#888888] hover:text-[#C8A84B] transition-colors">Instagram</a>
                  <a href="#" className="font-dm-sans text-sm text-[#888888] hover:text-[#C8A84B] transition-colors">Awwwards</a>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#111111] gap-4">
              <span className="font-dm-mono text-xs text-[#333333]">© 2026 KORU Commerce. All rights reserved.</span>
              <div className="flex gap-6 pointer-events-auto">
                <a href="#" className="font-dm-mono text-xs text-[#888888] hover:text-[#C8A84B]">Impressum</a>
                <a href="#" className="font-dm-mono text-xs text-[#888888] hover:text-[#C8A84B]">Datenschutz</a>
              </div>
            </div>
          </div>
        </footer>

      </SmoothScroll>
    </>
  );
}

