import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

export default function ServiceCard({ title, description, icon, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    rotateY.set(dx * 7);
    rotateX.set(-dy * 7);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 900,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group bg-[#FFFFFF] border border-[#EBEBEB] p-10 flex flex-col gap-6 cursor-pointer relative overflow-hidden transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/5 hover:border-[#C8A84B] pointer-events-auto"
    >
      {/* Gold fill sweep on hover */}
      <motion.div
        className="absolute inset-0 bg-[#C8A84B] origin-bottom pointer-events-none"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <span className="absolute top-8 right-10 font-dm-mono text-xs text-[#EBEBEB] group-hover:text-[#111111]/30 transition-colors duration-300 z-10 select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-10 w-14 h-14 border border-[#EBEBEB] group-hover:border-[#111111]/20 flex items-center justify-center text-[#C8A84B] group-hover:text-[#111111] transition-colors duration-300">
        {icon}
      </div>

      <div className="relative z-10 flex-1">
        <h3 className="font-bebas text-3xl mb-3 text-[#111111] tracking-widest">{title}</h3>
        <p className="font-dm-sans text-[#888888] group-hover:text-[#111111]/70 font-light leading-relaxed text-sm transition-colors duration-300">
          {description}
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-2 text-[#C8A84B] group-hover:text-[#111111] transition-colors duration-300">
        <span className="font-dm-mono text-xs uppercase tracking-widest">Mehr erfahren</span>
        <ArrowUpRight size={14} />
      </div>
    </motion.div>
  );
}
