"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Add CSS for Lenis
    const style = document.createElement("style");
    style.innerHTML = `
      html.lenis, html.lenis body {
        height: auto;
      }
      .lenis.lenis-smooth {
        scroll-behavior: auto !important;
      }
      .lenis.lenis-smooth [data-lenis-prevent] {
        overscroll-behavior: contain;
      }
      .lenis.lenis-stopped {
        overflow: hidden;
      }
      .lenis.lenis-scrolling iframe {
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      lenis.destroy();
      document.head.removeChild(style);
    };
  }, []);

  return <>{children}</>;
}
