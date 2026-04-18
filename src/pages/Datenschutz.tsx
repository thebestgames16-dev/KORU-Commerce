import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function Datenschutz() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 py-[32px] backdrop-blur-[10px] bg-[#060606]/80 border-b border-[#C8A84B]/10">
        <div className="container mx-auto px-[64px] max-w-7xl flex items-center">
          <Link to="/" className="font-dm-sans text-[13px] font-medium tracking-[2px] uppercase text-white/70 hover:text-white transition-colors flex items-center gap-3">
            <ArrowLeft size={16} /> Zurück zur Startseite
          </Link>
        </div>
      </nav>

      <main className="pt-48 pb-32 px-6 max-w-4xl mx-auto reveal-on-scroll is-revealed min-h-[70vh]">
        <h1 className="font-bebas text-6xl md:text-8xl tracking-tight mb-4 text-white uppercase">Datenschutz</h1>
        <div className="h-[1px] w-24 bg-[#C8A84B] mb-12"></div>
        
        <div className="space-y-8 font-dm-sans text-gray-300 text-lg leading-relaxed">
          <section>
            <h2 className="text-[#C8A84B] font-bebas text-3xl mb-3 tracking-wider">Verantwortlicher</h2>
            <p>Abdulazeez Ali<br/>KORU Commerce<br/>Friedrich-List-Straße 5<br/>72805 Lichtenstein<br/>E-Mail: <a href="mailto:abdulazeez.ali04@outlook.de" className="hover:text-[#C8A84B] transition-colors">abdulazeez.ali04@outlook.de</a></p>
          </section>

          <section>
            <h2 className="text-[#C8A84B] font-bebas text-3xl mb-3 tracking-wider">Datenerhebung auf dieser Website</h2>
            <p>Diese Website erhebt keine personenbezogenen Daten automatisch außer technisch notwendigen Server-Logs. Kontaktformular-Daten werden nur zur Bearbeitung der Anfrage genutzt und nicht weitergegeben.</p>
          </section>

          <section>
            <h2 className="text-[#C8A84B] font-bebas text-3xl mb-3 tracking-wider">Hosting</h2>
            <p>Hosting: Vercel Inc., <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer" className="hover:text-[#C8A84B] transition-colors">vercel.com/legal/privacy-policy</a></p>
          </section>

          <section>
            <h2 className="text-[#C8A84B] font-bebas text-3xl mb-3 tracking-wider">Cookies & Tracking</h2>
            <p>Keine Tracking-Cookies.</p>
          </section>

          <section>
            <h2 className="text-[#C8A84B] font-bebas text-3xl mb-3 tracking-wider">Ihre Rechte nach DSGVO</h2>
            <p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Rechte nach Art. 15–17 DSGVO auf Anfrage per E-Mail.</p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
