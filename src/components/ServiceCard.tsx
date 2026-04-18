import React from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <div className="bg-[#FFFFFF] border border-[#EBEBEB] p-10 flex flex-col items-start gap-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#C8A84B] reveal-on-scroll pointer-events-auto">
      <div className="w-16 h-16 bg-[#FAFAF8] rounded-full flex items-center justify-center text-[#C8A84B]">
        {icon}
      </div>
      <div>
        <h3 className="font-bebas text-3xl mb-4 text-[#111111] tracking-widest">{title}</h3>
        <p className="font-dm-sans text-[#888888] font-light leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
