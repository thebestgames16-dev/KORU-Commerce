import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import SmoothScroll from './components/SmoothScroll';
import HeroCanvas from './components/HeroCanvas';
import ServiceCard from './components/ServiceCard';
import AnimatedCounter from './components/AnimatedCounter';
import Footer, { LogoSvg } from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import {
  MonitorSmartphone, Search, PenTool, LayoutTemplate, Share2, Rocket,
  ArrowRight, Menu, X, Check, MessageSquare, ArrowUpRight, ExternalLink
} from 'lucide-react';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

// Reusable reveal wrapper
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Clip-path heading reveal
function HeadingReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Split text word by word
function SplitWords({ text, className = "", baseDelay = 0 }: { text: string; className?: string; baseDelay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: baseDelay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const projects = [
  {
    id: 1,
    name: "Nuscha Nägel",
    category: "Webdesign & Entwicklung",
    description: "Luxuriöse Single-Page Website für ein Nagelstudio in Reutlingen — mit Parallax-Hero, Galerie-Lightbox und automatisierten Animationen.",
    url: "https://nuscha-naegel.vercel.app",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    color: "#F8E1E7",
  },
  {
    id: 2,
    name: "Projekt in Entwicklung",
    category: "Webdesign & Strategie",
    description: "Das nächste KORU-Projekt entsteht gerade. Premium Design, maximale Performance.",
    url: null,
    tags: ["Coming Soon"],
    color: "#F5F2ED",
  },
];

interface HomeProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const processSteps = [
  { num: "01", title: "Strategie & Analyse", text: "Wir tauchen tief in dein Business ein — Zielgruppe, Wettbewerb, Ziele. Das Fundament jedes erfolgreichen Projekts." },
  { num: "02", title: "Konzept & Design", text: "Aus der Strategie entsteht ein maßgeschneidertes Design-Konzept. Kein Template, kein Kompromiss." },
  { num: "03", title: "Entwicklung", text: "High-Performance Entwicklung mit modernsten Technologien. Schnell, sicher, skalierbar." },
  { num: "04", title: "Launch & Wachstum", text: "Nach dem Launch sind wir weiter für dich da — mit SEO, Analytics und kontinuierlicher Optimierung." },
];

function Home({ mobileMenuOpen, setMobileMenuOpen }: HomeProps) {
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch('https://formspree.io/f/mjgjrgpw', {
        method: 'POST', body: data, headers: { 'Accept': 'application/json' }
      });
      if (response.ok) { setFormStatus('success'); form.reset(); }
      else setFormStatus('error');
    } catch { setFormStatus('error'); }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled ? 'py-6 bg-white/95 backdrop-blur-md border-b border-[#EBEBEB] shadow-[0_1px_2px_rgba(0,0,0,0.04)]' : 'py-8 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-10 max-w-7xl flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 relative z-[1000]">
            <LogoSvg />
            <span className="font-bebas text-2xl tracking-widest text-[#111111] hidden sm:block">KORU COMMERCE</span>
          </a>
          <div className="hidden md:flex items-center gap-10">
            {["leistungen","projekte","ueber-uns","kontakt"].map(id => (
              <a key={id} href={`#${id}`} className="font-dm-sans text-sm font-medium tracking-widest uppercase text-[#111111] hover:text-[#C8A84B] transition-colors">
                {id === "ueber-uns" ? "Über uns" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>
          <div className="hidden md:block pointer-events-auto">
            <motion.a
              href="#kontakt"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 border border-[#C8A84B] text-[#111111] font-dm-sans text-xs uppercase tracking-widest hover:bg-[#C8A84B] hover:text-white transition-all duration-300 cursor-pointer"
            >
              Projekt starten
            </motion.a>
          </div>
          <button
            className="md:hidden relative z-[1000] text-[#111111] pointer-events-auto touch-manipulation"
            style={{ touchAction: 'manipulation' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center bg-[#FFFFFF] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <HeroCanvas />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto pointer-events-none mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="text-[#888888] font-dm-mono text-sm tracking-[0.4em] uppercase">Web Design · Reutlingen</span>
          </motion.div>

          <h1 className="font-bebas text-7xl md:text-[120px] leading-[0.85] uppercase mb-10 tracking-[0.02em] text-[#111111]">
            <div className="overflow-hidden mb-2">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                Wir bauen <span className="text-[#C8A84B]">Websites</span>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                die verkaufen.
              </motion.div>
            </div>
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-16 bg-[#C8A84B] mx-auto mb-10 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="font-cormorant italic text-2xl md:text-3xl text-[#888888] max-w-2xl mx-auto mb-16 leading-relaxed"
          >
            KORU Commerce verwandelt deine Online-Präsenz in deinen stärksten Vertriebsmitarbeiter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto"
          >
            <motion.a
              href="#kontakt"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-5 border border-[#C8A84B] text-[#111111] font-dm-sans text-sm font-medium uppercase tracking-[0.15em] hover:bg-[#C8A84B] hover:text-white transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center gap-3 cursor-pointer"
            >
              Projekt starten <ArrowRight size={18} />
            </motion.a>
            <a href="#projekte" className="px-10 py-5 text-[#888888] font-dm-sans text-sm font-medium uppercase tracking-[0.15em] hover:text-[#111111] transition-all duration-300 w-full sm:w-auto text-center cursor-pointer">
              Unsere Arbeit ↓
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-px h-10 bg-gradient-to-b from-[#C8A84B] to-transparent"
          />
        </motion.div>
      </section>

      {/* ── TICKER ── */}
      <div className="bg-[#FAFAF8] py-8 border-y border-[#EBEBEB] overflow-hidden">
        <div className="ticker-track">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center whitespace-nowrap px-6 text-[#111111] uppercase tracking-[0.3em] font-dm-sans font-light text-sm">
              <span className="text-[#C8A84B] mr-6">✦</span> WEBDESIGN
              <span className="text-[#EBEBEB] mx-6">|</span> SEO
              <span className="text-[#EBEBEB] mx-6">|</span> BRANDING
              <span className="text-[#EBEBEB] mx-6">|</span> STRATEGIE
              <span className="text-[#EBEBEB] mx-6">|</span> CONVERSION
              <span className="text-[#EBEBEB] mx-6">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── LEISTUNGEN ── */}
      <section id="leistungen" className="py-40 px-6 max-w-7xl mx-auto bg-[#FFFFFF]">
        <div className="mb-24 text-center">
          <HeadingReveal className="font-bebas text-6xl md:text-8xl tracking-widest mb-6 text-[#111111] uppercase">
            Unsere <span className="text-[#C8A84B]">Leistungen</span>
          </HeadingReveal>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-px w-16 bg-[#C8A84B] mx-auto origin-left"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard index={0} title="Webdesign & Entwicklung" description="Individuelle High-Performance Websites, die Marken erlebbar machen und Nutzer fesseln." icon={<MonitorSmartphone />} />
          <ServiceCard index={1} title="SEO & Sichtbarkeit" description="Datengetriebene Optimierung, damit du bei Google ganz oben stehst und lokal dominierst." icon={<Search />} />
          <ServiceCard index={2} title="Branding & Logo" description="Auszug aus der Masse mit einem Brand-Design, das exakt den Kern deines Unternehmens trifft." icon={<PenTool />} />
          <ServiceCard index={3} title="Digitale Strategie" description="Wir analysieren, planen und setzen Strategien um, die deinen Umsatz langfristig steigern." icon={<LayoutTemplate />} />
          <ServiceCard index={4} title="Conversion Optimierung" description="Vom Besucher zum Kunden: Mit A/B-Tests und UX-Verfeinerung maximieren wir deine Abschlussrate." icon={<Rocket />} />
          <ServiceCard index={5} title="Social Media & Content" description="Wir erstellen zielgruppengerechten Content, der Vertrauen aufbaut und Communitys wachsen lässt." icon={<Share2 />} />
        </div>
      </section>

      {/* ── PROZESS ── */}
      <section className="py-40 bg-[#111111] overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-24">
            <HeadingReveal className="font-bebas text-6xl md:text-8xl tracking-widest text-[#FFFFFF] uppercase">
              Unser <span className="text-[#C8A84B]">Prozess</span>
            </HeadingReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-10 border-r border-[#FFFFFF]/10 last:border-r-0 group"
              >
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8A84B] origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 + 0.4 }}
                />
                <span className="font-dm-mono text-[#C8A84B] text-5xl font-light block mb-8 leading-none">{step.num}</span>
                <h3 className="font-bebas text-2xl tracking-widest text-white mb-4">{step.title}</h3>
                <p className="font-dm-sans text-[#888888] text-sm leading-relaxed font-light">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJEKTE ── */}
      <section id="projekte" className="py-40 bg-[#FFFFFF]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <HeadingReveal className="font-bebas text-6xl md:text-8xl tracking-widest text-[#111111] uppercase">
              Ausgewählte <br/><span className="text-[#C8A84B]">Arbeiten</span>
            </HeadingReveal>
            <Reveal delay={0.2}>
              <p className="font-dm-mono text-xs text-[#888888] uppercase tracking-widest max-w-xs text-right">
                Jedes Projekt ist ein Unikat — entwickelt für messbaren Erfolg.
              </p>
            </Reveal>
          </div>

          <div className="space-y-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 6 }}
                className="group relative border border-[#EBEBEB] hover:border-[#C8A84B] transition-all duration-500 overflow-hidden cursor-pointer pointer-events-auto"
                style={{ backgroundColor: project.color }}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-10 md:p-14 gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-dm-mono text-xs text-[#888888] uppercase tracking-widest">{project.category}</span>
                      <span className="w-1 h-1 rounded-full bg-[#C8A84B]" />
                      <span className="font-dm-mono text-xs text-[#C8A84B] uppercase tracking-widest">
                        {String(project.id).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-bebas text-5xl md:text-6xl tracking-widest text-[#111111] mb-4">{project.name}</h3>
                    <p className="font-dm-sans text-[#888888] text-sm leading-relaxed max-w-lg font-light">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {project.tags.map(tag => (
                        <span key={tag} className="font-dm-mono text-[10px] uppercase tracking-widest px-3 py-1 border border-[#111111]/10 text-[#888888]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-8 py-4 border border-[#111111] text-[#111111] font-dm-sans text-xs uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all duration-300"
                        onClick={e => e.stopPropagation()}
                      >
                        Live ansehen <ExternalLink size={14} />
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 px-8 py-4 border border-[#EBEBEB] text-[#888888] font-dm-sans text-xs uppercase tracking-widest">
                        In Entwicklung
                      </div>
                    )}
                  </div>
                </div>
                {/* Animated gold bar */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[3px] bg-[#C8A84B] origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ÜBER UNS ── */}
      <section id="ueber-uns" className="py-40 bg-[#FAFAF8]">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 w-full relative"
            >
              <div className="absolute inset-0 translate-x-6 translate-y-6 border border-[#C8A84B] z-0" />
              <div className="relative z-10 w-full aspect-[4/5] bg-white overflow-hidden pointer-events-auto">
                <img
                  src="https://raw.githubusercontent.com/thebestgames16-dev/KORU-Commerce/main/IMG_6198.webp"
                  alt="Abdulazeez Ali"
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-1000"
                />
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md border border-[#EBEBEB]">
                  <h4 className="font-bebas tracking-widest text-3xl mb-1 text-[#111111]">Abdulazeez Ali</h4>
                  <p className="font-dm-mono text-xs text-[#C8A84B] uppercase tracking-widest">Inhaber & Gründer</p>
                </div>
              </div>
            </motion.div>

            <div className="flex-1">
              <HeadingReveal className="font-bebas text-6xl md:text-8xl tracking-widest mb-10 text-[#111111] uppercase">
                The KORU <br/><span className="text-[#C8A84B]">Difference</span>
              </HeadingReveal>

              <Reveal delay={0.1}>
                <p className="font-cormorant text-3xl font-light text-[#888888] leading-relaxed mb-12">
                  Wir sind nicht die typische Agentur von nebenan. KORU Commerce steht für kompromisslose Ästhetik und eiskalte Performance.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="space-y-6 mb-20">
                  {[
                    "Bespoke Design (Keine Templates)",
                    "Umsatzfokussierte Strategien",
                    "Transparente Kommunikation"
                  ].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-6"
                    >
                      <div className="text-[#C8A84B]"><Check size={24} strokeWidth={1} /></div>
                      <span className="font-dm-sans text-xl text-[#111111] font-light">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </Reveal>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="grid grid-cols-3 gap-8 py-10 border-t border-[#EBEBEB]"
              >
                {[
                  { end: 50, suffix: "+", label: "Projekte" },
                  { end: 98, suffix: "%", label: "Zufriedenheit" },
                  { end: 5, suffix: " J.", label: "Erfahrung" },
                ].map(item => (
                  <div key={item.label} className="flex flex-col gap-2">
                    <div className="font-bebas text-5xl tracking-widest text-[#C8A84B]">
                      <AnimatedCounter end={item.end} suffix={item.suffix} />
                    </div>
                    <div className="font-dm-mono text-xs text-[#888888] uppercase tracking-widest">{item.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-40 px-6 max-w-7xl mx-auto bg-[#FFFFFF]">
        <div className="mb-24 text-center">
          <HeadingReveal className="font-bebas text-6xl md:text-8xl tracking-widest text-[#111111] uppercase">
            Was Kunden <span className="text-[#C8A84B]">sagen</span>
          </HeadingReveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { text: "KORU hat unsere Vision nicht nur umgesetzt, sondern auf ein Level gehoben, das wir uns nicht vorstellen konnten. Die Conversion-Rate ist um 45% gestiegen.", name: "Markus D.", role: "CEO, TechFlow GmbH" },
            { text: "Die Kombination aus technischer Perfektion und diesem unglaublich guten, cleanen Design ist in der Region Stuttgart einzigartig.", name: "Sarah W.", role: "Gründerin, Maison Studio" },
            { text: "Endlich eine Agentur, die nicht nur schöne Bilder malt, sondern echten messbaren Umsatz bringt. Die Kommunikation war immer on point.", name: "Jonas K.", role: "Inhaber, KFZ-Leitner" },
          ].map((testi, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="relative pt-12 p-10 border border-[#EBEBEB] hover:border-[#C8A84B] transition-colors duration-500 group"
            >
              <div className="absolute top-0 left-8 text-[#EBEBEB] group-hover:text-[#C8A84B]/20 font-serif text-[120px] leading-none select-none transition-colors duration-500">"</div>
              <p className="font-cormorant text-2xl text-[#111111] mb-10 italic relative z-10">"{testi.text}"</p>
              <div className="border-t border-[#C8A84B] pt-6 w-12 mb-4" />
              <h5 className="font-dm-sans font-medium text-[#111111] text-sm tracking-widest mb-1">{testi.name}</h5>
              <p className="font-dm-mono text-xs text-[#888888] tracking-widest">{testi.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── KONTAKT ── */}
      <section id="kontakt" className="py-40 relative bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-6xl relative z-10 pointer-events-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <HeadingReveal className="font-bebas text-7xl md:text-8xl tracking-widest mb-10 text-[#111111] uppercase">
                Bereit <br/><span className="text-[#C8A84B]">durchzustarten?</span>
              </HeadingReveal>
              <Reveal delay={0.2}>
                <p className="font-dm-sans text-[#888888] font-light text-xl mb-12 leading-relaxed max-w-md">
                  Lass uns dein nächstes Projekt besprechen. Ob komplettes Re-Design, SEO-Strategie oder Conversion-Optimierung.
                </p>
                <motion.a
                  href="https://wa.me/4915906227948?text=Hallo%20KORU%20Commerce%2C%20ich%20interessiere%20mich%20für%20eine%20Website."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-4 px-8 py-4 bg-[#C8A84B] text-[#111111] font-dm-sans font-medium cursor-pointer"
                >
                  <MessageSquare size={20} /> Via WhatsApp chatten
                </motion.a>
              </Reveal>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#FFFFFF] p-10 md:p-14 border border-[#EBEBEB] w-full"
            >
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-10">
                <AnimatePresence mode="wait">
                  {formStatus === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-10 text-center"
                    >
                      <div className="w-16 h-16 bg-[#C8A84B] flex items-center justify-center mb-6">
                        <Check className="text-[#FFFFFF]" size={32} />
                      </div>
                      <h3 className="font-bebas text-4xl text-[#111111] tracking-widest mb-2">Danke!</h3>
                      <p className="font-dm-sans text-[#888888]">Wir melden uns in 24h bei dir.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" className="flex flex-col gap-10">
                      {[
                        { label: "Name", name: "name", type: "text", placeholder: "Max Mustermann" },
                        { label: "E-Mail", name: "email", type: "email", placeholder: "max@firma.de" },
                      ].map(field => (
                        <div key={field.name} className="flex flex-col gap-3">
                          <label className="font-dm-mono text-xs uppercase tracking-[0.2em] text-[#888888]">{field.label}</label>
                          <input
                            type={field.type}
                            name={field.name}
                            required
                            placeholder={field.placeholder}
                            className="bg-transparent border-b border-[#C8A84B] py-3 text-[#111111] focus:outline-none focus:border-[#111111] transition-colors font-dm-sans placeholder-[#EBEBEB]"
                          />
                        </div>
                      ))}
                      <div className="flex flex-col gap-3">
                        <label className="font-dm-mono text-xs uppercase tracking-[0.2em] text-[#888888]">Nachricht</label>
                        <textarea
                          rows={4}
                          name="message"
                          required
                          placeholder="Hi KORU Team, wir brauchen..."
                          className="bg-transparent border-b border-[#C8A84B] py-3 text-[#111111] focus:outline-none focus:border-[#111111] transition-colors font-dm-sans resize-none placeholder-[#EBEBEB]"
                        />
                      </div>
                      <motion.button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-4 px-10 py-5 bg-[#C8A84B] text-[#111111] font-dm-sans text-sm font-medium uppercase tracking-[0.15em] hover:bg-[#111111] hover:text-[#FFFFFF] transition-all duration-300 w-full text-center disabled:opacity-50 cursor-pointer"
                      >
                        {formStatus === 'submitting' ? 'Wird gesendet...' : 'Anfrage Senden'}
                      </motion.button>
                      {formStatus === 'error' && (
                        <p className="text-red-500 font-dm-sans text-xs text-center mt-2">Ein Fehler ist aufgetreten. Bitte versuche es noch einmal.</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
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
      <ScrollProgress />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#FFFFFF] z-[9999] flex flex-col items-center justify-center origin-top"
          >
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
              {["leistungen","projekte","ueber-uns","kontakt"].map((id, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-bebas text-5xl tracking-wider hover:text-[#C8A84B] transition-colors text-[#111111] touch-manipulation"
                  style={{ touchAction: 'manipulation' }}
                >
                  {id === "ueber-uns" ? "Über uns" : id.charAt(0).toUpperCase() + id.slice(1)}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<SmoothScroll><Home mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} /></SmoothScroll>} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
      </Routes>
    </BrowserRouter>
  );
}
