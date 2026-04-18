import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import HeroCanvas from './components/HeroCanvas';
import ServiceCard from './components/ServiceCard';
import AnimatedCounter from './components/AnimatedCounter';
import Footer, { LogoSvg } from './components/Footer';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import { MonitorSmartphone, Search, PenTool, LayoutTemplate, Share2, Rocket, ArrowRight, Menu, X, Check, MessageSquare } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

interface HomeProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Home({ mobileMenuOpen, setMobileMenuOpen }: HomeProps) {
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch('https://formspree.io/f/mjgjrgpw', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${scrolled ? 'py-6 bg-white/95 backdrop-blur-md border-b border-[#EBEBEB] shadow-[0_1px_2px_rgba(0,0,0,0.02)]' : 'py-8 bg-transparent'}`}>
        <div className="container mx-auto px-10 max-w-7xl flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 relative z-[1000]">
            <LogoSvg />
            <span className="font-bebas text-2xl tracking-widest text-[#111111] hidden sm:block">KORU COMMERCE</span>
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#leistungen" className="font-dm-sans text-sm font-medium tracking-widest uppercase text-[#111111] hover:text-[#C8A84B] transition-colors">Leistungen</a>
            <a href="#projekte" className="font-dm-sans text-sm font-medium tracking-widest uppercase text-[#111111] hover:text-[#C8A84B] transition-colors">Projekte</a>
            <a href="#ueber-uns" className="font-dm-sans text-sm font-medium tracking-widest uppercase text-[#111111] hover:text-[#C8A84B] transition-colors">Über uns</a>
            <a href="#kontakt" className="font-dm-sans text-sm font-medium tracking-widest uppercase text-[#111111] hover:text-[#C8A84B] transition-colors">Kontakt</a>
          </div>
          
          <div className="hidden md:block pointer-events-auto">
            <a href="#kontakt" className="px-6 py-3 border border-[#C8A84B] text-[#111111] font-dm-sans text-xs uppercase tracking-widest hover:bg-[#C8A84B] hover:text-white transition-all duration-300">
              Projekt starten
            </a>
          </div>

          <button 
            className="md:hidden relative z-[1000] text-[#111111] pointer-events-auto touch-manipulation" 
            style={{ touchAction: 'manipulation' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center bg-[#FFFFFF]">
        <HeroCanvas />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pointer-events-none mt-20">
          <div className="mb-6 reveal-on-scroll">
            <span className="text-[#888888] font-dm-mono text-sm tracking-[0.4em] uppercase block">Web Design · Reutlingen</span>
          </div>
          
          <h1 className="font-bebas text-7xl md:text-[120px] leading-[0.85] uppercase mb-10 tracking-[0.02em] text-[#111111] reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
            <span className="block">Wir bauen <span className="text-[#C8A84B]">Websites</span></span>
            <span className="block">die verkaufen.</span>
          </h1>
          
          <p className="font-cormorant italic text-2xl md:text-3xl text-[#888888] max-w-2xl mx-auto mb-16 leading-relaxed reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
            KORU Commerce verwandelt deine Online-Präsenz in deinen stärksten Vertriebsmitarbeiter.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 reveal-on-scroll pointer-events-auto" style={{ transitionDelay: '300ms' }}>
            <a href="#kontakt" className="px-10 py-5 border border-[#C8A84B] text-[#111111] font-dm-sans text-sm font-medium uppercase tracking-[0.15em] hover:bg-[#C8A84B] hover:text-white transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center gap-3">
              Projekt starten <ArrowRight size={18} />
            </a>
            <a href="#projekte" className="px-10 py-5 border border-transparent text-[#888888] font-dm-sans text-sm font-medium uppercase tracking-[0.15em] hover:text-[#111111] transition-all duration-300 w-full sm:w-auto text-center">
              Unsere Arbeit &darr;
            </a>
          </div>
        </div>
      </section>

      <div className="bg-[#FAFAF8] py-8 border-y border-[#EBEBEB] overflow-hidden">
        <div className="ticker-track">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center whitespace-nowrap px-6 text-[#111111] uppercase tracking-[0.3em] font-dm-sans font-light text-sm">
              <span className="text-[#C8A84B] mr-6">✦</span> WEBDESIGN <span className="text-[#EBEBEB] mx-6">|</span> SEO <span className="text-[#EBEBEB] mx-6">|</span> BRANDING <span className="text-[#EBEBEB] mx-6">|</span> STRATEGIE <span className="text-[#EBEBEB] mx-6">|</span> CONVERSION <span className="text-[#EBEBEB] mx-6">|</span>
            </div>
          ))}
        </div>
      </div>

      <section id="leistungen" className="py-40 px-6 max-w-7xl mx-auto bg-[#FFFFFF]">
        <div className="mb-24 text-center reveal-on-scroll">
          <h2 className="font-bebas text-6xl md:text-8xl tracking-widest mb-6 text-[#111111] uppercase">Unsere <span className="text-[#C8A84B]">Leistungen</span></h2>
          <div className="h-[1px] w-16 bg-[#C8A84B] mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard title="Webdesign & Entwicklung" description="Individuelle High-Performance Websites, die Marken erlebbar machen und Nutzer fesseln." icon={<MonitorSmartphone />} />
          <ServiceCard title="SEO & Sichtbarkeit" description="Datengetriebene Optimierung, damit du bei Google ganz oben stehst und lokal dominierst." icon={<Search />} />
          <ServiceCard title="Branding & Logo" description="Auszug aus der Masse mit einem Brand-Design, das exakt den Kern deines Unternehmens trifft." icon={<PenTool />} />
          <ServiceCard title="Digitale Strategie" description="Wir analysieren, planen und setzen Strategien um, die deinen Umsatz langfristig steigern." icon={<LayoutTemplate />} />
          <ServiceCard title="Conversion Optimierung" description="Vom Besucher zum Kunden: Mit A/B-Tests und UX-Verfeinerung maximieren wir deine Abschlussrate." icon={<Rocket />} />
          <ServiceCard title="Social Media & Content" description="Wir erstellen zielgruppengerechten Content, der Vertrauen aufbaut und Communitys wachsen lässt." icon={<Share2 />} />
        </div>
      </section>

      <section id="ueber-uns" className="py-40 bg-[#FAFAF8]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 w-full relative reveal-on-scroll">
              <div className="absolute inset-0 translate-x-6 translate-y-6 border border-[#C8A84B] z-0"></div>
              <div className="relative z-10 w-full aspect-[4/5] bg-white overflow-hidden pointer-events-auto">
                 <img src="https://raw.githubusercontent.com/thebestgames16-dev/KORU-Commerce/main/IMG_6198.webp" alt="Abdulazeez Ali" className="w-full h-full object-cover transition-transform hover:scale-105 duration-1000" />
                 <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md border border-[#EBEBEB]">
                   <h4 className="font-bebas tracking-widest text-3xl mb-1 text-[#111111]">Abdulazeez Ali</h4>
                   <p className="font-dm-mono text-xs text-[#C8A84B] uppercase tracking-widest">Inhaber & Gründer</p>
                 </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="font-bebas text-6xl md:text-8xl tracking-widest mb-10 text-[#111111] uppercase reveal-on-scroll">The KORU <br/> <span className="text-[#C8A84B]">Difference</span></h2>
              
              <p className="font-cormorant text-3xl font-light text-[#888888] leading-relaxed mb-12 reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
                Wir sind nicht die typische Agentur von nebenan. KORU Commerce steht für kompromisslose Ästhetik und eiskalte Performance. Wir helfen regionalen Unternehmen, sich online unverwechselbar zu positionieren.
              </p>
              
              <div className="space-y-8 mb-20 reveal-on-scroll" style={{ transitionDelay: "200ms" }}>
                <div className="flex items-center gap-6">
                  <div className="text-[#C8A84B]"><Check size={24} strokeWidth={1} /></div>
                  <span className="font-dm-sans text-xl text-[#111111] font-light">Bespoke Design (Keine Templates)</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-[#C8A84B]"><Check size={24} strokeWidth={1} /></div>
                  <span className="font-dm-sans text-xl text-[#111111] font-light">Umsatzfokussierte Strategien</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-[#C8A84B]"><Check size={24} strokeWidth={1} /></div>
                  <span className="font-dm-sans text-xl text-[#111111] font-light">Transparente Kommunikation</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-8 py-10 border-t border-[#EBEBEB] reveal-on-scroll" style={{ transitionDelay: "300ms" }}>
                <div className="flex flex-col gap-2">
                  <div className="font-bebas text-5xl tracking-widest text-[#C8A84B]"><AnimatedCounter end={50} suffix="+" /></div>
                  <div className="font-dm-mono text-xs text-[#888888] uppercase tracking-widest">Projekte</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-bebas text-5xl tracking-widest text-[#C8A84B]"><AnimatedCounter end={98} suffix="%" /></div>
                  <div className="font-dm-mono text-xs text-[#888888] uppercase tracking-widest">Zufriedenheit</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-bebas text-5xl tracking-widest text-[#C8A84B]"><AnimatedCounter end={5} suffix=" J." /></div>
                  <div className="font-dm-mono text-xs text-[#888888] uppercase tracking-widest">Erfahrung</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projekte" className="py-40 bg-[#FFFFFF]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 reveal-on-scroll">
            <h2 className="font-bebas text-6xl md:text-8xl tracking-widest mb-6 text-[#111111] uppercase">Ausgewählte <br/><span className="text-[#C8A84B]">Arbeiten</span></h2>
          </div>

          <div className="w-full border border-[#EBEBEB] bg-[#FAFAF8] p-24 md:p-40 text-center reveal-on-scroll transition-colors duration-500 hover:border-[#C8A84B] pointer-events-auto">
            <h3 className="font-bebas text-5xl md:text-7xl text-[#111111] tracking-widest mb-8 uppercase">Unsere ersten Projekte<br/>entstehen gerade.</h3>
            <p className="font-cormorant text-3xl md:text-4xl text-[#888888] italic mb-16">Sei dabei von Anfang an.</p>
            
            <a href="#kontakt" className="inline-flex items-center gap-4 px-10 py-5 border border-[#C8A84B] text-[#111111] font-dm-sans text-sm font-medium uppercase tracking-[0.15em] hover:bg-[#C8A84B] hover:text-white transition-all duration-300">
              Projekt starten <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-40 px-6 max-w-7xl mx-auto bg-[#FFFFFF]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { text: "KORU hat unsere Vision nicht nur umgesetzt, sondern auf ein Level gehoben, das wir uns nicht vorstellen konnten. Die Conversion-Rate ist um 45%.", name: "Markus D.", role: "CEO, TechFlow GmbH" },
            { text: "Die Kombination aus technischer Perfektion und diesem unglaublich guten, cleanen Design ist in der Region Stuttgart einzigartig.", name: "Sarah W.", role: "Gründerin, Maison Studio" },
            { text: "Endlich eine Agentur, die nicht nur schöne Bilder malt, sondern echten messbaren Umsatz bringt. Die Kommunikation war immer on point.", name: "Jonas K.", role: "Inhaber, KFZ-Leitner" }
          ].map((testi, idx) => (
            <div key={idx} className="reveal-on-scroll relative pt-12" style={{ transitionDelay: `${idx * 150}ms` }}>
              <div className="absolute top-0 left-0 text-[#EBEBEB] font-serif text-[140px] leading-none select-none">"</div>
              <p className="font-cormorant text-2xl text-[#111111] mb-12 italic relative z-10">"{testi.text}"</p>
              <div className="border-t border-[#C8A84B] pt-6 uppercase w-16 mb-4"></div>
              <h5 className="font-dm-sans font-medium text-[#111111] text-sm tracking-widest mb-1">{testi.name}</h5>
              <p className="font-dm-mono text-xs text-[#888888] tracking-widest">{testi.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="kontakt" className="py-40 relative bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-6xl relative z-10 pointer-events-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal-on-scroll">
              <h2 className="font-bebas text-7xl md:text-8xl tracking-widest mb-10 text-[#111111] uppercase">
                Bereit <br/><span className="text-[#C8A84B]">durchzustarten?</span>
              </h2>
              <p className="font-dm-sans text-[#888888] font-light text-xl mb-12 leading-relaxed max-w-md">
                Lass uns dein nächstes Projekt besprechen. Ob komplettes Re-Design, SEO-Strategie oder Conversion-Optimierung.
              </p>
              
              <a href="https://wa.me/4915906227948?text=Hallo%20KORU%20Commerce%2C%20ich%20interessiere%20mich%20für%20eine%20Website." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 px-8 py-4 bg-[#C8A84B] text-[#111111] font-dm-sans font-medium hover:-translate-y-1 transition-transform duration-300">
                <MessageSquare size={20} /> Via WhatsApp chatten
              </a>
            </div>
            
            <div className="bg-[#FFFFFF] p-10 md:p-14 border border-[#EBEBEB] reveal-on-scroll w-full" style={{ transitionDelay: '200ms' }}>
              <form onSubmit={handleFormSubmit} action="https://formspree.io/f/mjgjrgpw" method="POST" className="flex flex-col gap-10">
                {formStatus === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 bg-[#C8A84B] rounded-full flex items-center justify-center mb-6">
                      <Check className="text-[#FFFFFF]" size={32} />
                    </div>
                    <h3 className="font-bebas text-4xl text-[#111111] tracking-widest mb-2">Danke!</h3>
                    <p className="font-dm-sans text-[#888888]">Wir melden uns in 24h bei dir.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-3">
                      <label className="font-dm-mono text-xs uppercase tracking-[0.2em] text-[#888888]">Name</label>
                      <input type="text" name="name" required className="bg-transparent border-b border-[#C8A84B] py-3 text-[#111111] focus:outline-none focus:border-[#111111] transition-colors font-dm-sans placeholder-[#EBEBEB]" placeholder="Max Mustermann" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="font-dm-mono text-xs uppercase tracking-[0.2em] text-[#888888]">E-Mail</label>
                      <input type="email" name="email" required className="bg-transparent border-b border-[#C8A84B] py-3 text-[#111111] focus:outline-none focus:border-[#111111] transition-colors font-dm-sans placeholder-[#EBEBEB]" placeholder="max@firma.de" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="font-dm-mono text-xs uppercase tracking-[0.2em] text-[#888888]">Nachricht</label>
                      <textarea rows={4} name="message" required className="bg-transparent border-b border-[#C8A84B] py-3 text-[#111111] focus:outline-none focus:border-[#111111] transition-colors font-dm-sans resize-none placeholder-[#EBEBEB]" placeholder="Hi KORU Team, wir brauchen..."></textarea>
                    </div>
                    <button type="submit" disabled={formStatus === 'submitting'} className="mt-4 px-10 py-5 bg-[#C8A84B] text-[#111111] font-dm-sans text-sm font-medium uppercase tracking-[0.15em] hover:bg-[#111111] hover:text-[#FFFFFF] transition-all duration-300 w-full text-center disabled:opacity-50">
                      {formStatus === 'submitting' ? 'Wird gesendet...' : 'Anfrage Senden'}
                    </button>
                    {formStatus === 'error' && (
                      <p className="text-red-500 font-dm-sans text-xs text-center mt-2">Ein Fehler ist aufgetreten. Bitte versuche es noch einmal.</p>
                    )}
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* Mobile Menu Overlay - ROOT LEVEL OUTSIDE SMOOTH SCROLL */}
      <div className={`fixed inset-0 bg-[#FFFFFF] z-[9999] flex flex-col items-center justify-center transition-all duration-500 origin-top ${mobileMenuOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
        
        {/* Same layout logic as Nav to perfectly position X over the Hamburger Menu */}
        <div className="absolute top-0 left-0 right-0 py-8">
          <div className="container mx-auto px-10 max-w-7xl flex justify-end">
            <button 
              className="text-[#111111] pointer-events-auto touch-manipulation hover:text-[#C8A84B] transition-colors"
              style={{ touchAction: 'manipulation' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={28} />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <a href="#leistungen" onClick={() => setMobileMenuOpen(false)} className="font-bebas text-5xl tracking-wider hover:text-[#C8A84B] transition-colors text-[#111111] touch-manipulation" style={{ touchAction: 'manipulation' }}>Leistungen</a>
          <a href="#projekte" onClick={() => setMobileMenuOpen(false)} className="font-bebas text-5xl tracking-wider hover:text-[#C8A84B] transition-colors text-[#111111] touch-manipulation" style={{ touchAction: 'manipulation' }}>Projekte</a>
          <a href="#ueber-uns" onClick={() => setMobileMenuOpen(false)} className="font-bebas text-5xl tracking-wider hover:text-[#C8A84B] transition-colors text-[#111111] touch-manipulation" style={{ touchAction: 'manipulation' }}>Über uns</a>
          <a href="#kontakt" onClick={() => setMobileMenuOpen(false)} className="font-bebas text-5xl tracking-wider hover:text-[#C8A84B] transition-colors text-[#111111] touch-manipulation" style={{ touchAction: 'manipulation' }}>Kontakt</a>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<SmoothScroll><Home mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} /></SmoothScroll>} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
      </Routes>
    </BrowserRouter>
  );
}
