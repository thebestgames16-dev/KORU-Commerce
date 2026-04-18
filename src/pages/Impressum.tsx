import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function Impressum() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 py-[32px] bg-white/95 backdrop-blur-md border-b border-[#EBEBEB]">
        <div className="container mx-auto px-10 max-w-7xl flex items-center">
          <Link to="/" className="font-dm-sans text-sm font-medium tracking-[0.15em] uppercase text-[#111111] hover:text-[#C8A84B] transition-colors flex items-center gap-4">
            <ArrowLeft size={16} /> Zurück zur Startseite
          </Link>
        </div>
      </nav>

      <main className="pt-48 pb-40 px-6 max-w-4xl mx-auto reveal-on-scroll is-revealed min-h-[70vh] bg-[#FFFFFF]">
        <h1 className="font-bebas text-6xl md:text-8xl tracking-widest mb-6 text-[#111111] uppercase">Impressum</h1>
        <div className="h-[1px] w-16 bg-[#C8A84B] mb-16"></div>
        
        <div className="space-y-12 font-dm-sans text-[#888888] text-lg font-light leading-relaxed">
          <section>
            <h2 className="text-[#111111] font-bebas text-3xl mb-4 tracking-widest uppercase">Angaben gemäß § 5 TMG</h2>
            <p>Abdulazeez Ali<br/>KORU Commerce<br/>Friedrich-List-Straße 5<br/>72805 Lichtenstein</p>
          </section>

          <section>
            <h2 className="text-[#111111] font-bebas text-3xl mb-4 tracking-widest uppercase">Kontakt</h2>
            <p>Telefon: 0159 0622 7948<br/>E-Mail: <a href="mailto:abdulazeez.ali04@outlook.de" className="text-[#C8A84B] hover:text-[#111111] transition-colors">abdulazeez.ali04@outlook.de</a></p>
          </section>

          <section>
            <h2 className="text-[#111111] font-bebas text-3xl mb-4 tracking-widest uppercase">Umsatzsteuer</h2>
            <p>USt-IdNr.: DE454560738</p>
          </section>

          <section>
            <h2 className="text-[#111111] font-bebas text-3xl mb-4 tracking-widest uppercase">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>Abdulazeez Ali<br/>Friedrich-List-Straße 5<br/>72805 Lichtenstein</p>
          </section>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
