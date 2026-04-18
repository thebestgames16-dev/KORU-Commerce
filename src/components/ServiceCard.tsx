import React, { useRef, useState } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation limits (max 15 degrees)
    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="perspective-container reveal-on-scroll">
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="preserve-3d relative bg-[#111111] border border-[#333333] hover:border-[#C8A84B] p-8 h-full flex flex-col items-start justify-between transition-all duration-300 overflow-hidden group cursor-pointer"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {/* Golden Glint Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#C8A84B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
             style={{ transform: `translate3d(${-rotateY * 4}px, ${rotateX * 4}px, 0)` }}></div>
             
        <div className="transform-gpu translate-z-[30px]">
          <div className="text-[#C8A84B] mb-6 [&>svg]:w-10 [&>svg]:h-10">
            {icon}
          </div>
          <h3 className="font-bebas text-3xl mb-4 tracking-wide group-hover:text-[#F5F5F0] transition-colors">{title}</h3>
          <p className="text-[#888888] font-dm-sans text-sm leading-relaxed mb-8">
            {description}
          </p>
        </div>
        
        <div className="mt-auto transform-gpu translate-z-[40px]">
          <span className="text-[#C8A84B] font-dm-mono text-sm tracking-widest uppercase transition-transform group-hover:translate-x-2 inline-block">
            Mehr &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}
