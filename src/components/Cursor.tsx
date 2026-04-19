import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 80, damping: 18 });
  const ringY = useSpring(cursorY, { stiffness: 80, damping: 18 });
  const ringSize = useSpring(14, { stiffness: 200, damping: 25 });
  const ringOpacity = useSpring(1, { stiffness: 200, damping: 25 });
  const dotScale = useSpring(1, { stiffness: 300, damping: 20 });
  const isHidden = useRef(false);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (isHidden.current) {
        ringOpacity.set(1);
        isHidden.current = false;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer";

      if (clickable) {
        ringSize.set(52);
        dotScale.set(0.3);
      } else {
        ringSize.set(14);
        dotScale.set(1);
      }
    };

    const onLeave = () => {
      ringOpacity.set(0);
      isHidden.current = true;
    };

    const onEnter = () => {
      ringOpacity.set(1);
      isHidden.current = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [cursorX, cursorY, ringSize, ringOpacity, dotScale]);

  return (
    <>
      {/* Dot — follows precisely */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full bg-[#C8A84B]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          scale: dotScale,
          opacity: ringOpacity,
        }}
      />
      {/* Ring — springs behind */}
      <motion.div
        className="fixed top-0 left-0 z-[99998] pointer-events-none rounded-full border border-[#C8A84B]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize,
          opacity: ringOpacity,
        }}
      />
    </>
  );
}
