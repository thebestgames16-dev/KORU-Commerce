import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function Datenschutz() {
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
        <h1 className="font-bebas text-6xl md:text-8xl tracking-widest mb-6 text-[#111111] uppercase">Datenschutz</h1>
        <div className="h-[1px] w-16 bg-[#C8A84B] mb-16"></div>
        
        <div className="space-y-12 font-dm-sans text-[#888888] text-lg font-light leading-relaxed">
          <section>
            <h2 className="text-[#111111] font-bebas text-3xl mb-4 tracking-widest uppercase">Verantwortlicher</h2>
            <p>Abdulazeez Ali<br/>KORU Commerce<br/>Friedrich-List-Straße 5<br/>72805 Lichtenstein<br/>E-Mail: <a href="mailto:info@koru-commerce.com" className="text-[#C8A84B] hover:text-[#111111] transition-colors">info@koru-commerce.com</a></p>
          </section>

          <section>
            <h2 className="text-[#111111] font-bebas text-3xl mb-4 tracking-widest uppercase">Datenerhebung auf dieser Website</h2>
            <p>Diese Website erhebt keine personenbezogenen Daten automatisch außer technisch notwendigen Server-Logs. Kontaktformular-Daten werden nur zur Bearbeitung der Anfrage genutzt und nicht weitergegeben.</p>
          </section>

          <section>
            <h2 className="text-[#111111] font-bebas text-3xl mb-4 tracking-widest uppercase">Hosting</h2>
            <p>Hosting: Vercel Inc., <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer" className="text-[#C8A84B] hover:text-[#111111] transition-colors">vercel.com/legal/privacy-policy</a></p>
          </section>

          <section>
            <h2 className="text-[#111111] font-bebas text-3xl mb-4 tracking-widest uppercase">Cookies & Tracking</h2>
            <p>Keine Tracking-Cookies.</p>
          </section>

          <section>
            <h2 className="text-[#111111] font-bebas text-3xl mb-4 tracking-widest uppercase">Ihre Rechte nach DSGVO</h2>
            <p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Rechte nach Art. 15–17 DSGVO auf Anfrage per E-Mail.</p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
