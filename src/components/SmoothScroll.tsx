import React, { useEffect, useRef } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const isMobile = typeof window !== 'undefined' ? (window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window) : false;

  useEffect(() => {
    let animationFrameId: number;
    let resizeObserver: ResizeObserver;

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-revealed');
          }, index * 100);
          intersectionObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    });

    setTimeout(() => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach(el => intersectionObserver.observe(el));
    }, 500);

    if (isMobile) {
      document.body.style.height = 'auto'; // Force normal height on mobile
      return () => {
        intersectionObserver.disconnect();
      };
    }

    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    let currentY = 0;
    let targetY = window.scrollY;
    let maxScroll = 0;

    const updateHeight = () => {
      if (content && container) {
        // offsetHeight = real element height, unaffected by translate transform
        const h = content.offsetHeight;
        document.body.style.height = `${h}px`;
        maxScroll = Math.max(0, h - window.innerHeight);
      }
    };

    const handleScroll = () => {
      targetY = Math.min(window.scrollY, maxScroll);
    };

    const animate = () => {
      currentY += (targetY - currentY) * 0.10;

      if (Math.abs(targetY - currentY) < 0.01) {
        currentY = targetY;
      }

      // Hard clamp so content never drifts past the bottom
      currentY = Math.max(0, Math.min(currentY, maxScroll));

      if (content) {
        content.style.transform = `translate3d(0, -${currentY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateHeight);
    
    resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(content);
    
    setTimeout(updateHeight, 100);
    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeight);
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.body.style.height = ''; 
    };
  }, [isMobile]);

  if (isMobile) {
    return <div className="w-full relative overflow-x-hidden">{children}</div>;
  }

  return (
    <div className="smooth-scroll-container" ref={containerRef}>
      <div className="smooth-scroll-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
