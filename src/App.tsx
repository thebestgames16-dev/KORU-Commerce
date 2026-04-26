import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import SmoothScroll from './components/SmoothScroll';
import HeroCanvas from './components/HeroCanvas';
import ServiceCard from './components/ServiceCard';
import AnimatedCounter from './components/AnimatedCounter';
import Footer, { LogoSvg } from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import Cursor from './components/Cursor';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import {
  MonitorSmartphone, Search, PenTool, LayoutTemplate, Share2, Rocket,
  ArrowRight, Menu, X, Check, MessageSquare
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

function MagneticWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 25 });
  const sy = useSpring(y, { stiffness: 300, damping: 25 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.4);
    y.set((e.clientY - r.top - r.height / 2) * 0.4);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}


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
            {["leistungen","ueber-uns","kontakt"].map(id => (
              <a key={id} href={`#${id}`} className="font-dm-sans text-sm font-medium tracking-widest uppercase text-[#111111] hover:text-[#C8A84B] transition-colors">
                {id === "ueber-uns" ? "Über uns" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>
          <div className="hidden md:block pointer-events-auto">
            <MagneticWrap>
              <motion.a
                href="#kontakt"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 border border-[#C8A84B] text-[#111111] font-dm-sans text-xs uppercase tracking-widest hover:bg-[#C8A84B] hover:text-white transition-all duration-300 cursor-pointer inline-block"
              >
                Projekt starten
              </motion.a>
            </MagneticWrap>
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

        {/* Grain texture overlay */}
        <div className="hero-grain absolute inset-0 z-[1] pointer-events-none" />

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
            <span className="text-[#888888] font-dm-mono text-sm tracking-[0.4em] uppercase">Web Design · Region Stuttgart</span>
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
            className="font-cormorant italic text-3xl md:text-4xl text-[#888888] max-w-2xl mx-auto mb-16 leading-relaxed"
          >
            KORU Commerce verwandelt deine Online-Präsenz in deinen stärksten Vertriebsmitarbeiter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto"
          >
            <MagneticWrap>
              <motion.a
                href="#kontakt"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-5 border border-[#C8A84B] text-[#111111] font-dm-sans text-sm font-medium uppercase tracking-[0.15em] hover:bg-[#C8A84B] hover:text-white transition-all duration-300 sm:w-auto text-center flex items-center justify-center gap-3 cursor-pointer"
              >
                Projekt starten <ArrowRight size={18} />
              </motion.a>
            </MagneticWrap>
            <a href="#leistungen" className="px-10 py-5 text-[#888888] font-dm-sans text-sm font-medium uppercase tracking-[0.15em] hover:text-[#111111] transition-all duration-300 w-full sm:w-auto text-center cursor-pointer">
              Unsere Leistungen ↓
            </a>
          </motion.div>
        </motion.div>

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

      {/* ── ANSPRUCH ── */}
      <section className="bg-[#111111] relative overflow-hidden">
        {/* Watermark */}
        <div
          className="absolute -top-10 -left-8 font-bebas leading-none text-white/[0.03] select-none pointer-events-none whitespace-nowrap"
          style={{ fontSize: "28vw" }}
        >
          KORU
        </div>

        {/* Top block — headline */}
        <div className="container mx-auto max-w-7xl px-6 pt-32 pb-20 relative z-10">
          <Reveal className="mb-5">
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-[#C8A84B]" />
              <span className="font-dm-mono text-xs text-[#C8A84B] uppercase tracking-[0.4em]">Unser Anspruch</span>
            </div>
          </Reveal>

          <div className="mt-10 mb-6">
            <h2 className="font-bebas leading-[0.88] uppercase text-white" style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}>
              Nicht die günstigste
            </h2>
            <h2 className="font-bebas leading-[0.88] uppercase text-[#C8A84B]" style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}>
              Agentur. Die beste.
            </h2>
          </div>

          <Reveal delay={0.15}>
            <p className="font-dm-mono text-sm text-[#555555] uppercase tracking-[0.3em]">
              — Nr. 1 Webagentur in der Region Stuttgart —
            </p>
          </Reveal>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Three pillars */}
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Kein Projekt wie das andere",
                text: "Jede Website, die wir bauen, ist ein Unikat — maßgeschneidert für dein Business, deine Zielgruppe und deine Ziele. Templates gibt es woanders.",
              },
              {
                num: "02",
                title: "Performance, die zählt",
                text: "Schönheit ohne Ergebnis ist Dekoration. Jede Entscheidung bei KORU ist auf messbaren Umsatz ausgerichtet — vom ersten Pixel bis zum letzten CTA.",
              },
              {
                num: "03",
                title: "Regional stark. Digital dominant.",
                text: "Wir kennen den Markt der Region Stuttgart und wissen, was lokale Unternehmen brauchen, um online die Konkurrenz hinter sich zu lassen.",
              },
            ].map((pillar, i) => (
              <div key={pillar.num}>
                <Reveal delay={i * 0.15}>
                  <div className={`p-10 md:p-14 ${i < 2 ? "border-b md:border-b-0 md:border-r border-white/10" : ""}`}>
                    <span className="font-dm-mono text-[#C8A84B] text-5xl font-light block mb-8 leading-none">{pillar.num}</span>
                    <h3 className="font-bebas text-2xl md:text-3xl tracking-widest text-white mb-5">{pillar.title}</h3>
                    <p className="font-dm-sans text-[#666666] text-base leading-relaxed font-light">{pillar.text}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Closing quote */}
        <div className="container mx-auto max-w-7xl px-6 py-20 relative z-10">
          <Reveal>
            <blockquote className="font-cormorant italic text-3xl md:text-4xl text-[#555555] max-w-4xl leading-relaxed border-l-2 border-[#C8A84B] pl-8">
              „Wir übernehmen kein Projekt, das wir nicht besser machen können als jede andere Agentur in der Region Stuttgart — das ist kein Versprechen, das ist unser Standard."
            </blockquote>
          </Reveal>
        </div>
      </section>

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
                <p className="font-dm-sans text-[#888888] text-base leading-relaxed font-light">{step.text}</p>
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
                <p className="font-cormorant text-4xl font-light text-[#888888] leading-relaxed mb-12">
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
                      <span className="font-dm-sans text-2xl text-[#111111] font-light">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </Reveal>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="grid grid-cols-2 gap-8 py-10 border-t border-[#EBEBEB]"
              >
                {[
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


      {/* ── KONTAKT ── */}
      <section id="kontakt" className="py-40 relative bg-[#FAFAF8]">
        <div className="container mx-auto px-6 max-w-6xl relative z-10 pointer-events-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <HeadingReveal className="font-bebas text-7xl md:text-8xl tracking-widest mb-10 text-[#111111] uppercase">
                Bereit <br/><span className="text-[#C8A84B]">durchzustarten?</span>
              </HeadingReveal>
              <Reveal delay={0.2}>
                <p className="font-dm-sans text-[#888888] font-light text-2xl mb-12 leading-relaxed max-w-md">
                  Lass uns dein nächstes Projekt besprechen. Ob komplettes Re-Design, SEO-Strategie oder Conversion-Optimierung.
                </p>
                <MagneticWrap>
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
                </MagneticWrap>
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
      <Cursor />

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
              {["leistungen","ueber-uns","kontakt"].map((id, i) => (
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
