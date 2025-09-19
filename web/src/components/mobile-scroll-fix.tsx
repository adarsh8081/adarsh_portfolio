"use client";

import { useEffect } from "react";

export function MobileScrollFix() {
  useEffect(() => {
    // Check if device is mobile
    const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    
    if (isMobile) {
      // Force enable scrolling on mobile
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.body.style.minHeight = '100vh';
      
      // Remove any Lenis classes that might interfere
      document.documentElement.classList.remove('lenis');
      document.body.classList.remove('lenis');
      
      // Ensure touch scrolling is enabled
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (document.documentElement.style as any).webkitOverflowScrolling = 'touch';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (document.body.style as any).webkitOverflowScrolling = 'touch';
      
      // Add touch event listeners to ensure scrolling works
      const enableTouchScroll = (e: TouchEvent) => {
        e.stopPropagation();
      };
      
      document.addEventListener('touchstart', enableTouchScroll, { passive: true });
      document.addEventListener('touchmove', enableTouchScroll, { passive: true });
      
      return () => {
        document.removeEventListener('touchstart', enableTouchScroll);
        document.removeEventListener('touchmove', enableTouchScroll);
      };
    }
  }, []);

  return null;
}
