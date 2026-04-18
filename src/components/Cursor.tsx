import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                          target.tagName.toLowerCase() === 'a' || 
                          target.tagName.toLowerCase() === 'button' ||
                          target.closest('a') || target.closest('button');
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateHoverState);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateHoverState);
    };
  }, []);

  return (
    <div 
      id="cursor-circle"
      className={isHovering ? 'hover' : ''}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        width: isHovering ? '36px' : '16px',
        height: isHovering ? '36px' : '16px',
        border: '1px solid #C8A84B',
        transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s'
      }}
    />
  );
}
