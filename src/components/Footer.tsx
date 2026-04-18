import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const LogoSvg = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5L89.5 27.5V72.5L50 95L10.5 72.5V27.5L50 5Z" stroke="#111111" strokeWidth="4"/>
    <path d="M40 35V65M40 50L60 35M40 50L60 65" stroke="#111111" strokeWidth="5" strokeLinecap="round"/>
  </svg>
);

export default function Footer() {
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    navigate(`/${hash}`);
  };

  return (
    <footer className="bg-[#F5F2ED] py-16 px-6 relative z-[500] pointer-events-auto">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#C8A84B] opacity-30"></div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16 mt-8">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6 pointer-events-auto">
              <LogoSvg />
              <span className="font-bebas text-3xl tracking-widest text-[#111111]">KORU Commerce</span>
            </Link>
            <p className="font-dm-sans text-[#888888] text-sm max-w-xs font-light">
              Die Web Design & Digital Agentur in Reutlingen für messbares Wachstum und exzellentes Design.
            </p>
          </div>
          
          <div className="flex gap-16">
            <div className="flex flex-col gap-4 pointer-events-auto">
              <h6 className="font-dm-mono text-xs uppercase tracking-widest text-[#111111] mb-2 font-medium">Menü</h6>
              <a href="/#leistungen" onClick={(e) => handleNavClick(e, '#leistungen')} className="font-dm-sans text-sm text-[#888888] hover:text-[#C8A84B] transition-colors pointer-events-auto">Leistungen</a>
              <a href="/#projekte" onClick={(e) => handleNavClick(e, '#projekte')} className="font-dm-sans text-sm text-[#888888] hover:text-[#C8A84B] transition-colors pointer-events-auto">Projekte</a>
              <a href="/#ueber-uns" onClick={(e) => handleNavClick(e, '#ueber-uns')} className="font-dm-sans text-sm text-[#888888] hover:text-[#C8A84B] transition-colors pointer-events-auto">Über uns</a>
            </div>
            
            <div className="flex flex-col gap-4 pointer-events-auto">
              <h6 className="font-dm-mono text-xs uppercase tracking-widest text-[#111111] mb-2 font-medium">Social</h6>
              <a href="#" className="font-dm-sans text-sm text-[#888888] hover:text-[#C8A84B] transition-colors pointer-events-auto">LinkedIn</a>
              <a href="#" className="font-dm-sans text-sm text-[#888888] hover:text-[#C8A84B] transition-colors pointer-events-auto">Instagram</a>
              <a href="#" className="font-dm-sans text-sm text-[#888888] hover:text-[#C8A84B] transition-colors pointer-events-auto">Awwwards</a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#EBEBEB] gap-4">
          <span className="font-dm-mono text-xs text-[#888888]">© 2026 KORU Commerce. All rights reserved.</span>
          <div className="flex gap-6 pointer-events-auto">
            <Link to="/impressum" className="font-dm-mono text-xs text-[#888888] hover:text-[#C8A84B] transition-colors pointer-events-auto">Impressum</Link>
            <Link to="/datenschutz" className="font-dm-mono text-xs text-[#888888] hover:text-[#C8A84B] transition-colors pointer-events-auto">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
