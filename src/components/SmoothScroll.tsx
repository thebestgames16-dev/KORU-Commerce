import React, { useEffect, useRef } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
    const lerpFactor = isMobile ? 0.8 : 0.08;

    let currentY = 0;
    let targetY = window.scrollY;
    let animationFrameId: number;
    let resizeObserver: ResizeObserver;

    const updateHeight = () => {
      if (content && container) {
        document.body.style.height = `${content.getBoundingClientRect().height}px`;
      }
    };

    const handleScroll = () => {
      targetY = window.scrollY;
    };

    const animate = () => {
      currentY += (targetY - currentY) * lerpFactor;
      
      if (Math.abs(targetY - currentY) < 0.01) {
        currentY = targetY;
      }
      
      if (content) {
        content.style.transform = `translate3d(0, -${currentY}px, 0)`;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateHeight);
    
    // Use ResizeObserver for dynamic content changes
    resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(content);
    
    updateHeight();
    animate();

    // Intersection observer for reveal animations
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
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

    // We do a small timeout to let children mount before observing
    setTimeout(() => {
      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach(el => intersectionObserver.observe(el));
    }, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeight);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.body.style.height = ''; 
    };
  }, []);

  return (
    <div className="smooth-scroll-container" ref={containerRef}>
      <div className="smooth-scroll-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
